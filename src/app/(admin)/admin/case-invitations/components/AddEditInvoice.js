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
import Select from "react-select";

const AddEditInvoice = ({ showModal, closeModal, record, reloadRecords }) => {
  const initialValues = {
    due_on: "",
    particulars: [{ description: "", hours_worked: "", amount: "" }],
  };
  const [errors, setErrors] = useState({});
  const [fields, setFields] = useState(initialValues);
  let fieldsData = JSON.parse(JSON.stringify(fields));
  const [loader, setLoader] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [amount, setAmount] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showInvoice, setShowInvoice] = useState(null);
  const [refreshInvoices, setRefreshInvoices] = useState(true);

  const refreshListInvoices = () => {
    setRefreshInvoices(!refreshInvoices);
  };

  const handleSelect = (option, i) => {
    setSelectedOption(option);
    console.log("Selected Label:", option.label);
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

  const sendInvoice = async (id) => {
    fetch(common.apiPath(`/admin/cases/invoice/send/${id}`), {
      method: "POST",
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          toast.success(response.message);
          setFields(initialValues);
          refreshListInvoices();
          reloadRecords();
        } else if (response.error) {
          toast.error(response.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => setSubmitted(false));
  };

  const handleSubmit = async (e = null, send_invoice = false) => {
    e?.preventDefault();
    setErrors({});
    const validated = await validateAsync(invoiceSchema, fields, {
      removeString: "particulars",
    });
    if (validated.errors) {
      handleErrors(validated.errors);
    } else {
      setSubmitted(send_invoice ? 2 : 1);
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
            if (send_invoice && response?.id) {
              sendInvoice(response.id);
            } else {
              toast.success(response.message);
              setFields(initialValues);
              refreshListInvoices();
              reloadRecords();
              setSubmitted(false);
            }
          } else if (response.error) {
            handleErrors(response.message);
            setSubmitted(false);
          }
        })
        .catch((error) => {
          setSubmitted(false);
          toast.error(error.message);
        });
    }
  };

  const getRecord = async (id) => {
    setLoader(true);
    setErrors({});
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

  const data = [
    { label: "Research", value: "Research" },
    { label: "Preparation", value: "Preparation" },
    { label: "Appointments", value: "Appointments" },
    { label: "Interview/Hearing", value: "Interview/Hearing" },
    { label: "Drafting/Writing", value: "Drafting/Writing" },
    { label: "Other - Describe", value: "Other" },
  ];
  console.log(fields.particulars);
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
                    {common.currencyFormat(record.maximum_compensation, 2)}
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
                      selected={Date.parse(fields.due_on)}
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
                      <Col md={5} className="p-0 invoice_drop_down">
                        {/* <FloatingLabel label="Particulars"> */}
                        {/* <Form.Select
                            aria-label="Default select example"
                            onChange={(e) => {
                              setOtherDescribe(e.target.value);
                              fieldsData.particulars[index].description =
                                e.target.value;
                              setFields(fieldsData);
                              setNoError("particulars" + index + "description");
                            }}
                          ><option value="Category">Category</option>
                            <option value="Research">Research</option>
                            <option value="Preparation">Preparation</option>
                            <option value="Appointments">Appointments</option>
                            <option value="Interview/Hearing">
                              Interview/Hearing
                            </option>
                            <option value="Drafting/Writing">
                              Drafting/Writing
                            </option>
                            <option value="">Other - Describe</option>
                          </Form.Select> */}
                        {/* </FloatingLabel> */}
                        {item.description == "Other - Describe" ? (
                          <FloatingLabel label="Particulars">
                            <Form.Control
                              autoComplete="off"
                              row={1}
                              name="particulars"
                              placeholder="Particulars"
                              isInvalid={
                                !!errors["particulars" + index + "description"]
                              }
                              value={item.description || ''}
                              onChange={(event) => {
                                fieldsData.particulars[index].description =
                                  event.target.value;
                                setFields(fieldsData);
                                setNoError(
                                  "particulars" + index + "description"
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors["particulars" + index + "description"] ||
                                ""}
                            </Form.Control.Feedback>
                            {item.description == "Other - Describe" && (
                              <Button
                                key={index}
                                variant="secondary"
                                size="sm"
                                className="q-opt-remove btn-close"
                                onClick={() => {
                                  fieldsData.particulars[index].description =
                                    "";
                                  setFields(fieldsData);
                                }}
                                style={{ right: 9, top: 17 }}
                              />
                            )}
                          </FloatingLabel>
                        ) : (
                          <Select
                            defaultOptions={data[0]}
                            options={data}
                            // onChange={()=>handleSelect(index)}
                            onChange={(option) => {
                              fieldsData.particulars[index].description =
                                option.label;
                              setFields(fieldsData);
                              setNoError("particulars" + index + "description");
                            }}
                          />
                        )}
                      </Col>
                      <Col md={3} className="p-0">
                        <FloatingLabel label="Hours Worked">
                          <Form.Control
                            autoComplete="off"
                            row={1}
                            name="hours_worked"
                            placeholder="Hours Worked"
                            isInvalid={
                              !!errors["particulars" + index + "hours_worked"]
                            }
                            value={item.hours_worked}
                            onChange={(event) => {
                              fieldsData.particulars[index].hours_worked =
                                event.target.value;
                              fieldsData.particulars[index].amount =
                                parseInt(record.hourly_rate) *
                                parseInt(item.hours_worked);
                              setFields(fieldsData);
                              setNoError(
                                "particulars" + index + "hours_worked"
                              );
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
                                event.target.value.replace(/[^0-9.]/g, "");
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
                            style={{ right: 9, top: 17 }}
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
                    disabled={!!submitted}
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
                      disabled={!!submitted}
                    >
                      Cancel
                    </Button>
                  )}

                  <Button
                    variant="warning"
                    type="submit"
                    className="ms-2"
                    disabled={!!submitted}
                  >
                    {submitted === 1 && (
                      <Spinner className="me-1" color="light" size="sm" />
                    )}
                    Save as draft
                  </Button>

                  <Button
                    variant="success"
                    type="button"
                    className="ms-2"
                    disabled={!!submitted}
                    onClick={() => handleSubmit(null, true)}
                  >
                    {submitted === 2 && (
                      <Spinner className="me-1" color="light" size="sm" />
                    )}
                    Save & Send
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
