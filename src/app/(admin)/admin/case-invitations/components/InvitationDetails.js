import React from "react";
import {
  Button,
  Modal,
  Spinner,
  Form,
  Col,
  Table,
  Badge,
} from "react-bootstrap";

const InvitationDetails = (props) => {
  const iStatus = {
    0: {
      label: "Pending",
      bg: "info",
    },
    1: {
      label: "Accepted",
      bg: "success",
    },
    2: {
      label: "Expired",
      bg: "warning",
    },
  };

  return (
    <Modal
      show={props.showModal}
      onHide={props.closeModal}
      backdrop="static"
      keyboard={false}
      centered
      size="md"
    >
      <Modal.Header closeButton className="border-bottom-0">
        <h3>Invitation Details</h3>
      </Modal.Header>
      <Modal.Body className="show-error">
        <div className="table-responsive mb-2" style={{ maxHeight: "200px" }}>
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
              <tr>
                <th>User</th>
                <th className="text-center">Status</th>
                <th className="text-center">Sent On</th>
              </tr>
            </thead>
            <tbody>
              {props?.invitedUsers.map((data) => {
                return (
                  <tr>
                    <td>
                      {`${data?.user?.name}`} <br /> {`${data?.user?.email}`}
                    </td>
                    <td className="text-center">
                      <Badge bg={iStatus[data.status].bg || "info"}>
                        {iStatus[data.status].label || "N/A"}
                      </Badge>
                    </td>
                    <td className="text-center">
                      {moment(data.sent_on).format("D MMM, YYYY")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default InvitationDetails;
