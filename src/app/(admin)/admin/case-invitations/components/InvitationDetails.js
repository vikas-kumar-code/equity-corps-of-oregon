import moment from "moment";
import React, { useState } from "react";
import { Modal, Badge, Tabs, Tab, Button, Row, Col } from "react-bootstrap";
import Documents from "./Documents";
import common from "@/utils/common";
import { useEffect } from "react";
import { toast } from "react-toastify";

const InvitationDetails = ({
  showModal,
  closeModal,
  record,
  reloadRecords,
}) => {
  const [activeTab, setActiveTab] = useState(1);
  const [errors, setErrors] = useState({});
  const [deletedDocuments, setDeletedDocuments] = useState([]);
  const [amountDetails, setAmountDetails] = useState({
    maxComp: 0,
    totalInvoiced: 0,
    totalPaid: 0,
    available: 0,
  });

  const getRecords = async () => {
    try {
      await fetch(common.apiPath(`/admin/cases/invoice/list/${record.case_id}`))
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            if (response.records) {
              let amounts = {
                maxComp: 0,
                totalInvoiced: 0,
                totalPaid: 0,
                available: 0,
              };

              amounts.maxComp =
                response.records?.case?.maximum_compensation || 0;
              Array.isArray(response.records?.case_invoices) &&
                response.records?.case_invoices.length > 0 &&
                response.records?.case_invoices?.forEach((item) => {
                  if (item.status >= 1) {
                    amounts.totalInvoiced += Number(item.total_amount);
                  }
                  amounts.totalPaid += item.payments.reduce(
                    (total, pay) => total + Number(pay.amount),
                    0
                  );
                });
              amounts.available = amounts.maxComp - amounts.totalPaid;
              setAmountDetails(amounts);
            }
          } else if (response.error) {
            toast.error(response.message);
          }
        });
    } catch (e) {
      toast.error(e.message);
    }
  };

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

  let clients = record?.case?.clients && JSON.parse(record?.case?.clients);

  useEffect(() => {
    getRecords();
  }, []);

  return (
    <Modal
      show={showModal}
      onHide={closeModal}
      backdrop="static"
      keyboard={false}
      centered
      size="lg"
    >
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
          <Tab eventKey={1} title="Basic Details">
            <Row>
              <Col md={7}>
                <div className="table-responsive">
                  <table className="table table-borderless table-striped">
                    <tbody>
                      <tr>
                        <td >
                          <strong>Title</strong>
                        </td>
                        <td>{record?.case?.title || "N/A"}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Case Number</strong>
                        </td>
                        <td>{record?.case?.case_number || "N/A"}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Description</strong>
                        </td>
                        <td>{record?.case?.description || "N/A"}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Status</strong>
                        </td>
                        <td>
                          <Badge pill bg={iStatus[record?.status].bg || "info"}>
                            {iStatus[record?.status].label || "N/A"}
                          </Badge>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Added On</strong>
                        </td>
                        <td>
                          {moment(record?.sent_on).format("D MMM, YYYY") ||
                            "N/A"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Col>
              <Col md={5}>
                <div className="table-responsive">
                  <table className="table table-borderless table-striped">
                    <tbody>
                      <tr>
                        <td >
                          <strong>Max Compensation</strong>
                        </td>
                        <td>
                          <strong>
                            {common.currencyFormat(amountDetails?.maxComp, 2) ??
                              "N/A"}
                          </strong>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Hourly Rate</strong>
                        </td>
                        <td>
                          <strong>
                            {amountDetails?.hourly_rate === "null"
                              ? common.currencyFormat(
                                  amountDetails?.hourly_rate,
                                  2
                                )
                              : "N/A"}
                          </strong>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Total Invoiced</strong>
                        </td>
                        <td>
                          <strong>
                            {common.currencyFormat(
                              amountDetails?.totalInvoiced,
                              2
                            ) ?? "N/A"}
                          </strong>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Total Paid</strong>
                        </td>
                        <td>
                          <strong>
                            {common.currencyFormat(
                              amountDetails?.totalPaid,
                              2
                            ) ?? "N/A"}
                          </strong>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Available</strong>
                        </td>
                        <td>
                          <strong>
                            {common.currencyFormat(
                              amountDetails?.available,
                              2
                            ) ?? "N/A"}
                          </strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Col>
            </Row>
          </Tab>
          <Tab eventKey={2} title="Clients" className="ps-5 pt-2 pe-5">
            <div className="table-responsive">
              <table className="table table-borderless">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>DOB</th>
                  </tr>
                </thead>
                <tbody>
                  {clients &&
                    clients?.length > 0 &&
                    clients?.map((client, i) => {
                      return (
                        <tr key={`clients-${i}`}>
                          <td>{i + 1}</td>
                          <td>{client.first_name}</td>
                          <td>{client.last_name}</td>
                          <td>{moment(client?.dob).format("D MMM, YYYY")}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </Tab>
          <Tab eventKey={4} title="Milestones" className="ps-5 pt-2 pe-5">
            <div className="table-responsive" style={{ maxHeight: 200 }}>
              <table className="table">
                <thead>
                  <tr className="mx-5">
                    <th>#</th>
                    <th>Comment</th>
                    <th>Updated On</th>
                  </tr>
                </thead>
                <tbody>
                  {record?.case?.case_milestones?.map((mile, i) => {
                    return (
                      <tr key={i}>
                        <td>{mile?.id}</td>
                        <td>{mile?.comment}</td>
                        <td>
                          {moment(mile?.milestone_date).format("D MMM,  YYYY")}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Tab>
          {record?.status >= 1 && (
            <Tab eventKey={5} title="Documents" className="ps-5 pt-2 pe-5">
              <Documents
                reloadRecords={reloadRecords}
                setDeletedDocument={(doc) => {
                  setDeletedDocuments([...deletedDocuments, doc]);
                }}
                documents={record?.case?.case_documents}
                errors={errors}
                setErrors={setErrors}
                caseId={record.case.id}
              />
            </Tab>
          )}
          <Tab eventKey={6} title="Case Activities">
            <div style={{ maxHeight: "250px", overflowY: "auto" }}>
              <ol className="activity-feed">
                {record?.case?.logs.map((log, i) => {
                  return (
                    <li className="feed-item">
                      <time className="date">
                        {moment(log.created_at).format("LLLL")}
                      </time>
                      <span className="text">{log.content}</span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </Tab>
        </Tabs>
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

export default InvitationDetails;
