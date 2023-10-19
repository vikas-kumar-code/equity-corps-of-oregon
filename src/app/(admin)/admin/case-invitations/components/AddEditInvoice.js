import common from "@/utils/common";
import React, { useEffect, useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";
import { toast } from "react-toastify";
import ListInvoices from "./ListInvoices";
import ViewInvoice from "../../cases/components/ViewInvoice";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import invoiceValidation from "@/validators/invoiceValidation";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import { useRef } from "react";
import AddEditParticulars from "./AddEditParticulars";

registerPlugin(FilePondPluginFileValidateType);
const AddEditInvoice = ({ showModal, closeModal, record, reloadRecords }) => {
  const initialValues = {
    due_on: "",
    particulars: [
      {
        category: {
          label: "Select Category",
          value: null,
        },
        other_category: "",
        show_other_category: false,
        short_description: "",
        hours_worked: "",
        amount: "",
      },
    ],
    files: [],
    temp_files: [],
    deleted_files: [],
  };
  const [errors, setErrors] = useState({});
  const [fields, setFields] = useState(initialValues);
  let fieldsData = JSON.parse(JSON.stringify(fields));
  const [loader, setLoader] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showInvoice, setShowInvoice] = useState(null);
  const [refreshInvoices, setRefreshInvoices] = useState(true);
  const [submissionAction, setSubmissionAction] = useState(0);
  const [categories, setCategories] = useState([]);
  const [deletedFiles, setDeletedFiles] = useState([]);
  const [withdraw, setWithdraw] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const filePondRef = useRef(null);

  const resetFilepond = () => {
    if (filePondRef.current) {
      filePondRef.current.removeFiles({ revert: false });
    }
  };

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

  // To preview invoice before submission
  const handlePreview = (id, action) => {
    setErrors({});
    const validate = invoiceValidation(fields, record.hourly_rate);
    if (validate.error) {
      setErrors(validate.messages);
    } else {
      setShowInvoice(id);
      setSubmissionAction(action);
    }
  };

  const handleSubmit = async (e = null, send_invoice = false) => {
    e?.preventDefault();
    setErrors({});
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
        deletedFiles: [...deletedFiles],
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          console.log(fields.files, fields.temp_files);
          console.log(response);
          if (send_invoice && response?.id) {
            sendInvoice(response.id);
          } else {
            toast.success(response.message);
            setFields(initialValues);
            refreshListInvoices();
            reloadRecords();
            setSubmitted(false);
          }
          setDeletedFiles([]);
          setShowInvoice(null);
          resetFilepond();
        } else if (response.error) {
          handleErrors(response.message);
          setSubmitted(false);
        }
      })
      .catch((error) => {
        setSubmitted(false);
        toast.error(error.message);
      });
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
            setCategories([
              initialValues.particulars[0].category,
              ...response.records.map((item) => {
                return {
                  value: item.id,
                  label: item.name,
                };
              }),
            ]);
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

  const handleDelFile = (index) => {
    let newFiles = [...fields.files];
    let deletedFile = newFiles[index].fileName;
    let filteredFiles = newFiles.filter((file, i) => {
      return i !== index;
    });
    setDeletedFiles((prevDeletedFiles) => [...prevDeletedFiles, deletedFile]);
    setFields({
      ...fields,
      files: [...filteredFiles],
      deleted_files: deletedFiles,
    });
  };

  useEffect(() => {
    getInvoiceCategories();
  }, []);

  useEffect(() => {
    if (uploadedFile) {
      setFields({
        ...fields,
        temp_files: [...fields.temp_files, uploadedFile],
      });
    }
  }, [uploadedFile]);

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
                <AddEditParticulars
                  fields={fields}
                  setFields={setFields}
                  setNoError={setNoError}
                  errors={errors}
                  record={record}
                  initialValues={initialValues}
                  fieldsData={fieldsData}
                  categories={categories}
                />
                {fields.files &&
                  Array.isArray(fields.files) &&
                  fields.files.length > 0 && (
                    <Row>
                      <div className="files-container">
                        <h4>Attached Files</h4>
                        <ul className="files-list">
                          {fields.files.map((item, i) => {
                            return (
                              <li
                                key={`file-${i}`}
                                className="position-relative"
                              >
                                <span
                                  className="mdi mdi-delete-circle fs-4 position-absolute end-0 me-1 text-danger"
                                  onClick={() => handleDelFile(i)}
                                ></span>
                                <span className="mdi mdi-file-pdf inv-file-icon mt-2"></span>
                                <a href="#" className="text-truncate">
                                  {item.originalFileName}
                                </a>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </Row>
                  )}

                <Row>
                  <Col md={12}>
                    <FilePond
                      ref={filePondRef}
                      name="files"
                      acceptedFileTypes={["application/pdf"]}
                      allowMultiple={true}
                      allowRemove={true}
                      server={{
                        process: {
                          url: common.apiPath("/upload"),
                          onload: (response) => {
                            response = JSON.parse(response);
                            console.log(response);
                            if (response.success) {
                              setUploadedFile(response.files[0]);
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
                            response = JSON.parse(response);
                            let copyFields = JSON.parse(JSON.stringify(fields));
                            copyFields = {
                              ...copyFields,
                              temp_files: copyFields.temp_files.filter(
                                (item) => item?.fileName !== response?.fileName
                              ),
                            };
                            setFields(copyFields);
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
                        resetFilepond();
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
                    onClick={() => handlePreview("0", 1)}
                  >
                    <span class="mdi mdi-content-save me-1"></span>
                    Save as draft
                  </Button>

                  <Button
                    variant="success"
                    type="button"
                    className="ms-2"
                    disabled={!!submitted}
                    onClick={() => handlePreview("0", 2)}
                  >
                    <span class="mdi mdi-file-send me-1"></span>
                    Save & Send
                  </Button>
                </div>
              </Form>
            </div>
            <ListInvoices
              caseId={record.id}
              setShowInvoice={setShowInvoice}
              getRecord={getRecord}
              withdraw={withdraw}
              setWithdraw={setWithdraw}
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
          caseData={record}
          submitted={submitted}
          handleSubmit={handleSubmit}
          submissionAction={submissionAction}
          categories={categories}
        />
      )}
    </>
  );
};

export default AddEditInvoice;
