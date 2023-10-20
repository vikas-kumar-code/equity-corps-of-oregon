import common from "@/utils/common";
import React from "react";
import { Badge, Card } from "react-bootstrap";

const RecentInvoices = ({ records }) => {
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
    <Card>
      <Card.Body style={{minHeight: "62vh"}}>
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
                const { id, status, name, total_amount } = invoice;
                return (
                  <tr key={`invoice-${id}-${i}`}>
                    <td>
                      <span className="ps-2">{name}</span>
                    </td>
                    <td>{common.currencyFormat(total_amount, 2) ?? "N/A"}</td>
                    <td>
                      <Badge
                        pill
                        bg={btnStatus[status]?.bg || "info"}
                        size="sm"
                      >
                        {btnStatus[status]?.label || "N/A"}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
              {(!records.recentInvoices ||
                records.recentInvoices.length <= 0) && (
                <tr>
                  <td colSpan={3} className="text-center pt-5">
                    <h6 className="text-gray">No records available</h6>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card.Body>
    </Card>
  );
};

export default RecentInvoices;
