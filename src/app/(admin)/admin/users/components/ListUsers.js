"use client"

import React, { useState, useEffect } from 'react'
import LoadingOverlay from 'react-loading-overlay';
import moment from "moment";
import { Card, Row, Col, Button } from "react-bootstrap"
import Pagination from "react-js-pagination";
import AddEditUser from './AddEditUser';
import SearchBox from '@/app/components/SearchBox';
import { FaSearchMinus, FaSearchPlus } from "react-icons/fa";
import common from "@/utils/common";


export default function ListUsers() {
    const [loader, setLoader] = useState(false);
    const [records, setRecords] = useState([]);
    const recordPerPage = 10;
    const [pageNumber, setPageNumber] = useState(1);
    const [totalRecords, setTotalRecords] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [userId, setUserId] = useState(null);
    const [showSearchBox, setShowSearchBox] = useState(false);
    const [fields, setFields] = useState(null);
    const searchFields = [
        { label: 'Name', type: 'text', name: "name" },
        { label: 'Email', type: 'text', name: "email" },
        //{ label: 'Status', type: 'text', name: "status" }
    ];


    const getUsers = async () => {
        setLoader(true);
        let REQUEST_URI = common.apiPath(`/admin/users?page=${pageNumber}`);
        if (fields !== null) {
            fields['page'] = pageNumber;
            const queryString = new URLSearchParams(fields).toString();
            REQUEST_URI = common.apiPath(`/admin/users?${queryString}`)
        }
        const response = await fetch(REQUEST_URI);
        const data = await response.json();
        setLoader(false);
        setRecords(JSON.parse(data.records));
        setTotalRecords(data.totalRecords)
    }

    useEffect(() => {
        getUsers();
    }, [pageNumber])

    useEffect(() => {
        getUsers();
    }, [fields])


    const deleteUser = async (id) => {
        if (window.confirm('Are you sure to delete this use?')) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/delete/${id}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            if (data.success) {
                getUsers();
            }
        }
    }

    const getUser = (userId = null) => {
        setUserId(userId);
        setShowModal(true);
    }

    return (
        <div>
            <Row>
                <Col md={6} sm={12}><h3>Users</h3></Col>
                <Col md={6} sm={12} className='text-end'>
                    <Button variant='warning' className='me-2' onClick={() => setShowSearchBox(!showSearchBox)}>{showSearchBox ? <FaSearchMinus /> : <FaSearchPlus />} Search</Button>
                    <Button variant='primary' type='button' onClick={() => getUser()}>Add New User</Button>
                </Col>
            </Row>
            <SearchBox
                open={showSearchBox}
                title={'Search User'}
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
                        text='Loading your content...'
                    >
                        <Card>
                            <Card.Body>
                                <Card.Title>

                                </Card.Title>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name </th>
                                                <th>Email</th>
                                                <th>Role</th>
                                                <th>Status</th>
                                                <th>Added On</th>
                                                <th colSpan="2">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {records.map((record, index) => <tr>
                                                <td>{((pageNumber * recordPerPage) - recordPerPage) + Number(index + 1)}.</td>
                                                <td>{record.name}</td>
                                                <td>{record.email}</td>
                                                <td>{record.role.name}</td>
                                                <td>{record.status ? <span className="badge badge-success rounded-pill">Active</span> : <span className="badge badge-danger rounded-pill">Inactive</span>}</td>
                                                <td>{moment(record.created_at).format("D MMM,  YYYY")}</td>
                                                <td><button className="btn btn-primary" onClick={() => getUser(record.id)}>Edit</button></td>
                                                <td><button className="btn btn-danger" onClick={() => deleteUser(record.id)}>Delete</button></td>
                                            </tr>)}
                                        </tbody>
                                    </table>
                                </div>
                                <Card.Footer className='text-end'>
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
                            </Card.Body>

                        </Card>
                    </LoadingOverlay>
                </Col>
            </Row>
            {
                showModal && <AddEditUser
                    showModal={showModal}
                    closeModal={() => {
                        setShowModal(false)
                        setUserId(null);
                    }}
                    userId={userId}
                    reloadeUsers={getUsers}
                />
            }
        </div >
    )
}
