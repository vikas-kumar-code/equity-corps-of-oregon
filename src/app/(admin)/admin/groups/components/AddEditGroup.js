"use client";
import React, { useState, useEffect } from "react";
import { Button, Modal, Spinner, FloatingLabel, Form } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";
import common from "@/utils/common";
import { toast } from "react-toastify";
LoadingOverlay.propTypes = undefined;

export default function AddEditGroup({
  recordId,
  data,
  showModal,
  closeModal,
}) {
  const [fields, setFields] = useState(data || {});
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (fields?.name) {
      setSubmitted(true);
      let REQUEST_URI = common.apiPath(`/admin/groups/save`);
      let REQUEST_METHOD = "POST";
      if (props.recordId) {
        REQUEST_URI = common.apiPath(`/admin/groups/save/${props.recordId}`);
        REQUEST_METHOD = "PUT";
      }
      await fetch(REQUEST_URI, {
        method: REQUEST_METHOD,
        body: JSON.stringify(fields),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            toast.success(response.message);
            props.closeModal();
            // props.reloadRecords();
          } else if (response.error) {
            toast.error(response.message);
          }
        })
        .catch((error) => {
          toast.error(error.message);
        })
        .finally(() => setSubmitted(false));
    } else {
      setError("Enter valid group name.");
    }
  };

  return (
    <Modal
      show={props.showModal}
      onHide={props.closeModal}
      backdrop="static"
      keyboard={false}
      centered
      size="md"
    >
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Modal.Header closeButton>
          <h3>{props.recordId ? "Update" : "Add"} Group</h3>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId="floatingInput"
            label="Enter group name"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter group name"
              onChange={(event) =>
                setFields({ ...fields, name: event.target.value })
              }
              value={fields.name || ""}
            />
            <Form.Control.Feedback type="invalid" className="d-block">
              {error}
            </Form.Control.Feedback>
          </FloatingLabel>
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
