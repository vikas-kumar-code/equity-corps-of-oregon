"use client";

import React, { useState, useEffect } from "react";
import { Button, Modal, Spinner, Form, Tabs, Tab } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";
import common from "@/utils/common";
LoadingOverlay.propTypes = undefined;

export default function SendCredentials(props) {
  const [loader, setLoader] = useState(false);
  const [record, setRecord] = useState({});


  return (
    <Modal
      show={props.showModal}
      onHide={props.closeModal}
      backdrop="static"
      keyboard={false}
      centered
      size="md"
    >
      <Modal.Header closeButton>
        <h3>User Information</h3>
      </Modal.Header>
      <Modal.Body>

      </Modal.Body>
    </Modal>
  );
}
