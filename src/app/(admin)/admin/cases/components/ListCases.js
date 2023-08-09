"use client";

import React, { useState, useEffect } from "react";
import LoadingOverlay from "react-loading-overlay";
import moment from "moment";
import { Card, Row, Col, Button } from "react-bootstrap";
import Pagination from "react-js-pagination";
import AddEditCase from "./AddEditCase";
import SearchBox from "@/app/components/SearchBox";
import { FaSearchMinus, FaSearchPlus } from "react-icons/fa";
import common from "@/utils/common";
import { toast } from "react-toastify";

export default function ListCases() {
  const [loader, setLoader] = useState(false);
  const [records, setRecords] = useState([]);
  const recordPerPage = 10;
  const [pageNumber, setPageNumber] = useState(1);
  const [totalRecords, setTotalRecords] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [recordId, setRecordId] = useState(null);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [fields, setFields] = useState(null);
  const searchFields = [
    { label: "Name", type: "text", name: "name" },
    { label: "Email", type: "text", name: "email" },
  ];

  const getRecords = async () => {
    setLoader(true);
    let REQUEST_URI = common.apiPath(`/api/cases?page=${pageNumber}`);
    if (fields !== null) {
      fields["page"] = pageNumber;
      const queryString = new URLSearchParams(fields).toString();
      REQUEST_URI = common.apiPath(`/api/cases?${queryString}`);
    }
    fetch(REQUEST_URI)
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          setRecords(response.records);
          setTotalRecords(response.totalRecords);
        } else {
          toast.error(response.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => setLoader(false));
  };

  const getRecord = (recordId = null) => {
    setRecordId(recordId);
    setShowModal(true);
  };

  const deleteRecord = async (id) => {
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

  useEffect(() => {
    getRecords();
  }, [pageNumber]);

  useEffect(() => {
    getRecords();
  }, [fields]);

  return (
    <div>
      <Row className="pb-2">
        <Col md={6} sm={12}>
          <h3>Cases</h3>
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
            Add New Case
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
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Case Number</th>
                      <th>Ttile</th>
                      <th>Status</th>
                      <th>Added On</th>
                      <th className="text-end">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((record, index) => (
                      <tr key={`cases-key-${index}`}>
                        <td>
                          {pageNumber * recordPerPage -
                            recordPerPage +
                            Number(index + 1)}
                          .
                        </td>
                        <td>{record.case_number}</td>
                        <td>{record.title}</td>
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
                        <td>
                          {moment(record.created_at).format("D MMM,  YYYY")}
                        </td>
                        <td className="text-end">
                          <button
                            className="btn btn-primary me-2"
                            onClick={() => getRecord(record.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteUser(record.id)}
                          >
                            Delete
                          </button>
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
            </Card>
          </LoadingOverlay>
        </Col>
      </Row>
      {showModal && (
        <AddEditCase
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
