"use client"

import React, { useState, useEffect } from 'react'
import LoadingOverlay from 'react-loading-overlay';
import moment from "moment";
import { Card, Row, Col, Button } from "react-bootstrap"
import Pagination from "react-js-pagination";
import AddEditRole from './AddEditRole';
import { toast } from 'react-toastify';

export default function ListRoles() {
    const [loader, setLoader] = useState(false);
    const [records, setRecords] = useState([]);
    const recordPerPage = 10;
    const [pageNumber, setPageNumber] = useState(1);
    const [totalRecords, setTotalRecords] = useState(1);
    const [showAddEditModal, setShowAddEditModal] = useState(false);
    const [showPermissionModal, setShowPermissionModal] = useState(false);
    const [recordId, setRecordId] = useState(null);

    const getRecords = async () => {
        setLoader(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/roles?page=${pageNumber}`);
        const data = await response.json();
        setLoader(false);
        setRecords(JSON.parse(data.records));
        setTotalRecords(data.totalRecords)
    }

    useEffect(() => {
        getRecords();
    }, [pageNumber])


    const deleteRecord = async (id) => {
        if (window.confirm('Are you sure to delete this role?')) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/roles/delete/${id}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            if (data.success) {
                toast.success(data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                });
                getRecords();
            }
        }
    }

    const getRecord = (recordId = null) => {
        setRecordId(recordId);
        setShowAddEditModal(true);
    }

    return (
        <LoadingOverlay
            active={loader}
            spinner
            text='Loading your content...'
        >
            <Card>
                <Card.Body>
                    <Card.Title>
                        <Row>
                            <Col md={6} sm={12}><h3>Roles</h3></Col>
                            <Col md={6} sm={12} className='text-end'>
                                <Button variant='warning' className='me-2'>Search</Button>
                                <Button variant='primary' type='button' onClick={() => getRecord()}>Add New Role</Button>
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
                                {records.map((record, index) => <tr>
                                    <td>{((pageNumber * recordPerPage) - recordPerPage) + Number(index + 1)}.</td>
                                    <td>{record.name}</td>
                                    <td>{record.status ? <span className="badge badge-success rounded-pill">Active</span> : <span className="badge badge-danger rounded-pill">Inactive</span>}</td>
                                    <td>{moment(record.created_at).format("D MMM,  YYYY")}</td>
                                    <td><button className="btn btn-warning" onClick={() => getRecord(record.id)}>Set Permission</button></td>
                                    <td><button className="btn btn-primary" onClick={() => getRecord(record.id)}>Edit</button></td>
                                    <td><button className="btn btn-danger" onClick={() => deleteRecord(record.id)}>Delete</button></td>
                                </tr>)}
                            </tbody>
                        </table>
                    </div>
                    {/* <Card.Footer className='text-end'>
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
                    </Card.Footer> */}
                </Card.Body>
            </Card>
            {showAddEditModal && <AddEditRole
                showModal={showAddEditModal}
                closeModal={() => {
                    setShowAddEditModal(false)
                    setRecordId(null);
                }}
                recordId={recordId}
                reloadeRecords={getRecords}
            />}
            {showPermissionModal && <AddEditRole
                showModal={showPermissionModal}
                closeModal={() => {
                    setShowPermissionModal(false)
                    setRecordId(null);
                }}
                recordId={recordId}
            />}
        </LoadingOverlay>
    )
}
