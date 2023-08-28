"use client";
import emailSchema from "@/joi/emailSchema";
import resetPasswordSchema from "@/joi/resetPasswordSchema";
import common from "@/utils/common";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { IoCheckmarkCircle } from "react-icons/io5";
import { toast } from "react-toastify";

export default function ForgotPasswordForm() {
  const [fields, setFields] = useState({});
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  const [status, setStatus] = useState(1);

  const sendVerificationCode = async (e) => {
    e.preventDefault();
    setLoader(true);
    setError(null);
    try {
      await emailSchema.validateAsync(fields, { abortEarly: true });
      await fetch(common.apiPath(`/forgot-password/send-verification-code`), {
        method: "POST",
        body: JSON.stringify(fields),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            setStatus(2);
          } else if (response.error) {
            if (typeof response.message === "string") {
              toast.error(response.message);
            } else {
              setError(response.message);
            }
          }
        });
    } catch (error) {
      const errors = common.getErrors(error);
      setError(errors);
    } finally {
      setLoader(false);
    }
  };

  const submitNewPassword = async (e) => {
    e.preventDefault();
    setLoader(true);
    setError(null);
    try {
      await resetPasswordSchema.validateAsync(fields, { abortEarly: false });
      await fetch(common.apiPath(`/forgot-password/submit-new-password`), {
        method: "POST",
        body: JSON.stringify(fields),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            setStatus(3);
          } else if (response.error) {
            if (typeof response.message === "string") {
              toast.error(response.message);
            } else {
              setError(response.message);
            }
          }
        });
    } catch (error) {
      console.log(error.details);
      const errors = common.getErrors(error);
      setError(errors);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    console.log(fields);
  });
  return (
    <>
      {status === 1 && (
        <div>
          <h3 className="card-title text-left mb-3">Forgot Password?</h3>
          <Form onSubmit={sendVerificationCode}>
            {typeof error == "string" && (
              <p className="text-danger text-center uc-first">{error}</p>
            )}
            <Form.Group className="mb-2">
              <Form.Label>Email *</Form.Label>
              <Form.Control
                autoFocus
                type="email"
                placeholder="Enter email"
                value={fields?.email}
                name="email"
                onChange={(event) =>
                  setFields({ ...fields, email: event.target.value })
                }
                isInvalid={!!error?.email}
              />
              <Form.Control.Feedback type="invalid">
                {error?.email}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="form-group d-flex align-items-center justify-content-between">
              <Link href="/login" className="forgot-pass">
                Login
              </Link>
            </div>
            <div className="d-grid">
              <Button
                variant="primary"
                type="submit"
                size="lg"
                disabled={loader}
              >
                {loader && (
                  <Spinner size="sm" variant="light" className="me-1" />
                )}
                Submit
              </Button>
            </div>
          </Form>
        </div>
      )}
      {status === 2 && (
        <div className="show-down-animation-2">
          <h3 className="card-title text-left mb-3">New Password</h3>
          <Form onSubmit={submitNewPassword}>
            <p className="text-success text-center uc-first">
              Verification code has been sent to your email. please check your
              mail box.
            </p>
            <Form.Group className="mb-2">
              <Form.Label>New Password *</Form.Label>
              <Form.Control
                autoComplete="off"
                type="password"
                name="password"
                placeholder="Enter password"
                value={fields?.password || ""}
                onChange={(event) =>
                  setFields({ ...fields, password: event.target.value })
                }
                isInvalid={!!error?.password}
              />
              <Form.Control.Feedback type="invalid">
                {error?.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Confirm Password *</Form.Label>
              <Form.Control
                type="password"
                name="password_confirmation"
                placeholder="Enter password confirmation"
                value={fields?.password_confirmation || ""}
                onChange={(event) =>
                  setFields({
                    ...fields,
                    password_confirmation: event.target.value,
                  })
                }
                isInvalid={!!error?.password_confirmation}
              />
              {error?.password_confirmation && (
                <Form.Control.Feedback type="invalid">
                  {error?.password_confirmation}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Verification Code *</Form.Label>
              <Form.Control
                type="text"
                name="verification_code"
                placeholder="Enter Verification Code"
                value={fields?.verification_code || ""}
                onChange={(event) =>
                  setFields({
                    ...fields,
                    verification_code: event.target.value,
                  })
                }
                isInvalid={!!error?.verification_code}
              />
              <Form.Control.Feedback type="invalid">
                {error?.verification_code}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="d-grid mt-3">
              <Button
                variant="primary"
                type="submit"
                size="lg"
                disabled={loader}
              >
                {loader && (
                  <Spinner size="sm" variant="light" className="me-1" />
                )}
                Submit
              </Button>
            </div>
          </Form>
        </div>
      )}
      {status === 3 && (
        <div className="show-up-animation-fast text-center">
          <IoCheckmarkCircle color="green" size={40} />
          <p className="mt-3">
            Congratulations! <br />
            Your password has been changed successfully.
          </p>
          <Link href="./login">Login</Link>
        </div>
      )}
    </>
  );
}
