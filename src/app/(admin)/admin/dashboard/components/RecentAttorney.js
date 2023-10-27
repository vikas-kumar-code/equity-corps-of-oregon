import Link from "next/link";
import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";

const RecentAttorney = ({ records }) => {
  return (
    <Card>
      <Card.Body style={{ minHeight: "62vh" }}>
        <Row>
          <Col>
            <h4 className="card-title">Recent Attorney</h4>
          </Col>
          <Col className="text-end text-primary">
            <Button variant="primary">
              <Link
                href="/admin/users"
                style={{ textDecoration: "none", color: "white" }}
              >
                View All
              </Link>
            </Button>
          </Col>
        </Row>
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
              {records.recentAttorney?.map((attorney, i) => {
                const { id, name, email, phone, address } = attorney;
                return (
                  <tr key={`attorney-${id}-${i}`}>
                    <td>
                      <div>{name}</div>
                      <div>{email || "N/A"} </div>
                    </td>
                    <td> {phone || "N/A"} </td>
                    <td> {address || "N/A"} </td>
                  </tr>
                );
              })}
              {(!records.recentAttorney ||
                records.recentAttorney.length <= 0) && (
                <tr>
                  <td colSpan={3}>
                    <h6 className="text-gray text-center">No records available</h6>
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

export default RecentAttorney;
