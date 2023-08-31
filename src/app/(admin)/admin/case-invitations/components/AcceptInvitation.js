"use client";

import React, { useState } from "react";
import { Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import common from "@/utils/common";
import { IoCheckmarkCircle } from "react-icons/io5";
import "../../../../styles/animation.css";
import LoadingOverlay from "react-loading-overlay";
import "../style.css";
import Joi, { object } from "joi";

export default function AcceptInvitation({
  showModal,
  closeModal,
  record,
  reloadRecords = () => null,
}) {
  const [errors, setErrors] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fields, setFields] = useState({
    id: record.id,
    accept: 0,
    first_name: record?.first_name || "",
    last_name: record?.first_name || "",
    contract: record?.contract || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setErrors({});
    try {
      const schema = Joi.object({
        accept: Joi.number().min(1).required(),
        first_name: Joi.string().max(100).required(),
        last_name: Joi.string().max(100).required(),
      });
      await schema.validateAsync(fields, {
        abortEarly: false,
        allowUnknown: true,
      });
      await fetch(common.apiPath(`/admin/cases/invitations/accept`), {
        method: "POST",
        body: JSON.stringify(fields),
      })
        .then((response) => response.json())
        .then((response) => {
          setSubmitted(false);
          if (response.success) {
            toast.success(response.message);
            closeModal();
            reloadRecords();
          } else if (response.error) {
            if (typeof response.message === "object") {
              setErrors(response.message);
            } else {
              toast.error(response.message);
            }
          }
        });
    } catch (error) {
      console.log(error);
      setSubmitted(false);
      let errs = common.getErrors(error);
      console.log(errs);
      if (typeof errs === "object") {
        setErrors(errs);
      } else {
        toast.error(errs);
      }
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
      <Modal.Header closeButton className="border-bottom-0">
        <h3>Case Invitation</h3>
      </Modal.Header>
      <Modal.Body className="show-error pt-0">
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={12}>
              <div className="contract-box">
                <div
                  dangerouslySetInnerHTML={{ __html: fields.contract }}
                ></div>
              </div>
            </Col>
            <Col md={12} className="pt-2">
              <Form.Check
                className="ms-1"
                type="checkbox"
                id="checkbox-contract"
                label="I have read the above contract and accepted."
                onChange={(e) => {
                  setFields({ ...fields, accept: e.target?.checked ? 1 : 0 });
                }}
              />
              {errors.accept && (
                <Form.Control.Feedback type="invalid">
                  Acceptence is required.
                </Form.Control.Feedback>
              )}
            </Col>
            <Col md={6}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  isInvalid={!!errors.first_name}
                  value={fields.first_name}
                  onChange={(e) =>
                    setFields({ ...fields, first_name: e.target.value })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {errors.first_name}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  isInvalid={!!errors.last_name}
                  value={fields.last_name}
                  onChange={(e) =>
                    setFields({ ...fields, last_name: e.target.value })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {errors.last_name}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <div className="text-end show-up-animation">
            <Button
              variant="danger"
              className="me-2"
              onClick={() => closeModal()}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {submitted && (
                <Spinner className="me-1" color="light" size="sm" />
              )}
              Accept
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
