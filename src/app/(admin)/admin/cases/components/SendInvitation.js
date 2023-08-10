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
import common from "@/utils/common";
import { toast } from "react-toastify";
import AsyncSelect from 'react-select/async';

export default function SendInvitation(props) {
  const [fields, setFields] = useState({});
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [users, setUsers] = useState([]);
  let searchTimeOut;

  const handleChange = (e, field) => {
    setFields({ ...fields, [field]: e.target.value });
  };

  const promiseUserOptions = (inputValue) => {
    if (searchTimeOut > 0) {
      clearTimeout(searchTimeOut);
    }
    return new Promise((resolve) => {
      if (inputValue !== "") {
        searchTimeOut = setTimeout(() => {
          fetch(common.apiPath(`/admin/email-templates/get/${props.recordId}`))
            .then((response) => response.json())
            .then((response) => {
              if (response.success) {
                setUsers(response.data);
                resolve(filterUser(inputValue));

              } else if (response.error) {
                toast.error(response.message);
              }
            })
            .catch((error) => {
              toast.error(error.message);
            })
            .finally(() => setLoader(false));
        }, 500);
      } else {
        resolve(this.filterUser(inputValue));
      }
    });
  };

  const filterUser = (inputValue) => {
    return users.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  return (
    <Modal
      show={props.showModal}
      onHide={props.closeModal}
      backdrop="static"
      keyboard={false}
      centered
      size="md"
    >
      <Form /* onSubmit={handleSubmit} */>
        <Modal.Header closeButton className="border-bottom-0">
          <h3>Send Invitation</h3>
        </Modal.Header>
        <Modal.Body>
          <Form.Group as={Col} md={12} className="mb-2">
            <FloatingLabel
              controlId="floatingInput"
              label="Case Number"
              className="mb-3"
            >
              <AsyncSelect
                isMulti
                cacheOptions
                defaultOptions
                loadOptions={promiseUserOptions}
              />
              <Form.Control.Feedback type="invalid">
                {errors.case_number}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
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
