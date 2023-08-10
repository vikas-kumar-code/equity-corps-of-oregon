"use client";

import React, { useState, useEffect } from "react";
import LoadingOverlay from "react-loading-overlay";
import { Card, Row, Col, Button } from "react-bootstrap";
import Pagination from "react-js-pagination";
import AddEditQuestion from "./AddEditQuestion";
import SearchBox from "@/app/components/SearchBox";
import { FaSearchMinus, FaSearchPlus } from "react-icons/fa";
import common from "@/utils/common";
import { toast } from "react-toastify";

export default function ListQuestions() {
  const [loader, setLoader] = useState(false);
  const [records, setRecords] = useState([]);
  const recordPerPage = 10;
  const [pageNumber, setPageNumber] = useState(1);
  const [totalRecords, setTotalRecords] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [recordId, setRecordId] = useState(null);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [fields, setFields] = useState(null);
  const searchFields = [{ label: "Question", type: "text", name: "question" }];

  const getRecords = async () => {
    setLoader(true);
    let REQUEST_URI = common.apiPath(`/admin/questions?page=${pageNumber}`);
    if (fields !== null) {
      fields["page"] = pageNumber;
      const queryString = new URLSearchParams(fields).toString();
      REQUEST_URI = common.apiPath(`/admin/questions?${queryString}`);
    }
    fetch(REQUEST_URI)
      .then((response) => response.json())
      .then((data) => {
        setRecords(data.records);
        setTotalRecords(data.totalRecords);
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

  const getRecord = (recordId = null) => {
    setRecordId(recordId);
    setShowModal(true);
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
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {records.map((record, index) => (
                        <tr key={index}>
                          <td>
                            {pageNumber * recordPerPage -
                              recordPerPage +
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
                            <Button
                              variant="danger"
                              onClick={() => deleteRecord(record.id)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {totalRecords > recordPerPage && (
                  <Card.Footer className="text-end">
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
                )}
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
