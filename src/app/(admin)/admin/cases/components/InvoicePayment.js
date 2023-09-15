import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  FloatingLabel,
  Form,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import "../../../../styles/invoice.css";
import common from "@/utils/common";
import { toast } from "react-toastify";

const InvoicePayment = ({ showModal, closeModal, record, reloadRecords }) => {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [fields, setFields] = useState(record);

  const handleErrors = (errors) => {
    if (typeof errors === "object") {
      setErrors(errors);
    } else if (typeof errors === "string") {
      toast.error(errors);
    } else {
      toast.error("Something went wrong...! please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setErrors({});
    try {
      await fetch(common.apiPath(`/admin/cases/invoice/payment/${fields.id}`), {
        method: "POST",
        body: JSON.stringify({
          total_amount: fields.total_amount,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            toast.success(response.message);
            closeModal();
            reloadRecords();
          } else if (response.error) {
            handleErrors(response.message);
          }
        });
    } catch (e) {
      handleErrors(e.message);
    } finally {
      setSubmitted(false);
    }
  };

  return (
    <Modal
      show={showModal}
      onHide={closeModal}
      backdrop="static"
      keyboard={false}
      centered
      size="sm"
    >
      <Modal.Header closeButton className="border-bottom-0">
        <h5>Invoice Payment</h5>
      </Modal.Header>
      <Modal.Body className="pt-0">
        <Form onSubmit={handleSubmit}>
          <Row className="invoice-fieldset">
            <Col>
              <FloatingLabel label="Pay Amount">
                <Form.Control
                  autoComplete="off"
                  name="description"
                  placeholder="Payment Amount"
                  isInvalid={!!errors.total_amount}
                  value={fields.total_amount}
                  onChange={(event) =>
                    setFields({ ...fields, total_amount: event.target.value })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {errors.total_amount || ""}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
          </Row>
          <div className="text-end mt-3">
            <Button type="button" variant="danger" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit" variant="success" className="ms-2">
              {submitted && (
                <Spinner size="sm" variant="light" className="me-1" />
              )}
              Submit
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default InvoicePayment;
