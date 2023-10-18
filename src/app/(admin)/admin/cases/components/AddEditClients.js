"use client";

import React from "react";
import { Button, FloatingLabel, Form, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { getMonth, getYear } from "date-fns";
import range from "lodash/range";
import "react-datepicker/dist/react-datepicker.css";

export default function AddEditClients({
  fields,
  setFields,
  errors,
  initialValues,
}) {
  const clients = JSON.parse(JSON.stringify(fields.clients));
  const years = range(1990, getYear(new Date()) + 1, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleChange = (clients) => {
    setFields({ ...fields, clients });
  };

  const addFieldSet = () => {
    setFields({
      ...fields,
      clients: [...fields.clients, initialValues.clients[0]],
    });
  };

  const removeFieldSet = (index) => {
    setFields({
      ...fields,
      clients: fields.clients.filter((value, i) => i !== index),
    });
  };

  return fields.clients.map((item, index) => {
    return (
      <Row className="fieldset-animation--" key={`clients-${index}`}>
        <Form.Group as={Col} md={4}>
          <FloatingLabel label="First Name" className="mb-3">
            <Form.Control
              type="text"
              name="first_name"
              placeholder="First name"
              onChange={(e) => {
                clients[index].first_name = e.target.value;
                handleChange(clients);
              }}
              value={item.first_name}
            />
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors[`clients${index}first_name`]}
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>

        <Form.Group as={Col} md={4}>
          <FloatingLabel label="Last Name" className="mb-3">
            <Form.Control
              type="text"
              name="last_name"
              placeholder="Last name"
              onChange={(e) => {
                clients[index].last_name = e.target.value;
                handleChange(clients);
              }}
              value={item.last_name}
            />
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors[`clients${index}last_name`]}
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>

        <Form.Group as={Col} md={4}>
          <FloatingLabel label="" className="mb-3">
            <DatePicker
              renderCustomHeader={({ date, changeYear, changeMonth }) => (
                <div
                  style={{
                    margin: 10,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <select
                    className="custom-select-style p-1 mx-1"
                    value={getYear(date)}
                    onChange={({ target: { value } }) => changeYear(value)}
                  >
                    {years.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <select
                    className="custom-select-style p-1"
                    value={months[getMonth(date)]}
                    onChange={({ target: { value } }) =>
                      changeMonth(months.indexOf(value))
                    }
                  >
                    {months.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              maxDate={new Date()}
              placeholderText="DOB"
              selected={Date.parse(clients[index].dob)}
              onChange={(date) => {
                clients[index].dob = date;
                handleChange(clients);
              }}
              className="form-control w-100 date_input"
              dateFormat={"MM-dd-yyyy"}
            />
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors[`clients${index}dob`]}
            </Form.Control.Feedback>
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
            {index >= 1 && (
              <Button
                key={index}
                variant="secondary"
                size="sm"
                className="q-opt-remove btn-close"
                onClick={() => removeFieldSet(index)}
                style={{
                  right: 10,
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
}
