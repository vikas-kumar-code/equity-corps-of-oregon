"use client";

import React from "react";
import { Button, FloatingLabel, Form, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

export default function AddEditClients({
  fields,
  setFields,
  errors,
  initialValues,
}) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const clients = JSON.parse(JSON.stringify(fields.clients));
  const years = Array.from(
    { length: new Date().getFullYear() - 1989 },
    (_, i) => i + 1990
  );
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
  console.log(selectedYear);

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
          <FloatingLabel label="" className="">
            <DatePicker
              renderCustomHeader={({ changeYear, changeMonth }) => (
                <div
                  style={{
                    margin: 10,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <select
                    className="custom-select-style p-1 mx-1"
                    value={selectedYear}
                    onChange={({ target: { value } }) => {
                      setSelectedYear(value);
                      changeYear(value);
                    }}
                  >
                    {years.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <select
                    className="custom-select-style p-1" 
                    value={months[selectedMonth]}
                    onChange={({ target: { value } }) => {
                      setSelectedMonth(value);
                      changeMonth(months.indexOf(value));
                    }}
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
              // placeholderText="DOB"
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
