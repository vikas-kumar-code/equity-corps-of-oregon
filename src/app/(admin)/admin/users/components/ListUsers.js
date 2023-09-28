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
import AddEditUser from "./AddEditUser";
import SearchBox from "@/app/components/SearchBox";
import { FaSearchMinus, FaSearchPlus } from "react-icons/fa";
import common from "@/utils/common";
import { toast } from "react-toastify";
import ViewDetails from "./ViewDetails";
import { IoCheckmarkCircle, IoAlertCircle } from "react-icons/io5";
import BlankCircle from "./BlankCircle";
import { useSearchParams } from "next/navigation";
import NextPagination from "@/app/components/NextPagination";
LoadingOverlay.propTypes = undefined;

export default function ListUsers() {
  const searchParams = useSearchParams();
  const [totalRecords, setTotalRecords] = useState(1);

  const [loader, setLoader] = useState(false);
  const [records, setRecords] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [detailsModal, setDetailsModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [showSearchBox, setShowSearchBox] = useState(false);

  const searchFields = [
    { label: "Name", type: "text", name: "name" },
    { label: "Email", type: "text", name: "email" },
  ];

  const getRecords = async () => {
    setLoader(true);
    const REQUEST_URI = common.apiPath(
      `/admin/users?${searchParams.toString()}`
    );
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

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure to delete this user?")) {
      await fetch(common.apiPath(`/admin/users/delete/${id}`), {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            toast.success(response.message);
            getRecords();
          } else if (response.error) {
            toast.error(error.message);
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
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

  useEffect(() => {
    getRecords();
  }, [searchParams]);

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
          <Button
            variant="success"
            type="button"
            onClick={() => getUser(null, "edit")}
          >
            Add New User
          </Button>
        </Col>
      </Row>
      <SearchBox
        open={showSearchBox}
        title={"Search User"}
        searchFields={searchFields}
        col={6}
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
                <div className="table-responsive min-list-height">
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
                          <td>{common.sn(searchParams, index)}.</td>
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
                              align="end"
                            >
                              <Dropdown.Item
                                onClick={() => getUser(record.id, "view")}
                                eventKey="1"
                              >
                              <span className="mdi mdi-eye"></span>
                                View
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => getUser(record.id, "edit")}
                                eventKey="2"
                              >
                              <span className="mdi mdi-pencil"></span>
                                Edit
                              </Dropdown.Item>
                              <Dropdown.Item
                                eventKey="3"
                                onClick={() => deleteUser(record.id)}
                              >
                              <span className="mdi mdi-delete"></span>
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
                  <NextPagination totalItemsCount={totalRecords} />
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
      overlay={<Tooltip>Login credential sent but not used yet.</Tooltip>}
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
