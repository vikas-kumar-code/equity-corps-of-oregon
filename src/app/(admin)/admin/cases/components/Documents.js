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
import DownloadButton from "./DownloadButton";
import AddDocuments from "./AddDocuments";

export default function Documents(props) {
  const [documentName, setDocumentName] = useState("");
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [errors, setErrors] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loader, setLoader] = useState(false);

  const deleteRecord = async (index) => {
    if (window.confirm("Are you sure to delete?")) {
      if (props?.documents[index] || false) {
        let deleteDoc = props?.documents[index];
        try {
          setLoader(true);
          await fetch(common.apiPath("/upload/delete"), {
            method: "POST",
            body: JSON.stringify({
              file: deleteDoc.file_name,
            }),
          });
          let newDocuments = props?.documents.filter(
            (r, indx) => index !== indx
          );
          await props.updateDocuments(newDocuments);
          await props?.setDeletedDocument(deleteDoc.file_name);
          toast.success("File deleted successfully");
        } catch (error) {
          toast.error(error.message);
        } finally {
          setLoader(false);
        }
      } else {
        toast.error("Document not found.");
      }
    }
  };

  return (
    <div className="card2">
      {props?.errors?.documents && (
        <h5 className="uc-first text-danger text-center pb-2">
          {props?.errors?.documents}
        </h5>
      )}
      <div className="card2-header">
        <div className="card2-title">Documents</div>
        <AddDocuments
          updateDocuments={(doclist) =>
            props.updateDocuments([...props.documents, ...doclist])
          }
        />
      </div>
      <Row>
        <Col md={12}>
          <LoadingOverlay active={loader} spinner text="Loading...">
            <div
              className="table-responsive overflow-auto"
              style={{ height: "45vh" }}
            >
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Document Name </th>
                    <th>Uploaded On</th>
                    <th className="text-end">Action</th>
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
                        <div className="d-flex justify-content-end">
                          <Button
                            variant="danger"
                            onClick={() => deleteRecord(index)}
                            size="sm"
                            className="me-2"
                          >
                            Delete
                          </Button>
                          <DownloadButton
                            fileName={record.document_name}
                            path={common.downloadLink(
                              "uploads/case_documents/" +
                                record.file_name +
                                "?temp=true"
                            )}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </LoadingOverlay>
        </Col>
      </Row>
    </div>
  );
}
