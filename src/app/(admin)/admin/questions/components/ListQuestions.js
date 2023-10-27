"use client";

import React, { useState, useEffect, Component } from "react";
import LoadingOverlay from "react-loading-overlay";
import {
  Card,
  Row,
  Col,
  Button,
  DropdownButton,
  ButtonGroup,
  Dropdown,
} from "react-bootstrap";
import AddEditQuestion from "./AddEditQuestion";
import SearchBox from "@/app/components/SearchBox";
import { FaSearchMinus, FaSearchPlus } from "react-icons/fa";
import common from "@/utils/common";
import { toast } from "react-toastify";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useSearchParams } from "next/navigation";

LoadingOverlay.propTypes = undefined;

export default function ListQuestions() {
  
  const searchParams = useSearchParams();
  const [loader, setLoader] = useState(true);
  const [records, setRecords] = useState([]);
  const [recordOrder, setOrder] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [recordId, setRecordId] = useState(null);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const searchFields = [{ label: "Question", type: "text", name: "question" }];

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (destination.index == source.index) return;
    const t = records.filter(
      (ele) => parseInt(ele.id) === parseInt(draggableId)
    )[0];

    const newList = [...records];
    newList.splice(source.index, 1);
    newList.splice(destination.index, 0, t);
    setRecords(newList);
    let recordOrder = newList.map((record, index) => {
      return {
        id: record.id,
        sequence: index,
      };
    });
    setOrder(recordOrder);
  };

  const getRecord = (recordId = null) => {
    setRecordId(recordId);
    setShowModal(true);
  };

  const getRecords = async () => {
    let REQUEST_URI = common.apiPath(
      `/admin/questions?${searchParams.toString()}`
    );
    fetch(REQUEST_URI)
      .then((response) => response.json())
      .then((data) => {
        setRecords(data.records);
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => setLoader(false));
  };

  const saveOrder = async () => {
    fetch(common.apiPath(`/admin/questions/save/sequence`), {
      method: "POST",
      body: JSON.stringify({ orders: recordOrder }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.message);
        } else if (data.error) {
        }
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => setLoader(false));
  };

  useEffect(() => {
    if (recordOrder && recordOrder?.length > 0) {
      saveOrder();
    }
  }, [recordOrder]);

  const deleteRecord = async (id) => {
    if (window.confirm("Are you sure to delete this question?")) {
      setLoader(true);
      fetch(common.apiPath(`/admin/questions/delete/${id}`), {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            toast.success(response.message);
            getRecords();
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
    getRecords();
  }, [searchParams]);

  return (
    <div>
      <Row className="pb-2">
        <Col md={6} sm={12}>
          <h3>Questions</h3>
        </Col>
        <Col md={6} sm={12} className="text-end">
          <Button
            variant="warning"
            className="me-2"
            onClick={() => setShowSearchBox(!showSearchBox)}
          >
            {showSearchBox ? <FaSearchMinus /> : <FaSearchPlus />} Search
          </Button>
          <Button variant="success" type="button" onClick={() => getRecord()}>
            Add New Question
          </Button>
        </Col>
      </Row>
      <SearchBox
        open={showSearchBox}
        title={"Search Questions"}
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
                        <th>Question </th>
                        <th colSpan={2}>Action</th>
                      </tr>
                    </thead>
                    <DragDropContext onDragEnd={onDragEnd}>
                      <Droppable droppableId="droppable">
                        {(provided) => (
                          <tbody
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            {records?.map((record, index) => (
                              <Draggable
                                key={record.id}
                                draggableId={`${record.id}`}
                                index={index}
                              >
                                {(provided) => (
                                  <tr
                                    key={`{row-${index}}`}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <td>{Number(index + 1)}.</td>
                                    <td>{record.question}</td>
                                    <td className="px-1">
                                      <DropdownButton
                                        as={ButtonGroup}
                                        key="action-1"
                                        id={`action-btn-1`}
                                        variant="primary"
                                        title="Action"
                                        align="end"
                                      >
                                        <Dropdown.Item
                                          eventKey="1"
                                          onClick={() => getRecord(record.id)}
                                        >
                                        <span className="mdi mdi-pencil"></span>
                                          Edit
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                          eventKey="2"
                                          onClick={() => deleteRecord(record.id)}
                                        >
                                        <span className="mdi mdi-delete"></span>
                                          Delete
                                        </Dropdown.Item>
                                      </DropdownButton>
                                    </td>
                                  </tr>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </tbody>
                        )}
                      </Droppable>
                    </DragDropContext>
                  </table>
                </div>
              </Card.Body>
            </Card>
          </LoadingOverlay>
        </Col>
      </Row>
      {showModal && (
        <AddEditQuestion
          showModal={showModal}
          closeModal={() => {
            setShowModal(false);
            setRecordId(null);
          }}
          recordId={recordId}
          reloadRecords={getRecords}
        />
      )}
    </div>
  );
}
