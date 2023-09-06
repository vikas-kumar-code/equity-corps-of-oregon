"use client";
import common from "@/utils/common";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
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

export default function Registration(props) {
  const {
    data,
    setFields,
    fields,
    error,
    setError,
    index,
    dataLength,
    next,
    prev,
    isActive,
    answers,
  } = props;
  const inputRef = useRef(null);
  const [checked, setChecked] = useState(true);
  const [loader, setLoader] = useState(false);
  const [selected, setSelected] = useState(null);
  const handleSelect = (val) => {
    setSelected(val);
    setError(null);
    setFields({ ...fields, [data?.field]: val });
  };

  const handleInput = (value) => {
    error && setError(null);
    setFields(value);
  };

  const handleSubmit = () => {
    setLoader(true);
    fetch(common.apiPath(`/questions/save`), {
      method: "POST",
      body: JSON.stringify({
        registration: fields,
        attorney_answers: answers,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.success) {
          next();
        } else if (res.error) {
          if (typeof res.message === "string") {
            setError(res.message);
          } else {
            setError(
              res.message?.registration || res?.message?.attorney_answers || ""
            );
          }
        }
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setLoader(false));
  };

  useEffect(() => {
    if (inputRef?.current && isActive) {
      setTimeout(() => {
        inputRef?.current?.focus({
          preventScroll: true,
        });
      }, 200);
    }
  });

  return (
    <div className="qs-container">
      {data.type !== "checkbox" && (
        <p className="qs-label">
          <span className="slide-sn">{data?.sn}.)</span> {data?.label}
        </p>
      )}
      {data?.note && <p>{data?.note}</p>}
      {data?.type === "phoneInput" && isActive && (
        <PhoneInput
          onlyCountries={["us"]}
          placeholder="Type your answer here"
          value={fields[data.field] || null}
          onChange={(phone) =>
            handleInput({ ...fields, [data.field]: `+${phone}` })
          }
          country="us"
          className="phone-input"
          onEnterKeyPress={() => next()}
        />
      )}
      {data?.type === "select" && (
        <Select
          ref={inputRef}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          className="languages"
          placeholder="Type your answer here"
          options={data.options}
          components={{
            Option,
          }}
          value={fields[data.field] || null}
          onChange={(selected) =>
            handleInput({ ...fields, [data.field]: selected })
          }
        />
      )}
      {data?.type === "checkbox" && (
        <div className="d-flex">
          <Form.Check
            type="checkbox"
            id="eco-panel-attorney"
            className="mt-1"
            placeholder="Type your answer here"
            checked={checked}
            onChange={(e) => setChecked(!checked)}
          />
          <Form.Label
            className="form_label_terms fs-1"
            htmlFor="eco-panel-attorney"
          >
            I have read and accept the terms of the ECO Panel Attorney Program.
            <span className="text-danger">*</span>
          </Form.Label>
        </div>
      )}
      {data?.type === "check" &&
        data?.options?.map((option, i) => {
          return (
            <Form.Check
              key={`option-${index}-${i}`}
              type="checkbox"
              id={`option-${index}-${i}-${option.id}`}
            >
              <Form.Check.Input
                type="checkbox"
                checked={option.value === selected}
                onClick={() => {
                  handleSelect(option?.value);
                }}
              />
              <Form.Check.Label>{option.label}</Form.Check.Label>
            </Form.Check>
          );
        })}
      {data?.type === "text" && (
        <Form.Control
          ref={inputRef}
          id={data.id}
          type="text"
          placeholder="Type your answer here"
          value={fields[data.field] || ""}
          onChange={(e) => {
            handleInput({ ...fields, [data.field]: e.target.value });
          }}
        />
      )}

      <div style={{ height: "50px" }} className="mt-3">
        {error && (
          <Form.Control.Feedback
            type="invalid"
            className="d-block show-up-animation-fast mb-3"
          >
            <span className="error-text">
              {" "}
              <BiSolidErrorCircle style={{ marginTop: "-3px" }} size={16} />
              {error}
            </span>
          </Form.Control.Feedback>
        )}
        <div className="d-flex">
          {index > 0 && (
            <Button
              size="sm"
              variant="secondary"
              style={{ color: "white" }}
              className="show-up-animation-fast me-2"
              onClick={() => prev()}
            >
              Prev
            </Button>
          )}

          {data?.declaration ? (
            <Button
              disabled={!checked}
              size="sm"
              variant="success"
              style={{ color: "white" }}
              className="show-up-animation-fast"
              onClick={() => handleSubmit()}
            >
              {loader && <Spinner size="sm" variant="light" className="me-1" />}
              Submit
            </Button>
          ) : (
            dataLength - 1 !== index && (
              <Button
                size="sm"
                variant="success"
                style={{ color: "white" }}
                className="show-up-animation-fast"
                onClick={() => next()}
              >
                Next
              </Button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
