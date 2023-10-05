import React from "react";
import { Card, } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";

const RecentAttorney = ({ records, loader }) => {
  return (
    <LoadingOverlay active={loader} spinner>
      <Card>
        <Card.Body>
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
                {records.recentAttorney?.map((attorney, i) => {
                  const { id, name, email, phone, address } = attorney;
                  return (
                    <tr key={`attorney-${id}-${i}`}>
                      <td>
                        <div>{name}</div>
                        <div>{email ?? "N/A"} </div>
                      </td>
                      <td> {phone ?? "N/A"} </td>
                      <td> {address ?? "N/A"} </td>
                    </tr>
                  );
                })}
                {(!records.recentAttorney ||
                  records.recentAttorney.length <= 0) && (
                  <tr>
                    <td colSpan={4}>
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

export default RecentAttorney;
