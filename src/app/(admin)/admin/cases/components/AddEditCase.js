"use client";

import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Spinner,
  FloatingLabel,
  Form,
  Row,
  Col,
  Tabs,
  Tab,
} from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";
import { TagsInput } from "react-tag-input-component";
import Milestones from "./Milestones";
import Documents from "./Documents";
import {
  casesSchemaForm1,
  casesSchemaForm2,
  casesSchemaForm3,
} from "@/joi/casesSchema";
import common from "@/utils/common";
import { toast } from "react-toastify";
import CaseActivities from "./CaseActivities";
LoadingOverlay.propTypes = undefined;

export default function AddEditCase(props) {
  const [loader, setLoader] = useState(false);
  const initialValues = {
    id: props.recordId,
    case_number: "",
    title: "",
    belongs_to: [],
    description: "",
    milestones: [],
    documents: [],
    logs: [],
  };
  const [fields, setFields] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [activated, setActivated] = useState(1);
  const [deletedDocuments, setDeletedDocuments] = useState([]);

  const handleChange = (e, field) => {
    setFields({ ...fields, [field]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    // Validate fields
    if (activeTab === 1) {
      try {
        await casesSchemaForm1.validateAsync(fields, {
          abortEarly: false,
          allowUnknown: true,
        });
        setActiveTab(2);
      } catch (error) {
        let errors = common.getErrors(error);
        if (typeof errors === "object") {
          setErrors(errors);
        } else {
          toast.error(errors);
        }
      }
    } else if (activeTab === 2) {
      try {
        await casesSchemaForm2.validateAsync(fields, {
          abortEarly: false,
          allowUnknown: true,
        });
        setActiveTab(3);
      } catch (error) {
        let errors = common.getErrors(error);
        if (typeof errors === "object") {
          setErrors(errors);
        } else {
          toast.error(errors);
        }
      }
    } else if (activeTab === 3) {
      setSubmitted(true);
      try {
        await casesSchemaForm3.validateAsync(fields, {
          abortEarly: false,
          allowUnknown: true,
        });

        // Set deleted docs
        let fieldsData =
          deletedDocuments.length > 0
            ? { ...fields, deleted_documents: deletedDocuments }
            : {...fields};

        let REQUEST_URI = `/admin/cases/create`;
        let REQUEST_METHOD = "POST";
        if (props.recordId) {
          REQUEST_URI = `/admin/cases/update`;
          REQUEST_METHOD = "PUT";  
        }
        
        await fetch(common.apiPath(REQUEST_URI), {
          method: REQUEST_METHOD,
          body: JSON.stringify(fieldsData),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((response) => {
            // setSubmitted(false);
            if (response.success) {
              toast.success(response.message);
              props.closeModal();
              props.reloadRecords();
              setFields(initialValues);
            } else if (response.error) {
              if (typeof response.message === "object") {
                setErrors(response.message);
                const eFileds = response.message;
                if (
                  "case_number" in eFileds ||
                  "belongs_to" in eFileds ||
                  "description" in eFileds
                ) {
                  setActiveTab(1);
                } else if ("milestones" in eFileds) {
                  setActiveTab(2);
                } else if ("documents" in eFileds) {
                  setActiveTab(3);
                }
              } else {
                toast.error(response.message);
              }
            }
          });
      } catch (error) {
        let errors = common.getErrors(error);
        if (typeof errors === "object") {
          setErrors(errors);
        } else {
          toast.error(errors);
        }
        console.log(errors);
      } finally {
        setSubmitted(false);
      }
    }
  };

  const getRecord = async (id) => {
    setLoader(true);
    fetch(common.apiPath(`/admin/cases/get/${props.recordId}`))
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          setFields(response.data);
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
    if (props.recordId && props.showModal) {
      getRecord(props.recordId);
    }
  }, [props.showModal]);

  useEffect(() => {
    if (activeTab > activated) {
      setActivated(activeTab);
    }
  }, [activeTab]);

  const renderButtons = (step) => {
    return (
      <React.Fragment>
        {step > 1 && (
          <Button
            size="lg"
            variant="secondary"
            onClick={() => {
              setActiveTab(activeTab - 1);
            }}
            className="me-1"
            style={{ width: "auto" }}
          >
            Back
          </Button>
        )}
        {step < 4 && (
          <Button
            size="lg"
            type="submit"
            variant="success"
            disabled={submitted}
          >
            {submitted && <Spinner className="mr-1" color="light" size="sm" />}
            {activeTab === 3 ? " Save" : " Next"}
          </Button>
        )}
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
        <LoadingOverlay active={loader} spinner text="Loading...">
          <Modal.Header closeButton className="border-bottom-0">
            <h3>{props.recordId ? "Update" : "Add New"} Case</h3>
          </Modal.Header>
          <Modal.Body>
            <Tabs
              activeKey={activeTab}
              id="justify-tab-example"
              justify
              onSelect={(k) => setActiveTab(parseInt(k))}
            >
              <Tab eventKey={1} title="Basic Details">
                <Row>
                  <Form.Group as={Col} md={6} className="mb-2">
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
                        value={fields.case_number ? fields.case_number : ""}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.case_number}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group as={Col} md={6} className="mb-2">
                    <FloatingLabel label="Title" className="mb-3">
                      <Form.Control
                        type="text"
                        name="title"
                        placeholder="title"
                        onChange={(event) => handleChange(event, "title")}
                        isInvalid={!!errors.title}
                        value={fields.title ? fields.title : ""}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.title}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group as={Col} md={12} className="mb-4 show-error">
                    <Form.Label>Case Belongs To</Form.Label>
                    <TagsInput
                      value={fields.belongs_to}
                      onChange={(tags) =>
                        setFields({ ...fields, belongs_to: tags })
                      }
                      name="fruits"
                      placeHolder="Enter Name Of Person Who Belongs To This Case."
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.belongs_to}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md={12} className="mb-2">
                    <FloatingLabel label="Description" className="mb-3">
                      <Form.Control
                        as="textarea"
                        name="description"
                        placeholder="description"
                        onChange={(event) => handleChange(event, "description")}
                        isInvalid={!!errors.description}
                        value={fields.description ? fields.description : ""}
                        style={{ height: 250 }}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.description}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                </Row>
              </Tab>
              <Tab
                eventKey={2}
                title="Milestones"
                disabled={activated < 2 && !props.recordId}
              >
                <Milestones
                  errors={errors}
                  setErrors={setErrors}
                  milestones={fields?.milestones || []}
                  updateMilestones={(milestones) =>
                    setFields({
                      ...fields,
                      milestones: milestones,
                    })
                  }
                />
              </Tab>
              <Tab
                eventKey={3}
                title="Documents"
                disabled={activated < 3 && !props.recordId}
              >
                <Documents
                  updateDocuments={(documents) =>
                    setFields({ ...fields, documents: documents })
                  }
                  setDeletedDocument={(doc) => {
                    setDeletedDocuments([...deletedDocuments, doc]);
                  }}
                  documents={fields.documents}
                  errors={errors}
                  setErrors={setErrors}
                />
              </Tab>
              {props.recordId && (
                <Tab eventKey={4} title="Case Activities">
                  <CaseActivities logs={fields?.logs || []} />
                </Tab>
              )}
            </Tabs>
          </Modal.Body>
          <Modal.Footer>{renderButtons(activeTab)}</Modal.Footer>
        </LoadingOverlay>
      </Form>
    </Modal>
  );
}
