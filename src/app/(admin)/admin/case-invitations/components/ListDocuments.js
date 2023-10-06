import moment from "moment";
import React, { useState } from "react";
import { Modal, Badge, Tabs, Tab, Button, Row, Col } from "react-bootstrap";
import Documents from "./Documents";
import common from "@/utils/common";

const ListDocuments = ({ closeModal, records, showDocList }) => {

    console.log(records);
  return (
    <Modal
      show={showDocList}
      onHide={closeModal}
      backdrop="static"
      keyboard={false}
      centered
      size="lg"
    >
      <Modal.Header closeButton className="border-bottom-0">
        <h3> Case Invoice Documents</h3>
      </Modal.Header>
      <Modal.Body>
        <div className="table-responsive min-list-height">
          <table className="table table-borderless table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          size="lg"
          type="submit"
          variant="secondary"
          onClick={closeModal}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ListDocuments;
