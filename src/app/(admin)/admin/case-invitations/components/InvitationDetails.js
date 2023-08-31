import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Modal,
  Table,
  Badge,
  Tabs,
  Row,
  Tab,
  Button,
  Spinner,
  Col,
} from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";

const InvitationDetails = ({ showModal, closeModal, record }) => {
  const [activeTab, setActiveTab] = useState(1);
  const [loader, setLoader] = useState(false);
  const [activated, setActivated] = useState(1);

  const iStatus = {
    0: {
      label: "Pending",
      bg: "warning",
    },
    1: {
      label: "Accepted",
      bg: "success",
    },
    2: {
      label: "Expired",
      bg: "danger",
    },
  };

  useEffect(() => {
    if (activeTab > activated) {
      setActivated(activeTab);
    }
  }, [activeTab]);

  return (
    <Modal
      show={showModal}
      onHide={closeModal}
      backdrop="static"
      keyboard={false}
      centered
      size="lg"
    >
      <LoadingOverlay active={loader} spinner text="Loading...">
        <Modal.Header closeButton className="border-bottom-0">
          <h3> Case Details</h3>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            activeKey={activeTab}
            id="justify-tab-example"
            justify
            onSelect={(k) => setActiveTab(parseInt(k))}
          >
            <Tab
              eventKey={1}
              title="Basic Details"
              disabled={activated < 1 && record.id}
            >
              <Row>
                <Table>
                  <thead>
                    <tr>
                      <th colSpan={3}>Case Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>Case Number</th>
                      <td>{record.case_number}</td>
                    </tr>
                    <tr>
                      <th>Title</th>
                      <td>{record.title}</td>
                    </tr>
                    <tr>
                      <th>Description</th>
                      <td>{record.description}</td>
                    </tr>
                    <tr>
                      <th>Status</th>
                      <td>
                        <Badge
                          pill
                          bg={
                            iStatus[record.case_invitations[0].status].bg ||
                            "info"
                          }
                        >
                          {iStatus[record.case_invitations[0].status].label ||
                            "N/A"}
                        </Badge>
                      </td>
                    </tr>
                    <tr>
                      <th>Added On</th>
                      <td>
                        {moment(record.case_invitations[0].sent_on).format(
                          "D MMM, YYYY"
                        )}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Row>
            </Tab>
            <Tab
              eventKey={2}
              title="Milestones"
              // disabled={activated < 2 && record.id}
            >
              <Table>
                <thead>
                  <tr className="mx-5">
                    <th colSpan={4}>#</th>
                    <th colSpan={4}>Comment</th>
                    <th colSpan={4}>Updated On</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="mt-5 mx-5">
                    <td colSpan={4}>1</td>
                    <td colSpan={4}>Testing</td>
                    <td colSpan={4}>
                      <Badge>30 Aug 2023</Badge>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Tab>
            <Tab
              eventKey={3}
              title="Documents"
              // disabled={activated < 3 && record.id}
            >
              <Table>
                <thead>
                  <tr className="mx-5">
                    <th colSpan={4}>#</th>
                    <th colSpan={4}>Document Name</th>
                    <th colSpan={4}>Updated On</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="mt-5 mx-5">
                    <td colSpan={4}>1</td>
                    <td colSpan={4}>Testing</td>
                    <td colSpan={4}>
                      <Badge>30 Aug 2023</Badge>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Tab>
            <Tab eventKey={4} title="Case Activities">
              <div>Hello</div>
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <Button
            size="lg"
            type="submit"
            variant="success"
            onClick={closeModal}
          >
            Close
          </Button>
        </Modal.Footer>
      </LoadingOverlay>
    </Modal>
  );
};

export default InvitationDetails;
