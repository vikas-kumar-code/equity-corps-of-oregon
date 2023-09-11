"use client";

import React, { useState } from "react";
import moment from "moment";
import {
  Badge,
  Button,
  ButtonGroup,
  Dropdown,
  DropdownButton,
  Spinner,
} from "react-bootstrap";
import InvitationDetails from "./InvitationDetails";
import AcceptInvitation from "./AcceptInvitation";
import AddEditInvoice from "./AddEditInvoice";

export default function Case({
  record,
  getRecords,
  index,
  pageNumber,
  recordPerPage,
}) {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setConfirmation] = useState(false);
  const [invoiceModal, setInvoiceModal] = useState(false);

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
        <td>{record.case.case_number}</td>
        <td>{record.case.title}</td>
        <td>
          <Badge pill bg={btnStatus[record.status].bg || "info"}>
            {btnStatus[record.status].label || "N/A"}
          </Badge>
        </td>
        <td>{moment(record.sent_on).format("D MMM,  YYYY")}</td>
        <td>
          <DropdownButton
            as={ButtonGroup}
            key="action-1"
            id={`action-btn-1`}
            variant="primary"
            title="Action"
          >            
            <Dropdown.Item eventKey="2" onClick={() => setShowModal(true)}>
              View
            </Dropdown.Item>
            {record?.status === 0 && (
              <Dropdown.Item eventKey="1" onClick={() => setConfirmation(true)}>
                Accept
              </Dropdown.Item>
            )}
            <Dropdown.Item eventKey="3" onClick={() => setInvoiceModal(true)}>
              Invoice
            </Dropdown.Item>
          </DropdownButton>
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

      {invoiceModal && (
        <AddEditInvoice
          showModal={invoiceModal}
          closeModal={() => {
            setInvoiceModal(false);
          }}
          caseId={record.case.id}
          reloadRecords={getRecords}
        />
      )}
    </>
  );
}
