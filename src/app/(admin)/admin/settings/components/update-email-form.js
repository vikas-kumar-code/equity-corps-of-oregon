"use client"
import React, { useState, useEffect } from 'react'
import { Card, Spinner, FloatingLabel, Form, Button } from "react-bootstrap"

export default function UpdateEmailForm() {
    const [fields, setFields] = useState({ status: 1 });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const handleChange = (e, field) => {
        setFields({ ...fields, [field]: e.target.value });
    }
    return (
        <Card>
            <Card.Body>
                <Card.Title><h3>Update Profile</h3></Card.Title>
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
                        value={fields.name ? fields.name : ''}
                    />
                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
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
                        value={fields.email ? fields.email : ''}
                    />
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
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
