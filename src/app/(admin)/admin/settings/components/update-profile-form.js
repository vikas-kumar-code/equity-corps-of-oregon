"use client"
import React, { useState, useEffect } from 'react'
import { Card, Spinner, FloatingLabel, Form, Button } from "react-bootstrap"
import { toast } from 'react-toastify';
import common from "@/utils/common";

export default function UpdateProfileForm() {
    const [fields, setFields] = useState({ status: 1 });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const handleChange = (e, field) => {
        setFields({ ...fields, [field]: e.target.value });
    }
    const handleValidation = () => {
        let errors = {};
        let formIsValid = true;
        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = "Please enter name.";
        }
        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "Please enter email.";
        }
        setErrors(errors);
        return formIsValid;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            setSubmitted(true);
            let REQUEST_URI = common.apiPath(`/admin/settings/update-profile`);
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

    const getProfile = async () => {
        let REQUEST_URI = common.apiPath(`/admin/settings/update-profile`);;
        let REQUEST_METHOD = 'GET';
        const response = await fetch(REQUEST_URI, {
            method: REQUEST_METHOD,
            headers: {
                "Content-Type": "application/json",
            }
        });
        const data = await response.json();
        if (data.success) {
            setFields(data.record);
        }
    }

    useEffect(() => {
        getProfile();
    }, []);
    return (
        <Card>
            <Form onSubmit={handleSubmit}>
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
                <Card.Footer className='text-end  pe-4'>

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
