import React from "react";
import {
  Badge,
  ButtonGroup,
  Dropdown,
  DropdownButton,
  Modal,
} from "react-bootstrap";
import InvoiceDetails from "../../case-invitations/components/InvoiceDetails";
import "react-datepicker/dist/react-datepicker.css";
import common from "@/utils/common";
import moment from "moment";
import { useState } from "react";

const Invoices = ({
  showModal,
  closeModal,
  record,
  reloadRecords,  
}) => {
  const [invoiceDetails, setInvoiceDetails] = useState(null);
  const [adminDetails, setAdminDetails] = useState({});
  const [payModal, setPayModal] = useState(null);

  const btnStatus = {
    0: {
      label: "Draft",
      bg: "secondary",
    },
    1: {
      label: "Pending",
      bg: "warning",
    },
    2: {
      label: "Partially Paid",
      bg: "info",
    },
    3: {
      label: "Paid",
      bg: "success",
    },
  };

  return (
    <>
      <Modal
        show={showModal}
        onHide={closeModal}
        backdrop="static"
        keyboard={false}
        centered
        size="lg"
      >
        <Modal.Header closeButton className="border-bottom-0">
          <h3>Manage invoices for case {record.case_number}</h3>
        </Modal.Header>
        <Modal.Body className="pt-0">
          <div className="table-responsive">
            <h6 className="float-end">
              Maximum compensation -{" "}
              {common.currencyFormat(record.maximum_compensation)}
            </h6>
            <h5 className="">Invoices</h5>
            <div className="table-responsive min-list-height">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Invoice</th>
                    <th>Total Amount</th>
                    <th>Added On</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {record.case_invoices.map((item, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{common.currencyFormat(item.total_amount, 2)}</td>
                      <td>{moment(item.added_on).format("D MMM, YYYY")}</td>
                      <td>
                        <Badge
                          pill
                          bg={btnStatus[item.status].bg || "info"}
                          size="sm"
                        >
                          {btnStatus[item.status].label || "N/A"}
                        </Badge>
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
                          {item.status === 0 && (
                            <Dropdown.Item
                              eventKey="4"
                              onClick={() => sendInvoice(item.id)}
                            >
                              <span class="mdi mdi-send"></span>
                              Send
                            </Dropdown.Item>
                          )}

                          <Dropdown.Item
                            eventKey="1"
                            onClick={() => setInvoiceDetails(item)}
                          >
                            <span className="mdi mdi-eye"></span>
                            View
                          </Dropdown.Item>
                          {item.status <= 2 && (
                            <Dropdown.Item
                              eventKey="2"
                              onClick={() => getRecord(item.id)}
                            >
                              <span class="mdi mdi-currency-usd"></span>
                              Pay
                            </Dropdown.Item>
                          )}
                        </DropdownButton>
                      </td>
                    </tr>
                  ))}
                  {record.case_invoices.length <= 0 && (
                    <tr>
                      <td colSpan={6}>
                        <h6 className="text-gray">No records available</h6>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {invoiceDetails && (
        <InvoiceDetails
          showModal={invoiceDetails ? true : false}
          closeModal={() => setInvoiceDetails(null)}
          record={{ ...invoiceDetails, case: record }}
          adminDetails={adminDetails}
        />
      )}

      {payModal && (
        <InvoiceDetails
          showModal={payModal ? true : false}
          closeModal={() => setPayModal(null)}
          record={payModal}          
        />
      )}
    </>
  );
};

export default Invoices;
