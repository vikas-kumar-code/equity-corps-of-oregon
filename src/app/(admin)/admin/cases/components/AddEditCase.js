"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { Button, Modal, Spinner, FloatingLabel, Form, Row, Col, Tabs, Tab } from "react-bootstrap";
import LoadingOverlay from 'react-loading-overlay';
import dynamic from "next/dynamic";
import { TagsInput } from "react-tag-input-component";
import Milestones from './Milestones';
import Documents from './Documents';


export default function AddEditCase(props) {
    //const Editor = dynamic(() => import("../../../components/Editor"), { ssr: false });
    const [loader, setLoader] = useState(false);
    const [fields, setFields] = useState({ milestones: [] });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [belongsTo, setBelongsTo] = useState(["Vikas kumar"]);
    const [activeTab, setActiveTab] = useState("1")
    const [description, setDescription] = useState("");
    //const [milestones, setMilestones] = useState([]);

    const handleChange = (e, field) => {
        setFields({ ...fields, [field]: e.target.value });
    }
    const handleDescription = useCallback((description) => {
        setDescription(description)
    }, [description])

    const handleValidation = () => {
        let errors = {};
        let formIsValid = true;
        if (parseInt(activeTab) === 1) {
            if (!fields["case_number"]) {
                formIsValid = false;
                errors["case_number"] = "Please case number.";
            }
            if (!fields["title"]) {
                formIsValid = false;
                errors["title"] = "Please enter case title.";
            }
            if (!fields["description"]) {
                formIsValid = false;
                errors["description"] = "Please enter case description.";
            }
            if (formIsValid) {
                setActiveTab('2')
            }
            setErrors(errors);
        }
        else if (parseInt(activeTab) === 2) {
            formIsValid = true;
            if (fields.milestones.length === 0) {
                formIsValid = false;
                errors["milestone"] = "Please add milestone.";
            }
            if (formIsValid) {
                setActiveTab('3')
            }
            setErrors(errors);
        }
        return formIsValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            setSubmitted(true);
            let REQUEST_URI = `${process.env.NEXT_PUBLIC_API_URL}/api/users/save`;
            let REQUEST_METHOD = 'POST';
            if (props.userId) {
                REQUEST_URI = `${process.env.NEXT_PUBLIC_API_URL}/api/users/save/${props.userId}`;
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/save/${props.userId}`, {
            method: 'GET'
        });
        const data = await response.json();
        if (data.success) {
            setLoader(false);
            setFields(data.user)
        }
    }

    useEffect(() => {
        if (props.userId) {
            getUser(props.userId);
        }
        console.log(fields)
    }, [fields])

    const renderButtons = (step) => {
        return (
            <React.Fragment>
                {step > 1 && (
                    <Button
                        size="lg"
                        variant="secondary"
                        onClick={() => {
                            setActiveTab((parseInt(activeTab)) - 1)
                        }}
                        className="me-1"
                        style={{ width: "auto" }}
                    >
                        Back
                    </Button>
                )}

                <Button
                    size='lg'
                    type="submit"
                    variant="success"
                    disabled={submitted}
                >
                    {submitted && (
                        <Spinner className="mr-1" color="light" size="sm" />
                    )}
                    {parseInt(activeTab) === 3 ? "Save" : "Next"}
                </Button>
            </React.Fragment>
        );
    };
    return (
        <Modal
            show={props.showModal}
            onHide={props.closeModal}
            backdrop="static"
            keyboard={false}
            centered
            size="lg"
        >
            <Form onSubmit={handleSubmit}>
                <LoadingOverlay
                    active={loader}
                    spinner
                    text="Loading..."
                >
                    <Modal.Header closeButton className='border-bottom-0'><h3>{props.userId ? 'Update' : 'Add'} Case</h3></Modal.Header>
                    <Modal.Body>
                        <Tabs
                            activeKey={activeTab}
                            id="justify-tab-example"
                            className="mb-3"
                            justify
                            onSelect={(k) => setActiveTab(k)}
                        >
                            <Tab eventKey="1" title="Basic Details">
                                <Row>
                                    <Form.Group as={Col} md={6} className='mb-2'>
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Case Number"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                type="text"
                                                name="case_number"
                                                placeholder="case_number"
                                                onChange={(event) => handleChange(event, "case_number")}
                                                isInvalid={!!errors.case_number}
                                                value={fields.case_number ? fields.case_number : ''}
                                            />
                                            <Form.Control.Feedback type="invalid">{errors.case_number}</Form.Control.Feedback>
                                        </FloatingLabel>
                                    </Form.Group>
                                    <Form.Group as={Col} md={6} className='mb-2'>
                                        <FloatingLabel
                                            label="Title"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                type="text"
                                                name="title"
                                                placeholder="title"
                                                onChange={(event) => handleChange(event, "title")}
                                                isInvalid={!!errors.title}
                                                value={fields.title ? fields.title : ''}
                                            />
                                            <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                                        </FloatingLabel>
                                    </Form.Group>
                                    <Form.Group as={Col} md={12} className='mb-4'>
                                        <Form.Label>Case Belongs To</Form.Label>
                                        <TagsInput
                                            value={belongsTo}
                                            onChange={setBelongsTo}
                                            name="fruits"
                                            placeHolder="Enter Name Of Person Who Belongs To This Case."
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} md={12} className='mb-2'>
                                        {/* <Editor
                                            value={description}
                                            handleDescription={handleDescription}
                                        /> */}
                                        <FloatingLabel
                                            label="Description"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                as="textarea"
                                                name="description"
                                                placeholder="description"
                                                onChange={(event) => handleChange(event, "description")}
                                                isInvalid={!!errors.description}
                                                value={fields.description ? fields.description : ''}
                                                style={{ height: 250 }}
                                            />
                                            <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                                        </FloatingLabel>
                                    </Form.Group>
                                </Row>
                            </Tab>
                            <Tab eventKey="2" title="Milestones" disabled>
                                <Milestones errors={errors} milestones={fields.milestones} updateMilestones={(milestones) => setFields({ ...fields, milestones })} />
                            </Tab>
                            <Tab eventKey="3" title="Documents" disabled>
                                <Documents />
                            </Tab>
                        </Tabs>
                    </Modal.Body>
                    <Modal.Footer>
                        {renderButtons(activeTab)}
                    </Modal.Footer>
                </LoadingOverlay>
            </Form>
        </Modal>
    )
}


