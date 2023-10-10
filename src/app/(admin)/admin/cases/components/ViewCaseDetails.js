import moment from "moment";
import React, { useState } from "react";
import { Modal, Badge, Tabs, Tab, Button, Row, Col } from "react-bootstrap";
import Documents from "./Documents";
import common from "@/utils/common";
import DownloadButton from "./DownloadButton";

const ViewCaseDetails = ({
  showModal,
  closeModal,
  record,
  deleteRecord,
  showEditModal,
  showListInvoices,
}) => {
  const [activeTab, setActiveTab] = useState(1);
  const [errors, setErrors] = useState({});
  const [deletedDocuments, setDeletedDocuments] = useState([]);

  const btnStatus = {
    0: {
      label: "New Case",
      bg: "info",
    },
    1: {
      label: "Invitation Sent",
      bg: "dark",
    },
    2: {
      label: "Accepted",
      bg: "success",
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
      <Modal.Body className="pt-0">
        <Tabs
          activeKey={activeTab}
          id="justify-tab-example"
          justify
          onSelect={(k) => setActiveTab(parseInt(k))}
        >
          <Tab eventKey={1} title="Basic Details">
            <div className="table-responsive">
              <table className="table table-borderless table-striped">
                <tbody>
                  <tr>
                    <th>Title</th>
                    <td>{record.title}</td>
                  </tr>
                  <tr>
                    <th>Case Number</th>
                    <td>{record.case_number}</td>
                  </tr>
                  <tr>
                    <th>Maximum Compensation</th>
                    <td>
                      {common.currencyFormat(record.maximum_compensation, 2)}
                    </td>
                  </tr>
                  <tr>
                    <th>Hourly Rate</th>
                    <td>
                      {record.hourly_rate
                        ? common.currencyFormat(record.hourly_rate)
                        : "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <th>Description</th>
                    <td>{record.description}</td>
                  </tr>
                  <tr>
                    <th>Status</th>
                    <td>
                      <Badge pill bg={btnStatus[record.status].bg || "info"}>
                        {btnStatus[record.status].label || "N/A"}
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
                  <div className="table-responsive" style={{ maxHeight: 200 }}>
                    <table className="table table-borderless">
                      <tbody>
                        <tr className="mx-5">
                          <th>#</th>
                          <th>Comment</th>
                          <th>Updated On</th>
                        </tr>
                        {record.case_milestones.map((mile, i) => {
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
            <div className="p-3">
              <Row>
                <Col className="">Documents</Col>
              </Row>
              <div className="table-responsive" style={{ maxHeight: 200 }}>
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Document Name </th>
                      <th>Uploaded On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {record.case_documents?.map((record, index) => (
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
            </div>
          </Tab>
          <Tab eventKey={4} title="Case Activities">
            <div style={{ maxHeight: "250px", overflowY: "auto" }}>
              <ol className="activity-feed">
                {record.logs.map((log, i) => {
                  return (
                    <li className="feed-item">
                      <time className="date">
                        {moment(log.created_at).format("LLLL")}
                      </time>
                      <span className="text">{log.content}</span>
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
          variant="primary"
          size="lg"
          onClick={() => {
            closeModal();
            showEditModal();
          }}
        >
          Edit
        </Button>
        <Button
          variant="danger"
          size="lg"
          className="ms-1"
          onClick={() => {
            closeModal();
            deleteRecord(record.id);
          }}
        >
          delete
        </Button>

        <Button
          variant="info"
          size="lg"
          className="ms-1"
          onClick={() => {
            closeModal();
            showListInvoices();
          }}
        >
          Invoices
        </Button>
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

export default ViewCaseDetails;
