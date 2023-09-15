"use client";

import permissionSchema from "@/joi/permissionSchema";
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
      const validated = await validateAsync(permissionSchema, {permissions: permissions})
      if(validated.errors){
        handleErrors(validated.errors)
      }else{
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
      }
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
        <Modal.Body className="pl-4 pr-4 role_permission" style={{ minHeight: 250 }}>
          <LoadingOverlay active={loader} spinner text="Loading...">
            {routes.map((route, i) => {
              const { label, id, children } = route;
              return (
                <Card key={i} className="my-2">
                  <Card.Header>
                    <Form.Check
                      type="checkbox"
                      id={`route-${i}-${id}`}
                    >
                      <Form.Check.Input
                        type="checkbox"
                        checked={routeId.includes(id)}
                        onChange={()=>{}}
                      />
                      <Form.Check.Label className="mt-2">{label}</Form.Check.Label>
                    </Form.Check>
                  </Card.Header>
                  {children.length > 0 ? (
                    <Card.Body>
                      <Row>
                        {children.map((child, index) => {
                          const { label, url, id } = child;
                          return (
                            <Col md={3} key={`route-${index}-${i}`}>
                              <Form.Check
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
