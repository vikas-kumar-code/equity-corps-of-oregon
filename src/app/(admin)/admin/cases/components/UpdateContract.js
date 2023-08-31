"use client";

import common from "@/utils/common";
import React, { useState, useEffect, useCallback } from "react";
import { Button, Modal, Spinner, Form, Row, Col } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
LoadingOverlay.propTypes = undefined;

const Editor = dynamic(() => import("../../../components/Editor"), {
  ssr: false,
});

export default function UpdateContract(props) {
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [content, setContent] = useState(" ");

  const handleContent = useCallback(
    (content) => {
      setContent(content);
    },
    [content]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setErrors({});
    fetch(common.apiPath("admin/contract/save"), {
      method: "POST",
      body: JSON.stringify({ content: content }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          toast.success(response.message);
          props.closeModal();
        } else if (response.error) {
          if (typeof response.message === "object") {
            setErrors(response.message);
          } else {
            toast.error(response.message);
          }
        }
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => setSubmitted(false));
  };

  const getRecord = async () => {
    setLoader(true);
    fetch(common.apiPath(`/admin/contract/get`))
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          setContent(response?.record?.content || " ");
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
    if (props.showModal) {
      getRecord();
    }
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
          <h3>Update Contract</h3>
        </Modal.Header>
        <Modal.Body>
          <LoadingOverlay active={loader} spinner text="Loading...">
            <Row>
              <Form.Group
                as={Col}
                md={12}
                className="mb-2"
                style={{ height: 371 }}
              >
                <Editor value={content} handleContent={handleContent} />
                {errors.content && (
                  <Form.Control.Feedback className="d-block" type="invalid">
                    {errors.content}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Row>
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
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
