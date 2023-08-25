"use client";

import React, { useState, useEffect, Component } from "react";
import LoadingOverlay from "react-loading-overlay";
import { Card, Row, Col, Button } from "react-bootstrap";
import Pagination from "react-js-pagination";
import AddEditQuestion from "./AddEditQuestion";
import SearchBox from "@/app/components/SearchBox";
import { FaSearchMinus, FaSearchPlus } from "react-icons/fa";
import common from "@/utils/common";
import { toast } from "react-toastify";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

LoadingOverlay.propTypes = undefined

export default function ListQuestions() {
  const [loader, setLoader] = useState(true);
  const [records, setRecords] = useState([]);
  const [recordOrder, setOrder] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [recordId, setRecordId] = useState(null);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [fields, setFields] = useState(null);
  const searchFields = [{ label: "Question", type: "text", name: "question" }];


  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (destination.index == source.index) return;
    const t = records.filter((ele) => parseInt(ele.id) === parseInt(draggableId))[0];

    const newList = [...records];
    newList.splice(source.index, 1);
    newList.splice(destination.index, 0, t);
    setRecords(newList)
    let recordOrder = newList.map((record, index) => {
      return {
        id: record.id,
        sequence: index
      }
    })
    setOrder(recordOrder);
  }
  const getRecord = (recordId = null) => {
    setRecordId(recordId);
    setShowModal(true);
  };
  const getRecords = async () => {
    let REQUEST_URI = common.apiPath(`/admin/questions`);
    if (fields !== null) {
      const queryString = new URLSearchParams(fields).toString();
      REQUEST_URI = common.apiPath(`/admin/questions?${queryString}`);
    }
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

  useEffect(() => {
    //saveOrder();
    console.log(recordOrder);
  }, [recordOrder]);

  useEffect(() => {
    getRecords();
  }, [fields]);

  const deleteRecord = async (id) => {
    if (window.confirm("Are you sure to delete this question?")) {
      setLoader(true);
      fetch(common.apiPath(`/admin/questions/delete/${id}`), { method: "DELETE" })
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
          <Button variant="primary" type="button" onClick={() => getRecord()}>
            Add New Question
          </Button>
        </Col>
      </Row>
      <SearchBox
        open={showSearchBox}
        title={"Search Questions"}
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
                            {records.map((record, index) => (
                              <Draggable key={record.id} draggableId={`${record.id}`} index={index}>
                                {(provided) => (
                                  <tr key={`{row-${index}}`} ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}>
                                    <td>
                                      {
                                        Number(index + 1)}
                                      .
                                    </td>
                                    <td>{record.question}</td>
                                    <td>
                                      <Button
                                        className="me-2"
                                        variant="primary"
                                        onClick={() => getRecord(record.id)}
                                      >
                                        Edit
                                      </Button>
                                    </td>
                                    <td>
                                      <Button
                                        variant="danger"
                                        onClick={() => deleteRecord(record.id)}
                                      >
                                        Delete
                                      </Button>
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
      <AddEditQuestion
        showModal={showModal}
        closeModal={() => {
          setShowModal(false);
          setRecordId(null);
        }}
        recordId={recordId}
        reloadRecords={getRecords}
      />
    </div>

  );
}
