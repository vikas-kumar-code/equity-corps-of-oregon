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
  Spinner,
} from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";
import { toast } from "react-toastify";
import ListInvoice from "./ListInvoice";
import InvoiceDetails from "./InvoiceDetails";

const AddEditInvoice = ({ showModal, closeModal, record, reloadRecords }) => {
  const initialValues = [{ description: "", amount: "" }];
  const [errors, setErrors] = useState({});
  const [fields, setFields] = useState(initialValues);
  let fieldsData = [...fields];
  const [loader, setLoader] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [invoiceRecord, setInvoiceRecord] = useState({});
  const [records, setRecords] = useState([]);
  const [invoiceDetails, setInvoiceDetails] = useState(null);
  const [adminDetails, setAdminDetails] = useState({});

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
      if (invoiceRecord.id) {
        REQUEST_URI = common.apiPath(
          `/admin/cases/invoice/save/${invoiceRecord.id}`
        );
        REQUEST_METHOD = "PUT";
      }
      fetch(REQUEST_URI, {
        method: REQUEST_METHOD,
        body: JSON.stringify({ case_id: record.id, particulars: fields }),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            toast.success(response.message);
            setFields(initialValues);
            getRecords();
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
    try {
      await fetch(common.apiPath(`/admin/cases/invoice/get/${id}`))
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            setFields(JSON.parse(response.record.particulars));
            setInvoiceRecord(response.record);
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

  const getRecords = async () => {
    setLoader(true);
    try {
      let REQUEST_URI = common.apiPath(
        `/admin/cases/invoice/list/${record.id}`
      );
      await fetch(REQUEST_URI)
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            setRecords(response.records);
            setAdminDetails(response.admin);
          } else {
            toast.error(response.message);
          }
        });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoader(false);
    }
  };

  const deleteRecord = async (id) => {
    if (window.confirm("Are you sure to delete this invoice?")) {
      setLoader(true);
      fetch(common.apiPath(`/admin/cases/invoice/delete/${id}`), {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            toast.success(response.message);
            getRecords();
            reloadRecords();
          } else if (response.error) {
            toast.error(response.message);
          }
        })
        .catch((error) => {
          toast.error(error.message);
        })
        .finally(() => setLoader(false));
    }
  };

  const sendInvoice = async (id) => {
    if (window.confirm("Are you sure to send this invoice for approval?")) {
      setLoader(true);
      fetch(common.apiPath(`/admin/cases/invoice/send/${id}`), {
        method: "POST",
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            toast.success(response.message);
            getRecords();
            reloadRecords();
          } else if (response.error) {
            toast.error(response.message);
          }
        })
        .catch((error) => {
          toast.error(error.message);
        })
        .finally(() => setLoader(false));
    }
  };

  const addFieldSet = () => {
    setFields([...fields, initialValues[0]]);
  };

  const removeFieldSet = (index) => {
    setFields(fields.filter((value, i) => i !== index));
  };

  useEffect(() => {
    getRecords();
  }, []);

  return (
    <>
      <Modal
        show={showModal}
        onHide={closeModal}
        backdrop="static"
        keyboard={false}
        centered
        size="lg"
        className={invoiceDetails ? "opacity-0" : ""}
      >
        <Modal.Header closeButton className="border-bottom-0">
          <h3>Manage invoices for case {record.case_number}</h3>
        </Modal.Header>
        <Modal.Body className="pt-0">
          <LoadingOverlay active={loader} spinner text="Loading...">
            <div className="invoice-container">
              {invoiceRecord.id ? (
                <h5 className="mb-2">Update Invoice ({invoiceRecord.name})</h5>
              ) : (
                <h5 className="mb-2">Create Invoice</h5>
              )}
              <Form onSubmit={handleSubmit}>
                {fields?.map((item, index) => {
                  return (
                    <Row className="invoice-fieldset">
                      <Col md={8} className="p-0">
                        <FloatingLabel label="Particular">
                          <Form.Control
                            row={1}
                            name="description"
                            placeholder="Particular"
                            isInvalid={!!errors[index + "description"]}
                            value={item.description}
                            onChange={(event) => {
                              fieldsData[index].description =
                                event.target.value;
                              setFields(fieldsData);
                            }}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors[index + "description"] || ""}
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </Col>
                      <Col md={4} className="position-relative pe-0">
                        <FloatingLabel label="Amount">
                          <Form.Control
                            autoComplete="off"
                            name="amount"
                            placeholder="Amount"
                            isInvalid={!!errors[index + "amount"]}
                            value={common.currencyFormat(item.amount)}
                            onChange={(event) => {
                              fieldsData[index].amount =
                                common.currencyToNumber(event.target.value);
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
                  {invoiceRecord.id && (
                    <Button
                      variant="danger"
                      className="ms-2"
                      onClick={() => {
                        setInvoiceRecord({});
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
            <ListInvoice
              records={records}
              getRecord={getRecord}
              deleteRecord={deleteRecord}
              showInvoiceDetails={setInvoiceDetails}
              maxCompensation={record.maximum_compensation}
              sendInvoice={sendInvoice}
            />
          </LoadingOverlay>
        </Modal.Body>
      </Modal>

      {invoiceDetails && (
        <InvoiceDetails
          showModal={invoiceDetails ? true : false}
          closeModal={() => setInvoiceDetails(null)}
          record={invoiceDetails}
          adminDetails={adminDetails}
        />
      )}
    </>
  );
};

export default AddEditInvoice;
