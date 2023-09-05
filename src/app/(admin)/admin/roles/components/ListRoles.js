"use client";

import React, { useState, useEffect } from "react";
import LoadingOverlay from "react-loading-overlay";
import moment from "moment";
import { Card, Row, Col, Button } from "react-bootstrap";
import AddEditRole from "./AddEditRole";
import { toast } from "react-toastify";
import common from "@/utils/common";
LoadingOverlay.propTypes = undefined;

export default function ListRoles() {
  const [loader, setLoader] = useState(false);
  const [records, setRecords] = useState([]);
  const recordPerPage = 10;
  const [pageNumber, setPageNumber] = useState(1);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [recordId, setRecordId] = useState(null);

  const getRecords = async () => {
    setLoader(true);
    await fetch(common.apiPath(`/admin/roles?page=${pageNumber}`))
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          setRecords(response.records);
        } 
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => setLoader(false));
  };

  const deleteRecord = async (id) => {
    if (window.confirm("Are you sure to delete this role?")) {
      await fetch(common.apiPath(`/admin/roles/delete/${id}`), {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            toast.success(response.message);
            getRecords();
          }else if(response.error){
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
    setShowAddEditModal(true);
  };
  useEffect(() => {
    getRecords();
  }, []);

  return (
    <LoadingOverlay active={loader} spinner text="Loading your content...">
      <Card>
        <Card.Body>
          <Card.Title>
            <Row>
              <Col md={6} sm={12}>
                <h3>Roles</h3>
              </Col>
              <Col md={6} sm={12} className="text-end">
                <Button
                  variant="primary"
                  type="button"
                  onClick={() => getRecord()}
                >
                  Add New Role
                </Button>
              </Col>
            </Row>
          </Card.Title>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name </th>
                  <th>Status</th>
                  <th>Added On</th>
                  <th colSpan="3">Action</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record, index) => (
                  <tr>
                    <td>
                      {pageNumber * recordPerPage -
                        recordPerPage +
                        Number(index + 1)}
                      .
                    </td>
                    <td>{record.name}</td>
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
                    <td>{moment(record.created_at).format("D MMM,  YYYY")}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => getRecord(record.id)}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteRecord(record.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
      {showAddEditModal && (
        <AddEditRole
          showModal={showAddEditModal}
          closeModal={() => {
            setShowAddEditModal(false);
            setRecordId(null);
          }}
          recordId={recordId}
          reloadeRecords={getRecords}
        />
      )}
      {showPermissionModal && (
        <AddEditRole
          showModal={showPermissionModal}
          closeModal={() => {
            setShowPermissionModal(false);
            setRecordId(null);
          }}
          recordId={recordId}
        />
      )}
    </LoadingOverlay>
  );
}
