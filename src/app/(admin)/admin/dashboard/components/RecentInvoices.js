import common from "@/utils/common";
import moment from "moment";
import React from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";

const RecentInvoices = ({ records, loader }) => {
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

  return (
    <LoadingOverlay active={loader} spinner>
      <Card>
        <Card.Body>
          <h4 className="card-title">Recent Invoices</h4>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th> Name </th>
                  <th> Total Amount </th>
                  <th> Status </th>
                </tr>
              </thead>
              <tbody>
                {records.recentInvoices?.map((invoice, i) => {
                  const {
                    id,
                    status,
                    name,
                    particulars,
                    total_amount,
                    added_on,
                    due_on,
                  } = invoice;
                  return (
                    <tr key={`invoice-${id}-${i}`}>
                      <td>
                        <span className="ps-2">{name}</span>
                      </td>
                      <td>{common.currencyFormat(total_amount, 2) ?? "N/A"}</td>
                      <td>
                        <Badge
                          pill
                          bg={btnStatus[invoice.status].bg || "info"}
                          size="sm"
                        >
                          {btnStatus[invoice.status].label || "N/A"}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
                {(!records.recentInvoices ||
                  records.recentInvoices.length <= 0) && (
                  <tr>
                    <td colSpan={3}>
                      <h6 className="text-gray">No records available</h6>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    </LoadingOverlay>
  );
};

export default RecentInvoices;
