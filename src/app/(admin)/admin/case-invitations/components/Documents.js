import moment from "moment";
import React, { useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";
import { toast } from "react-toastify";
import common from "@/utils/common";
import DownloadButton from "../../cases/components/DownloadButton";
import { useSession } from "next-auth/react";
import AddDocuments from "../../cases/components/AddDocuments";

export default function Documents(props) {
  const [loader, setLoader] = useState(false);
  // const session = useSession();
  // const user = session.data.user || {};

  // const updateDocuments = async (documents) => {
  //   try {
  //     setLoader(true);
  //     const res = await fetch(
  //       common.apiPath("admin/cases/invitation/document/upload"),
  //       {
  //         method: "POST",
  //         body: JSON.stringify({ documents: documents, case_id: props.caseId }),
  //       }
  //     );
  //     const response = await res.json();
  //     if (response.success) {
  //       props.reloadRecords();
  //       // toast.success(response.message);
  //     } else {
  //       toast.error(response.message);
  //     }
  //   } catch (error) {
  //     toast.error(error.message);
  //   } finally {
  //     setLoader(false);
  //   }
  // };

  const deleteRecord = async (document_id) => {
    if (window.confirm("Are you sure to delete?")) {
      try {
        setLoader(true);
        await fetch(common.apiPath("/admin/cases/invitation/document/delete/" + document_id), {
          method: "DELETE",
        })
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
        {/* <Col md={4}>
          <AddDocuments documents={[]} updateDocuments={updateDocuments} />
        </Col> */}
        <Col md={12}>
          <LoadingOverlay active={loader} spinner text="Loading...">
            <div className="table-responsive">
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
                        {/* {user && user.id === record.uploaded_by && (
                                <Button
                                  variant="none"
                                  onClick={() => deleteRecord(record.id)}
                                  size="sm"
                                  className="me-1 p-0"
                                >
                                  <span className="mdi mdi-delete-circle text-danger fs-4"></span>
                                </Button>
                              )} */}
                        <DownloadButton
                          fileName={record.document_name}
                          path={common.downloadLink(
                            "uploads/case_documents/" + record.file_name
                          )}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </LoadingOverlay>
        </Col>
      </Row>
    </>
  );
}
