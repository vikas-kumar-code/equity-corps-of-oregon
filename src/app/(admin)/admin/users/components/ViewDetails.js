"use client";

import React, { useState, useEffect } from "react";
import { Modal, Tabs, Tab } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";
import common from "@/utils/common";
import { toast } from "react-toastify";
LoadingOverlay.propTypes = undefined;

export default function ViewDetails(props) {
  const [loader, setLoader] = useState(false);
  const [record, setRecord] = useState({});

  const getRecord = async () => {
    setLoader(true);
    fetch(common.apiPath(`/admin/users/save/${props.userId}`))
      .then((response) => response.json())
      .then((response) => {
        setRecord(response.user);
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => setLoader(false));
  };

  useEffect(() => {
    getRecord(props.userId);
  }, []);
  return (
    <Modal
      show={props.showModal}
      onHide={props.closeModal}
      backdrop="static"
      keyboard={false}
      centered
      size="md"
    >
      <Modal.Header closeButton>
        <h3>User Information</h3>
      </Modal.Header>
      <Modal.Body>
        <LoadingOverlay active={loader} spinner text="Loading...">
          <Tabs defaultActiveKey={1} id="user-details-tabs" justify>
            <Tab eventKey={1} title="Basic Details">
              <div className="table-responsive min-list-height">
                <table className="table table-borderless table-striped">
                  <tbody>
                    <tr>
                      <th>Name</th>
                      <td>{record?.name}</td>
                    </tr>
                    <tr>
                      <th>Phone</th>
                      <td>{record?.phone}</td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <td>{record?.email}</td>
                    </tr>
                    <tr>
                      <th>Address</th>
                      <td>{record?.address}</td>
                    </tr>
                    <tr>
                      <th>Law Firm Name</th>
                      <td>{record?.law_firm_name}</td>
                    </tr>
                    <tr>
                      <th>Is Oregon State Bar Member</th>
                      <td>
                        {record?.is_oregon_state_bar_member ? "Yes" : "No"}
                      </td>
                    </tr>
                    <tr>
                      <th>Oregon State Bar Number</th>
                      <td>{record?.oregon_state_bar_number}</td>
                    </tr>
                    <tr>
                      <th>EOIR Registered</th>
                      <td>{record?.eoir_registered ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                      <th>Languages Supported</th>
                      <td>{record?.languages_supports}</td>
                    </tr>
                    <tr>
                      <th>Practice Areas</th>
                      <td>{record?.practice_areas}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Tab>
            <Tab eventKey={2} title="Questions">
              <div className="table-responsive min-list-height">
                <table className="table table-borderless table-striped">
                  <tbody>
                    {record?.attorney_answers?.map((item) => {
                      return (
                        <tr>
                          <td>
                            <strong>Q.) </strong> {item?.question?.question}
                            <br />
                            <strong>Answer - {item?.answer?.option}</strong>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Tab>
          </Tabs>
        </LoadingOverlay>
      </Modal.Body>
    </Modal>
  );
}
