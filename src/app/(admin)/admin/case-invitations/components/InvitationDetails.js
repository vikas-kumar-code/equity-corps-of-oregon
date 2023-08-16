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
      <Modal.Body className="show-error"></Modal.Body>
    </Modal>
  );
};

export default InvitationDetails;
