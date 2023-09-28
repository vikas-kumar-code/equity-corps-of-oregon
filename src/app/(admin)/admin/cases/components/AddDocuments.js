import common from "@/utils/common";
import { useState } from "react";
import { Card, FloatingLabel, Form, Spinner, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";

function AddDocuments(props) {
  const [documents, setDocuments] = useState([]);
  const [documentNames, setDocumentNames] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const allowedExtensions = common.params.allowedExtensions;

  const handleChange = (docs) => {
    const selectedFiles = [...docs.target.files];
    let validation = true;
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      if (
        allowedExtensions.find(
          (extension) => extension === file.name.split(".").pop().toLowerCase()
        )
      ) {
        documentNames[documentNames.length] = file.name
          .split(".")
          .slice(0, -1)
          .join(".");
      } else {
        validation = false;
        toast.error(
          "Allowed file types include only docx, xl, xls, jpg, jpeg, png, and pdf."
        );
        break;
      }
    }
    if (validation) {
      setDocuments([...documents, ...selectedFiles]);
    }
  };

  const removeDocument = (index) => {
    const docs = documents.filter((item, i) => i !== index);
    setDocuments(docs);
    setDocumentNames(documentNames.filter((item, i) => i !== index));
    if (docs.length <= 0) {
      setDocuments([]);
      window.document.getElementById("case_documents").value = "";
    }
  };

  const handleClose = () => {
    setDocuments([]);
    setDocumentNames([]);
    window.document.getElementById("case_documents").value = "";
  };

  const handleUpload = async (e) => {
    if (handleValidation()) {
      setSubmitted(true);
      try {
        const formData = new FormData();
        for (const file of documents) {
          formData.append("files", file);
        }
        const res = await fetch(common.apiPath("/upload"), {
          method: "POST",
          body: formData,
        });
        const response = await res.json();
        if (response.success) {
          let docList = response.files.map((item, index) => {
            return {
              document_name: documentNames[index],
              file_name: item.fileName,
              uploaded_on: new Date(),
            };
          });
          props?.updateDocuments([...props.documents, ...docList]);
          handleClose();
          toast.success("File uploaded successfully.");
        } else {
          toast.error(response.message);
        }
      } catch (err) {
        toast.error(err.message);
      } finally {
        setSubmitted(false);
      }
    }
  };

  const handleValidation = () => {
    if (Array.isArray(documents) && documents.length > 0) {
      if (
        Array.isArray(documentNames) &&
        documentNames.length > 0 &&
        !documentNames.includes("")
      ) {
        return true;
      } else {
        toast.error("Please enter all file's name.");
      }
    } else {
      toast.error("Please choose at least one document.");
    }
    return false;
  };

  return (
    <>
      <Card>
        <Card.Body style={{ maxHeight: "47vh", overflowY: "auto" }}>
          <Card.Title>Upload Documents</Card.Title>
          {documents && (
            <Table borderless bordered>
              <tbody>
                {Array.isArray(documents) &&
                  documents?.map((doc, index) => {
                    return (
                      <tr>
                        <td className="p-0">
                          <FloatingLabel
                            key={index}
                            label={`Document ${index + 1}`}
                            className="mb-2"
                          >
                            <Form.Control
                              className="pe-5"
                              type="text"
                              name="document_name"
                              placeholder="Document name"
                              value={documentNames[index] || ""}
                              onChange={(e) => {
                                let docs = [...documentNames];
                                docs[index] = e.target.value;
                                setDocumentNames(docs);
                              }}
                            />
                            <Button
                              key={index}
                              variant="secondary"
                              size="sm"
                              className="doc-remove"
                              onClick={() => removeDocument(index)}
                              style={{ top: 17 }}
                            >
                              <span className="mdi mdi-close-circle"></span>
                            </Button>
                          </FloatingLabel>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          )}
          <Form.Group controlId="formFileLg" className="mb-3">
            <Form.Control
              type="file"
              id="case_documents"
              size="lg"
              onChange={handleChange}
              name="document"
              className="line-height-15"
              multiple
            />
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
              setDocuments([]);
              setDocumentNames([]);
              window.document.getElementById("case_documents").value = "";
            }}
          >
            Clear
          </Button>
          <Button
            variant="success"
            type="button"
            disabled={submitted}
            onClick={handleUpload}
          >
            {submitted && (
              <Spinner size="sm" variant="light" className="me-1" />
            )}
            Upload
          </Button>
        </Card.Footer>
      </Card>
    </>
  );
}

export default AddDocuments;
