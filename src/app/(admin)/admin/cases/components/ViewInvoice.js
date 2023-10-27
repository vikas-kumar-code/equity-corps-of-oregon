import React, { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import "../../../../styles/invoice.css";
import moment from "moment";
import common from "@/utils/common";
import LoadingOverlay from "react-loading-overlay";
import { toast } from "react-toastify";

const ViewInvoice = ({
  showModal,
  closeModal,
  invoiceId,
  fields,
  caseData,
  submitted,
  handleSubmit,
  submissionAction
}) => {
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

  const invoiceData = invoiceId == 0 ? fields : record?.case_invoice;
  const submission = submissionAction == 1 ? false : true;
  const totalAmount = invoiceData?.particulars.reduce((acc, item) => acc + item.amount , 0);

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
          {record.admin && (
            <div className="print-content">
              <div id="invoice">
                <div className="invoice overflow-auto">
                  <div style={{ minWidth: 600 }}>
                    <header>
                      <div className="row">
                        <div className="col">
                          <span className="brand-logo ps-0">
                            EC<span style={{ color: "#ca8a2e" }}>O</span>
                          </span>
                          <h6 className="mt-1 mb-0">
                            Case Number - <b>{caseData?.case_number}</b>
                          </h6>
                          <h2 className="mb-0">{record?.admin?.name}</h2>
                          <div className="address">
                            {record?.admin?.address}
                          </div>
                          <div className="email">
                            <a href={"mailto:" + record?.admin?.email}>
                              {record.admin.email}
                            </a>
                          </div>
                        </div>
                        <div className="col company-details">
                        <h1 className="invoice-id">INVOICE {record.id}</h1>
                          <div className="date">
                            Date of Invoice:{" "}
                            {moment(invoiceData.added_on).format("DD/MM/YYYY")}
                          </div>
                          <div className="date">
                            Due Date:{" "}
                            {moment(invoiceData.due_on).format("DD/MM/YYYY")}
                          </div>
                        </div>
                      </div>
                    </header>
                    <main>
                      <div className="table-responsive min-list-height">
                        <table>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th className="col-md-6">PARTICULAR</th>
                              <th className="col-md-1">HOURLY RATE</th>
                              <th className="col-md-1">HOURS</th>
                              <th className="col-md-1">AMOUNT</th>
                            </tr>
                          </thead>
                          <tbody>
                            {invoiceData?.particulars &&
                              invoiceData?.particulars.map((item, index) => {
                                return (
                                  <tr>
                                    <td className="no">
                                      {String(index + 1).padStart(2, 0)}
                                    </td>
                                    <td>
                                      <div>{item?.category?.label !==
                                      "Other - Describe"
                                        ? item?.category?.label
                                        : item?.other_category}</div>
                                        <div>{item.short_description}</div>
                                    </td>
                                    <td
                                      className="text-end"
                                      style={{ backgroundColor: "#ddd" }}
                                    >
                                      {common.currencyFormat(
                                        caseData?.hourly_rate
                                      )}
                                    </td>
                                    <td className="text-end">
                                      {item?.hours_worked ? item?.hours_worked : "N/A"}
                                    </td>
                                    <td className="total">
                                      {common.currencyFormat(item?.amount)}
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                          <tfoot>
                            <tr>
                              <td colSpan={4} className="text-end">GRAND TOTAL</td>
                              <td className="text-end">
                                {common.currencyFormat(
                                  totalAmount
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
              {record?.case_invoice?.status == undefined ?  
                <Button
                  variant="success"
                  type="button"
                  className="ms-2 me-1"
                  disabled={!!submitted}
                  onClick={()=>handleSubmit(null, submission)}
                >
                  {submitted === 1 || submitted === 2 ? (
                    <Spinner className="me-1" color="light" size="sm" />
                  ): <span className="mdi mdi-send me-1"></span>}
                  
                  Submit
                </Button>:
                <Button
                  id="printInvoice"
                  className="btn btn-primary"
                  onClick={() => window.print()}
                >
                  <span className="mdi mdi-printer me-1"></span>
                  Print
                </Button>}
              </div>
            </div>
          )}
        </Modal.Body>
      </LoadingOverlay>
    </Modal>
  );
};

export default ViewInvoice;
