"use client"

import React, { useState, useEffect } from 'react'
import { Button, Modal, Spinner, FloatingLabel, Form, Row, Col } from "react-bootstrap";
import LoadingOverlay from 'react-loading-overlay';
import { toast } from 'react-toastify';
export default function AddEditRole(props) {
    const [loader, setLoader] = useState(false);
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
        setErrors(errors);
        return formIsValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            setSubmitted(true);
            let REQUEST_URI = `${process.env.NEXT_PUBLIC_API_URL}/api/roles`;
            let REQUEST_METHOD = 'POST';
            if (props.recordId) {
                REQUEST_URI = `${process.env.NEXT_PUBLIC_API_URL}/api/roles/${props.recordId}`;
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
                props.closeModal();
                props.reloadeRecords();
                toast.success(data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
            else if (data.error) {
                setErrors(data.message)
            }
            else {
                console.log(data)
            }
            setSubmitted(false);
        }
    }

    const getRole = async () => {
        setLoader(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/roles/${props.recordId}`, {
            method: 'GET'
        });
        const data = await response.json();
        if (data.success) {
            setLoader(false);
            setFields(data.record)
        }
    }
    useEffect(() => {
        if (props.recordId) {
            getRole();
        }
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
                <Modal.Header closeButton><h3>{props.recordId ? 'Update' : 'Add'} Role</h3></Modal.Header>
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


