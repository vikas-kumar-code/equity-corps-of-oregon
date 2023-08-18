import moment from "moment";
import React from "react";
import { Modal, Table, Badge } from "react-bootstrap";

const InvitationDetails = ({ showModal, closeModal, record }) => {
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
      size="md"
    >
      <Modal.Header closeButton className="border-bottom-0">
        <h3>Invitation Details</h3>
      </Modal.Header>
      <Modal.Body className="show-error pt-0">
        <div className="table-responsive mb-2" style={{ maxHeight: "400px" }}>
          <Table
            bordered
            hover
            variant="dark"
            size="sm"
            className="table-padding-1"
          >
            <thead>
              <tr>
                <th colSpan={3}>Case Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Case Number</th>
                <td>{record.case_number}</td>
              </tr>
              <tr>
                <th>Title</th>
                <td>{record.title}</td>
              </tr>
              <tr>
                <th>Description</th>
                <td>{record.description}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>
                  <Badge
                    pill
                    bg={iStatus[record.case_invitations[0].status].bg || "info"}
                  >
                    {iStatus[record.case_invitations[0].status].label || "N/A"}
                  </Badge>
                </td>
              </tr>
              <tr>
                <th>Added On</th>
                <td>{moment(record.case_invitations[0].sent_on).format("D MMM, YYYY")}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default InvitationDetails;
