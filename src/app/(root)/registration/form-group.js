import React from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Select from 'react-select';

const FormGroup = ({
  label,
  keyName,
  id,
  handleChange,
  firstOptionRef,
  steps,
  fields,
  phoneInput,
  required,
  handlePhone,
  note,
  handleKeyDown,
  select,
  check,
  errors,
  handleDropdownChange,
  selectedOptions
}) => {

  const options = [
    { value: 'option1', label: 'English' },
    { value: 'option2', label: 'Spanish' },
    { value: 'option3', label: 'Vietnamese' },
    { value: 'option4', label: 'Filipino' },
    { value: 'option1', label: 'Pashto' },
    { value: 'option2', label: 'Dari / Persian' },
    { value: 'option3', label: 'Arabic' },
    { value: 'option4', label: 'Bengali' },
    { value: 'option1', label: 'Chinese' },
    { value: 'option2', label: 'Haitian Creole' },
    { value: 'option3', label: 'French' },
    { value: 'option4', label: 'Punjabi' },
    { value: 'option1', label: 'Hindi' },
    { value: 'option2', label: 'Portuguese' },
    { value: 'option3', label: 'Tigrinya' },
    { value: 'option4', label: 'Russian' },
    { value: 'option3', label: 'Turkish' },
    { value: 'option4', label: 'Other' },
  ];

  return (
    <div>
      {steps === id && (
        <Form.Group>
          {label && (
            <Form.Label className="form_label">
              {label} {required && <span className="text-danger">*</span>}{" "}
            </Form.Label>
          )}
          {note && <p className="text-dark opacity-50">{note}</p>}
          {phoneInput ? (
            <PhoneInput
              onlyCountries={["us"]}
              inputRef={steps === id ? firstOptionRef : null}
              placeholder="Type your answer here"
              value={fields[`${keyName}`] || ""}
              onChange={(phone) => handlePhone(phone, `${keyName}`)}
              onKeyDown={handleKeyDown}
              country="us"
              className="phone-input"
            />
          ) : select ? (
            <Select
              isMulti
              placeholder="Type your answer here"
              ref={steps === id ? firstOptionRef : null}
              options={options}
              value={selectedOptions}
              onChange={handleDropdownChange}
              onKeyDown={handleKeyDown}
            />
          ) : check ? (
            <div className="d-flex ">
              <Form.Check className="mx-3 mt-1">
              <Form.Check.Input
                type="checkbox"
                checked={fields.eco_panel_attorney}
                placeholder="Type your answer here"
                ref={steps === id ? firstOptionRef : null}
                value={fields[`${keyName}`] || ""}
                onChange={(e) => handleChange(e, `${keyName}`)}
                onKeyDown={handleKeyDown}
              />
              <Form.Label className="form_label"  htmlFor="eco-panel-attorney">
                I have read and accept the terms of the ECO Panel Attorney
                Program.<span className="text-danger">*</span>
              </Form.Label>
              </Form.Check>
            </div>
          ) : (
            <Form.Control
              ref={steps === id ? firstOptionRef : null}
              type="text"
              placeholder="Type your answer here"
              value={fields[`${keyName}`] || ""}
              onChange={(e) => handleChange(e, `${keyName}`)}
              onKeyDown={handleKeyDown}
            />
          )}
          <p className="text-danger mx-2">{errors[`${keyName}`]}</p>
        </Form.Group>
      )}
    </div>
  );
};

export default FormGroup;
