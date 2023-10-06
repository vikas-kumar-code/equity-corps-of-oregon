import moment from "moment";
import React, { useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";
import { toast } from "react-toastify";
import common from "@/utils/common";
import DownloadButton from "./DownloadButton";
import AddDocuments from "./AddDocuments";

export default function Documents(props) {
  const [loader, setLoader] = useState(false);

  const deleteRecord = async (index) => {
    if (window.confirm("Are you sure to delete?")) {
      if (props?.documents[index] || false) {
        let deleteDoc = props?.documents[index];
        try {
          setLoader(true);
          await fetch(common.apiPath("/upload/delete"), {
            method: "DELETE",
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
    <>
      {props?.errors?.documents && (
        <h5 className="uc-first text-danger text-center pb-2">
          {props?.errors?.documents}
        </h5>
      )}
      <Row>
        <Col md={4}>
          <AddDocuments {...props} />
        </Col>
        <Col md={8}>
          <LoadingOverlay active={loader} spinner text="Loading...">
            <Card>
              <Card.Body style={{ maxHeight: "55vh", overflowY: "auto" }}>
                <Card.Title>Documents</Card.Title>
                <div className="table-responsive min-list-height">
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
                              <Button
                                variant="none"
                                onClick={() => deleteRecord(index)}
                                size="sm"
                                className="me-1 p-0"
                              >
                                <span className="mdi mdi-delete-circle text-danger fs-4"></span>
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
              </Card.Body>
            </Card>
          </LoadingOverlay>
        </Col>
      </Row>
    </>
  );
}
