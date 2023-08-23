"use client";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { BiSolidErrorCircle } from "react-icons/bi";

export default function Question(props) {
  const { data, setAnswers, answers, error, setError, index, next } = props;
  const [selected, setSelected] = useState(null);
  const handleSelect = (id) => {
    setSelected(id);
    setError(null);
    setTimeout(() => {
      setAnswers({ ...answers, [data?.id]: id });
    }, 650);
  };

  return (
    <div className="qs-container">
      <p className="qs-label">
        <span className="slide-sn">{data?.sn}.)</span> {data?.question}
      </p>
      {data?.options?.map((option, i) => {
        return (
          <Form.Check
            key={`option-${index}-${i}`}
            type="checkbox"
            id={`option-${index}-${i}-${option.id}`}
          >
            <Form.Check.Input
              type="checkbox"
              checked={option.id === selected}
              onClick={() => {
                handleSelect(option?.id);
              }}
            />
            <Form.Check.Label>{option.option}</Form.Check.Label>
          </Form.Check>
        );
      })}
      <div style={{ height: "50px" }}>
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
        {!error && selected && (
          <Button
            size="sm"
            variant="success"
            style={{ color: "white" }}
            className="show-up-animation-fast"
            onClick={() => next()}
          >
            OK
          </Button>
        )}
      </div>
    </div>
  );
}
