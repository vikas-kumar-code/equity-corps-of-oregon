import moment from "moment";
import React from "react";
import {
  Button,
  Card,
} from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";

const ListClients = ({ fields, loader, deleteRecord }) => {
  console.log(fields);
  return (
    <div>
      <LoadingOverlay active={loader} spinner text="Loading...">
        {fields && fields?.length > 0 && (
          <Card>
            <Card.Body>
              <h4>Clients</h4>
              <div className="table-responsive" style={{ maxHeight: 300 }}>
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>DOB</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fields?.length > 0 &&
                      fields?.map((item, index) => (
                        <>
                          <tr key={`invoice-${index}`}>
                            <td>{index + 1}</td>
                            <td>{item.first_name}</td>
                            <td>{item.last_name}</td>
                            <td>{moment(item.dob).format("D MMM,  YYYY")}</td>
                            <td>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => deleteRecord(index)}
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>
                        </>
                      ))}
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        )}
      </LoadingOverlay>
    </div>
  );
};

export default ListClients;
