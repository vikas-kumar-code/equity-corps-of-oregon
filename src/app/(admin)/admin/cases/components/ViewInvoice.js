import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import "../../../../styles/invoice.css";
import moment from "moment";
import common from "@/utils/common";
import LoadingOverlay from "react-loading-overlay";
import { toast } from "react-toastify";

const ViewInvoice = ({ showModal, closeModal, invoiceId }) => {
  const [loader, setLoader] = useState(true);
  const [record, setRecord] = useState({});

  const getRecord = async () => {
    setLoader(true);
    try {
      await fetch(common.apiPath(`/admin/cases/invoice/get/${invoiceId}`))
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            setRecord(response.record);
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

  useEffect(() => {
    getRecord();
  }, []);

  return (
    <Modal
      show={showModal}
      onHide={closeModal}
      backdrop="static"
      keyboard={false}
      centered
      size="lg"
    >
      <Modal.Header closeButton className="border-bottom-0">
        <h3 className="text-white">-</h3>
      </Modal.Header>
      <LoadingOverlay active={loader} spinner text="Loading...">
        <Modal.Body className="pt-0" style={{ minHeight: 200 }}>
          {record.case_invoice && record.admin && (
            <div className="print-content">
              <div id="invoice">
                <div class="invoice overflow-auto">
                  <div style={{ minWidth: 600 }}>
                    <header>
                      <div class="row">
                        <div class="col">
                          <span className="brand-logo ps-0">
                            EC<span style={{ color: "#ca8a2e" }}>O</span>
                          </span>
                        </div>
                        <div class="col company-details">
                          <b class="name">
                            <span>Equity Corps of Oregon</span>
                          </b>
                          <div>455 Foggy Heights, AZ 85004, US</div>
                          <div>(123) 456-789</div>
                          <div>company@example.com</div>
                        </div>
                      </div>
                    </header>
                    <main>
                      <div class="row contacts">
                        <div class="col invoice-to">
                          <div class="text-gray-light">INVOICE TO:</div>
                          <h6 className="mt-1">
                            Case Number - <b>{record.case.case_number}</b>
                          </h6>
                          <h2 class="to">{record.admin.name}</h2>
                          <div class="address">{record.admin.address}</div>
                          <div class="email">
                            <a href={"mailto:" + record.admin.email}>
                              {record.admin.email}
                            </a>
                          </div>
                        </div>
                        <div class="col invoice-details">
                          <h1 class="invoice-id">INVOICE {record.id}</h1>
                          <div class="date">
                            Date of Invoice:{" "}
                            {moment(record.added_on).format("DD/MM/YYYY")}
                          </div>
                          <div class="date">
                            Due Date:{" "}
                            {moment(record.due_on).format("DD/MM/YYYY")}
                          </div>
                        </div>
                      </div>
                      <div className="table-responsive min-list-height">
                        <table border="0" cellspacing="0" cellpadding="0">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>PARTICULAR</th>
                              <th class="text-end">AMOUNT</th>
                            </tr>
                          </thead>
                          <tbody>
                            {record.case_invoice.particulars &&
                              record.case_invoice.particulars.map(
                                (item, index) => {
                                  return (
                                    <tr>
                                      <td class="no">
                                        {String(index + 1).padStart(2, 0)}
                                      </td>
                                      <td class="text-left">
                                        {item.description}
                                      </td>
                                      <td class="total">
                                        {common.currencyFormat(item.amount)}
                                      </td>
                                    </tr>
                                  );
                                }
                              )}
                          </tbody>
                          <tfoot>
                            <tr>
                              <td></td>
                              <td>GRAND TOTAL</td>
                              <td>
                                {common.currencyFormat(
                                  record.case_invoice.total_amount
                                )}
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </main>
                    <footer>
                      Invoice was created on a computer and is valid without the
                      signature and seal.
                    </footer>
                  </div>
                  <div></div>
                </div>
              </div>
              <div className="w-100 text-center no-print">
                <button
                  id="printInvoice"
                  class="btn btn-primary"
                  onClick={() => window.print()}
                >
                  <span class="mdi mdi-printer me-1"></span>
                  Print
                </button>
              </div>
            </div>
          )}
        </Modal.Body>
      </LoadingOverlay>
    </Modal>
  );
};

export default ViewInvoice;
