"use client"
import React, { useState, useEffect } from 'react'
import { Card, Spinner, FloatingLabel, Form, Button } from "react-bootstrap"
import common from "@/utils/common";

export default function ChangePasswordForm() {
    const [fields, setFields] = useState({});
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const handleChange = (e, field) => {
        setFields({ ...fields, [field]: e.target.value });
    }
    const handleValidation = () => {
        let errors = {};
        let formIsValid = true;
        if (!fields["current_password"]) {
            formIsValid = false;
            errors["current_password"] = "Please enter current password.";
        }
        if (!fields["new_password"]) {
            formIsValid = false;
            errors["new_password"] = "Please enter new password.";
        }
        if (fields["new_password"] && (fields["new_password"] !== fields["confirm_password"])) {
            formIsValid = false;
            errors["confirm_password"] = "Your password does not match.";
        }
        setErrors(errors);
        return formIsValid;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            setSubmitted(true);
            let REQUEST_URI = common.apiPath(`/admin/settings/change-password`);
            let REQUEST_METHOD = 'PUT';
            const response = await fetch(REQUEST_URI, {
                method: REQUEST_METHOD,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(fields)
            });
            const data = await response.json();
            if (data.success) {
                setSubmitted(false);
                toast.success(data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
            else {
                setErrors(data.message)
                setSubmitted(false);
            }
        }
    }
    return (
        <Card>
            <Form onSubmit={handleSubmit}>
                <Card.Body>
                    <Card.Title><h3>Change Password</h3></Card.Title>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Current Password"
                        className="mb-3"
                    >
                        <Form.Control
                            type="password"
                            name="current_password"
                            placeholder="current_password"
                            onChange={(event) => handleChange(event, "current_password")}
                            isInvalid={!!errors.current_password}
                        />
                        <Form.Control.Feedback type="invalid">{errors.current_password}</Form.Control.Feedback>
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
                            onChange={(event) => handleChange(event, "new_password")}
                            isInvalid={!!errors.new_password}
                        />
                        <Form.Control.Feedback type="invalid">{errors.new_password}</Form.Control.Feedback>
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
                            onChange={(event) => handleChange(event, "confirm_password")}
                            isInvalid={!!errors.confirm_password}
                        />
                        <Form.Control.Feedback type="invalid">{errors.confirm_password}</Form.Control.Feedback>
                    </FloatingLabel>
                </Card.Body>
                <Card.Footer className='text-end pe-4'>
                    <Button
                        variant="success"
                        type="submit"
                        disabled={submitted}
                        size='lg'
                    >
                        {submitted && (
                            <Spinner
                                size="sm"
                                variant="light"
                                className="me-1"
                            />
                        )}
                        Save
                    </Button>
                </Card.Footer>
            </Form>
        </Card>
    )
}
