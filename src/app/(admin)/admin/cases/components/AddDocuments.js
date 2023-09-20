import common from "@/utils/common";
import { useState } from "react";
import { Form, Spinner, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

function AddDocuments({}) {
  const [documents, setDocuments] = useState(null);
  const [documentNames, setDocumentNames] = useState([]);
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
        documentNames[i] = file.name.split(".").slice(0, -1).join(".");
      } else {
        validation = false;
        toast.error("Please choose allowed extesions only.");
        break;
      }
    }
    if (validation) {
      setDocuments(selectedFiles);
    }
  };

  const removeDocument = (index) => {
    const docs = documents.filter((item, i) => i !== index);
    setDocuments(docs);
    setDocumentNames(documentNames.filter((item, i) => i !== index));
    if (docs.length <= 0) {
      setDocuments(null);
      window.document.getElementById("case_documents").value = "";
    }
  };

  const handleClose = () => {
    setDocuments(null);
    setDocumentNames([]);
    window.document.getElementById("case_documents").value = "";
  };

  const handleUpload = async (e) => {
    if (handleValidation()) {
      setSubmitted(true);
      try {
        const data = new FormData();
        data.append("document", documents);
        const res = await fetch(common.apiPath("/upload"), {
          method: "POST",
          body: data,
        });
        const response = await res.json();
        if (response.success) {
          props?.updateDocuments([
            ...props?.documents,
            {
              document_name: documentName,
              file_name: response.file,
              uploaded_on: new Date(),
            },
          ]);
          handleClose();
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
    if (!Array.isArray(documents) || documents.length <= 0) {
      toast.error("Please enter document name.")      
      return false;
    }else{
      return true;
    }    
  };

  return (
    <>
      <label className="float-end btn btn-success">
        Add Documents
        <input
          id="case_documents"
          type="file"
          className="d-none"
          onChange={(e) => handleChange(e)}
          multiple
        />
      </label>
      {documents && (
        <Modal
          centered
          backdrop="static"
          show={documents ? true : false}
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Upload Documents</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-0">
            <div style={{ maxHeight: "65vh", overflowY: "auto" }}>
              <Table borderless bordered>
                <thead>
                  <tr>
                    <th>Documents</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(documents) &&
                    documents?.map((doc, index) => {
                      return (
                        <tr>
                          <td>
                            <Form.Control
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
                          </td>
                          <td>
                            <Button
                              variant="danger"
                              onClick={() => removeDocument(index)}
                            >
                              Remove
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" type="button" onClick={handleClose}>
              Close
            </Button>
            <Button variant="success" type="button" onClick={handleUpload}>
              {submitted && (
                <Spinner size="sm" variant="light" className="me-1" />
              )}
              Upload
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default AddDocuments;
