import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Collapse,
  FloatingLabel,
  Form,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";

export default function SearchBox(props) {
  const [submitted, setSubmitted] = useState(false);
  const [fields, setFields] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    props.searchRecords(fields);
  };

  const handleChange = (e, field) => {
    setFields({ ...fields, [field]: e.target.value });
  };

  useEffect(() => {
    if (Object.keys(fields).length === 0) {
      props.searchRecords({ page: 1 });
    }
  }, [fields]);
  return (
    <Collapse in={props.open}>
      <Form onSubmit={handleSubmit}>
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>{props.title}</Card.Title>
            <Row>
              {props.searchFields.map((field, index) => (
                <Form.Group
                  as={Col}
                  md={props.col}
                  className="mb-2"
                  key={`search-element-${index}`}
                >
                  {field.type === "text" && (
                    <FloatingLabel
                      controlId={"floatingInput-".index}
                      label={field.label}
                      className="mb-3"
                      key={`sfield-${index}`}
                    >
                      <Form.Control
                        type={field.type}
                        name={field.name}
                        placeholder={field.name}
                        onChange={(event) => handleChange(event, field.name)}
                        value={fields[field.name] ? fields[field.name] : ""}
                      />
                    </FloatingLabel>
                  )}
                </Form.Group>
              ))}
            </Row>
            <div className="text-end">
              <Button
                variant="danger"
                className="me-2"
                size="lg"
                onClick={() => {
                  setFields({});
                }}
              >
                Clear
              </Button>
              <Button
                variant="success"
                size="lg"
                disabled={submitted}
                type="submit"
              >
                {submitted && <Spinner size="sm" className="me-1" />}Search
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Form>
    </Collapse>
  );
}
