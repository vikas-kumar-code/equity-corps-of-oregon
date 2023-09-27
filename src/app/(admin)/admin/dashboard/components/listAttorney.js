"use client";
import NextPagination from "@/app/components/NextPagination";
import common from "@/utils/common";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";
import { toast } from "react-toastify";

const ListAttorney = () => {
  const [records, setRecords] = useState([]);
  const [loader, setLoader] = useState(false);
  const searchParams = useSearchParams();

  const getRecords = async () => {
    setLoader(true);
    await fetch(common.apiPath(`/admin/dashboard?${searchParams.toString()}`))
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          setRecords(response.records);
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
    records.role_id === 1 && (
      <Row>
        <Col className="grid-margin">
          <LoadingOverlay
            active={loader}
            spinner
            text="Loading your content..."
          >
            <Card>
              <Card.Body>
                <h4 className="card-title">Recent Attorney</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th> Name </th>
                        <th> Email </th>
                        <th> Phone </th>
                        <th> Address </th>
                      </tr>
                    </thead>
                    <tbody>
                      {records.recentAttorney?.map((attorney, i) => {
                        const { id, name, email, phone, address } = attorney;
                        return (
                          <tr key={`attorney-${id}-${i}`}>
                            <td>
                              <span className="ps-2">{name}</span>
                            </td>
                            <td> {email ?? "N/A"} </td>
                            <td> {phone ?? "N/A"} </td>
                            <td> {address ?? "N/A"} </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </Card.Body>
              <Card.Footer className="text-end">
                <NextPagination totalItemsCount={records.totalAttorney} />
              </Card.Footer>
            </Card>
          </LoadingOverlay>
        </Col>
      </Row>
    )
  );
};

export default ListAttorney;
