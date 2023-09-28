"use client";

import React, { useState, useEffect } from "react";
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
import AddEditTemplate from "./AddEditTemplate";
import SearchBox from "@/app/components/SearchBox";
import { FaSearchMinus, FaSearchPlus } from "react-icons/fa";
import common from "@/utils/common";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import NextPagination from "@/app/components/NextPagination";
LoadingOverlay.propTypes = undefined;

export default function ListTemplates() {
  const searchParams = useSearchParams();
  const [totalRecords, setTotalRecords] = useState(1);
  const [fields, setFields] = useState({})
  const [loader, setLoader] = useState(true);
  const [records, setRecords] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [recordId, setRecordId] = useState(null);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const searchFields = [{ label: "Subject", type: "text", name: "subject" }];

  const getRecords = async () => {
    let REQUEST_URI = common.apiPath(
      `/admin/email-templates?${searchParams.toString()}`
    );
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
  }, [searchParams]);

  const deleteRecord = async (id) => {
    if (window.confirm("Are you sure to delete?")) {
      setLoader(true);
      fetch(common.apiPath(`/admin/email-templates/delete/${id}`), {
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

  const getRecord = (recordId = null) => {
    setRecordId(recordId);
    setShowModal(true);
  };

  return (
    <div>
      <Row className="py-2">
        <Col md={6} sm={12}>
          <h3>Email Templates</h3>
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
            Add New Email Template
          </Button>
        </Col>
      </Row>
      <SearchBox
        open={showSearchBox}
        title={"Search Template"}
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
                <div className="table-responsive min-list-height">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Subject </th>
                        <th>From Email </th>
                        <th>From Label </th>
                        <th colSpan={2}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {records?.map((record, index) => (
                        <tr key={index}>
                          <td>{common.sn(searchParams, index)}.</td>
                          <td>{record.subject}</td>
                          <td>{record.from_email}</td>
                          <td>{record.from_label}</td>
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
                      ))}
                      {!loader && records.length === 0 && (
                        <tr>
                          <td colSpan={6} className="text-center text-danger">
                            Template not found!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <Card.Footer className="text-end">
                  <NextPagination totalItemsCount={totalRecords} />
                </Card.Footer>
              </Card.Body>
            </Card>
          </LoadingOverlay>
        </Col>
      </Row>
      {showModal && (
        <AddEditTemplate
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
