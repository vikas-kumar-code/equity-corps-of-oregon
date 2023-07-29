"use client"
import React, { useState, useEffect } from 'react'
import { Card, Spinner, FloatingLabel, Form, Button } from "react-bootstrap"

export default function ChangePasswordForm() {
    const [fields, setFields] = useState({ status: 1 });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const handleChange = (e, field) => {
        setFields({ ...fields, [field]: e.target.value });
    }
    return (
        <Card>
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
                        value={fields.current_password ? fields.current_password : ''}
                    />
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
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
            <Card.Footer className='text-end'>

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
        </Card>
    )
}
