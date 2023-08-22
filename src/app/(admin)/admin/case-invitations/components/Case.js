"use client";

import React, { useState } from "react";
import moment from "moment";
import { Badge, Button, Spinner } from "react-bootstrap";
import InvitationDetails from "./InvitationDetails";
import { toast } from "react-toastify";
import common from "@/utils/common";
import AcceptConfirmation from "./AcceptConfirmation";

export default function Case({
  record,
  getRecords,
  index,
  pageNumber,
  recordPerPage,
}) {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setConfirmation] = useState(false);

  const btnStatus = {
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
    <>
      <tr key={`cases-key-${index}`}>
        <td>
          {pageNumber * recordPerPage - recordPerPage + Number(index + 1)}.
        </td>
        <td>{record.case_number}</td>
        <td>{record.title}</td>
        <td>
          <Badge
            pill
            bg={btnStatus[record.case_invitations[0]?.status].bg || "info"}
          >
            {btnStatus[record.case_invitations[0]?.status].label || "N/A"}
          </Badge>
        </td>
        <td>
          {moment(record.case_invitations[0].sent_on).format("D MMM,  YYYY")}
        </td>
        <td>
          {(!record?.case_invitations[0]?.status ||
            record?.case_invitations[0]?.status !== 1) && (
            <Button
              className="me-2"
              variant="success"
              onClick={() => setConfirmation(true)}
            >
              Accept
            </Button>
          )}
          <Button
            className="me-2"
            variant="primary"
            onClick={() => setShowModal(true)}
          >
            View
          </Button>
        </td>
      </tr>

      {showModal && (
        <InvitationDetails
          showModal={showModal}
          closeModal={() => {
            setShowModal(false);
          }}
          record={record}
        />
      )}

      {showConfirmation && (
        <AcceptConfirmation
          showModal={showConfirmation}
          closeModal={() => {
            setConfirmation(false);
          }}
          record={record}
          getRecords={getRecords}
        />
      )}
    </>
  );
}
