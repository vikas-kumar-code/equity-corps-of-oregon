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
import { toast } from "react-toastify";
import common from "@/utils/common";

export default function Documents(props) {
  const [documentName, setDocumentName] = useState("");
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [errors, setErrors] = useState(null);
  const [submitted, setSubmitted] = useState(false);
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
    if (handleValidation()) {
      setSubmitted(true);
      const data = new FormData();
      data.append("document", selectedDocument);
      const res = await fetch(common.apiPath("/upload"), {
        method: "POST",
        body: data,
      });
      const response = await res.json();
      if (response.success) {
        props?.updateDocuments([
          ...props?.documents,
          { document_name: documentName, uploaded_file: response.file, uploaded_on: new Date() },
        ]);
        setDocumentName("");
        setSelectedDocument(null);
        window.document.getElementById("document").value = "";
      } else {
        toast.error(response.message);
      }
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
  const deleteRecord = (index) => {
    if (window.confirm("Are you sure to delete?")) {
      let newDocuments = props?.documents.filter((r, indx) => index !== indx);
      props.updateDocuments(newDocuments);
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
          <Card>
            <Card.Body>
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
                        <Button
                          variant="danger"
                          onClick={() => deleteRecord(index)}
                          size="sm"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
