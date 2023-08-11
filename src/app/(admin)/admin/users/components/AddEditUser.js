"use client"

import React, { useState, useEffect } from 'react'
import { Button, Modal, Spinner, FloatingLabel, Form, Row, Col } from "react-bootstrap";
import LoadingOverlay from 'react-loading-overlay';
import common from "@/utils/common";
LoadingOverlay.propTypes = undefined

export default function AddEditUser(props) {
    const [loader, setLoader] = useState(false);
    const [fields, setFields] = useState({ status: 1 });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [roles, setRoles] = useState([]);

    const handleChange = (e, field) => {
        if (field === 'is_admin') {
            if (e.target.checked) {
                setFields({ ...fields, ['is_admin']: 1 });
            }
            else {
                setFields({ ...fields, ['is_admin']: 0 });
            }
        }
        else {
            setFields({ ...fields, [field]: e.target.value });
        }
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
        if (!props.userId) {
            if (!fields["password"]) {
                formIsValid = false;
                errors["password"] = "Please enter password.";
            }
        }
        if (fields["password"] && (fields["password"] !== fields["confirm_password"])) {
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
            let REQUEST_URI = common.apiPath(`/admin/users/save/`);
            let REQUEST_METHOD = 'POST';
            if (props.userId) {
                REQUEST_URI = common.apiPath(`/admin/users/save/${props.userId}`);;
                REQUEST_METHOD = 'PUT';
            }
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
                props.closeModal();
                props.reloadeUsers();
            }
            else {
                setSubmitted(false);
            }
        }
    }

    const getUser = async (userId) => {
        setLoader(true);
        const response = await fetch(common.apiPath(`/admin/users/save/${props.userId}`), {
            method: 'GET'
        });
        const data = await response.json();
        if (data.success) {
            setLoader(false);
            setFields(data.user)
        }
    }
    const getRoles = async () => {
        const response = await fetch(common.apiPath(`/admin/roles`), {
            method: 'GET'
        });
        const data = await response.json();
        if (data.success) {
            setRoles(JSON.parse(data.records))
        }
    }
    useEffect(() => {
        if (props.userId) {
            getUser(props.userId);
        }
        getRoles();
    }, [])
    return (
        <Modal
            show={props.showModal}
            onHide={props.closeModal}
            backdrop="static"
            keyboard={false}
            centered
            size="md"
        >
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton><h3>{props.userId ? 'Update' : 'Add'} User</h3></Modal.Header>
                <Modal.Body>
                    <LoadingOverlay
                        active={loader}
                        spinner
                        text="Loading..."
                    >
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Name"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="name"
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
                                placeholder="email"
                                onChange={(event) => handleChange(event, "email")}
                                isInvalid={!!errors.email}
                                value={fields.email ? fields.email : ''}
                            />
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Password"
                            className="mb-3"
                        >
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="password"
                                onChange={(event) => handleChange(event, "password")}
                                isInvalid={!!errors.password}
                            />
                            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Confirm Password"
                            className="mb-3"
                        >
                            <Form.Control
                                type="password"
                                name="confirm_password"
                                placeholder="confirm_password"
                                onChange={(event) => handleChange(event, "confirm_password")}
                                isInvalid={!!errors.confirm_password}
                            />
                            <Form.Control.Feedback type="invalid">{errors.confirm_password}</Form.Control.Feedback>
                        </FloatingLabel>
                        <FloatingLabel label="Select Role" className="mb-3" controlId="floatingInput">
                            <Form.Select name="role_id" onChange={(event) => handleChange(event, "role_id")}>
                                <option value="">--Select Role--</option>
                                {roles.map((role, index) => <option value={role.id} key={`role-${index}`}>{role.name}</option>)}
                            </Form.Select>
                        </FloatingLabel>
                        <Form.Label>Status</Form.Label>
                        <div className='ps-2'>
                            <Row>
                                <Col md={3}>
                                    <Form.Check id="active" className='float-left'>
                                        <Form.Check.Input type="radio" name="status" value="1" checked={parseInt(fields.status) === 1} onChange={(event) => handleChange(event, "status")} />
                                        <Form.Check.Label className="ps-0 mt-1">Active</Form.Check.Label>
                                    </Form.Check>
                                </Col>
                                <Col md={3}>
                                    <Form.Check id="inactive" className='float-left'>
                                        <Form.Check.Input type="radio" name="status" value="0" checked={parseInt(fields.status) === 0} onChange={(event) => handleChange(event, "status")} />
                                        <Form.Check.Label className="ps-0">In Active</Form.Check.Label>
                                    </Form.Check>
                                </Col>
                            </Row>
                        </div>

                    </LoadingOverlay>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="danger"
                        type="button"
                        disabled={submitted}
                        onClick={props.closeModal}
                        size='lg'
                    >
                        Cancel
                    </Button>
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
                        Submit
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}


