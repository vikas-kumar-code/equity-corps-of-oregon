"use client";

import React, { useState } from "react";
import moment from "moment";
import {
  Badge,
  ButtonGroup,
  Dropdown,
  DropdownButton,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import SendInvitation from "./SendInvitation";
import AddEditCase from "./AddEditCase";
import ListInvoices from "./ListInvoices";
import EcoProviders from "./EcoProviders";
import ViewCaseDetails from "./ViewCaseDetails";

export default function Case({ record, getRecords, deleteRecord, sn }) {
  const [showModal, setShowModal] = useState(false);
  const [showCaseModal, setShowCaseModal] = useState(false);
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
        </td>
        <td>{moment(record.created_at).format("D MMM,  YYYY")}</td>
        <td>
          <OverlayTrigger          
            placement="top"
            overlay={
              <Tooltip id={`tooltip-key-${sn}`}>
                {record.logs.length > 0
                  ? `${
                      record.logs[Number(record.logs.length) - 1].content
                    } on ${moment(
                      record.logs[Number(record.logs.length) - 1].created_at
                    ).format("D MMM,  YYYY")}`
                  : "..."}
              </Tooltip>
            }
          >
            {({ ref, ...triggerHandler }) => (
              <spna
                className="text-primary p-2"
                role="button"
                ref={ref}
                {...triggerHandler}
              >
                <span class="mdi mdi-information-outline fs-3"></span>
              </spna>
            )}
          </OverlayTrigger>
        </td>
        <td>
          <DropdownButton
            as={ButtonGroup}
            key="action-1"
            id={`action-btn-1`}
            variant="primary"
            title="Action"
            align="end"
          >
            <Dropdown.Item eventKey="1" onClick={() => setShowCaseModal(true)}>
              <span className="mdi mdi-eye"></span>
              View
            </Dropdown.Item>
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

      {showCaseModal && (
        <ViewCaseDetails
          showModal={showCaseModal}
          closeModal={() => {
            setShowCaseModal(false);
          }}
          record={record}
          showEditModal={() => setShowModal(true)}
          showListInvoices={() => setShowListInvoices(true)}
          deleteRecord={deleteRecord}
        />
      )}

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
