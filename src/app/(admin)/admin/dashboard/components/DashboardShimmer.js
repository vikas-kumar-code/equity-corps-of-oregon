import React from "react";
import { Badge, Card, Row } from "react-bootstrap";
import "../dashboard.css";

const DashboardShimmer = () => {
  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <Card>
            <Card.Body className="skeleton-box-gray shimmer-table">
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
                    <tr className="">
                      <td>
                        <span className="ps-2"></span>
                      </td>
                      <td></td>
                      <td>
                        <Badge pill size="sm"></Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-6">
          <Card>
            <Card.Body className="shimmer-table skeleton-box-gray">
              <h4 className="card-title">Recent Attorney</h4>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th> Name/Email </th>
                      <th> Phone </th>
                      <th> Address </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <span className="ps-2"></span>
                      </td>
                      <td></td>
                      <td>
                        <Badge pill size="sm"></Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

export default DashboardShimmer;
