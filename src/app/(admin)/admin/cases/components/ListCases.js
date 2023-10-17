"use client";

import React, { useState, useEffect } from "react";
import LoadingOverlay from "react-loading-overlay";
import { Card, Row, Col, Button } from "react-bootstrap";
import SearchBox from "@/app/components/SearchBox";
import { FaSearchMinus, FaSearchPlus } from "react-icons/fa";
import common from "@/utils/common";
import { toast } from "react-toastify";
import Case from "./Case";
import AddEditCase from "./AddEditCase";
import UpdateContract from "./UpdateContract";
import { useSearchParams } from "next/navigation";
import NextPagination from "@/app/components/NextPagination";

LoadingOverlay.propTypes = undefined;

export default function ListCases() {
  const searchParams = useSearchParams();
  const [totalRecords, setTotalRecords] = useState(1);

  const [loader, setLoader] = useState(false);
  const [records, setRecords] = useState([]);
  const [ecoProviders, setEcoProviders] = useState([]);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [updateContractModal, setUpdateContractModal] = useState(false);

  const searchFields = [
    { label: "Case Number", type: "text", name: "case_number" },
    { label: "Case Title", type: "text", name: "title" },
    {
      label: "Eco Provider",
      type: "select",
      name: "eco_provider",
      values: ecoProviders,
    },
  ];

  const getRecords = async () => {
    setLoader(true);
    fetch(common.apiPath(`/admin/cases?${searchParams.toString()}`))
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
    if (
      window.confirm(
        "Do you want to DELETE this invoice? This action is permanent and cannot be undone."
      )
    ) {
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

  const getEcoProviders = async () => {
    let REQUEST_URI = common.apiPath(`/admin/cases/eco-providers`);
    fetch(REQUEST_URI)
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          let ecoProviders = [];
          response.records.forEach((provider, index) => {
            ecoProviders[index] = {
              id: provider.user.id,
              name: provider.user.name,
            };
          });
          setEcoProviders(ecoProviders);
        } else {
          toast.error(response.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    getRecords();
  }, [searchParams]);

  useEffect(() => {
    getEcoProviders();
  }, []);

  return (
    <div>
      <Row className="pb-2">
        <Col md={6} sm={12}>
          <h3>Cases</h3>
        </Col>
        <Col md={2} sm={12} className="d-grid mb-2">
          <Button
            variant="warning"
            onClick={() => setShowSearchBox(!showSearchBox)}
          >
            {showSearchBox ? <FaSearchMinus /> : <FaSearchPlus />} Search
          </Button>
        </Col>
        <Col md={2} sm={12} className="d-grid mb-2">
          <Button
            variant="dark"
            type="button"
            onClick={() => setUpdateContractModal(true)}
          >
            Update Contract
          </Button>
        </Col>
        <Col md={2} sm={12} className="d-grid mb-2">
          <Button
            variant="success"
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
                        <th>Case Number</th>
                        <th>Ttile</th>
                        <th>Eco Providers</th>
                        <th>Status</th>
                        <th>Added On</th>
                        <th>Last Activity</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {records.map((record, index) => (
                        <Case
                          record={record}
                          key={`cases-key-${index}`}
                          getRecords={getRecords}
                          deleteRecord={deleteRecord}
                          sn={common.sn(searchParams, index)}
                        />
                      ))}
                      {records.length <= 0 && (
                        <tr>
                          <td colSpan={8}>
                            <h6 className="text-gray text-center m-5">No records available</h6>
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
        <AddEditCase
          showModal={showModal}
          closeModal={() => {
            setShowModal(false);
          }}
          reloadRecords={getRecords}
        />
      )}
      {updateContractModal && (
        <UpdateContract
          showModal={updateContractModal}
          closeModal={() => {
            setUpdateContractModal(false);
          }}
        />
      )}
    </div>
  );
}
