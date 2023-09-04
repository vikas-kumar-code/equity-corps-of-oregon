"use client";

import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Spinner,
  FloatingLabel,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";
import { toast } from "react-toastify";
import common from "@/utils/common";
import validateAsync from "@/utils/validateAsync";
import rolesSchema from "@/joi/rolesSchema";
LoadingOverlay.propTypes = undefined;

export default function AddEditRole(props) {
  const [loader, setLoader] = useState(false);
  const [fields, setFields] = useState({ status: 1 });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e, field) => {
    setFields({ ...fields, [field]: e.target.value });
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
    if(validated.errors){
        handleErrors(validated.errors);
    }else{
      setSubmitted(true);
      let REQUEST_URI = common.apiPath(`/admin/roles/save/`);
      let REQUEST_METHOD = "POST";
      if (props.recordId) {
        REQUEST_URI = common.apiPath(`/admin/roles/save/${props.recordId}`);
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
            toast.success(response.message);
          } else if (response.error) {
            handleErrors(response.message);
          }
        })
        .catch((error) => {
          toast.error(error.message);
        })
        .finally(() => setSubmitted(false));
    }
  };

  const getRole = async () => {
    setLoader(true);
    await fetch(common.apiPath(`/admin/roles/save/${props.recordId}`))
      .then((response) => response.json())
      .then((response) => {
        if(response.success){
            setFields(response.record);
        }else if(response.error){
            toast.error(response.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => setLoader(false));
  };

  useEffect(() => {
    if (props.recordId) {
      getRole();
    }
  }, []);

  return (
    <Modal
      show={props.showModal}
      onHide={props.closeModal}
      backdrop="static"
      keyboard={false}
      centered
      size="md"
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <h3>{props.recordId ? "Update" : "Add"} Role</h3>
        </Modal.Header>
        <Modal.Body>
          <LoadingOverlay active={loader} spinner text="Loading...">
            <FloatingLabel
              controlId="floatingInput"
              label="Name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                name="name"
                placeholder="name"
                onChange={(event) => handleChange(event, "name")}
                isInvalid={!!errors.name}
                value={fields.name ? fields.name : ""}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </FloatingLabel>
            <Form.Label>Status</Form.Label>
            <div className="ps-2">
              <Row>
                <Col md={3}>
                  <Form.Check id="active" className="float-left">
                    <Form.Check.Input
                      type="radio"
                      name="status"
                      value="1"
                      checked={parseInt(fields.status) === 1}
                      onChange={(event) => handleChange(event, "status")}
                    />
                    <Form.Check.Label className="ps-0 mt-1">
                      Active
                    </Form.Check.Label>
                  </Form.Check>
                </Col>
                <Col md={3}>
                  <Form.Check id="inactive" className="float-left">
                    <Form.Check.Input
                      type="radio"
                      name="status"
                      value="0"
                      checked={parseInt(fields.status) === 0}
                      onChange={(event) => handleChange(event, "status")}
                    />
                    <Form.Check.Label className="ps-0">
                      In Active
                    </Form.Check.Label>
                  </Form.Check>
                </Col>
              </Row>
            </div>
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
