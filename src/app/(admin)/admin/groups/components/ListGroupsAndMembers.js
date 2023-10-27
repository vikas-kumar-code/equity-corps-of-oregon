"use client";

import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import SearchBox from "@/app/components/SearchBox";
import { FaSearchMinus, FaSearchPlus } from "react-icons/fa";
import common from "@/utils/common";
import { toast } from "react-toastify";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import AddEditGroup from "./AddEditGroup";
import "../styles.css";
import LoadingOverlay from "react-loading-overlay";

function randomAlphabets() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let code = "";
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    code += alphabet[randomIndex];
  }
  return code;
}

export default function ListGroupsAndMembers() {
  const [groupsLoader, setGroupsLoader] = useState(false);
  const [usersLoader, setUsersLoader] = useState(false);
  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [groupData, setGroupData] = useState({});
  const [showSearchBox, setShowSearchBox] = useState(false);
  const searchFields = [{ label: "Question", type: "text", name: "question" }];
  const [randomCode, setRandomCode] = useState(randomAlphabets());

  const onDragEnd = (result) => {
    const { draggableId, source, destination } = result;
    console.log("# Drag =  ", result);
    // dropped outside the list
    if (!destination) {
      return;
    } else if (source.droppableId !== destination.droppableId) {
      setRandomCode(randomAlphabets());
      // const index = Number(destination.droppableId.replace(/[^0-9]/g, ""));
      // const newGroups = JSON.parse(JSON.stringify(groups));
      // newGroups[index].group_members.users = [
      //   ...newGroups[index].group_members,
      //   users[source.index],
      // ];
      // setGroups(newGroups);
      setUsers(users);
      setGroupsLoader(true);
      const userIndex = Number(draggableId.replace(/[^0-9]/g, ""));
      const groupIndex = Number(destination.droppableId.replace(/[^0-9]/g, ""));
      const user_id = users[userIndex].id;
      const group_id = groups[groupIndex].id;
      addMember(group_id, user_id);
    } else {
      return;
    }
  };

  const getGroups = async () => {
    setGroupsLoader(true);
    fetch(common.apiPath(`/admin/groups`))
      .then((response) => response.json())
      .then((response) => {
        setGroups(response.records);
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => setGroupsLoader(false));
  };

  const getUsers = async () => {
    setUsersLoader(true);
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
      .finally(() => setUsersLoader(false));
  };

  const deleteGroup = async (id) => {
    if (window.confirm("Are you sure to delete this group?")) {
      setGroupsLoader(true);
      setShowModal(false);
      fetch(common.apiPath(`/admin/groups/delete/${id}`), {
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
        .finally(() => setGroupsLoader(false));
    }
  };

  const addMember = (group_id, user_id) => {
    setGroupsLoader(true);
    fetch(common.apiPath(`/admin/groups/add-member`), {
      method: "POST",
      body: JSON.stringify({ group_id, user_id }),
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
      .finally(() => setGroupsLoader(false));
  };

  const removeMember = (id) => {
    if (window.confirm("Are you sure to remove this member?")) {
      setGroupsLoader(true);
      fetch(common.apiPath(`/admin/groups/remove-member/${id}`), {
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
        .finally(() => setGroupsLoader(false));
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
          {/* <Button
            variant="warning"
            className="me-2"
            onClick={() => setShowSearchBox(!showSearchBox)}
          >
            {showSearchBox ? <FaSearchMinus /> : <FaSearchPlus />} Search
          </Button> */}
          <Button
            variant="success"
            type="button"
            onClick={() => {
              setShowModal(true);
              setGroupData({});
            }}
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
            <LoadingOverlay active={usersLoader} spinner>
              <Card style={{height:'78vh', overflowY:'auto'}}>
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
                            key={`user-${randomCode}-${index}`}
                            draggableId={`user-${randomCode}-${index}`}
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
                                    <span class="mdi mdi-account-circle-outline user-icon"></span>
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
                                      <span class="mdi mdi-account-circle-outline user-icon"></span>
                                      <h3 className="user-name">
                                        {record.name}
                                      </h3>
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
            </LoadingOverlay>
          </Col>
          <Col md={8}>
            <LoadingOverlay active={groupsLoader} spinner>
              <Card style={{height:'78vh', overflowY:'auto'}}>
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
                        >
                          <div className="group-info">
                            <Button
                              variant="link"
                              className="group-edit"
                              onClick={() => {
                                setShowModal(true);
                                setGroupData(record);
                              }}
                            >
                              <span class="mdi mdi-playlist-edit mdi-icon"></span>
                            </Button>
                            <h3>
                              <span class="mdi mdi-account-group-outline group-icon"></span>
                              {record.name}
                            </h3>
                            <p>{record.description}</p>
                          </div>
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={
                              "w-100 group-members " +
                              (snapshot.isDraggingOver ? "active-group" : "")
                            }
                          >
                            {record?.group_members?.length ? (
                              record?.group_members?.map(
                                (member, memberIndex) => {
                                  return (
                                    <Row
                                      key={`{member-${memberIndex}}`}
                                      className="group-member"
                                    >
                                      <div className="col-10">
                                        <span class="mdi mdi-account-circle-outline user-icon"></span>
                                        <h6 className="user-name">
                                          {member?.user?.name}
                                        </h6>
                                        <span md={3} className="user-email">
                                          {member?.user?.email}
                                        </span>
                                      </div>
                                      <Button
                                        variant="danger rounded-circle remove-user"
                                        onClick={() => removeMember(member.id)}
                                      >
                                        <span class="mdi mdi-delete-circle-outline remove-user-icon"></span>
                                      </Button>
                                    </Row>
                                  );
                                }
                              )
                            ) : (
                              <Col className="text-center py-5">
                                <h6 className="text-secondary m-0">
                                  Drop members here
                                </h6>
                              </Col>
                            )}
                          </div>
                        </Card>
                      )}
                    </Droppable>
                  ))}
                </Card.Body>
              </Card>
            </LoadingOverlay>
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
          getGroups={getGroups}
          deleteGroup={deleteGroup}
        />
      )}
    </div>
  );
}
