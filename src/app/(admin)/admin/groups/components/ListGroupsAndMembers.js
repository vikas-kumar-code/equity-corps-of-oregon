"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  DropdownButton,
  ButtonGroup,
  Dropdown,
} from "react-bootstrap";
import SearchBox from "@/app/components/SearchBox";
import { FaSearchMinus, FaSearchPlus } from "react-icons/fa";
import common from "@/utils/common";
import { toast } from "react-toastify";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useSearchParams } from "next/navigation";
import AddEditGroup from "./AddEditGroup";
import "../styles.css";

export default function ListGroupsAndMembers() {
  const searchParams = useSearchParams();
  const [loader, setLoader] = useState(true);
  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupOrder, setGroupOrder] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [groupData, setGroupData] = useState({});
  const [showSearchBox, setShowSearchBox] = useState(false);
  const searchFields = [{ label: "Question", type: "text", name: "question" }];

  const onDragEnd = (result) => {
    const { source, destination } = result;
    // dropped outside the list
    if (!destination) {
      return;
    } else if (source.droppableId !== destination.droppableId) {
      const index = Number(destination.droppableId.replace(/[^0-9]/g, ""));
      const newGroups = JSON.parse(JSON.stringify(groups));
      newGroups[index].group_members = [
        ...newGroups[index].group_members,
        users[source.index],
      ];
      setGroups(newGroups);
      setUsers(users);
    } else {
      return;
    }
  };

  const getRecord = (recordId = null) => {
    setRecordId(recordId);
    setShowModal(true);
  };

  const getGroups = async () => {
    fetch(common.apiPath(`/admin/groups`))
      .then((response) => response.json())
      .then((response) => {
        setGroups(response.records);
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => setLoader(false));
  };

  const getUsers = async () => {
    setLoader(true);
    fetch(common.apiPath(`/admin/users`))
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          setUsers(response.records);
        } else if (response.error) {
          toast.error(response.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => setLoader(false));
  };

  const saveGroupSequence = async () => {
    fetch(common.apiPath(`/admin/groups/save/sequence`), {
      method: "POST",
      body: JSON.stringify({ orders: groupOrder }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.message);
        } else if (data.error) {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => setLoader(false));
  };

  useEffect(() => {
    if (groupOrder && groupOrder?.length > 0) {
      saveGroupSequence();
    }
  }, [groupOrder]);

  const deleteGroup = async (id) => {
    if (window.confirm("Are you sure to delete this group?")) {
      setLoader(true);
      fetch(common.apiPath(`/admin/group/delete/${id}`), {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            toast.success(response.message);
            getGroups();
          } else if (response.error) {
            toast.error(response.message);
          }
        })
        .catch((error) => {
          toast.error(error.message);
        })
        .finally(() => setLoader(false));
    }
  };

  useEffect(() => {
    getGroups();
    getUsers();
  }, []);

  return (
    <div>
      <Row>
        <Col md={6} sm={12}>
          <h3>Groups & Members</h3>
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
            onClick={() => setShowModal(true)}
          >
            Add New Group
          </Button>
        </Col>
      </Row>
      <SearchBox
        open={showSearchBox}
        title={"Search Groups"}
        searchFields={searchFields}
        col={6}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <Row>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title className="fw-bold fs-6 text-secondary">
                  Users
                </Card.Title>
                <Droppable
                  droppableId="users-container"
                  key="users-container"
                  isDropDisabled={true}
                >
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef}>
                      {users?.map((record, index) => (
                        <Draggable
                          key={`user-${record.id}`}
                          draggableId={`user-${record.id}`}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <>
                              <Row
                                key={`{user-row-${index}}`}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`drag-user-box ${
                                  snapshot.isDragging ? "active-drag" : ""
                                }`}
                              >
                                <Col md={12}>
                                  <span class="mdi mdi-account-circle-outline"></span>
                                  <h3 className="user-name">{record.name}</h3>
                                  <span className="user-email">
                                    {record.email}
                                  </span>
                                </Col>
                              </Row>
                              {snapshot.isDragging && (
                                <Row
                                  key={`{user-row-copy-${index}}`}
                                  className="drag-user-box dnd-copy"
                                >
                                  <Col md={12}>
                                    <span class="mdi mdi-account-circle-outline"></span>
                                    <h3 className="user-name">{record.name}</h3>
                                    <span className="user-email">
                                      {record.email}
                                    </span>
                                  </Col>
                                </Row>
                              )}
                            </>
                          )}
                        </Draggable>
                      ))}
                    </div>
                  )}
                </Droppable>
              </Card.Body>
            </Card>
          </Col>
          <Col md={8}>
            <Card>
              <Card.Body>
                <Card.Title className="fw-bold fs-6 text-secondary">
                  Groups
                </Card.Title>
                {groups?.map((record, index) => (
                  <Droppable
                    droppableId={"group-container-" + index}
                    key={"group-container-" + index}
                  >
                    {(provided, snapshot) => (
                      <Card
                        className="group-box"
                        key={`{group-row-${index}}`}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        <div className="group-info">
                          <Button variant="link" className="group-edit">
                            <span class="mdi mdi-playlist-edit mdi-icon"></span>
                          </Button>
                          <h3>
                            <span class="mdi mdi-account-group-outline group-icon"></span>
                            {record.name}
                          </h3>
                          <p>
                            React-Bootstrap automatically generates an id for
                            some components (such as DropdownToggle) if they are
                            not provided. This is done for accessibility
                            purposes.
                          </p>
                        </div>
                        <Row className="group-members">
                          {record.group_members.length ? (
                            record.group_members.map((item) => {
                              return <span>{item.name}</span>;
                            })
                          ) : (
                            <Col className="text-center py-5">
                              <h6 className="text-secondary m-0">
                                Drop members here
                              </h6>
                            </Col>
                          )}
                        </Row>
                      </Card>
                    )}
                  </Droppable>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </DragDropContext>
      {showModal && (
        <AddEditGroup
          data={groupData}
          showModal={showModal}
          closeModal={() => {
            setShowModal(false);
            setGroupData({});
          }}
        />
      )}
    </div>
  );
}
