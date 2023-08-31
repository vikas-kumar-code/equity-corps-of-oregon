"use client";

import React, { useState, useEffect } from "react";
import LoadingOverlay from "react-loading-overlay";
import moment from "moment";
import {
  Card,
  Row,
  Col,
  Button,
  DropdownButton,
  Dropdown,
  ButtonGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import Pagination from "react-js-pagination";
import AddEditUser from "./AddEditUser";
import SearchBox from "@/app/components/SearchBox";
import { FaSearchMinus, FaSearchPlus } from "react-icons/fa";
import common from "@/utils/common";
import { toast } from "react-toastify";
import ViewDetails from "./ViewDetails";
import {
  IoEllipseOutline,
  IoCheckmarkCircle,
  IoAlertCircle,
} from "react-icons/io5";
import SendCredentials from "./SendCredentials";
import BlankCircle from "./BlankCircle";
LoadingOverlay.propTypes = undefined;

export default function ListUsers() {
  const [loader, setLoader] = useState(false);
  const [records, setRecords] = useState([]);
  const recordPerPage = 10;
  const [pageNumber, setPageNumber] = useState(1);
  const [totalRecords, setTotalRecords] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [detailsModal, setDetailsModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [fields, setFields] = useState(null);
  const searchFields = [
    { label: "Name", type: "text", name: "name" },
    { label: "Email", type: "text", name: "email" },
  ];

  const getRecords = async () => {
    setLoader(true);
    let REQUEST_URI = common.apiPath(`/admin/users?page=${pageNumber}`);
    if (fields !== null) {
      const queryString = new URLSearchParams(fields).toString();
      REQUEST_URI = common.apiPath(`/admin/users?${queryString}`);
    }
    fetch(REQUEST_URI)
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          setRecords(response.records);
          setTotalRecords(response.totalRecords);
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
    getRecords();
  }, [pageNumber]);

  useEffect(() => {
    getRecords();
  }, [fields]);

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure to delete this use?")) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (data.success) {
        getRecords();
      }
    }
  };

  const getUser = (userId = null, view) => {
    setUserId(userId);
    view === "edit" ? setShowModal(true) : setDetailsModal(true);
  };

  const resendOnBoardEmail = (userId) => {
    if (confirm("Are you sure to resend on-board email?")) {
      setLoader(true);
      fetch(common.apiPath(`/admin/users/attorney-on-board`), {
        method: "POST",
        body: JSON.stringify({ userId: userId, resend: true }),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            toast.success(response.message);
          } else if (response.error) {
            toast.error(response.message);
          }
        })
        .catch((error) => {
          toast.error(response.message);
        })
        .finally(() => setLoader(false));
    }
  };

  return (
    <div>
      <Row>
        <Col md={6} sm={12}>
          <h3>Users</h3>
        </Col>
        <Col md={6} sm={12} className="text-end">
          <Button
            variant="warning"
            className="me-2"
            onClick={() => setShowSearchBox(!showSearchBox)}
          >
            {showSearchBox ? <FaSearchMinus /> : <FaSearchPlus />} Search
          </Button>
          <Button variant="primary" type="button" onClick={() => getUser()}>
            Add New User
          </Button>
        </Col>
      </Row>
      <SearchBox
        open={showSearchBox}
        title={"Search User"}
        searchFields={searchFields}
        col={6}
        searchRecords={(fields) => {
          setFields(fields);
        }}
      />
      <Row>
        <Col>
          <LoadingOverlay
            active={loader}
            spinner
            text="Loading your content..."
          >
            <Card>
              <Card.Body>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name </th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>On Boarded</th>
                        <th>Added On</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {records.map((record, index) => (
                        <tr>
                          <td>
                            {pageNumber * recordPerPage -
                              recordPerPage +
                              Number(index + 1)}
                            .
                          </td>
                          <td>{record.name}</td>
                          <td>{record.email}</td>
                          <td>{record.role.name}</td>
                          <td>
                            {record.status ? (
                              <span className="badge badge-success rounded-pill">
                                Active
                              </span>
                            ) : (
                              <span className="badge badge-danger rounded-pill">
                                Inactive
                              </span>
                            )}
                          </td>
                          <td className="text-center">
                            {record.on_board_status <= 0 && (
                              <BlankCircle
                                userId={record.id}
                                reloadRecords={getRecords}
                              />
                            )}
                            {record.on_board_status === 1 && <YelloCircle />}
                            {record.on_board_status === 2 && <GreenCircle />}
                          </td>
                          <td>
                            {moment(record.created_at).format("D MMM,  YYYY")}
                          </td>

                          <td>
                            <DropdownButton
                              as={ButtonGroup}
                              key="action-1"
                              id={`action-btn-1`}
                              variant="primary"
                              title="Action"
                            >
                              <Dropdown.Item
                                onClick={() => getUser(record.id, "view")}
                                eventKey="1"
                              >
                                View
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => getUser(record.id, "edit")}
                                eventKey="2"
                              >
                                Edit
                              </Dropdown.Item>
                              <Dropdown.Item
                                eventKey="3"
                                onClick={() => deleteUser(record.id)}
                              >
                                Delete
                              </Dropdown.Item>
                              {record.on_board_status === 1 && (
                                <Dropdown.Item
                                  eventKey="3"
                                  onClick={() => resendOnBoardEmail(record.id)}
                                >
                                  Resend On-board email
                                </Dropdown.Item>
                              )}
                            </DropdownButton>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Card.Footer className="text-end bg-white">
                  <Pagination
                    activePage={pageNumber}
                    itemsCountPerPage={recordPerPage}
                    totalItemsCount={totalRecords}
                    pageRangeDisplayed={recordPerPage}
                    onChange={(page) => setPageNumber(page)}
                    itemClass="page-item"
                    linkClass="page-link"
                    innerClass="pagination float-end"
                  />
                </Card.Footer>
              </Card.Body>
            </Card>
          </LoadingOverlay>
        </Col>
      </Row>
      {showModal && (
        <AddEditUser
          showModal={showModal}
          closeModal={() => {
            setShowModal(false);
            setUserId(null);
          }}
          userId={userId}
          reloadRecords={getRecords}
        />
      )}

      {detailsModal && (
        <ViewDetails
          showModal={detailsModal}
          closeModal={() => {
            setDetailsModal(false);
            setUserId(null);
          }}
          userId={userId}
        />
      )}
    </div>
  );
}
const YelloCircle = () => {
  return (
    <OverlayTrigger
      placement="top"
      overlay={
        <Tooltip>
          On-board email has been sent.
          <br /> Waiting for user login.
        </Tooltip>
      }
    >
      <button className="circle-icon-btn">
        <IoAlertCircle color="#ffab00" size={28} className="on-board-icon" />
      </button>
    </OverlayTrigger>
  );
};

const GreenCircle = () => {
  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip>Attorney On-boarded</Tooltip>}
    >
      <button className="circle-icon-btn">
        <IoCheckmarkCircle
          color="#00d25b"
          size={28}
          className="on-board-icon"
        />
      </button>
    </OverlayTrigger>
  );
};
