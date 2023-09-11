import { invoiceSchema } from "@/joi/casesSchema";
import common from "@/utils/common";
import validateAsync from "@/utils/validateAsync";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  Modal,
  Button,
  Row,
  Col,
  Form,
  FloatingLabel,
} from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";
import { toast } from "react-toastify";
import ListInvoice from "./ListInvoice";

const AddEditInvoice = ({ showModal, closeModal, caseId }) => {
  const initialValues = [{ description: "", amount: "" }];
  const [errors, setErrors] = useState({});
  const [fields, setFields] = useState(initialValues);
  let fieldsData = [...fields];
  const [loader, setLoader] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [udpateId, setUpdateId] = useState(null);

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
    setErrors({});
    const validated = await validateAsync(invoiceSchema, fields, {
      errorKey: true,
    });

    if (validated.errors) {
      handleErrors(validated.errors);
      console.log(validated.errors);
    } else {
      setSubmitted(true);
      let REQUEST_URI = common.apiPath("/admin/cases/invoice/save");
      let REQUEST_METHOD = "POST";
      if (udpateId) {
        REQUEST_URI = common.apiPath(`/admin/cases/invoice/save/${udpateId}`);
        REQUEST_METHOD = "PUT";
      }
      fetch(REQUEST_URI, {
        method: REQUEST_METHOD,
        body: JSON.stringify({ case_id: caseId, particulars: fields }),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            toast.success(response.message);
            closeModal();
          } else if (response.error) {
            handleErrors(response.message);
          }
        })
        .catch((error) => {
          toast.error(error.message);
        })
        .finally(() => setSubmitted(false));
    }
  };

  const addFieldSet = () => {
    setFields([...fields, initialValues[0]]);
  };

  const removeFieldSet = (index) => {
    setFields(fields.filter((value, i) => i !== index));
  };

  useEffect(() => {
    console.log(fields);
  }, [fields]);

  return (
    <Modal
      show={showModal}
      onHide={closeModal}
      backdrop="static"
      keyboard={false}
      centered
      size="lg"
    >
      <Modal.Header closeButton className="border-bottom-0">
        <h3>Invoice</h3>
      </Modal.Header>
      <Modal.Body>
        <LoadingOverlay active={loader} spinner text="Loading...">
          <h5 className="text-gray">Add Invoice</h5>
          <Form onSubmit={handleSubmit}>
            {fields?.map((item, index) => {
              return (
                <Row>
                  <Col md={8}>
                    <FloatingLabel label="Description" className="mb-3">
                      <Form.Control
                        as="textarea"
                        row={1}
                        name="description"
                        placeholder="Description"
                        isInvalid={!!errors[index + "description"]}
                        value={item.description}
                        onChange={(event) => {
                          fieldsData[index].description = event.target.value;
                          setFields(fieldsData);
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors[index + "description"] || ""}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Col>
                  <Col md={4} className="position-relative">
                    <FloatingLabel label="Amount" className="mb-3">
                      <Form.Control
                        row={1}
                        name="amount"
                        placeholder="Amount"
                        isInvalid={!!errors[index + "description"]}
                        value={item.amount || ""}
                        onChange={(event) => {
                          fieldsData[index].amount = event.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          setFields(fieldsData);
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors[index + "amount"] || ""}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                    {index >= 1 && (
                      <Button
                        key={index}
                        variant="secondary"
                        size="sm"
                        className="q-opt-remove btn-close"
                        onClick={() => removeFieldSet(index)}
                        style={{ right: 22 }}
                      />
                    )}
                  </Col>
                </Row>
              );
            })}
            <div className="text-end">
              <Button variant="primary" onClick={() => addFieldSet()}>
                Add More
              </Button>
              <Button variant="success" type="submit" className="ms-2">
                Submit
              </Button>
            </div>
          </Form>
          <ListInvoice />
        </LoadingOverlay>
      </Modal.Body>
    </Modal>
  );
};

export default AddEditInvoice;
