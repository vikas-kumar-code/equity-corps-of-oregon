"use client";

import React from "react";
import {
    Button,
    FloatingLabel,
    Form,
    Row,
    Col,
} from "react-bootstrap";
import DatePicker from "react-datepicker";

export default function AddEditClient({ item, setFields, index, errors, fieldsData, fields, removeFieldSet, addFieldSet }) {
    return (
        <Row
            className="invoice-fieldset"
            key={`clients-${index}`}
        >
            <Form.Group as={Col} md={4}>
                <FloatingLabel label="First Name" className="mb-3">
                    <Form.Control
                        type="text"
                        name="first_name"
                        placeholder="first_name"
                        onChange={(e) => {
                            fieldsData.clients[index].first_name =
                                e.target.value;
                            setFields(fieldsData);
                        }}
                        isInvalid={
                            !!errors[`clients${index}first_name`]
                        }
                        value={item.first_name}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors[`clients${index}first_name`]}
                    </Form.Control.Feedback>
                </FloatingLabel>
            </Form.Group>
            <Form.Group as={Col} md={4}>
                <FloatingLabel label="Last Name" className="mb-3">
                    <Form.Control
                        type="text"
                        name="last_name"
                        placeholder="last_name"
                        onChange={(e) => {
                            fieldsData.clients[index].last_name =
                                e.target.value;
                            setFields(fieldsData);
                        }}
                        isInvalid={!!errors[`clients${index}last_name`]}
                        value={item.last_name}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors[`clients${index}last_name`]}
                    </Form.Control.Feedback>
                </FloatingLabel>
            </Form.Group>
            <Form.Group as={Col} md={4}>
                <FloatingLabel label="" className="mb-3">
                    <DatePicker
                        placeholderText="DOB"
                        selected={Date.parse(fields.clients[index].dob)}
                        onChange={(date) => {
                            fieldsData.clients[index].dob = date;
                            setFields(fieldsData);
                        }}
                        className="form-control w-100 date_input"
                        dateFormat={"MM-dd-yyyy"}
                    />
                    <Form.Control.Feedback
                        type="invalid"
                        className="d-block"
                    >
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
                    <Form.Control.Feedback type="invalid">
                        {errors.dob}
                    </Form.Control.Feedback>
                </FloatingLabel>
            </Form.Group>
        </Row>
    );
}
