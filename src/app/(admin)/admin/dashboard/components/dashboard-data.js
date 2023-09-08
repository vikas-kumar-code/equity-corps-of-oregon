"use client"

import React, { useEffect, useState } from 'react'
import { Button, Modal, Row, Form, Col } from "react-bootstrap";

export default function DashboardData() {
    const [loader, setLoader] = useState(false);
    const [records, setRecords] = useState([]);

    const getRecords = async () => {
        setLoader(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard`);
        const data = await response.json();
        setLoader(false);
        setRecords(data.records);
    }

    useEffect(() => {
        getRecords();
    }, [])

    return (
        <div className="row">
            <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-9">
                                <div className="d-flex align-items-center align-self-start">
                                    <h3 className="mb-0">{records.todaysLoans}</h3>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="icon icon-box-success ">
                                    <span className="mdi mdi-arrow-top-right icon-item"></span>
                                </div>
                            </div>
                        </div>
                        <h6 className="text-muted font-weight-normal">Today's Loans</h6>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-9">
                                <div className="d-flex align-items-center align-self-start">
                                    <h3 className="mb-0">{records.totalLoans}</h3>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="icon icon-box-success">
                                    <span className="mdi mdi-arrow-top-right icon-item"></span>
                                </div>
                            </div>
                        </div>
                        <h6 className="text-muted font-weight-normal">Total Loans</h6>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-9">
                                <div className="d-flex align-items-center align-self-start">
                                    <h3 className="mb-0">{records.toalUsers}</h3>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="icon icon-box-danger">
                                    <span className="mdi mdi-arrow-bottom-left icon-item"></span>
                                </div>
                            </div>
                        </div>
                        <h6 className="text-muted font-weight-normal">Total Users</h6>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-9">
                                <div className="d-flex align-items-center align-self-start">
                                    <h3 className="mb-0">{records.activeUsers}</h3>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="icon icon-box-success ">
                                    <span className="mdi mdi-arrow-top-right icon-item"></span>
                                </div>
                            </div>
                        </div>
                        <h6 className="text-muted font-weight-normal">Total Active Users</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}


