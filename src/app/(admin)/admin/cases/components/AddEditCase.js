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
import AddEditMilestones from "./AddEditMilestones";
import Documents from "./Documents";
import {
  casesSchemaForm1,
  casesSchemaForm2,
  casesSchemaForm3,
  casesSchemaForm4,
} from "@/joi/casesSchema";
import common from "@/utils/common";
import { toast } from "react-toastify";
import CaseActivities from "./CaseActivities";
import AddEditClients from "./AddEditClients";
LoadingOverlay.propTypes = undefined;

export default function AddEditCase(props) {
  const [loader, setLoader] = useState(false);
  const initialValues = {
    title: "",
    case_number: "",
    maximum_compensation: "",
    hourly_rate: "",
    description: "",
    milestones: [
      {
        milestone_date: "",
        comment: "",
      },
    ],
    documents: [],
    logs: [],
    clients: [
      {
        first_name: "",
        last_name: "",
        dob: "",
      },
    ],
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

    // Tab-1 validation
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
    }

    // Tab-2 validation
    else if (activeTab === 2) {
      try {
        await casesSchemaForm2.validateAsync(fields, {
          abortEarly: false,
          allowUnknown: true,
        });
        setActiveTab(3);
      } catch (error) {
        console.log(error.message);
        let errors = common.getErrors(error);
        if (typeof errors === "object") {
          setErrors(errors);
        } else {
          toast.error(errors);
        }
      }
    }

    // Tab-3 validation
    else if (activeTab === 3) {
      try {
        await casesSchemaForm3.validateAsync(fields, {
          abortEarly: false,
          allowUnknown: true,
        });
        setActiveTab(4);
      } catch (error) {
        let errors = common.getErrors(error);
        if (typeof errors === "object") {
          setErrors(errors);
        } else {
          toast.error(errors);
        }
      }

      // Tab-4 validation
    } else if (activeTab === 4) {
      setSubmitted(true);
      try {
        await casesSchemaForm4.validateAsync(fields, {
          abortEarly: false,
          allowUnknown: true,
        });

        let REQUEST_URI = common.apiPath(`/admin/cases/save`);
        let REQUEST_METHOD = "POST";
        if (props.recordId) {
          REQUEST_URI = common.apiPath(`/admin/cases/save/${props.recordId}`);
          REQUEST_METHOD = "PUT";
        }
        // Set deleted docs
        let fieldsData =
          deletedDocuments.length > 0
            ? {
                ...fields,
                deleted_documents: deletedDocuments,
              }
            : fields;
        await fetch(REQUEST_URI, {
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
                if ("case_number" in eFileds || "description" in eFileds) {
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

  /*
   * Get case details, clients, documents, ....
   */
  const getRecord = async (id) => {
    setLoader(true);
    fetch(common.apiPath(`/admin/cases/get/${id}`))
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          setFields({ ...initialValues, ...response.data });
        } else if (response.error) {
          toast.error(response.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => setLoader(false));
  };

  const closeModal = () => {
    if (fields?.documents && Array.isArray(fields.documents)) {
      const hasNewDoc = fields.documents.filter((item) => !item.id);
      if (hasNewDoc.length > 0) {
        if (
          confirm(
            "It seems you have uploaded new documents. Please click the save button to save these documents otherwise these files will not be saved."
          )
        ) {
          props.closeModal();
        }
      } else {
        props.closeModal();
      }
    }
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
            onClick={() => setActiveTab(activeTab - 1)}
            className="me-1"
            style={{ width: "auto" }}
          >
            Back
          </Button>
        )}
        {step < 5 && (
          <Button
            size="lg"
            type="submit"
            variant="success"
            disabled={submitted}
          >
            {submitted && <Spinner className="mr-1" color="light" size="sm" />}
            {activeTab === 4 ? " Save" : " Next"}
          </Button>
        )}
      </React.Fragment>
    );
  };
  return (
    <Modal
      show={props.showModal}
      onHide={closeModal}
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
          <Modal.Body className="pt-0">
            <Tabs
              activeKey={activeTab}
              id="justify-tab-example"
              justify
              onSelect={(k) => setActiveTab(parseInt(k))}
            >
              <Tab eventKey={1} title="Basic Details">
                <Row>
                  <Form.Group as={Col} md={12} className="mb-2">
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

                  <Form.Group as={Col} md={4} className="mb-2">
                    <FloatingLabel
                      controlId="floatingInput1"
                      label="Case Number"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        name="case_number"
                        placeholder="case_number"
                        onChange={(event) => {
                          setFields({
                            ...fields,
                            case_number: event.target.value.replace(/ /g, ""),
                          });
                        }}
                        isInvalid={!!errors.case_number}
                        value={fields.case_number ? fields.case_number : ""}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.case_number}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group as={Col} md={4} className="mb-2">
                    <FloatingLabel
                      controlId="floatingInput2"
                      label="Hourly Rate"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        name="hourly_rate"
                        placeholder="Hourly Rate"
                        onChange={(event) =>
                          setFields({
                            ...fields,
                            hourly_rate: event.target.value.replace(
                              /[^0-9.]/,
                              ""
                            ),
                          })
                        }
                        isInvalid={!!errors.hourly_rate}
                        value={fields.hourly_rate}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.hourly_rate}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group as={Col} md={4} className="mb-2">
                    <FloatingLabel
                      controlId="floatingInput2"
                      label="Maximum compensation"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        name="maximum_compensation"
                        placeholder="Maximum compensation"
                        onChange={(event) =>
                          setFields({
                            ...fields,
                            maximum_compensation: common.parseDecimalInput(
                              event.target.value
                            ),
                          })
                        }
                        isInvalid={!!errors.maximum_compensation}
                        value={fields.maximum_compensation}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.maximum_compensation}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>

                  <Form.Group as={Col} md={12}>
                    <FloatingLabel
                      controlId="floatingInput3"
                      label="Description"
                    >
                      <Form.Control
                        as="textarea"
                        name="description"
                        placeholder="Description"
                        onChange={(event) => handleChange(event, "description")}
                        isInvalid={!!errors.description}
                        value={fields.description ? fields.description : ""}
                        style={{ height: 130 }}
                      />
                      <Form.Control.Feedback type="invalid" className="mt-3">
                        {errors.description}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                </Row>
              </Tab>
              <Tab
                eventKey={2}
                title="Clients"
                disabled={activated < 2 && !props.recordId}
              >
                <AddEditClients
                  errors={errors}
                  fields={fields}
                  setFields={setFields}
                  initialValues={initialValues}
                />
              </Tab>
              <Tab
                eventKey={3}
                title="Milestones"
                disabled={activated < 3 && !props.recordId}
              >
                <AddEditMilestones
                  errors={errors}
                  fields={fields}
                  setFields={setFields}
                  initialValues={initialValues}
                />
              </Tab>
              <Tab
                eventKey={4}
                title="Documents"
                disabled={activated < 4 && !props.recordId}
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
                <Tab eventKey={5} title="Case Activities">
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
