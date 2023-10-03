"use client";

import React, { useState } from "react";
import moment from "moment";
import { Badge, ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
import SendInvitation from "./SendInvitation";
import AddEditCase from "./AddEditCase";
import ListInvoices from "./ListInvoices";
import EcoProviders from "./EcoProviders";

export default function Case({ record, getRecords, deleteRecord, sn }) {
  const [showModal, setShowModal] = useState(false);
  const [showSendInvitationModal, setShowSendInvitationModal] = useState(false);
  const [showListInvoices, setShowListInvoices] = useState(false);

  const btnStatus = {
    0: {
      label: "New Case",
      bg: "info",
    },
    1: {
      label: "Invitation Sent",
      bg: "dark",
    },
    2: {
      label: "Accepted",
      bg: "success",
    },
  };

  console.log(record.status);
  return (
    <>
      <tr key={`cases-key-${sn}`}>
        <td>{sn}.</td>
        <td>{record.case_number}</td>
        <td>{record.title}</td>
        <td>
          <EcoProviders record={record} />
        </td>
        <td>
          <Badge pill bg={btnStatus[record.status].bg || "info"} size="sm">
            {btnStatus[record.status].label || "N/A"}
          </Badge>
          {/* {record.status ? (
            <span className="badge badge-success rounded-pill">Active</span>
          ) : (
            <span className="badge badge-danger rounded-pill">Inactive</span>
          )} */}
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
              <span className="mdi mdi-send"></span>
              Send Invitation
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="1"
              onClick={() => setShowListInvoices(true)}
            >
              <span className="mdi mdi-file-document"></span>
              Invoices
            </Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={() => setShowModal(true)}>
              <span className="mdi mdi-pencil"></span>
              Edit
            </Dropdown.Item>
            <Dropdown.Item eventKey="3" onClick={() => deleteRecord(record.id)}>
              <span className="mdi mdi-delete"></span>
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
      {showListInvoices && (
        <ListInvoices
          showModal={showListInvoices}
          closeModal={() => setShowListInvoices(false)}
          caseId={record.id}
        />
      )}
    </>
  );
}
