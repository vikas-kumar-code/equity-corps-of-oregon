import { invoiceSchema } from "@/joi/casesSchema";
import common from "@/utils/common";
import validateAsync from "@/utils/validateAsync";
import React, { useState } from "react";
import {
  Modal,
  Button,
  Row,
  Col,
  Form,
  FloatingLabel,
  Spinner,
} from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";
import { toast } from "react-toastify";
import ListInvoices from "./ListInvoices";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ViewInvoice from "../../cases/components/ViewInvoice";

const AddEditInvoice = ({ showModal, closeModal, record, reloadRecords }) => {
  const initialValues = {
    due_on: "",
    particulars: [{ description: "", amount: "" }],
  };
  const [errors, setErrors] = useState({});
  const [fields, setFields] = useState(initialValues);
  let fieldsData = { ...fields };
  const [loader, setLoader] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [records, setRecords] = useState([]);
  const [showInvoice, setShowInvoice] = useState(null);
  const [refreshInvoices, setRefreshInvoices] = useState(true);

  const refreshListInvoices = () => {
    setRefreshInvoices(!refreshInvoices);
  };

  const handleErrors = (errors) => {
    if (typeof errors === "object") {
      setErrors(errors);
    } else if (typeof errors === "string") {
      toast.error(errors);
    } else {
      toast.error("Something went wrong...! please try again.");
    }
  };

  const setNoError = async (field) => {
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const validated = await validateAsync(invoiceSchema, fields, {
      removeString: "particulars",
    });
    if (validated.errors) {
      handleErrors(validated.errors);
    } else {
      setSubmitted(true);
      let REQUEST_URI = common.apiPath("/admin/cases/invoice/save");
      let REQUEST_METHOD = "POST";
      if (fields.id) {
        REQUEST_URI = common.apiPath(`/admin/cases/invoice/save/${fields.id}`);
        REQUEST_METHOD = "PUT";
      }
      fetch(REQUEST_URI, {
        method: REQUEST_METHOD,
        body: JSON.stringify({
          case_id: record.id,
          ...fields,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            toast.success(response.message);
            setFields(initialValues);
            refreshListInvoices();
            reloadRecords();
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

  const getRecord = async (id) => {
    setLoader(true);
    setErrors({})
    try {
      await fetch(common.apiPath(`/admin/cases/invoice/get/${id}`))
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            setFields(response.record.case_invoice);
          } else if (response.error) {
            toast.error(response.message);
          }
        });
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoader(false);
    }
  };

  const addFieldSet = () => {
    setFields({
      ...fields,
      particulars: [...fields.particulars, initialValues.particulars[0]],
    });
  };

  const removeFieldSet = (index) => {
    setFields({
      ...fields,
      particulars: fields.particulars.filter((value, i) => i !== index),
    });
  };

  return (
    <>
      <Modal
        show={showModal}
        onHide={closeModal}
        backdrop="static"
        keyboard={false}
        centered
        size="lg"
        className={showInvoice ? "fade-out" : "fade-in"}
      >
        <Modal.Header closeButton className="border-bottom-0">
          <h3>Manage invoices</h3>
        </Modal.Header>
        <Modal.Body className="pt-0">
          <LoadingOverlay active={loader} spinner text="Loading...">
            <div className="invoice-container">
              <Row className="mb-2">
                <Col>
                  {fields.id ? (
                    <h4 className="mb-2">Update Invoice</h4>
                  ) : (
                    <h4 className="mb-2">Create Invoice</h4>
                  )}
                </Col>
                <Col>
                  <h4 className="text-end">
                    Max Compensation :{" "}
                    {common.currencyFormat(record.maximum_compensation,2)}
                  </h4>
                </Col>
              </Row>

              <Form onSubmit={handleSubmit}>
                <Row className="m-0 mb-2">
                  <Col md={8} className="p-0">
                    <div className="form-control py-4 d-flex align-items-center">
                      <h6 className="m-0">
                        CASE NUMBER : <strong> {record.case_number}</strong>
                      </h6>
                    </div>
                  </Col>
                  <Col md={4} className="pe-0">
                    <DatePicker
                      selected={fields.due_on}
                      onChange={(date) => {
                        setFields({ ...fields, due_on: date });
                        setNoError("due_on");
                      }}
                      className="form-control w-100 py-4"
                      placeholderText="Due On"
                      dateFormat={"MM-dd-yyyy"}
                      // minDate={new Date()}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className="d-block text-center"
                    >
                      {errors["due_on"] || ""}
                    </Form.Control.Feedback>
                  </Col>
                </Row>
                {fields.particulars?.map((item, index) => {
                  return (
                    <Row className="invoice-fieldset">
                      <Col md={8} className="p-0">
                        <FloatingLabel label="Particular">
                          <Form.Control
                            autoComplete="off"
                            row={1}
                            name="description"
                            placeholder="Particular"
                            isInvalid={
                              !!errors["particulars" + index + "description"]
                            }
                            value={item.description}
                            onChange={(event) => {
                              fieldsData.particulars[index].description =
                                event.target.value;
                              setFields(fieldsData);
                              setNoError("particulars" + index + "description");
                            }}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors["particulars" + index + "description"] ||
                              ""}
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </Col>
                      <Col md={4} className="position-relative pe-0">
                        <FloatingLabel label="Amount">
                          <Form.Control
                            autoComplete="off"
                            name="amount"
                            placeholder="Amount"
                            isInvalid={
                              !!errors["particulars" + index + "amount"]
                            }
                            value={item.amount}
                            onChange={(event) => {
                              fieldsData.particulars[index].amount =
                                event.target.value;
                              setFields(fieldsData);
                              setNoError("particulars" + index + "amount");
                            }}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors["particulars" + index + "amount"] || ""}
                          </Form.Control.Feedback>
                        </FloatingLabel>
                        {index >= 1 && (
                          <Button
                            key={index}
                            variant="secondary"
                            size="sm"
                            className="q-opt-remove btn-close"
                            onClick={() => removeFieldSet(index)}
                            style={{ right: 9 }}
                          />
                        )}
                      </Col>
                    </Row>
                  );
                })}
                <div className="text-end">
                  <Button
                    variant="primary"
                    onClick={() => addFieldSet()}
                    disabled={submitted}
                  >
                    Add More
                  </Button>
                  {fields.id && (
                    <Button
                      variant="danger"
                      className="ms-2"
                      onClick={() => {
                        setFields(initialValues);
                      }}
                      disabled={submitted}
                    >
                      Cancel
                    </Button>
                  )}
                
                  <Button
                    variant="success"
                    type="submit"
                    className="ms-2"
                    disabled={submitted}
                  >
                    {submitted && (
                      <Spinner className="me-1" color="light" size="sm" />
                    )}
                    Submit
                  </Button>
                </div>
              </Form>
            </div>
            <ListInvoices
              caseId={record.id}
              setShowInvoice={setShowInvoice}
              getRecord={getRecord}
              refresh={refreshInvoices}
            />
          </LoadingOverlay>
        </Modal.Body>
      </Modal>

      {showInvoice && (
        <ViewInvoice
          showModal={showInvoice ? true : false}
          closeModal={() => setShowInvoice(null)}
          invoiceId={showInvoice}
        />
      )}
    </>
  );
};

export default AddEditInvoice;
