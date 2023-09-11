import moment from "moment";
import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  Card,
  FloatingLabel,
  Button,
  Spinner,
} from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";
import { toast } from "react-toastify";
import common from "@/utils/common";
import DownloadButton from "../../cases/components/DownloadButton";
import { useSession } from "next-auth/react";

export default function Documents(props) {
  const [documentName, setDocumentName] = useState("");
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [errors, setErrors] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loader, setLoader] = useState(false);
  const session = useSession();
  const user = session.data.user || {};

  const allowedExtensions = [
    "docx",
    "doc",
    "xl",
    "xls",
    "jpg",
    "jpeg",
    "png",
    "pdf",
  ];

  const handleChange = async (document) => {
    setSelectedDocument(document.target.files[0]);
    const fileDetails = document.target.value.split(/(\\|\/)/g).pop();
    const fileName = fileDetails.split(".");
    if (
      allowedExtensions.find(
        (extension) => extension === fileName[1]?.toLowerCase()
      )
    ) {
      setDocumentName(fileName[0]);
      setErrors(null);
    } else {
      setErrors("Please choose allowed extesions only.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (handleValidation()) {
        setSubmitted(true);
        const data = new FormData();
        data.append("document", selectedDocument);
        data.append("document_name", documentName);
        data.append("case_id", props?.caseId);
        const res = await fetch(
          common.apiPath("admin/cases/invitation/document/upload"),
          {
            method: "POST",
            body: data,
          }
        );
        const response = await res.json();
        if (response.success) {
          props.reloadRecords();
          setDocumentName("");
          setSelectedDocument(null);
          window.document.getElementById("document").value = "";
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitted(false);
    }
  };

  const handleValidation = () => {
    let error = null;
    let formIsValid = true;
    if (documentName === "") {
      formIsValid = false;
      error = "Please enter document name.";
    }
    if (!selectedDocument) {
      formIsValid = false;
      error = "Please choose document to upload.";
    }
    setErrors(error);
    return formIsValid;
  };

  const deleteRecord = async (document_id) => {
    if (window.confirm("Are you sure to delete?")) {
      try {
        setLoader(true);
        await fetch(
          common.apiPath("/admin/cases/invitation/document/delete"),
          {
            method: "DELETE",
            body: JSON.stringify({ id: document_id }),
          }
        )
          .then((response) => response.json())
          .then((response) => {
            if (response.success) {
              props.reloadRecords();
              toast.success(response.message);
            } else {
              toast.error(response.message);
            }
          });
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoader(false);
      }
    }
  };

  return (
    <>
      {props?.errors?.documents && (
        <h5 className="uc-first text-danger text-center pb-2">
          {props?.errors?.documents}
        </h5>
      )}
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Upload Document</Card.Title>
              <FloatingLabel
                controlId="floatingInput"
                label="Document Name"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="document_name"
                  placeholder="file_name"
                  value={documentName}
                  onChange={(e) => setDocumentName(e.target.value)}
                />
              </FloatingLabel>

              <Form.Group controlId="formFileLg" className="mb-3">
                <Form.Control
                  type="file"
                  id="document"
                  size="lg"
                  onChange={handleChange}
                  name="document"
                  isInvalid={!!errors}
                  className="line-height-15"
                />
                <Form.Control.Feedback type="invalid">
                  {errors}
                </Form.Control.Feedback>
                <small className="text-default">
                  Only docx, doc, xl, xls, jpg, jpeg, png and pdf allowed.
                </small>
              </Form.Group>
            </Card.Body>
            <Card.Footer className="text-end">
              <Button
                variant="danger"
                type="button"
                disabled={submitted}
                className="me-2"
                onClick={() => {
                  setSelectedDocument(null);
                  setDocumentName("");
                  setErrors(null);
                  window.document.getElementById("document").value = "";
                }}
              >
                Clear
              </Button>
              <Button
                variant="success"
                type="submit"
                disabled={submitted}
                onClick={handleSubmit}
              >
                {submitted && (
                  <Spinner size="sm" variant="light" className="me-1" />
                )}
                Upload
              </Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col md={8}>
          <LoadingOverlay active={loader} spinner text="Loading...">
            <Card>
              <Card.Body style={{ maxHeight: "326px", overflowY: "auto" }}>
                <Card.Title>Documents</Card.Title>
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Document Name </th>
                      <th>Uploaded On</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props?.documents?.map((record, index) => (
                      <tr key={`documents-key-${index}`}>
                        <td>{Number(index + 1)}.</td>
                        <td>{record.document_name}</td>
                        <td>
                          {moment(record?.uploaded_on || new Date()).format(
                            "MMMM DD, YYYY"
                          )}
                        </td>
                        <td>
                          <div className="d-flex">
                            {user && user.id === record.uploaded_by && (
                              <Button
                                variant="danger"
                                onClick={() => deleteRecord(record.id)}
                                size="sm"
                                className="me-2"
                              >
                                Delete
                              </Button>
                            )}
                            <DownloadButton
                              fileName={record.document_name}
                              path={common.downloadLink(
                                "uploads/case_documents/" + record.file_name
                              )}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card.Body>
            </Card>
          </LoadingOverlay>
        </Col>
      </Row>
    </>
  );
}
