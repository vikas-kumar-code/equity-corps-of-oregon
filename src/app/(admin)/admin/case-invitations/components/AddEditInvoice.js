// import { invoiceSchema } from "@/joi/casesSchema";
import common from "@/utils/common";
import React, { useEffect, useState } from "react";
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
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import invoiceValidation from "@/validators/invoiceValidation";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

registerPlugin(FilePondPluginFileValidateType);
const AddEditInvoice = ({ showModal, closeModal, record, reloadRecords }) => {
  const initialValues = {
    due_on: "",
    particulars: [
      {
        category: null,
        other_category: "",
        show_other_category: false,
        hours_worked: "",
        amount: "",
      },
    ],
    files: [],
  };
  const [errors, setErrors] = useState({});
  const [fields, setFields] = useState(initialValues);
  let fieldsData = JSON.parse(JSON.stringify(fields));
  const [loader, setLoader] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showInvoice, setShowInvoice] = useState(null);
  const [refreshInvoices, setRefreshInvoices] = useState(true);
  const [categories, setCategories] = useState([]);

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
    const validate = invoiceValidation(fields, record.hourly_rate);
    if (validate.error) {
      setErrors(validate.messages);
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

  const getInvoiceCategories = async () => {
    setLoader(true);
    try {
      await fetch(common.apiPath(`/admin/cases/invoice/categories`))
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            setCategories(
              response.records.map((item) => {
                return {
                  value: item.id,
                  label: item.name,
                };
              })
            );
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

  useEffect(() => {
    getInvoiceCategories();
  }, []);
  useEffect(() => {
    console.log(fields, "Fieldsssssssssssssssss");
  }, [fields]);

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
                <Col md={4}>
                  {fields.id ? (
                    <h4 className="mb-2">Update Invoice</h4>
                  ) : (
                    <h4 className="mb-2">Create Invoice</h4>
                  )}
                </Col>
                <Col md={3}>
                  <h4 className="text-end">
                    Hourly rate :{" "}
                    {record.hourly_rate
                      ? common.currencyFormat(record.hourly_rate, 2)
                      : "N/A"}
                  </h4>
                </Col>
                <Col md={5}>
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
                    />
                    <Form.Control.Feedback type="invalid" className="d-block">
                      {errors["due_on"] || ""}
                    </Form.Control.Feedback>
                  </Col>
                </Row>
                {fields.particulars?.map((item, index) => {
                  return (
                    <Row className="invoice-fieldset">
                      <Col md={5} className="p-0 invoice_drop_down">
                        {item.show_other_category ? (
                          <FloatingLabel label="Desribe your category">
                            <Form.Control
                              autoComplete="off"
                              row={1}
                              placeholder="Category"
                              isInvalid={
                                !!errors[
                                  "particulars" + index + "other_category"
                                ]
                              }
                              value={item.other_category}
                              onChange={(event) => {
                                fieldsData.particulars[index].other_category =
                                  event.target.value;
                                setFields(fieldsData);
                                setNoError(
                                  "particulars" + index + "other_category"
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors[
                                "particulars" + index + "other_category"
                              ] || ""}
                            </Form.Control.Feedback>
                            <Button
                              key={index}
                              variant="secondary"
                              size="sm"
                              className="q-opt-remove btn-close"
                              onClick={() => {
                                fieldsData.particulars[index].other_category =
                                  "";
                                fieldsData.particulars[
                                  index
                                ].show_other_category = false;
                                fieldsData.particulars[index].category = null;
                                setFields(fieldsData);
                              }}
                              style={{ right: 9, top: 17 }}
                            />
                          </FloatingLabel>
                        ) : (
                          <div className="invoice_category">
                            <Select
                              placeholder="Select Category"
                              defaultOptions={categories.map((item) => {
                                return { value: item.id, label: item.name };
                              })}
                              options={categories}
                              value={item.category}
                              onChange={(option) => {
                                fieldsData.particulars[index].category = option;
                                if (
                                  option.value ===
                                  categories[categories.length - 1].value
                                ) {
                                  fieldsData.particulars[
                                    index
                                  ].show_other_category = true;
                                }
                                setFields(fieldsData);
                                setNoError("particulars" + index + "category");
                              }}
                            />
                            <Form.Control.Feedback
                              type="invalid"
                              className="d-block"
                            >
                              {errors["particulars" + index + "category"] || ""}
                            </Form.Control.Feedback>
                          </div>
                        )}
                      </Col>
                      <Col md={3} className="p-0 ps-2">
                        <FloatingLabel label="Hours worked">
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
                                event.target.value.replace(
                                  /[^0-9.]|(\.(?=.*\.))/g,
                                  ""
                                );
                              if (record.hourly_rate) {
                                fieldsData.particulars[index].amount = "";
                                fieldsData.particulars[index].amount =
                                  Number(record.hourly_rate) *
                                  Number(
                                    fieldsData.particulars[index].hours_worked
                                  );
                              }
                              setFields(fieldsData);
                              setNoError(
                                "particulars" + index + "hours_worked"
                              );
                            }}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors["particulars" + index + "hours_worked"] ||
                              ""}
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </Col>
                      <Col md={4} className="position-relative pe-0">
                        <FloatingLabel label="Amount">
                          <Form.Control
                            disabled={record.hourly_rate ? true : false}
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
                              if (record.hourly_rate) {
                                fieldsData.particulars[index].hours_worked = "";
                              }
                              setFields(fieldsData);
                              setNoError("particulars" + index + "amount");
                            }}
                          />
                          {index < 1 && (
                            <Button
                              key={index}
                              variant="success"
                              size="sm"
                              className="q-opt-add position-absolute rounded-circle"
                              onClick={() => addFieldSet(index)}
                              style={{ right: 9, top: 15, height:32, width:32 }}
                            >
                              {" "}
                              <span className="fs-4">+</span>{" "}
                            </Button>
                          )}
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
                            style={{ right: 10, top: 15, height:18, width:18 }}
                          />
                        )}
                      </Col>
                    </Row>
                  );
                })}
                <Row>
                  <Col md={12}>
                    <FilePond
                      name="files"
                      acceptedFileTypes={["application/pdf"]}
                      allowMultiple={true}
                      allowRemove={true}
                      server={{
                        process: {
                          url: common.apiPath("/upload"),
                          onload: (response) => {
                            response = JSON.parse(response);
                            if (response.success) {
                              setFields({
                                ...fields,
                                files: [...fields.files, ...response.files],
                              });
                              return JSON.stringify({
                                file: response.files[0].fileName,
                              });
                            } else if (response.error) {
                              toast.error(response.message);
                            }
                          },
                        },
                        revert: {
                          url: common.apiPath("/upload/delete"),
                          onload: (response) => {
                            //console.log(response);
                          },
                        },
                      }}
                    />
                  </Col>
                </Row>
                <div className="text-end">
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
                    type="button"
                    className="ms-2"
                    disabled={!!submitted}
                    onClick={()=>setShowInvoice(true)}
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
          fields={fields}
        />
      )}
    </>
  );
};

export default AddEditInvoice;
