import React from "react";
import {
  Badge,
  ButtonGroup,
  Col,
  Dropdown,
  DropdownButton,
  Modal,
  Row,
} from "react-bootstrap";

import "react-datepicker/dist/react-datepicker.css";
import common from "@/utils/common";
import moment from "moment";
import { useState } from "react";
import LoadingOverlay from "react-loading-overlay";
import { useEffect } from "react";
import ViewInvoice from "./ViewInvoice";
import InvoicePayment from "./InvoicePayment";

const ListInvoices = ({ showModal, closeModal, caseId }) => {
  const [showInvoice, setShowInvoice] = useState(null);
  const [invoicePayment, setInvoicePayment] = useState(null);
  const [payModal, setPayModal] = useState(null);
  const [records, setRecords] = useState({});
  const [loader, setLoader] = useState(true);

  const getRecords = async () => {
    setLoader(true);
    try {
      await fetch(common.apiPath(`/admin/cases/invoice/list/${caseId}`))
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            setRecords(response.records);
          } else if (response.error) {
            toast.error(response.message);
          }
        });
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoader(false);
    }
  };

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

  useEffect(() => {
    getRecords();
  }, []);

  console.log(records.case_invoices);
  return (
    <>
      <Modal
        show={showModal}
        onHide={closeModal}
        backdrop="static"
        keyboard={false}
        centered
        size="lg"
        className={showInvoice ? "fade-out" : "fade-in"}
      >
        <Modal.Header closeButton className="border-bottom-0">
          <h3>Manage invoices</h3>
        </Modal.Header>
        <Modal.Body className="pt-0">
          <LoadingOverlay active={loader} spinner text="Loading...">
            <div className="modal-body-scroll">
              <Row
                className="bg-light m-0 p-3 text-center"
                style={{ fontSize: "0.8rem" }}
              >
                <Col>
                  <h6 className="m-0">
                    CASE NUMBER: <strong> {records.case?.case_number}</strong>{" "}
                  </h6>
                </Col>
                <Col>
                  <h6 className="m-0">
                    MAX COMPENSATION:{" "}
                    <strong>
                      {common.currencyFormat(
                        records.case?.maximum_compensation,
                        2
                      )}
                    </strong>
                  </h6>
                </Col>
              </Row>
              {records.case && records.case_invoices && (
                <div className="table-responsive">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Invoice</th>
                          <th>Total Amount</th>
                          <th>Paid Amount</th>
                          <th>Added On</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {records.case_invoices.map((item, index) => (
                          <>
                            <tr>
                              <td>{index + 1}</td>
                              <td>{item.name}</td>
                              <td>
                                {common.currencyFormat(item.total_amount, 2)}
                              </td>
                              <td>
                                {common.currencyFormat(item.total_amount, 2)}
                              </td>
                              <td>
                                {moment(item.added_on).format("D MMM, YYYY")}
                              </td>
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
                                  <Dropdown.Item
                                    eventKey="1"
                                    onClick={() => setShowInvoice(item.id)}
                                  >
                                    <span className="mdi mdi-eye"></span>
                                    View
                                  </Dropdown.Item>
                                  {item.status <= 2 && (
                                    <Dropdown.Item
                                      eventKey="2"
                                      onClick={() => setInvoicePayment(item)}
                                    >
                                      <span className="mdi mdi-currency-usd"></span>
                                      Pay
                                    </Dropdown.Item>
                                  )}
                                </DropdownButton>
                              </td>
                            </tr>
                            {item.status === 2 && (
                              <tr>
                                <td colSpan={4}>Payments</td>
                                <td>$200</td>
                                <td>$300</td>
                              </tr>
                            )}
                          </>
                        ))}
                        {(!records.case_invoices ||
                          records.case_invoices.length <= 0) && (
                            <tr>
                              <td colSpan={6}>
                                <h6 className="text-gray">
                                  No records available
                                </h6>
                              </td>
                            </tr>
                          )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </LoadingOverlay>
        </Modal.Body>
      </Modal>

      {showInvoice && (
        <ViewInvoice
          showModal={showInvoice ? true : false}
          closeModal={() => setShowInvoice(null)}
          invoiceId={showInvoice}
        />
      )}

      {invoicePayment && (
        <InvoicePayment
          showModal={invoicePayment ? true : false}
          closeModal={() => setInvoicePayment(null)}
          record={invoicePayment}
          reloadRecords={getRecords}
        />
      )}
    </>
  );
};

export default ListInvoices;
