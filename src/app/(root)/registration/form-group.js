import React from "react";
import { Form } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Select, { components } from "react-select";

const Option = (props) => {
  return (
    <components.Option {...props}>
      <input type="checkbox" checked={props.isSelected} onChange={() => null} />{" "}
      <label>{props.label}</label>
    </components.Option>
  );
};

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
  selectedOptions,
  setMenuIsOpen,
  handleSelectKeyDown
}) => {
  const options = [
    { value: "option1", label: "English" },
    { value: "option2", label: "Spanish" },
    { value: "option3", label: "Vietnamese" },
    { value: "option4", label: "Filipino" },
    { value: "option5", label: "Pashto" },
    { value: "option6", label: "Dari / Persian" },
    { value: "option7", label: "Arabic" },
    { value: "option8", label: "Bengali" },
    { value: "option9", label: "Chinese" },
    { value: "option10", label: "Haitian Creole" },
    { value: "option11", label: "French" },
    { value: "option12", label: "Punjabi" },
    { value: "option13", label: "Hindi" },
    { value: "option14", label: "Portuguese" },
    { value: "option15", label: "Tigrinya" },
    { value: "option16", label: "Russian" },
    { value: "option17", label: "Turkish" },
    { value: "option18", label: "Other" },
  ];

  return (
    <div>
      {steps === id && (
        <Form.Group>
          {label && (
            <Form.Label className="form_label">
              {label} {required && <span className="text-danger">*</span>}
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
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              className="languages"
              placeholder="Type your answer here"
              ref={steps === id ? firstOptionRef : null}
              options={options}
              components={{
                Option,
              }}
              value={selectedOptions}
              onChange={handleDropdownChange}
              onMenuOpen={() => setMenuIsOpen(true)}
              onMenuClose={() => setMenuIsOpen(false)}
              onKeyDown={handleSelectKeyDown}
            />
          ) : check ? (
            <div className="d-flex">
              <Form.Check
                type="checkbox"
                className="mx-3 mt-1"
                checked={fields.eco_panel_attorney}
                id="eco-panel-attorney"
                placeholder="Type your answer here"
                ref={steps === id ? firstOptionRef : null}
                value={fields[`${keyName}`] || ""}
                onChange={(e) => handleChange(e, `${keyName}`)}
              />
              <Form.Label
                className="form_label_terms"
                htmlFor="eco-panel-attorney"
              >
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
