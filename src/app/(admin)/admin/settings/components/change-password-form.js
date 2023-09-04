"use client";
import React, { useState } from "react";
import { Card, Spinner, FloatingLabel, Form, Button } from "react-bootstrap";
import common from "@/utils/common";
import validateAsync from "@/utils/validateAsync";
import changePasswordSchema from "@/joi/changePasswordSchema";
import { toast } from "react-toastify";

export default function ChangePasswordForm() {
  const [fields, setFields] = useState({});
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const handleChange = (e, field) => {
    setFields({ ...fields, [field]: e.target.value });
  };
  
  const handleErrors = (errors) => {
    if (typeof errors === "object") {
      setErrors(errors);
    } else if (typeof errors === "string") {
      toast.error(errors);
    } else {
      toast.error("Something went wrong...! please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const validated = await validateAsync(changePasswordSchema, fields);
    if (validated.errors) {
      handleErrors(validated.errors);
    } else {
      setSubmitted(true);
      let REQUEST_URI = common.apiPath(`/admin/settings/change-password`);
      let REQUEST_METHOD = "PUT";
      await fetch(REQUEST_URI, {
        method: REQUEST_METHOD,
        body: JSON.stringify(fields),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            toast.success(response.message);
            setFields({});
          } else if (response.error) {
            handleErrors(response.message);
          }
        })
        .catch((error) => {
          toast.error(error.message);
        })
        .finally(() => setSubmitted(false));
    }
  };
  return (
    <Card>
      <Form onSubmit={handleSubmit}>
        <Card.Body>
          <Card.Title>
            <h3>Change Password</h3>
          </Card.Title>
          <FloatingLabel
            controlId="floatingInput"
            label="Current Password"
            className="mb-3"
          >
            <Form.Control
              type="password"
              name="current_password"
              placeholder="current_password"
              value={fields?.current_password || ""}
              onChange={(event) => handleChange(event, "current_password")}
              isInvalid={!!errors.current_password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.current_password}
            </Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="New Password"
            className="mb-3"
          >
            <Form.Control
              type="password"
              name="new_password"
              placeholder="new_password"
              value={fields?.new_password || ""}
              onChange={(event) => handleChange(event, "new_password")}
              isInvalid={!!errors.new_password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.new_password}
            </Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Confirm Password"
            className="mb-3"
          >
            <Form.Control
              type="password"
              name="confirm_password"
              placeholder="Confirm Password"
              value={fields?.confirm_password || ""}
              onChange={(event) => handleChange(event, "confirm_password")}
              isInvalid={!!errors.confirm_password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirm_password}
            </Form.Control.Feedback>
          </FloatingLabel>
        </Card.Body>
        <Card.Footer className="text-end pe-4">
          <Button
            variant="success"
            type="submit"
            disabled={submitted}
            size="lg"
          >
            {submitted && (
              <Spinner size="sm" variant="light" className="me-1" />
            )}
            Save
          </Button>
        </Card.Footer>
      </Form>
    </Card>
  );
}
