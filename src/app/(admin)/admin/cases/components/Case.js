"use client";

import React, { useState } from "react";
import moment from "moment";
import { Button } from "react-bootstrap";
import SendInvitation from "./SendInvitation";
import AddEditCase from "./AddEditCase";

export default function Case({ record, getRecords, deleteRecord, index, pageNumber, recordPerPage }) {
  const [showModal, setShowModal] = useState(false);
  const [showSendInvitationModal, setShowSendInvitationModal] = useState(false);

  console.log(record);
  return (
    <>
      <tr key={`cases-key-${index}`}>
        <td>
          {pageNumber * recordPerPage -
            recordPerPage +
            Number(index + 1)}
          .
        </td>
        <td>{record.case_number}</td>
        <td>{record.title}</td>
        <td>
          {record.status ? (
            <span className="badge badge-success rounded-pill">
              Active
            </span>
          ) : (
            <span className="badge badge-danger rounded-pill">
              Inactive
            </span>
          )}
        </td>
        <td>
          {moment(record.created_at).format("D MMM,  YYYY")}
        </td>
        <td>
          <Button
            className="me-2"
            variant="info"
            onClick={() => setShowSendInvitationModal(true)}
          >
            Send Invitation
          </Button>
          <Button
            className="me-2"
            variant="primary"
            onClick={() => setShowModal(true)}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            onClick={() => deleteRecord(record.id)}
          >
            Delete
          </Button>
        </td>
      </tr>
      {showModal && (
        <AddEditCase
          showModal={showModal}
          closeModal={() => {
            setShowModal(false);
          }}
          recordId={record.id}
          reloadRecords={getRecords}
        />
      )}
      {showSendInvitationModal && (
        <SendInvitation
          showModal={showSendInvitationModal}
          closeModal={() => {
            setShowSendInvitationModal(false);
          }}
          recordId={record.id}
          reloadRecords={getRecords}
          invitedUsers={record?.case_invitations || []}
        />
      )}
    </>

  );
}
