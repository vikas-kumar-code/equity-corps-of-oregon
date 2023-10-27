import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Spinner,
  Form,
  Col,
  Table,
  SplitButton,
  Dropdown,
  FormLabel,
} from "react-bootstrap";
import common from "@/utils/common";
import { toast } from "react-toastify";
import AsyncSelect from "react-select/async";
import "../../../../styles/async-select.css";
import moment from "moment";
import LoadingOverlay from "react-loading-overlay";

const SendInvitation = (props) => {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState(null);
  const [groups, setGroups] = useState([]);
  let searchTimeOut = 0;

  const promiseUserOptions = (inputValue) => {
    if (searchTimeOut > 0) {
      clearTimeout(searchTimeOut);
    }
    return new Promise((resolve) => {
      if (inputValue !== "") {
        searchTimeOut = setTimeout(() => {
          resolve(filterUser(inputValue));
        }, 500);
      } else {
        resolve(filterUser(inputValue));
      }
    });
  };

  const getGroups = async () => {
    setLoader(true);
    fetch(common.apiPath(`/admin/groups`))
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          let userResponse = response.records;
          const excludeGroups = [];
          // Exclude invited users
          if (props?.invitedUsers) {
            props?.invitedUsers.forEach((item) => {
              if (item?.user?.id) {
                excludeGroups.push(item?.user?.id);
              }
            });
          }
          let groups = userResponse.filter(
            (group) => !excludeGroups.includes(group.id)
          );
          groups = groups.map((group) => ({
            label: group.name,
            value: group.id,
          }));
          setGroups(groups);
        } else if (response.error) {
          toast.error(response.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => setLoader(false));
  };

  const loadUsers = async () => {
    setErrors(null);
    try {
      await fetch(common.apiPath(`/admin/users/search/?role_id=[3,4]`))
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            let userResponse = JSON.parse(response.records);
            const excludeUsers = [];
            // Exclude invited users
            if (props?.invitedUsers) {
              props?.invitedUsers.forEach((item) => {
                if (item?.user?.id) {
                  excludeUsers.push(item?.user?.id);
                }
              });
            }
            let users = userResponse.filter(
              (user) => !excludeUsers.includes(user.id)
            );
            users = users.map((user) => ({
              label: user.name,
              value: user.id,
            }));
            setUsers(users);
          } else if (response.error) {
            toast.error(response.message);
          }
        });
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoader(false);
    }
  };

  const filterUser = (inputValue) => {
    return users.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selected.length > 0 || selectedGroups.length > 0) {
      setErrors(null);
      setSubmitted(true);
      try {
        await fetch(common.apiPath(`/admin/cases/invitation/send`), {
          method: "POST",
          body: JSON.stringify({
            case_id: props?.recordId,
            users: selected.map((user) => user.value),
            groups: selectedGroups.map((group) => group.value),
          }),
        })
          .then((response) => response.json())
          .then((response) => {
            if (response.success) {
              toast.success(response.message);
              props.closeModal();
              props.reloadRecords();
              setSelected([]);
              selectedGroups([])
            } else if (response.error) {
              setErrors(response.message);
            }
          });
      } catch (error) {
        setErrors(errors);
      } finally {
        setSubmitted(false);
      }
    } else {
      setErrors("Select at least one user.");
    }
  };

  const cancelInvitation = async (id) => {
    if (confirm("Are you sure to proceed.")) {
      setLoader(true);
      try {
        await fetch(common.apiPath(`/admin/cases/invitation/cancel`), {
          method: "POST",
          body: JSON.stringify({
            id: id,
            case_id: props.recordId,
            invitedUsers: props?.invitedUsers,
          }),
        })
          .then((response) => response.json())
          .then((response) => {
            if (response.success) {
              toast.success(response.message);
              props.reloadRecords();
            } else if (response.error) {
              toast.error(response.message);
            }
          });
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoader(false);
      }
    }
  };

  const btnStatus = {
    0: {
      label: "Pending",
      bg: "warning",
    },
    1: {
      label: "Accepted",
      bg: "success",
    },
    2: {
      label: "Cancelled",
      bg: "danger",
    },
  };

  useEffect(() => {
    getGroups();
  }, []);
  useEffect(() => {
    loadUsers();
  }, [props?.invitedUsers]);

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
        <LoadingOverlay active={loader} spinner>
          <Modal.Header closeButton className="border-bottom-0">
            <h3>Send Invitation</h3>
          </Modal.Header>
          <Modal.Body className="show-error pt-0">
            {props?.invitedUsers && props?.invitedUsers?.length > 0 && (
              <div
                className="table-responsive mb-2"
                style={{ maxHeight: "45vh", minHeight: "auto" }}
              >
                <Table
                  bordered
                  hover
                  variant="dark"
                  size="sm"
                  className="table-padding-1"
                >
                  <thead>
                    <tr>
                      <th colSpan={3}>Sent Invitations</th>
                    </tr>
                    <tr>
                      <th>User</th>
                      <th className="text-center">Status</th>
                      <th className="text-center">Sent On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props?.invitedUsers?.map((data, index) => {
                      return (
                        <tr>
                          <td>
                            {`${data?.user?.name}`} <br />
                            {`${data?.user?.email}`}
                          </td>
                          <td className="text-center">
                            <SplitButton
                              key={`key-${index}`}
                              id={`dropdown-${index}`}
                              variant={btnStatus[data.status].bg || "info"}
                              title={btnStatus[data.status].label || "N/A"}
                              align="end"
                            >
                              <Dropdown.Item
                                eventKey="1"
                                onClick={() => cancelInvitation(data?.id)}
                              >
                                Cancel
                              </Dropdown.Item>
                            </SplitButton>
                          </td>
                          <td className="text-center">
                            {moment(data.sent_on).format("D MMM, YYYY")}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            )}
            <Form.Group as={Col} md={12} className="mb-2">
              <FormLabel>Select Groups</FormLabel>
              <AsyncSelect
                className="multi-select-input"
                isMulti
                cacheOptions
                loadOptions={promiseUserOptions}
                defaultOptions={groups}
                value={selectedGroups}
                onChange={setSelectedGroups}
              />
            </Form.Group>
            <Form.Control.Feedback type="invalid">
              {errors}
            </Form.Control.Feedback>
            <Form.Group as={Col} md={12} className="mb-2">
              <FormLabel>Select Members</FormLabel>
              <AsyncSelect
                className="multi-select-input"
                isMulti
                cacheOptions
                loadOptions={promiseUserOptions}
                defaultOptions={users}
                value={selected}
                onChange={setSelected}
              />
            </Form.Group>
            <Form.Control.Feedback type="invalid">
              {errors}
            </Form.Control.Feedback>
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
        </LoadingOverlay>
      </Form>
    </Modal>
  );
};

export default SendInvitation;
