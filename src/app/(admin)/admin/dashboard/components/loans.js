"use client"

import React, { useEffect, useState } from 'react'
import { Button, Modal, Row, Form, Col } from "react-bootstrap";
import moment from 'moment';
import LoadingOverlay from 'react-loading-overlay';

export default function RecentLoans() {
    const [loader, setLoader] = useState(false);
    const [records, setRecords] = useState([]);

    const getRecords = async () => {
        setLoader(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/loans`);
        const data = await response.json();
        setLoader(false);
        console.log(data.records);
        setRecords(JSON.parse(data.records));
    }

    useEffect(() => {
        getRecords();
    }, [])
    return (
        <div className="card">
            <div className="card-body">
                <LoadingOverlay
                    active={loader}
                    spinner
                    text='Loading your content...'
                >
                <h4 className="card-title">Recent Loans</h4>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th><strong>Name </strong></th>
                                <th>Manager</th>
                                <th>City</th>
                                <th>Remark</th>
                                <th>Bank</th>
                                <th>Amount</th>
                                <th>Added On</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.map((record, index) => <tr>
                                <td>{index + 1}.</td>
                                <td>{record.customer_name}</td>
                                <td>{record.sm_name}</td>
                                <td>{record.city.name}</td>
                                <td>{record.remark}</td>
                                <td>{record.bank_name}</td>
                                <td>{record.amount}</td>
                                <td>{moment(record.created_at).format("D MMM,  YYYY")}</td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
                </LoadingOverlay>
            </div>
        </div>

    )
}


