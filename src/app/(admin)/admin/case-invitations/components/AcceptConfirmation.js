"use client";

import React, { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import common from "@/utils/common";
import "./wave-loader.css";
import { IoCheckmarkCircle } from "react-icons/io5";
import "../../../../styles/animation.css";

export default function AcceptConfirmation({
  showModal = true,
  closeModal,
  record = {},
  getRecords = () => null,
}) {
  const [loader, setLoader] = useState(false);
  const [acceptStatus, setAcceptStatus] = useState(0);

  const handleAccept = async () => {
    setAcceptStatus(1);
    try {
      await fetch(
        common.apiPath(`/admin/cases/invitations/status?id=${record.id}`)
      )
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            setAcceptStatus(2);
            getRecords();
          } else if (response.error) {
            setAcceptStatus(0);
            toast.error(response.message);
          } else {
            setTimeout(() => {
              handleAccept();
            }, 3000);
          }
        });
    } catch (error) {
      setAcceptStatus(0);
      toast.error(error.message);
      clearInterval(caseInterval);
    }
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
        <h3>Accept Case</h3>
      </Modal.Header>
      <Modal.Body className="show-error pt-0">
        {acceptStatus !== 2 && (
          <div className="table-responsive mb-2" style={{ maxHeight: "400px" }}>
            <h6>Instructions for Accepting this Case:</h6>
            <ol>
              <li>Click the "Sign Contract" button.</li>
              <li>Fill in your first name and last name.</li>
              <li>Include your signature and submit the document.</li>
            </ol>
          </div>
        )}
        <div className="w-100 text-center mb-2">
          {acceptStatus === 0 && (
            <Button
              variant="primary"
              className="show-up-animation"
              onClick={() => {
                handleAccept();
              }}
            >
              Sign Contract
            </Button>
          )}
          {acceptStatus === 1 && (
            <div className="show-down-animation">
              <span className="wave-loader"></span>
              <br />
              <p className="text-success">
                Waiting for signature confirmation . . .
              </p>
              <p>(Please complete the process.)</p>
            </div>
          )}
          {acceptStatus === 2 && (
            <div className="show-down-animation">
              <IoCheckmarkCircle size={35} color="#00d25b" />
              <p className="mt-2">You have successfully accepted the case.</p>
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}
