import moment from "moment";
import React, { useState } from "react";
import { Modal, Badge, Tabs, Tab, Button, Row, Col } from "react-bootstrap";
import Documents from "./Documents";

const InvitationDetails = ({ showModal, closeModal, record, reloadRecords }) => {
  const [activeTab, setActiveTab] = useState(1);
  const [fields, setFields] = useState({
    documents: record.case.case_documents,
  });
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
            <table className="table table-borderless table-striped">
              <tbody>
                <tr>
                  <th>Case Number</th>
                  <td>{record.case.case_number}</td>
                </tr>
                <tr>
                  <th>Title</th>
                  <td>{record.case.title}</td>
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
          </Tab>
          <Tab eventKey={2} title="Milestones">
            <table className="table table-borderless table-striped">
              <tbody>
                <tr className="mx-5">
                  <th colSpan={4}>#</th>
                  <th colSpan={4}>Comment</th>
                  <th colSpan={4}>Updated On</th>
                </tr>
                {record.case.case_milestones.map((mile, i) => {
                  return (
                    <tr key={i}>
                      <td colSpan={4}>{mile.id}</td>
                      <td colSpan={4}>{mile.comment}</td>
                      <td colSpan={4}>
                        {moment(mile.milestone_date).format("D MMM,  YYYY")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Tab>
          <Tab eventKey={3} title="Documents">
            <Documents
              reloadRecords={reloadRecords}
              setDeletedDocument={(doc) => {
                setDeletedDocuments([...deletedDocuments, doc]);
              }}
              documents={fields.documents}
              errors={errors}
              setErrors={setErrors}
            />
          </Tab>
          <Tab eventKey={4} title="Case Activities">
            <tbody>
              <tr>
                <th></th>
                <th></th>
                <th></th>
              </tr>
              <ol className="activity-feed">
                {record.case.logs.map((log, i) => {
                  return (
                    <li class="feed-item">
                      <time class="date">
                        {moment(log.created_at).format("DD MMMM YYYY")}
                      </time>
                      <span class="text">{log.content}</span>
                    </li>
                  );
                })}
              </ol>
            </tbody>
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
