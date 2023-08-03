"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { Button, Modal, Spinner, FloatingLabel, Form, Row, Col, Tabs, Tab } from "react-bootstrap";
import LoadingOverlay from 'react-loading-overlay';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



export default function AddEditMilestone(props) {
    const [loader, setLoader] = useState(false);
    const [fields, setFields] = useState({});
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleValidation = () => {
        let errors = {};
        let formIsValid = true;
        if (!fields["milestone_date"]) {
            formIsValid = false;
            errors["milestone_date"] = "Please enter date.";
        }
        if (!fields["comment"]) {
            formIsValid = false;
            errors["comment"] = "Please enter comment.";
        }
        setErrors(errors);
        return formIsValid;
    };

    const handleSubmit = () => {
        if (handleValidation()) {
            props.updateMilestones(fields);
        }
    }


    return (
        <Modal
            show={props.showModal}
            onHide={props.closeModal}
            backdrop="static"
            keyboard={false}
            centered
            size="sm"
        >
            <LoadingOverlay
                active={loader}
                spinner
                text="Loading..."
            >
                <Modal.Header closeButton><h3>{props.userId ? 'Update' : 'Add'} Milestone</h3></Modal.Header>
                <Modal.Body>
                    <Row>
                        <Form.Group as={Col} md={12} className='mb-3'>
                            <DatePicker
                                selected={fields.milestone_date}
                                onChange={(date) => setFields({ ...fields, ['milestone_date']: date })}
                                className='form-control w-100 p-4'
                                placeholderText='Choose date'
                                dateFormat={'MM-dd-yyyy'}
                            />
                        </Form.Group>
                        <Form.Group as={Col} md={12} className='mb-2'>
                            <FloatingLabel
                                label="Comment"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    name="comment"
                                    placeholder="comment"
                                    onChange={(event) => setFields({ ...fields, ['comment']: event.target.value })}
                                    isInvalid={!!errors.comment}
                                    value={fields.comment ? fields.comment : ''}
                                />
                                <Form.Control.Feedback type="invalid">{errors.comment}</Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="danger"
                        type="button"
                        disabled={submitted}
                        onClick={props.closeModal}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="success"
                        type="button"
                        disabled={submitted}
                        onClick={handleSubmit}
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
            </LoadingOverlay>
        </Modal>
    )
}


