import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import {
  Button,
  Card,
  Collapse,
  FloatingLabel,
  Form,
  Row,
  Col,
} from "react-bootstrap";

export default function SearchBox(props) {
  const [fields, setFields] = useState(props.initialValues || {});
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams(searchParams);
    // update search params
    Object.entries(fields).forEach((q) => {
      queryParams.set(q[0], q[1]);
    });
    router.push(`${pathname}?${queryParams}`, { scroll: false });
  };

  const handleChange = (e, field) => {
    setFields({ ...fields, [field]: e.target.value });
  };

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
                  {field.type === "select" && (
                    <FloatingLabel label={field.label} className="mb-3">
                      <Form.Select
                        name={field.name}
                        value={fields[field.name] ? fields[field.name] : ""}
                        onChange={(event) => handleChange(event, field.name)}
                      >
                        <option value="">
                          Select {field.label.toLowerCase()}
                        </option>
                        {field.values.map((value, index) => (
                          <option
                            value={value.id}
                            key={`eco-provider-${index}`}
                          >
                            {value.name}
                          </option>
                        ))}
                      </Form.Select>
                    </FloatingLabel>
                  )}
                </Form.Group>
              ))}
            </Row>
            <div className="text-end btn-icon">
              <Button
                variant="danger"
                className="me-2"
                size="lg"
                onClick={() => {
                  setFields({});
                  router.push(pathname, { scroll: false });
                }}
              >                
                Clear
              </Button>
              <Button variant="success" size="lg" type="submit">                
                Search
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Form>
    </Collapse>
  );
}
