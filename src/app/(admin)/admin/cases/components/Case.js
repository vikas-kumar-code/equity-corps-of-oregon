"use client";

import React, { useState } from "react";
import moment from "moment";
import { Button, ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
import SendInvitation from "./SendInvitation";
import AddEditCase from "./AddEditCase";

export default function Case({ record, getRecords, deleteRecord, sn }) {
  const [showModal, setShowModal] = useState(false);
  const [showSendInvitationModal, setShowSendInvitationModal] = useState(false);

  console.log(record);
  return (
    <>
      <tr key={`cases-key-${sn}`}>
        <td>{sn}.</td>
        <td>{record.case_number}</td>
        <td>{record.title}</td>
        <td>
          {record.status ? (
            <span className="badge badge-success rounded-pill">Active</span>
          ) : (
            <span className="badge badge-danger rounded-pill">Inactive</span>
          )}
        </td>
        <td>{moment(record.created_at).format("D MMM,  YYYY")}</td>
        <td>
          <DropdownButton
            as={ButtonGroup}
            key="action-1"
            id={`action-btn-1`}
            variant="primary"
            title="Action"
            align="end"
          >
            <Dropdown.Item
              eventKey="1"
              onClick={() => setShowSendInvitationModal(true)}
            >
              Send Invitation
            </Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={() => setShowModal(true)}>
              Edit
            </Dropdown.Item>
            <Dropdown.Item eventKey="3" onClick={() => deleteRecord(record.id)}>
              Delete
            </Dropdown.Item>
          </DropdownButton>
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
