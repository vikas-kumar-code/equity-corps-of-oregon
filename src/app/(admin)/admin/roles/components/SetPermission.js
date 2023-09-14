"use client";

import permissionSchema from "@/joi/permissionSchema";
import rolesSchema from "@/joi/rolesSchema";
import common from "@/utils/common";
import validateAsync from "@/utils/validateAsync";
import React, { useState, useEffect } from "react";
import { Button, Modal, Spinner, Form, Row, Col, Card } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";
import { toast } from "react-toastify";
LoadingOverlay.propTypes = undefined;

export default function SetPermission(props) {
  const [loader, setLoader] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [errors, setErrors] = useState({});
  // const [fields, setFields] = useState([{ role_id: props.recordId, route_id: null }]);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (e, roleId, routeId) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setPermissions(prevPermissions => [...prevPermissions, {role_id: roleId, route_id: routeId}]);
    } else {
      setPermissions(prevPermissions => prevPermissions.filter(permission => permission.route_id !== routeId));
    }
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
      await fetch(common.apiPath(`/admin/permissions/save`), {
        method: "POST",
        body: JSON.stringify({permissions: [...permissions]}),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            props.closeModal();
            getRoutes();
            toast.success(response.message);
          } else if (response.error) {
            handleErrors(response.message);
          }
        })
        .catch((error) => {
          toast.error(error.message);
        })
        .finally(() => setSubmitted(false));
  };

  const getRoutes = async () => {
    setLoader(true);
    await fetch(common.apiPath(`admin/permissions/get/${props.recordId}`))
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          setRoutes(response.routes);
          setPermissions(response.permissions);
        } else if (response.error) {
          toast.error(response.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => setLoader(false));
  };

  console.log(permissions);
  let routeId = permissions.map(item=> item.route_id)
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
                      type="checkbox"
                      id={`route-${i}-${id}`}
                    >
                      <Form.Check.Input
                        type="checkbox"
                        checked={permissions.includes(id)}
                      />
                      <Form.Check.Label>{label}</Form.Check.Label>
                    </Form.Check>
                  </Card.Header>
                  {children.length > 0 ? (
                    <Card.Body>
                      <Row>
                        {children.map((child, index) => {
                          const { label, url, id } = child;
                          return (
                            <Col md={3}>
                              <Form.Check
                                key={`route-${index}-${i}`}
                                type="checkbox"
                                id={`route-${index}-${i}-${id}`}
                              >
                                <Form.Check.Input
                                  checked={routeId.includes(id)}
                                  type="checkbox"
                                  onChange={(e) =>
                                    handleSelect(e, props.recordId, id)
                                  }
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
          <span className="text-danger m-2">{errors.routesId}</span>
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
