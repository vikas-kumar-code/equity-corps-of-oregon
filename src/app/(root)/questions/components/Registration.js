"use client";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { BiSolidErrorCircle } from "react-icons/bi";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

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
  const { data, setFields, fields, error, setError, index, next } = props;
  
  return (
    <div className="qs-container">
      <p className="qs-label">
        <span className="slide-sn">{data?.sn}.)</span> {data?.label}
      </p>
      {data?.note && <p>{data?.note}</p>}
      <Form.Control
        type={data?.type}
        id="inputPassword5"
        aria-describedby="passwordHelpBlock"
      />
        <PhoneInput
            onlyCountries={["us"]}
            placeholder="Type your answer here"
            // value={fields[`${field}`] || ""}
            onChange={(phone) => handlePhone(phone, `${field}`)}
            country="us"
            className="phone-input"
            // onKeyDown={handleEnterPress}
          />
      <div style={{ height: "50px" }} className="mt-3">
        {error && (
          <Form.Control.Feedback
            type="invalid"
            className="d-block show-up-animation-fast"
          >
            <span className="error-text">
              {" "}
              <BiSolidErrorCircle
                style={{ marginTop: "-3px" }}
                size={16}
              />{" "}
              Please make a selection.
            </span>
          </Form.Control.Feedback>
        )}
        {!error && (
          <Button
            size="sm"
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
