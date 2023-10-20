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
    console.log("################", result);
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    } else if (
      destination.droppableId == source.droppableId &&
      source.droppableId == "groups-container" &&
      destination.index !== source.index
    ) {
      const activeId = draggableId.replace(/[^1-9]/g, "");
      const activeRecord = groups.filter(
        (ele) => parseInt(ele.id) === parseInt(activeId)
      )[0];
      const newList = [...groups];
      newList.splice(source.index, 1);
      newList.splice(destination.index, 0, activeRecord);
      setGroups(newList);
      let groupOrder = newList.map((record, index) => {
        return {
          id: record.id,
          sequence: index,
        };
      });
      setGroupOrder(groupOrder);
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
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title className="fw-bold fs-6 text-secondary">
                  Users
                </Card.Title>
                <Droppable droppableId="users-container" key="users-container">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {users?.map((record, index) => (
                        <Draggable
                          key={`user-${record.id}`}
                          draggableId={`user-${record.id}`}
                          index={index}
                        >
                          {(provided) => (
                            <Row
                              key={`{user-row-${index}}`}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="drag-user-box"
                            >
                              <Col className="">{record.name}</Col>
                              <Col>{record.email}</Col>
                            </Row>
                          )}
                        </Draggable>
                      ))}
                    </div>
                  )}
                </Droppable>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title className="fw-bold fs-6 text-secondary">
                  Groups
                </Card.Title>
                <Droppable
                  droppableId="groups-container"
                  key="groups-container"
                >
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {groups?.map((record, index) => (
                        <Draggable
                          key={`group-${record.id}`}
                          draggableId={`group-${record.id}`}
                          index={index}
                        >
                          {(provided) => (
                            <Card
                              className="group-box"
                              key={`{group-row-${index}}`}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Droppable
                                droppableId="group-item-container"
                                key="group-item-container"
                              >
                                {(provided, snapshot) => (
                                  <Card.Body
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    style={
                                      snapshot.isDraggingOver
                                        ? {
                                            height: 500,
                                            width: 500,
                                          }
                                        : null
                                    }
                                  >
                                    <Card.Title>{record.name}</Card.Title>
                                    <Card.Text>{record.description}</Card.Text>
                                    {record.group_members.map((item) => {
                                      return <span>{item.name}</span>;
                                    })}
                                  </Card.Body>
                                )}
                              </Droppable>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                    </div>
                  )}
                </Droppable>
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
