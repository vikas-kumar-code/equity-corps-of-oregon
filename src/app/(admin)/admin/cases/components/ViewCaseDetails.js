import moment from "moment";
import React, { useState } from "react";
import { Modal, Badge, Tabs, Tab, Button } from "react-bootstrap";
import common from "@/utils/common";

const ViewCaseDetails = ({
  showModal,
  closeModal,
  record,
  deleteRecord,
  showEditModal,
  showListInvoices,
}) => {
  const [activeTab, setActiveTab] = useState(1);

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

  let clients = JSON.parse(record.clients);
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
                    <td width="30%">
                      <strong>Title</strong>
                    </td>
                    <td>{record.title}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Case Number</strong>
                    </td>
                    <td>{record.case_number}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Maximum Compensation</strong>
                    </td>
                    <td>
                      {common.currencyFormat(record.maximum_compensation, 2)}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Hourly Rate</strong>
                    </td>
                    <td>
                      {record.hourly_rate
                        ? common.currencyFormat(record.hourly_rate)
                        : "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Description</strong>
                    </td>
                    <td>{record.description}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Status</strong>
                    </td>
                    <td>
                      <Badge pill bg={btnStatus[record.status].bg || "info"}>
                        {btnStatus[record.status].label || "N/A"}
                      </Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Added On</strong>
                    </td>
                    <td>{moment(record.sent_on).format("D MMM, YYYY")}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Tab>
          <Tab eventKey={2} title="Clients" className="ps-5 pt-2 pe-5">
            <div className="table-responsive" style={{ maxHeight: 200 }}>
              <table className="table table-borderless">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name </th>
                    <th>Last Name</th>
                    <th>DOB</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.length > 0 &&
                    clients.map((client, i) => {
                      return (
                        <tr>
                          <td>{i + 1}</td>
                          <td>{client.first_name}</td>
                          <td>{client.last_name}</td>
                          <td>{moment(client.dob).format("D MMM, YYYY")}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </Tab>
          <Tab eventKey={3} title="Milestones" className="ps-5 pt-2 pe-5">
            <div className="table-responsive" style={{ maxHeight: 200 }}>
              <table className="table table-borderless">
                <thead>
                  <tr className="mx-5">
                    <th>#</th>
                    <th>Comment</th>
                    <th>Updated On</th>
                  </tr>
                </thead>
                <tbody>
                  {record.case_milestones.map((mile, i) => {
                    return (
                      <tr key={i}>
                        <td>{mile.id}</td>
                        <td>{mile.comment}</td>
                        <td>
                          {moment(mile.milestone_date).format("D MMM,  YYYY")}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Tab>
          <Tab eventKey={4} title="Documents" className="ps-5 pt-2 pe-5">
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
          </Tab>
          <Tab eventKey={5} title="Case Activities">
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
          Delete
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
