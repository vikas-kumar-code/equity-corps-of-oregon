"use client";
import React, { useState } from "react";
import { Button, Modal, Spinner, FloatingLabel, Form } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";
import common from "@/utils/common";
import { toast } from "react-toastify";
LoadingOverlay.propTypes = undefined;

export default function AddEditGroup({ data, showModal, closeModal }) {
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
      if (data?.id) {
        REQUEST_URI = common.apiPath(`/admin/groups/save/${data?.id}`);
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
            closeModal();
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
      show={showModal}
      onHide={closeModal}
      backdrop="static"
      keyboard={false}
      centered
      size="md"
    >
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Modal.Header closeButton>
          <h3>{data?.id ? "Update" : "Add"} Group</h3>
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

          <FloatingLabel
            controlId="floatingInput"
            label="Enter short description (optional)"
            className="mb-3"
          >
            <Form.Control
              as="textarea"
              style={{height:100}}
              rows={6}
              name="description"
              placeholder="Enter short description (optional)"
              onChange={(event) =>
                setFields({ ...fields, description: event.target.value })
              }
              value={fields.description || ""}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            type="button"
            disabled={submitted}
            onClick={closeModal}
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
