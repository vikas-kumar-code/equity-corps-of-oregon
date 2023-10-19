import common from "@/utils/common";
import React from "react";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";

const AddEditParticulars = ({
  fields,
  setFields,
  setNoError,
  errors,
  record,
  fieldsData,
  categories,
  initialValues,
}) => {
  const addFieldSet = () => {
    setFields({
      ...fields,
      particulars: [...fields.particulars, initialValues.particulars[0]],
    });
  };

  const removeFieldSet = (index) => {
    setFields({
      ...fields,
      particulars: fields.particulars.filter((value, i) => i !== index),
    });
  };
  return (
    <div>
      <Row className="m-0 mb-2">
        <Col md={8} className="p-0">
          <div className="form-control py-4 d-flex align-items-center">
            <h6 className="m-0">
              CASE NUMBER : <strong> {record.case_number}</strong>
            </h6>
          </div>
        </Col>
        <Col md={4} className="pe-0">
          <DatePicker
            selected={Date.parse(fields.due_on)}
            onChange={(date) => {
              setFields({ ...fields, due_on: date });
              setNoError("due_on");
            }}
            minDate={new Date()}
            className="form-control w-100 py-4"
            placeholderText="Due On"
            dateFormat={"MM-dd-yyyy"}
          />
          <Form.Control.Feedback type="invalid" className="d-block">
            {errors["due_on"] || ""}
          </Form.Control.Feedback>
        </Col>
      </Row>
      {fields.particulars?.map((item, index) => {
        return (
          <Row className="invoice-fieldset" key={`particulars-${index}`}>
            <Col md={4} className="p-0 invoice_drop_down">
              {item.show_other_category ? (
                <FloatingLabel label="Desribe your category">
                  <Form.Control
                    autoComplete="off"
                    row={1}
                    placeholder="Category"
                    isInvalid={
                      !!errors["particulars" + index + "other_category"]
                    }
                    value={item.other_category}
                    onChange={(event) => {
                      fieldsData.particulars[index].other_category =
                        event.target.value;
                      setFields(fieldsData);
                      setNoError("particulars" + index + "other_category");
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors["particulars" + index + "other_category"] || ""}
                  </Form.Control.Feedback>
                  <Button
                    key={index}
                    variant="secondary"
                    size="sm"
                    className="q-opt-remove btn-close"
                    onClick={() => {
                      fieldsData.particulars[index].other_category = "";
                      fieldsData.particulars[index].show_other_category = false;
                      fieldsData.particulars[index].category =
                        initialValues.particulars[0].category;
                      setFields(fieldsData);
                    }}
                    style={{ right: 9, top: 17 }}
                  />
                </FloatingLabel>
              ) : (
                <div className="invoice_category">
                  <FloatingLabel label="Select">
                    <Form.Select
                      className="invoice-item"
                      onChange={(e) => {
                        fieldsData.particulars[index].category.value = Number(
                          e.target.value
                        );
                        fieldsData.particulars[index].category.label =
                          categories[e.target.value].label;
                        if (
                          e.target.value ==
                          categories[categories.length - 1].value
                        ) {
                          fieldsData.particulars[
                            index
                          ].show_other_category = true;
                        }
                        setFields(fieldsData);
                        setNoError("particulars" + index + "category");
                      }}
                    >
                      {categories.map((category, i) => {
                        return (
                          <option
                            value={category.value}
                            key={`particular-${i}`}
                            className="p-2"
                            selected={
                              fields.particulars[index].category.value ===
                              category.value
                            }
                          >
                            {category.label}
                          </option>
                        );
                      })}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid" className="d-block">
                      {errors["particulars" + index + "category"] || ""}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </div>
              )}
            </Col>
            <Col md={8} className="p-0 ps-2">
              <FloatingLabel label="Short Description">
                <Form.Control
                  autoComplete="off"
                  row={1}
                  name="short_description"
                  placeholder="Short Description"
                  isInvalid={
                    !!errors["particulars" + index + "short_description"]
                  }
                  value={item.short_description}
                  onChange={(event) => {
                    fieldsData.particulars[index].short_description =
                      event.target.value;
                    setFields(fieldsData);
                    setNoError("particulars" + index + "short_description");
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors["particulars" + index + "short_description"] || ""}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
            <Col md={6} className="p-0 mt-2">
              <FloatingLabel label="Hours worked">
                <Form.Control
                  autoComplete="off"
                  row={1}
                  name="hours_worked"
                  placeholder="Hours Worked"
                  isInvalid={!!errors["particulars" + index + "hours_worked"]}
                  value={item.hours_worked}
                  onChange={(event) => {
                    fieldsData.particulars[index].hours_worked =
                      common.parseDecimalInput(event.target.value);
                    if (record.hourly_rate) {
                      fieldsData.particulars[index].amount = "";
                      fieldsData.particulars[index].amount =
                        Number(record.hourly_rate) *
                        Number(fieldsData.particulars[index].hours_worked);
                    }
                    setFields(fieldsData);
                    setNoError("particulars" + index + "hours_worked");
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors["particulars" + index + "hours_worked"] || ""}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
            <Col md={6} className="position-relative pe-0 mt-2">
              <FloatingLabel label="Amount">
                <Form.Control
                  disabled={record.hourly_rate ? true : false}
                  autoComplete="off"
                  name="amount"
                  placeholder="Amount"
                  isInvalid={!!errors["particulars" + index + "amount"]}
                  value={item.amount}
                  onChange={(event) => {
                    fieldsData.particulars[index].amount =
                      common.parseDecimalInput(event.target.value);
                    if (record.hourly_rate) {
                      fieldsData.particulars[index].hours_worked = "";
                    }
                    setFields(fieldsData);
                    setNoError("particulars" + index + "amount");
                  }}
                />
                {index < 1 && (
                  <Button
                    key={index}
                    variant="success"
                    size="sm"
                    className="q-opt-add position-absolute rounded-circle"
                    onClick={() => addFieldSet(index)}
                    style={{
                      right: 9,
                      top: 15,
                      height: 32,
                      width: 32,
                    }}
                  >
                    <span className="fs-4">+</span>
                  </Button>
                )}
                <Form.Control.Feedback type="invalid">
                  {errors["particulars" + index + "amount"] || ""}
                </Form.Control.Feedback>
              </FloatingLabel>
              {index >= 1 && (
                <Button
                  key={index}
                  variant="secondary"
                  size="sm"
                  className="q-opt-remove btn-close"
                  onClick={() => removeFieldSet(index)}
                  style={{
                    right: 10,
                    top: 15,
                    height: 18,
                    width: 18,
                  }}
                />
              )}
            </Col>
          </Row>
        );
      })}
    </div>
  );
};

export default AddEditParticulars;
