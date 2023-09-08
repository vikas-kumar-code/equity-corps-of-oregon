"use client";

import React, { useState, useEffect } from "react";
import LoadingOverlay from "react-loading-overlay";
import { Card, Row, Col, Button } from "react-bootstrap";
import SearchBox from "@/app/components/SearchBox";
import { FaSearchMinus, FaSearchPlus } from "react-icons/fa";
import common from "@/utils/common";
import { toast } from "react-toastify";
import Case from "./Case";
import { useSearchParams } from "next/navigation";
import NextPagination from "@/app/components/NextPagination";
LoadingOverlay.propTypes = undefined;

export default function ListCaseInvitations() {
  const searchParams = useSearchParams();
  const [totalRecords, setTotalRecords] = useState(1);

  const [loader, setLoader] = useState(true);
  const [records, setRecords] = useState([]);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [fields, setFields] = useState(null);

  const searchFields = [
    { label: "Case Number", type: "text", name: "case_number" },
    { label: "Case Title", type: "text", name: "case_title" },
  ];

  const getRecords = async () => {
    const REQUEST_URI = common.apiPath(
      `/admin/cases/invitations?${searchParams.toString()}`
    );
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

  useEffect(() => {
    getRecords();
  }, [searchParams]);

  return (
    <div>
      <Row className="pb-2">
        <Col md={6} sm={12}>
          <h3>Case Invitations</h3>
        </Col>
        <Col md={6} sm={12} className="text-end">
          <Button
            variant="warning"
            className="me-2"
            onClick={() => setShowSearchBox(!showSearchBox)}
          >
            {showSearchBox ? <FaSearchMinus /> : <FaSearchPlus />} Search
          </Button>
        </Col>
      </Row>
      <SearchBox
        open={showSearchBox}
        title={"Search Case"}
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
                          sn={common.sn(searchParams, index)}
                        />
                      ))}
                      {!loader && records.length === 0 && (
                        <tr>
                          <td colSpan={6} className="text-center text-danger">
                            No invitation found!
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
    </div>
  );
}
