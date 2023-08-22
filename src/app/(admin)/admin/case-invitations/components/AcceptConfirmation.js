"use client";

import React, { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import common from "@/utils/common";
import "./wave-loader.css";
import { IoCheckmarkCircle } from "react-icons/io5";

export default function AcceptConfirmation({
  showModal = true,
  closeModal,
  record = {},
  getRecords = () => null,
}) {
  const [loader, setLoader] = useState(false);
  const [caseInterval, setCaseInterval] = useState(null);
  const [acceptStatus, setAcceptStatus] = useState(0);

  const handleAccept = async (case_id = "") => {
    if (window.confirm("Are you sure to proceed?")) {
      setAcceptStatus(1);
      setCaseInterval(
        setInterval(async () => {
          try {
            await fetch(
              common.apiPath(`/admin/cases/invitations/status?id=${case_id}`)
            )
              .then((response) => response.json())
              .then((response) => {
                if (response.success) {
                  clearInterval(caseInterval);
                  toast.success(response.message);
                  setAcceptStatus(2);
                  getRecords();
                } else if (response.error) {
                  toast.error(response.message);
                  clearInterval(caseInterval);
                }
              });
          } catch (error) {
            toast.error(error.message);
          }
        }, 5000)
      );
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
        <div className="table-responsive mb-2" style={{ maxHeight: "400px" }}>
          <h6>Instructions for Accepting this Case:</h6>
          <ol>
            <li>Click the "Sign Document" button.</li>
            <li>Fill in your first name and last name.</li>
            <li>Include your signature and submit the document.</li>
          </ol>
        </div>
        <div className="w-100 text-center mb-2">
          {acceptStatus === 0 && (
            <Button variant="primary" onClick={()=>setAcceptStatus(1)}>Sign Document</Button>
          )}
          {acceptStatus === 1 && (
            <>
              <span className="wave-loader"></span>
              <br />
              <p className="text-success">
                Waiting for signature confirmation . . .
              </p>
              <p>(Please complete the process)</p>
            </>
          )}
          {acceptStatus === 2 && (
            <div>
              <IoCheckmarkCircle size={35} color="#00d25b" />
              <p className="mt-2">You have successfully accepted the case.</p>
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}
