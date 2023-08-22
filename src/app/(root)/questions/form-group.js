import React, { useState } from "react";
import { Form } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Select, { components } from "react-select";
import "./form-animation.css";

const Option = (props) => {
  return (
    <components.Option {...props}>
      <input type="checkbox" checked={props.isSelected} onChange={() => null} />{" "}
      <label>{props.label}</label>
    </components.Option>
  );
};

const FormGroup = ({
  fields, 
  setFields,
  label,
  type,
  id,
  field,
  note,
  index,
  setIndex,
  required,
  handleChange,
  handleEnterPress
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

  const [errors, setErrors] = useState("");
  const [selectedOptions, setSelectedOptions] = useState(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleDropdownChange = (selected) => {
    setSelectedOptions(selected);
    setFields({ ...fields, ["language"]: selected });
  };

  const handlePhone = (phone, field_name) => {
    fields[field_name] = "+" + phone;
    setErrors({ ...errors, [field_name]: (phone = "") });
  };

  const handleSelectKeyDown = (e) => {
    e.preventDefault();
    if (e.key === "Enter" && !menuIsOpen) {
      setIndex(index + 1);
    }
  };

  return (
    <div className="rg_form">
      <Form.Group>
        {type !== "checkbox" && label && (
          <Form.Label className="form_label">
            {label} {required && <span className="text-danger">*</span>}
          </Form.Label>
        )}
        {note && <p className="text-dark opacity-50">{note}</p>}
        {type === "phoneInput" ? (
          <PhoneInput
            onlyCountries={["us"]}
            placeholder="Type your answer here"
            value={fields[`${field}`] || ""}
            onChange={(phone) => handlePhone(phone, `${field}`)}
            country="us"
            className="phone-input"
            onKeyDown={handleEnterPress}
          />
        ) : type === "select" ? (
          <Select
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            className="languages"
            placeholder="Type your answer here"
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
        ) : type === "checkbox" ? (
          <div className="d-flex">
            <Form.Check
              type="checkbox"
              id="eco-panel-attorney"
              className="mx-3 mt-2"
              checked={fields.eco_panel_attorney}
              placeholder="Type your answer here"
              value={fields[`${field}`] || ""}
              onChange={(e) => handleChange(e, field)}
            />
            <Form.Label
              className="form_label_terms fs-3  "
              htmlFor="eco-panel-attorney"
            >
              I have read and accept the terms of the ECO Panel Attorney
              Program.<span className="text-danger">*</span>
            </Form.Label>
          </div>
        ) : (
          <Form.Control
            type="text"
            placeholder="Type your answer here"
            value={fields[`${field}`] || ""}
            onChange={(e) => {handleChange(e, `${field}`)}}
            onKeyDown={handleEnterPress}
          />
        )}
        <p className="text-danger mx-2">{errors[`${field}`]}</p>
      </Form.Group>
    </div>
  );
};

export default FormGroup;
