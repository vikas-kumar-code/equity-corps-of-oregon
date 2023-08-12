import React from "react";
import { Form } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

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
  errors
}) => {
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
            <Form.Select
              type="select"
              placeholder="Type your answer here"
              ref={steps === id ? firstOptionRef : null}
              value={fields[`${keyName}`] || ""}
              onChange={(e) => handleChange(e, `${keyName}`)}
              onKeyDown={handleKeyDown}
            >
              <option>English</option>
              <option>Spanish</option>
              <option>Vietnamese</option>
              <option>Filipino</option>
              <option>Pashto</option>
              <option>Dari / Persian</option>
              <option>Arabic</option>
              <option>Bengali</option>
              <option>Chinese</option>
              <option>Haitian Creole</option>
              <option>French</option>
              <option>Punjabi</option>
              <option>Hindi</option>
              <option>Portuguese</option>
              <option>Tigrinya</option>
              <option>Russian</option>
              <option>Turkish</option>
              <option>Other</option>
            </Form.Select>
          ) : check ? (
            <div className="d-flex ">
              <Form.Check
                type="checkbox"
                className="mx-3 mt-1"
                checked={fields.eco_panel_attorney}
                placeholder="Type your answer here"
                ref={steps === id ? firstOptionRef : null}
                value={fields[`${keyName}`] || ""}
                onChange={(e) => handleChange(e, `${keyName}`)}
                onKeyDown={handleKeyDown}
              />
              <Form.Label className="form_label">
                I have read and accept the terms of the ECO Panel Attorney
                Program.<span className="text-danger">*</span>
              </Form.Label>
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
