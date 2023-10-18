"use client";

import React from "react";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";

const AddEditMilestones = ({ fields, setFields, errors, initialValues }) => {
  // copy milestones object
  const milestones = JSON.parse(JSON.stringify(fields.milestones));

  // handle input values
  const handleChange = (milestones) => {
    setFields({ ...fields, milestones });
  };

  // Add new field set
  const addFieldSet = () => {
    setFields({
      ...fields,
      milestones: [...fields.milestones, initialValues.milestones[0]],
    });
  };

  // Delete a field set
  const removeFieldSet = (index) => {
    setFields({
      ...fields,
      milestones: fields.milestones.filter((value, i) => i !== index),
    });
  };
  return fields.milestones.map((item, index) => {
    return (
      <Row key={`milestone-fieldset-${index}`}>
        <Form.Group as={Col} md={4}>
          <FloatingLabel label="" className="mb-3">
            <DatePicker
              placeholderText="Date"
              selected={Date.parse(milestones[index].milestone_date)}
              onChange={(date) => {
                milestones[index].milestone_date = date;
                handleChange(milestones);
              }}
              className="form-control w-100 date_input"
              dateFormat={"MM-dd-yyyy"}
            />
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors[`milestones${index}milestone_date`]}
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>

        <Form.Group as={Col} md={8}>
          <FloatingLabel label="Comment" className="mb-3">
            <Form.Control
              type="text"
              name="comment"
              placeholder="Comment"
              onChange={(e) => {
                milestones[index].comment = e.target.value;
                handleChange(milestones);
              }}
              value={item.comment}
            />
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors[`milestones${index}comment`]}
            </Form.Control.Feedback>

            {/* Add more button */}
            {index < 1 && (
              <Button
                key={index}
                variant="success"
                size="sm"
                className="q-opt-add position-absolute rounded-circle"
                onClick={() => addFieldSet(index)}
                style={{
                  right: 9,
                  top: 14,
                  height: 32,
                  width: 32,
                }}
              >
                <span className="fs-4">+</span>
              </Button>
            )}

            {/* Rmove button */}
            {index >= 1 && (
              <Button
                key={index}
                variant="secondary"
                size="sm"
                className="q-opt-remove btn-close"
                onClick={() => removeFieldSet(index)}
                style={{
                  right: 12,
                  top: 14,
                  height: 18,
                  width: 18,
                }}
              />
            )}
          </FloatingLabel>
        </Form.Group>
      </Row>
    );
  });
};

export default AddEditMilestones;
