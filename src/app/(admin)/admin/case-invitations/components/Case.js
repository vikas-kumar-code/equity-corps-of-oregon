"use client";

import React, { useState } from "react";
import moment from "moment";
import { Badge, Button, Spinner } from "react-bootstrap";
import InvitationDetails from "./InvitationDetails";
import AcceptInvitation from "./AcceptInvitation";

export default function Case({ record, getRecords, index, sn }) {
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
        <td>{sn}.</td>
        <td>{record.case.case_number}</td>
        <td>{record.case.title}</td>
        <td>
          <Badge pill bg={btnStatus[record.status].bg || "info"}>
            {btnStatus[record.status].label || "N/A"}
          </Badge>
        </td>
        <td>{moment(record.sent_on).format("D MMM,  YYYY")}</td>
        <td>
          {record?.status === 0 && (
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
          reloadRecords={getRecords}
        />
      )}

      {showConfirmation && (
        <AcceptInvitation
          showModal={showConfirmation}
          closeModal={() => {
            setConfirmation(false);
          }}
          record={record}
          reloadRecords={getRecords}
        />
      )}
    </>
  );
}
