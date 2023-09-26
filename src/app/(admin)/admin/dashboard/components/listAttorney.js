import NextPagination from "@/app/components/NextPagination";
import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";

const ListAttorney = (props) => {
  const { recentAttorney, totalAttorney } = props.records;
  
  return (
    <Row>
      <Col className="grid-margin">
        <LoadingOverlay active={props.loader} spinner text="Loading your content...">
        <Card>
          <Card.Body>
            <h4 className="card-title">Recent Attorney</h4>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th> Name </th>
                    <th> Email </th>
                    <th> Phone </th>
                    <th> Address </th>
                  </tr>
                </thead>
                <tbody>
                  {recentAttorney?.map((attorney, i) => {
                    const { id, name, email, phone, address } =
                      attorney;
                    return (
                      <tr key={`attorney-${id}-${i}`}>
                        <td>
                          <span className="ps-2">
                            {name}
                          </span>
                        </td>
                        <td> {email ?? "N/A"} </td>
                        <td> {phone ?? "N/A"} </td>
                        <td> {address ?? "N/A"} </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card.Body>
          <Card.Footer className="text-end">
              <NextPagination totalItemsCount={totalAttorney} />
            </Card.Footer>
        </Card>
        </LoadingOverlay>
      </Col>
    </Row>
  );
};

export default ListAttorney;
