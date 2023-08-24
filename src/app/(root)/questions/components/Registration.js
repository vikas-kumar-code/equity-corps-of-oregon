"use client";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { BiSolidErrorCircle } from "react-icons/bi";
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

const options = [
  { value: "English", label: "English" },
  { value: "Spanish", label: "Spanish" },
  { value: "Vietnamese", label: "Vietnamese" },
  { value: "Filipino", label: "Filipino" },
  { value: "Pashto", label: "Pashto" },
  { value: "Dari / Persian", label: "Dari / Persian" },
  { value: "Arabic", label: "Arabic" },
  { value: "Bengali", label: "Bengali" },
  { value: "Chinese", label: "Chinese" },
  { value: "Haitian Creole", label: "Haitian Creole" },
  { value: "French", label: "French" },
  { value: "Punjabi", label: "Punjabi" },
  { value: "Hindi", label: "Hindi" },
  { value: "Portuguese", label: "Portuguese" },
  { value: "Tigrinya", label: "Tigrinya" },
  { value: "Russian", label: "Russian" },
  { value: "Turkish", label: "Turkish" },
  { value: "Other", label: "Other" },
];

export default function Registration(props) {
  const { data, setFields, fields, error, next, inputRef, len, slideIndex } = props;

  return (
    <div className="qs-container">
      {data.type !== "checkbox" && (
        <p className="qs-label">
          <span className="slide-sn">{data?.sn}.)</span> {data?.label}
        </p>
      )}
      {data?.note && <p>{data?.note}</p>}

      {data?.type === "phoneInput" && (
        <PhoneInput
          onlyCountries={["us"]}
          placeholder="Type your answer here"
          value={fields[data.field] || null}
          onChange={(phone) =>
            setFields({ ...fields, [data.field]: `+${phone}` })
          }
          country="us"
          className="phone-input"
        />
      )}
      {data?.type === "select" && (
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
          value={fields[data.field] || null}
          onChange={(selected) =>
            setFields({ ...fields, [data.field]: selected })
          }
          // onMenuOpen={() => setMenuIsOpen(true)}
          // onMenuClose={() => setMenuIsOpen(false)}
          // onKeyDown={handleSelectKeyDown}
        />
      )}
      {data?.type === "checkbox" && (
        <div className="d-flex">
          <Form.Check
            type="checkbox"
            id="eco-panel-attorney"
            className="mx-3 mt-2"
            placeholder="Type your answer here"
            checked={fields[data.field] || false}
            onChange={(e) =>
              setFields({ ...fields, [data.field]: e.target.checked })
            }
          />
          <Form.Label
            className="form_label_terms fs-3  "
            htmlFor="eco-panel-attorney"
          >
            I have read and accept the terms of the ECO Panel Attorney Program.
            <span className="text-danger">*</span>
          </Form.Label>
        </div>
      )}

      {data?.type === "text" && (
        <Form.Control
        id={data.id}
          type="text"
          ref={inputRef}
          placeholder="Type your answer here"
          value={fields[data.field] || ""}
          onChange={(e) => {
            setFields({ ...fields, [data.field]: e.target.value });
          }}
        />
      )}
      <div style={{ height: "50px" }} className="mt-3">
        {error && (
          <Form.Control.Feedback
            type="invalid"
            className="d-block show-up-animation-fast"
          >
            <span className="error-text">
              {" "}
              <BiSolidErrorCircle style={{ marginTop: "-3px" }} size={16} />
              {error}
            </span>
          </Form.Control.Feedback>
        )}
        {!error && slideIndex < len ? (
          <Button
            size="sm"
            variant="success"
            style={{ color: "white" }}
            className="show-up-animation-fast"
            onClick={() => next()}
          >
            OK
          </Button>
        ):(
          <Button
            size="md"
            variant="success"
            style={{ color: "white" }}
            className="show-up-animation-fast"
            onClick={() => next()}
          >
            Submit
          </Button>
        )}
      </div>
    </div>
  );
}
