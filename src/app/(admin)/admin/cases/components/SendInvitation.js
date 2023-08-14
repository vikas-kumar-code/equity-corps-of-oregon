import React, { useState, useEffect } from "react";
import { Button, Modal, Spinner, Form, Col } from "react-bootstrap";
import common from "@/utils/common";
import { toast } from "react-toastify";
import AsyncSelect from "react-select/async";
import "../../../../styles/async-select.css";
import { sendInvitationSchema } from "@/joi/casesSchema";

const SendInvitation = (props) => {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState(null);
  let searchTimeOut = 0;

  const promiseUserOptions = (inputValue) => {
    if (searchTimeOut > 0) {
      clearTimeout(searchTimeOut);
    }

    return new Promise((resolve) => {
      if (inputValue !== "") {
        searchTimeOut = setTimeout(() => {
          fetch(
            common.apiPath(
              `/admin/users/search/?role_id=3&keyword=${inputValue}`
            )
          )
            .then((response) => response.json())
            .then((response) => {
              if (response.success) {
                let userResponse = JSON.parse(response.records);
                let users = userResponse.map((user) => ({
                  label: user.name,
                  value: user.id,
                }));
                setUsers(users);
                resolve(filterUser(inputValue));
              } else if (response.error) {
                toast.error(response.message);
              }
            })
            .catch((error) => {
              toast.error(error.message);
            });
        }, 500);
      } else {
        resolve(filterUser(inputValue));
      }
    });
  };

  const filterUser = (inputValue) => {
    return users.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(null);
    setSubmitted(true);
    try {
      let fieldsData = await sendInvitationSchema.validateAsync(
        {
          case_id: props?.recordId,
          users: selected.map((user) => user.value),
        },
        {
          abortEarly: true,
        }
      );
      await fetch(common.apiPath(`/admin/cases/send-invitation`), {
        method: "POST",
        body: JSON.stringify(fieldsData),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            toast.success(response.message);
            props.closeModal();
            props.reloadRecords();
            setSelected([]);
          } else if (response.error) {
            setErrors(response.message);
          }
        });
    } catch (error) {
      let errors = common.getErrors(error);
      setErrors(errors);
    } finally {
      setSubmitted(false);
    }
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
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton className="border-bottom-0">
          <h3>Send Invitation</h3>
        </Modal.Header>
        <Modal.Body className="show-error">
          <Form.Group as={Col} md={12} className="mb-2">
            <AsyncSelect
              className="multi-select-input"
              isMulti
              cacheOptions
              defaultOptions
              loadOptions={promiseUserOptions}
              value={selected}
              onChange={setSelected}
            />
          </Form.Group>
          <Form.Control.Feedback type="invalid">{errors}</Form.Control.Feedback>
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
};

export default SendInvitation;
