import NextPagination from "@/app/components/NextPagination";
import common from "@/utils/common";
import moment from "moment";
import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";

const ListRecentInvoices = ({records, loader}) => {
  return (
    <Row>
      <Col md={12} className="grid-margin">
        <LoadingOverlay
          active={loader}
          spinner
          text="Loading your content..."
        >
          <Card>
            <Card.Body>
              <h4 className="card-title">Recent Invoices</h4>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th> Name </th>
                      <th> Due Date </th>
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
                          <td>
                            {moment(due_on).format("D MMM,  YYYY") ??
                              "N/A"}
                          </td>
                          <td>
                            {common.currencyFormat(total_amount, 2) ??
                              "N/A"}
                          </td>
                          <td>
                            <div
                              className={`badge ${
                                status === 1
                                  ? "badge-dark rounded-pill"
                                  : status === 2
                                  ? "badge-primary rounded-pill"
                                  : "badge-success rounded-pill"
                              }`}
                            >
                              {status === 1
                                ? "Sent"
                                : status === 2
                                ? "Partially Paid"
                                : "Paid"}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    {(!records.recentInvoices ||
                        records.recentInvoices.length <= 0) && (
                        <tr>
                          <td colSpan={6}>
                            <h6 className="text-gray">No records available</h6>
                          </td>
                        </tr>
                      )}
                  </tbody>
                </table>
              </div>
            </Card.Body> 
            <Card.Footer className="text-end">
              <NextPagination totalItemsCount={records.totalInvoices} />
            </Card.Footer>
          </Card>
        </LoadingOverlay>
      </Col>
    </Row>
  );
};

export default ListRecentInvoices;
