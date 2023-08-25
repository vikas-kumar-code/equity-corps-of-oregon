"use client";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { BiSolidErrorCircle } from "react-icons/bi";

export default function Question(props) {
  const { data, setAnswers, answers, error, setError, index, next, prev } = props;
  const [selected, setSelected] = useState(null);
  const handleSelect = (id) => {
    setSelected(id);
    setError(null);
    setTimeout(() => {
      setAnswers({ ...answers, [data?.id]: id });
    }, 500);
  };

  return (
    <div className="qs-container">
      <p className="qs-label">
        <span className="slide-sn">{data?.sn}.)</span> {data?.question}
      </p>
      {data?.note && <p>{data?.note}</p>}
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
            className="d-block show-up-animation-fast mb-3"
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
        <div className="d-flex">
          {index > 1 && (
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
          <Button
            size="sm"
            variant="success"
            style={{ color: "white" }}
            className="show-up-animation-fast"
            onClick={() => next()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
