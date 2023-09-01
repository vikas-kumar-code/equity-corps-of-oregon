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
  Col,
} from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";
import DownloadButton from "../../cases/components/DownloadButton";
import common from "@/utils/common";

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
              className="case_invitation"
            >
              <Row>
                <Col>Case Number</Col>
                <Col>{record.case.case_number}</Col>
              </Row>
              <Row>
                <Col>Title</Col>
                <Col>{record.case.title}</Col>
              </Row>
              <Row>
                <Col>Description</Col>
                <Col>{record.case.description}</Col>
              </Row>
              <Row>
                <Col>Status</Col>
                <Col>
                  <Badge pill bg={iStatus[record.status].bg || "info"}>
                    {iStatus[record.status].label || "N/A"}
                  </Badge>
                </Col>
              </Row>
              <Row>
                <Col>Added On</Col>
                <Col>{moment(record.sent_on).format("D MMM, YYYY")}</Col>
              </Row>
            </Tab>
            <Tab eventKey={2} title="Milestones">
              <table  className="table">
                <thead>
                  <tr className="mx-5">
                    <th colSpan={4}>#</th>
                    <th colSpan={4}>Comment</th>
                    <th colSpan={4}>Updated On</th>
                  </tr>
                </thead>
                <tbody>
                  {record.case.case_milestones.map((mile, i) => {
                    return (
                      <tr className="milestones mt-5 mx-5" key={i}>
                        <td colSpan={4}>{mile.id}</td>
                        <td colSpan={4}>{mile.comment}</td>
                        <td colSpan={4}>
                            {moment(mile.milestone_date).format("D MMM,  YYYY")}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Tab>
            <Tab
              eventKey={3}
              title="Documents"
            >
              <Table>
                <thead>
                  <tr className="mx-5">
                    <th colSpan={3}>#</th>
                    <th colSpan={3}>Document Name</th>
                    <th colSpan={3}>Updated On</th>
                    <th colSpan={3}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {record.case.case_documents.map((rec, i) => {
                    return (
                      <tr className="milestones mt-5 mx-5" key={i}>
                        <td colSpan={3}>{rec.id}</td>
                        <td colSpan={3}>{rec.document_name}</td>
                        <td colSpan={3}>
                            {moment(rec.uploaded_on).format("D MMM,  YYYY")}
                        </td>
                        <td colSpan={3}>
                          <DownloadButton
                            fileName={record.document_name}
                            path={common.downloadLink(
                              "uploads/case_documents/" +
                                rec.file_name +
                                "?temp=true"
                            )}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Tab>
            <Tab eventKey={4} title="Case Activities">
              <ol className="activity-feed">
                {record.case.logs.map((log, i) => {
                  return (
                    <li class="feed-item">
                      <time class="date">
                        {moment(log.created_at).format("DD MMMM YYYY")}
                      </time>
                      <span class="text">{log.content}</span>
                    </li>
                  );
                })}
              </ol>
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
