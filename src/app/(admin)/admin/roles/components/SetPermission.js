"use client";

import rolesSchema from "@/joi/rolesSchema";
import common from "@/utils/common";
import validateAsync from "@/utils/validateAsync";
import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Spinner,
  Form,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";
import { toast } from "react-toastify";
LoadingOverlay.propTypes = undefined;

export default function SetPermission(props) {
  const [loader, setLoader] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [errors, setErrors] = useState({});
  const [fields, setFields] = useState({roleId: null, routes:[]});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (roleId, route) => {
    setFields({...fields, roleId, routes: [...fields.routes, route]})
  };

  const handleErrors = (errors) => {
    if (typeof errors === "object") {
      setErrors(errors);
    } else if (typeof errors === "string") {
      toast.error(errors);
    } else {
      toast.error("Something went wrong...! please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validated = await validateAsync(rolesSchema, fields);
    if (validated.error) {
      handleErrors(validated.errors);
    } else {
      setSubmitted(true);
      let REQUEST_URI = `${process.env.NEXT_PUBLIC_API_URL}/api/roles/save`;
      let REQUEST_METHOD = "POST";
      if (props.recordId) {
        REQUEST_URI = `${process.env.NEXT_PUBLIC_API_URL}/api/roles/save/${props.recordId}`;
        REQUEST_METHOD = "PUT";
      }
      await fetch(REQUEST_URI, {
        method: REQUEST_METHOD,
        body: JSON.stringify(fields),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            props.closeModal();
            props.reloadeRecords();
            toast.success(response.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
          } else if (response.error) {
            handleErrors(response.message);
          }
        })
        .catch((error) => {
          toast.error(error.message);
        })
        .finally(() => setLoader(false));
    }
  };

  const getRoutes = async () => {
    setLoader(true);
    await fetch(common.apiPath("admin/permissions"))
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          setRoutes(response.records);
        } else if (response.error) {
          toast.error(response.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => setLoader(false));
  };

  useEffect(() => {
    getRoutes();
  }, []);
  return (
    <Modal
      show={props.showModal}
      onHide={props.closeModal}
      backdrop="static"
      keyboard={false}
      centered
      size="lg"
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <h3>{props.recordId ? "Update" : "Assign"} Permission</h3>
        </Modal.Header>
        <Modal.Body ModalBody className="pl-4 pr-4" style={{ minHeight: 250 }}>
          <LoadingOverlay active={loader} spinner text="Loading...">
            {routes.map((route, i) => {
              const { label, id, children } = route;
              return (
                <Card key={i}>
                  <Card.Header>
                    <Form.Check
                      key={`route-${i}`}
                      type="checkbox"
                      id={`route-${i}-${id}`}
                    >
                      <Form.Check.Input type="checkbox" />
                      <Form.Check.Label>{label}</Form.Check.Label>
                    </Form.Check>
                  </Card.Header>
                  {children.length > 0 ? (
                    <Card.Body>
                      <Row>
                        {children.map((child, index) => {
                          const { label, url } = child;
                          return (
                            <Col md={3}>
                              <Form.Check
                                key={`route-${index}-${i}`}
                                type="checkbox"
                                id={`route-${index}-${i}-${id}`}
                              >
                                <Form.Check.Input
                                  type="checkbox"
                                  onChange={(e) => handleSelect(props.recordId, url)}
                                />
                                <Form.Check.Label>{label}</Form.Check.Label>
                              </Form.Check>
                            </Col>
                          );
                        })}
                      </Row>
                    </Card.Body>
                  ) : (
                    ""
                  )}
                </Card>
              );
            })}
          </LoadingOverlay>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            type="button"
            disabled={submitted}
            onClick={props.closeModal}
            size="lg"
          >
            Cancel
          </Button>
          <Button
            variant="success"
            type="submit"
            disabled={submitted}
            size="lg"
          >
            {submitted && (
              <Spinner size="sm" variant="light" className="me-1" />
            )}
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
