"use client";
import React, { useState, useEffect } from "react";
import { Card, Spinner, FloatingLabel, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import common from "@/utils/common";
import LoadingOverlay from "react-loading-overlay";
import validateAsync from "@/utils/validateAsync";
import updateProfileSchema from "@/joi/updateProfileSchema";

export default function UpdateProfileForm() {
  const [loader, setLoader] = useState(false);
  const [fields, setFields] = useState({ status: 1 });
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
    const validated = await validateAsync(updateProfileSchema, fields);
    if (validated.errors) {
      handleErrors(validated.errors);
    } else {
      setSubmitted(true);
      await fetch(common.apiPath(`/admin/settings/update-profile`), {
        method: "PUT",
        body: JSON.stringify(fields),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            toast.success(response.message);
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

  const getProfile = async () => {
    setLoader(true);
    await fetch(common.apiPath(`/admin/settings/update-profile`))
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          setFields(response.record);
        } else if (response.error) {
          toast.error(response.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => setLoader(false));
  };

  useEffect(() => {
    getProfile();
  }, []);
  return (
    <Card>
      <LoadingOverlay active={loader} spinner text="Loading...">
        <Form onSubmit={handleSubmit}>
          <Card.Body>
            <Card.Title>
              <h3>Update Profile</h3>
            </Card.Title>
            <FloatingLabel
              controlId="floatingInput"
              label="Name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                name="name"
                placeholder="Name"
                onChange={(event) => handleChange(event, "name")}
                isInvalid={!!errors.name}
                value={fields.name ? fields.name : ""}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="Email"
              className="mb-3"
            >
              <Form.Control
                type="text"
                name="email"
                placeholder="Email"
                onChange={(event) => handleChange(event, "email")}
                isInvalid={!!errors.email}
                value={fields.email || ""}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Card.Body>
          <Card.Footer className="text-end  pe-4">
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
      </LoadingOverlay>
    </Card>
  );
}
