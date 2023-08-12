"use client";

import React, { Component } from "react";
import { Button, Modal, Spinner, Form, Col } from "react-bootstrap";
import common from "@/utils/common";
import { toast } from "react-toastify";
import AsyncSelect from "react-select/async";
import "../../../../styles/async-select.css";

export default class SendInvitation extends Component {
  constructor(props) {
    super(props);
    this.searchTimeOut = 0;
    this.state = {
      fields: {},
      errors: {},
      users: [],
      submitted: false,
    };
  }
  promiseUserOptions = (inputValue) => {
    if (this.searchTimeOut > 0) {
      clearTimeout(this.searchTimeOut);
    }
    return new Promise((resolve) => {
      if (inputValue !== "") {
        this.searchTimeOut = setTimeout(() => {
          fetch(
            common.apiPath(
              `/admin/users/search/?role_id=3&keyword=${inputValue}`
            )
          )
            .then((response) => response.json())
            .then((response) => {
              if (response.success) {
                let userResponse = JSON.parse(response.records);
                let users = [];
                userResponse.forEach((user, index) => {
                  users[index] = { label: user.name, value: user.id };
                });
                this.setState({ users }, () => {
                  resolve(this.filterUser(inputValue));
                });
              } else if (response.error) {
                toast.error(response.message);
              }
            })
            .catch((error) => {
              toast.error(error.message);
            })
            .finally(() => {});
        }, 500);
      } else {
        resolve(this.filterUser(inputValue));
      }
    });
  };

  filterUser = (inputValue) => {
    return this.state.users.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  render() {
    return (
      <Modal
        show={this.props.showModal}
        onHide={this.props.closeModal}
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
              <AsyncSelect
              className="multi-select-input"
                isMulti
                cacheOptions
                defaultOptions
                loadOptions={this.promiseUserOptions}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              type="button"
              disabled={this.state.submitted}
              onClick={this.props.closeModal}
              size="lg"
            >
              Cancel
            </Button>
            <Button
              variant="success"
              type="submit"
              disabled={this.state.submitted}
              size="lg"
            >
              {this.state.submitted && (
                <Spinner size="sm" variant="light" className="me-1" />
              )}
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}
