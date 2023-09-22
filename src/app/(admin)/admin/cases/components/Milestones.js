"use client";

import React, { memo, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import AddEditMilestone from "./AddEditMilestone";
import moment from "moment";

function Milestones(props) {
  const [showModal, setShowModal] = useState(false);
  const deleteRecord = (index) => {
    if (window.confirm("Are you sure to delete?")) {
      let newMilestones = props?.milestones.filter((r, indx) => index !== indx);
      props.updateMilestones(newMilestones);
    }
  };
  return (
    <div className="p-3">
      <Row>
        <Col className="">Milestones</Col>
        <Col className="text-end">
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Add New Milestone
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md={12} sm={12}>
          <div
            className="table-responsive overflow-auto"
            style={{ height: "45vh" }}
          >
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date </th>
                  <th>Comment</th>
                  <th className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {props?.milestones?.map((record, index) => (
                  <tr key={`milestones-key-${index}`}>
                    <td>{Number(index + 1)}.</td>
                    <td>
                      {moment(new Date(record.milestone_date)).format(
                        "MMMM DD, YYYY"
                      )}
                    </td>
                    <td>{record.comment}</td>
                    <td className="text-end">
                      {record.case_id !== undefined && (
                        <Button variant="primary" className="me-2">
                          Edit
                        </Button>
                      )}
                      <Button
                        variant="danger"
                        onClick={() => deleteRecord(index)}
                        size="sm"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Form.Control.Feedback type="invalid" className="text-center pt-4">
              {props?.errors?.milestones}
            </Form.Control.Feedback>
          </div>
        </Col>
        <AddEditMilestone
          setErrors={props.setErrors}
          showModal={showModal}
          closeModal={() => setShowModal(false)}
          updateMilestones={(milestones) =>
            props?.updateMilestones([...props?.milestones, milestones])
          }
        />
      </Row>
    </div>
  );
}

export default memo(Milestones);
