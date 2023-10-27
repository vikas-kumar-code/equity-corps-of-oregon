import React from "react";
import {
  Badge,
  ButtonGroup,
  Card,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";

import "react-datepicker/dist/react-datepicker.css";
import common from "@/utils/common";
import moment from "moment";
import { useState } from "react";
import LoadingOverlay from "react-loading-overlay";
import { useEffect } from "react";
import { toast } from "react-toastify";
import ListDocuments from "./ListDocuments";
import PaymentButtons from "../../cases/components/PaymentButtons";
import WithdrawInvoice from "./WithdrawInvoice";

const ListInvoices = ({
  caseId,
  getRecord,
  setShowInvoice,
  refresh,
  withdraw,
  setWithdraw,
}) => {
  const [records, setRecords] = useState({});
  const [errors, setErrors] = useState("");
  const [loader, setLoader] = useState(true);
  const [caseInvitationIndex, setCaseInvitationIndex] = useState(null);
  const [showDocList, setShowDocList] = useState(false);
  const [withdrawInvoice, setWithdrawInvoice] = useState([false, 0, 0]);
  const [submitted, setSubmitted] = useState(false);

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

  const deleteRecord = async (id) => {
    if (window.confirm("Are you sure to delete this invoice?")) {
      setLoader(true);
      fetch(common.apiPath(`/admin/cases/invoice/delete/${id}`), {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            toast.success(response.message);
            getRecords();
          } else if (response.error) {
            toast.error(response.message);
          }
        })
        .catch((error) => {
          toast.error(error.message);
        })
        .finally(() => setLoader(false));
    }
  };

  const sendInvoice = async (id, status) => {
    if (withdraw === "" && status === 1) {
      setErrors("Withdraw remarks can not be empty.");
    } else {
      if (
        status === 0
          ? window.confirm("Are you sure to send this invoice for approval?")
          : status === 1 &&
            window.confirm("Are you sure to withdraw this invoice?")
      ) {
        setSubmitted(true);
        setLoader(true);
        fetch(common.apiPath(`/admin/cases/invoice/send/${id}`), {
          method: "POST",
          body: JSON.stringify({ withdraw_remarks: withdraw }),
        })
          .then((response) => response.json())
          .then((response) => {
            if (response.success) {
              console.log(response.message);
              toast.success(response.message);
              getRecords();
              setWithdrawInvoice(false);
              setWithdraw("");
              setErrors("");
            } else if (response.error) {
              toast.error(response.message);
            }
          })
          .catch((error) => {
            toast.error(error.message);
          })
          .finally(() => {
            setLoader(false);
            setSubmitted(false);
          });
      }
    }
  };

  const handleShowDoc = (index) => {
    setCaseInvitationIndex(index);
    setShowDocList(true);
  };

  const btnStatus = {
    0: {
      label: "Draft",
      bg: "secondary",
    },
    1: {
      label: "Sent",
      bg: "dark",
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
  }, [refresh]);

  return (
    <div className="z-value-0">
      <LoadingOverlay active={loader} spinner text="Loading...">
        <Card>
          <Card.Body>
            <h4>Invoices</h4>
            {records?.case && records?.case_invoices && (
              <div className="table-responsive" style={{ maxHeight: 300 }}>
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
                    {records.case_invoices.map((item, index) => (
                      <>
                        <tr key={`invoice-${index}`}>
                          <td>{index + 1}</td>
                          <td>
                            {item.name}
                            {item?.files &&
                              JSON.parse(item?.files)?.length > 0 && (
                                <a
                                  href="#"
                                  className="d-block text-primary"
                                  onClick={() => handleShowDoc(index)}
                                >
                                  View files
                                </a>
                              )}
                          </td>
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
                                  onClick={() =>
                                    sendInvoice(item.id, item.status)
                                  }
                                >
                                  <span className="mdi mdi-send"></span>
                                  Send
                                </Dropdown.Item>
                              )}

                              <Dropdown.Item
                                eventKey="1"
                                onClick={() => setShowInvoice(item.id)}
                              >
                                <span className="mdi mdi-eye"></span>
                                View
                              </Dropdown.Item>
                              {item.status === 1 && (
                                <Dropdown.Item
                                  eventKey="2"
                                  onClick={() =>
                                    setWithdrawInvoice([
                                      true,
                                      item.id,
                                      item.status,
                                    ])
                                  }
                                >
                                  <span class="mdi mdi-comment-remove-outline"></span>
                                  Withdraw
                                </Dropdown.Item>
                              )}
                              {item.status === 0 && (
                                <Dropdown.Item
                                  eventKey="2"
                                  onClick={() => getRecord(item.id)}
                                >
                                  <span className="mdi mdi-pencil"></span>
                                  Edit
                                </Dropdown.Item>
                              )}
                              {item.status == 0 && (
                                <Dropdown.Item
                                  eventKey="3"
                                  onClick={() => deleteRecord(item.id)}
                                >
                                  <span className="mdi mdi-delete"></span>
                                  Delete
                                </Dropdown.Item>
                              )}
                            </DropdownButton>
                          </td>
                        </tr>
                        {item.status === 2 && (
                          <tr style={{ backgroundColor: "#009c0014" }}>
                            <td className="py-2"></td>
                            <td
                              colSpan={6}
                              className="text-start py-2"
                              style={{ color: "#434343" }}
                            >
                              <strong>
                                Payments -
                                <PaymentButtons item={item} />
                              </strong>
                            </td>
                          </tr>
                        )}
                      </>
                    ))}
                    {records.case_invoices.length <= 0 && (
                      <tr>
                        <td colSpan={6}>
                          <h6 className="text-gray text-center m-5">
                            No records available
                          </h6>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </Card.Body>
        </Card>
      </LoadingOverlay>
      <WithdrawInvoice
        showWithdrawModal={withdrawInvoice}
        sendInvoice={sendInvoice}
        withdraw={withdraw}
        errors={errors}
        setWithdraw={setWithdraw}
        submitted={submitted}
        closeModal={() => {
          setWithdrawInvoice([false, 0, 0]);
          setErrors("");
        }}
      />
      <ListDocuments
        showDocList={showDocList}
        closeModal={() => setShowDocList(false)}
        records={records}
        caseInvitationIndex={caseInvitationIndex}
      />
    </div>
  );
};

export default ListInvoices;
