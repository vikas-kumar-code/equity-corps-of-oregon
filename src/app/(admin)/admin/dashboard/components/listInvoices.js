import common from "@/utils/common";
import moment from "moment";
import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";

const ListInvoices = (props) => {
  const { recentInvoices } = props.records;
  console.log(recentInvoices);
  return (
    <Row>
      <Col md={12} className="grid-margin">
        <LoadingOverlay active={props.loader} spinner text="Loading your content...">
          <Card>
            <Card.Body>
              <h4 className="card-title">Recent Invoices</h4>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th> Name </th>
                      <th> Due Date </th>
                      <th> Added On </th>
                      <th> Total Amount </th>
                      <th> Status </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentInvoices?.map((invoice, i) => {
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
                            {" "}
                            {moment(due_on).format("D MMM,  YYYY") ??
                              "N/A"}{" "}
                          </td>

                          <td>
                            {" "}
                            {moment(added_on).format("D MMM,  YYYY") ??
                              "N/A"}{" "}
                          </td>
                          <td>
                            {" "}
                            {common.currencyFormat(total_amount, 2) ??
                              "N/A"}{" "}
                          </td>
                          <td>
                            <div
                              className={`badge ${
                                status === 1
                                  ? "badge-outline-dark"
                                  : status === 2
                                  ? "badge-outline-primary"
                                  : "badge-outline-success"
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
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        </LoadingOverlay>
      </Col>
    </Row>
  );
};

export default ListInvoices;
