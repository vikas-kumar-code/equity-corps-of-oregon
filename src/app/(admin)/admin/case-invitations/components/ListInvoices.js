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

const ListInvoices = ({
  caseId,
  getRecord,
  setShowInvoice,
  refresh,
}) => {
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

  const sendInvoice = async (id) => {
    if (window.confirm("Are you sure to send this invoice for approval?")) {
      setLoader(true);
      fetch(common.apiPath(`/admin/cases/invoice/send/${id}`), {
        method: "POST",
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
    <>
      <LoadingOverlay active={loader} spinner text="Loading...">
        <Card>
          <Card.Body>
            <h4>Invoices</h4>

            {records.case && records.case_invoices && (
              <div className="table-responsive">
                <div className="table-responsive">
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
                      ))}
                      {records.case_invoices.length <= 0 && (
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
            )}
          </Card.Body>
        </Card>
      </LoadingOverlay>
    </>
  );
};

export default ListInvoices;
