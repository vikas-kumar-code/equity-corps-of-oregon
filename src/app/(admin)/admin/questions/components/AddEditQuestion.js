"use client";

import common from "@/utils/common";
import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Spinner,
  FloatingLabel,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";
import { toast } from "react-toastify";
LoadingOverlay.propTypes = undefined;

export default function AddEditQuestion(props) {
  const [loader, setLoader] = useState(false);
  const initialValues = {
    question: "",
    options: ["", ""],
    answer: null,
  };
  const [fields, setFields] = useState(initialValues);
  let allOptions = fields.options;
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setErrors({});
    let REQUEST_URI = common.apiPath("/admin/questions/save");
    let REQUEST_METHOD = "POST";
    if (props.recordId) {
      REQUEST_URI = common.apiPath(`/admin/questions/save/${props.recordId}`);
      REQUEST_METHOD = "PUT";
    }
    fetch(REQUEST_URI, { method: REQUEST_METHOD, body: JSON.stringify(fields) })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          toast.success(response.message);
          props.closeModal();
          props.reloadRecords();
          setFields(initialValues);
        } else if (response.error) {
          if (typeof response.message === "object") {
            setErrors(response.message);
          } else {
            toast.error(response.message);
          }
        }
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => setSubmitted(false));
  };

  const addOption = () => {
    setFields({ ...fields, options: [...fields.options, ""] });
  };

  const removeOption = (index) => {
    setFields({
      ...fields,
      options: fields.options.filter((value, i) => i !== index),
    });
  };

  const getQuestion = async (id) => {
    setLoader(true);
    fetch(common.apiPath(`/admin/questions/get/${props.recordId}`))
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
      getQuestion(props.userId);
    }
  }, [props.showModal]);

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
        <Modal.Header closeButton>
          <h3>{props.recordId ? "Update" : "Add New"} Question</h3>
        </Modal.Header>
        <Modal.Body>
          <LoadingOverlay active={loader} spinner text="Loading...">
            <FloatingLabel label="Question" className="mb-3">
              <Form.Control
                as="textarea"
                row={3}
                name="question"
                placeholder="Question"
                onChange={(event) =>
                  setFields({ ...fields, question: event.target.value })
                }
                isInvalid={!!errors?.question}
                value={fields?.question || ""}
                className="textdarea-height-2"
              />
              <Form.Control.Feedback type="invalid">
                {errors?.question}
              </Form.Control.Feedback>
            </FloatingLabel>
            {fields.options.map((value, index) => (
              <FloatingLabel
                key={index}
                label={`Option ${index + 1}`}
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="option"
                  placeholder="option"
                  onChange={(event) => {
                    allOptions[index] = event.target.value;
                    setFields({ ...fields, options: allOptions });
                  }}
                  isInvalid={!!errors["options" + index]}
                  value={fields.options[index]}
                />
                <Form.Control.Feedback type="invalid">
                  {errors["options" + index] || ""}
                </Form.Control.Feedback>
                {index > 1 && (
                  <Button
                    key={index}
                    variant="secondary"
                    size="sm"
                    className="q-opt-remove btn-close"
                    onClick={() => removeOption(index)}
                    style={{ top: 17 }}
                  />
                )}
              </FloatingLabel>
            ))}
            <div className="text-end">
              <Button variant="primary" size="sm" onClick={() => addOption()}>
                Add More
              </Button>
            </div>
            <Form.Label>Correct Answer</Form.Label>
            <div className="ps-2 mb-2">
              <Row className={!!errors?.answer ? "show-error  " : ""}>
                {fields.options.map((ans, index) => (
                  <Col md={3} key={index}>
                    <Form.Check
                      id={`option_id_${index}`}
                      className="float-left"
                    >
                      <Form.Check.Input
                        type="radio"
                        name="answer"
                        value={true}
                        checked={fields.answer - 1 === index}
                        onChange={() =>
                          setFields({ ...fields, answer: index + 1 })
                        }
                      />
                      <Form.Check.Label className="ps-0 mt-1">
                        Option {index + 1}
                      </Form.Check.Label>
                    </Form.Check>
                  </Col>
                ))}
                <Form.Control.Feedback type="invalid">
                  {errors.answer}
                </Form.Control.Feedback>
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
            size="lg"
          >
            Cancel
          </Button>
          <Button
            variant="success"
            type="submit"
            disabled={submitted}
            size="lg"
          >
            {submitted && (
              <Spinner size="sm" variant="light" className="me-1" />
            )}
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
