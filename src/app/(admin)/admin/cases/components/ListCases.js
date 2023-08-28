"use client";

import React, { useState, useEffect } from "react";
import LoadingOverlay from "react-loading-overlay";
import { Card, Row, Col, Button } from "react-bootstrap";
import Pagination from "react-js-pagination";
import SearchBox from "@/app/components/SearchBox";
import { FaSearchMinus, FaSearchPlus } from "react-icons/fa";
import common from "@/utils/common";
import { toast } from "react-toastify";
import Case from "./Case";
import AddEditCase from "./AddEditCase";
LoadingOverlay.propTypes = undefined;

export default function ListCases() {
  const [loader, setLoader] = useState(false);
  const [records, setRecords] = useState([]);
  const recordPerPage = 10;
  const [pageNumber, setPageNumber] = useState(1);
  const [totalRecords, setTotalRecords] = useState(1);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [fields, setFields] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const searchFields = [
    { label: "Case Number", type: "text", name: "case_number" },
    { label: "Case Title", type: "text", name: "title" },
    { label: "Eco Provider", type: "text", name: "eco_provider" },
  ];

  const getRecords = async () => {
    setLoader(true);
    let REQUEST_URI = common.apiPath(`/admin/cases?page=${pageNumber}`);
    if (fields !== null) {
      fields["page"] = pageNumber;
      const queryString = new URLSearchParams(fields).toString();
      REQUEST_URI = common.apiPath(`/admin/cases?${queryString}`);
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

  const deleteRecord = async (id) => {
    if (window.confirm("Are you sure to delete this question?")) {
      setLoader(true);
      fetch(common.apiPath(`/admin/cases/delete/${id}`), { method: "DELETE" })
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
          <Button
            variant="primary"
            type="button"
            onClick={() => setShowModal(true)}
          >
            Add New Case
          </Button>
        </Col>
      </Row>
      <SearchBox
        open={showSearchBox}
        title={"Search Case"}
        searchFields={searchFields}
        col={4}
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
                        <th>Case Number</th>
                        <th>Ttile</th>
                        <th>Status</th>
                        <th>Added On</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {records.map((record, index) => (
                        <Case
                          record={record}
                          index={index}
                          key={`cases-key-${index}`}
                          getRecords={getRecords}
                          deleteRecord={deleteRecord}
                          pageNumber={pageNumber}
                          recordPerPage={recordPerPage}
                        />
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
      {showModal && (
        <AddEditCase
          showModal={showModal}
          closeModal={() => {
            setShowModal(false);
          }}
          reloadRecords={getRecords}
        />
      )}
    </div>
  );
}
