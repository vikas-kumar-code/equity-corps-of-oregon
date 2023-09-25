import moment from "moment";
import React, { useState } from "react";
import { Modal, Badge, Tabs, Tab, Button, Row, Col } from "react-bootstrap";
import Documents from "./Documents";
import common from "@/utils/common";

const InvitationDetails = ({
  showModal,
  closeModal,
  record,
  reloadRecords,
}) => {
  const [activeTab, setActiveTab] = useState(1);
  const [errors, setErrors] = useState({});
  const [deletedDocuments, setDeletedDocuments] = useState([]);

  const iStatus = {
    0: {
      label: "Pending",
      bg: "warning",
    },
    1: {
      label: "Accepted",
      bg: "success",
    },
    2: {
      label: "Expired",
      bg: "danger",
    },
  };

  return (
    <Modal
      show={showModal}
      onHide={closeModal}
      backdrop="static"
      keyboard={false}
      centered
      size="lg"
    >
      <Modal.Header closeButton className="border-bottom-0">
        <h3> Case Details</h3>
      </Modal.Header>
      <Modal.Body>
        <Tabs
          activeKey={activeTab}
          id="justify-tab-example"
          justify
          onSelect={(k) => setActiveTab(parseInt(k))}
        >
          <Tab eventKey={1} title="Basic Details">
            <div className="table-responsive min-list-height">
              <table className="table table-borderless table-striped">
                <tbody>
                  <tr>
                    <th>Title</th>
                    <td>{record.case.title}</td>
                  </tr>
                  <tr>
                    <th>Case Number</th>
                    <td>{record.case.case_number}</td>
                  </tr>
                  <tr>
                    <th>Maximum Compensation</th>
                    <td>
                      {common.currencyFormat(record.case.maximum_compensation)}
                    </td>
                  </tr>

                  <tr>
                    <th>Description</th>
                    <td>{record.case.description}</td>
                  </tr>
                  <tr>
                    <th>Status</th>
                    <td>
                      <Badge pill bg={iStatus[record.status].bg || "info"}>
                        {iStatus[record.status].label || "N/A"}
                      </Badge>
                    </td>
                  </tr>
                  <tr>
                    <th>Added On</th>
                    <td>{moment(record.sent_on).format("D MMM, YYYY")}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Tab>
          <Tab eventKey={2} title="Milestones">
            <div className="p-3">
              <Row>
                <Col className="">Milestones</Col>
              </Row>
              <Row>
                <Col md={12} sm={12}>
                  <div className="table-responsive min-list-height">
                    <table className="table table-borderless">
                      <tbody>
                        <tr className="mx-5">
                          <th>#</th>
                          <th>Comment</th>
                          <th>Updated On</th>
                        </tr>
                        {record.case.case_milestones.map((mile, i) => {
                          return (
                            <tr key={i}>
                              <td>{mile.id}</td>
                              <td>{mile.comment}</td>
                              <td className="text-start">
                                {moment(mile.milestone_date).format(
                                  "D MMM,  YYYY"
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </Col>
              </Row>
            </div>
          </Tab>
          <Tab eventKey={3} title="Documents">
            {record.status === 1 ? (
              <Documents
                reloadRecords={reloadRecords}
                setDeletedDocument={(doc) => {
                  setDeletedDocuments([...deletedDocuments, doc]);
                }}
                documents={record.case.case_documents}
                errors={errors}
                setErrors={setErrors}
                caseId={record.case.id}
              />
            ) : (
              <div className="table-responsive min-list-height">
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Document Name </th>
                      <th>Uploaded On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {record.case.case_documents?.map((record, index) => (
                      <tr key={`documents-key-${index}`}>
                        <td>{Number(index + 1)}.</td>
                        <td>{record.document_name}</td>
                        <td>
                          {moment(record?.uploaded_on || new Date()).format(
                            "MMMM DD, YYYY"
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Tab>
          <Tab eventKey={4} title="Case Activities">
            <div style={{ maxHeight: "250px", overflowY: "auto" }}>
              <ol className="activity-feed">
                {record.case.logs.map((log, i) => {
                  return (
                    <li class="feed-item">
                      <time class="date">
                        {moment(log.created_at).format("LLLL")}
                      </time>
                      <span class="text">{log.content}</span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button
          size="lg"
          type="submit"
          variant="secondary"
          onClick={closeModal}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InvitationDetails;
