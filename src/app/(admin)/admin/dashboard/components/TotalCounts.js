"use client"

import React, { useEffect, useState } from 'react'
import { Row, Col, Card } from "react-bootstrap";
import common from "@/utils/common";
import { toast } from "react-toastify";

export default function TotalCounts() {
    const [loader, setLoader] = useState(false);
    const [records, setRecords] = useState([]);

    const getRecords = async () => {
        setLoader(true);
        fetch(common.apiPath(`/admin/dashboard`)).then((response) => response.json()).then((response) => {
            if (response.success) {
                setRecords(response.records);
            } else {
                toast.error(response.message);
            }
        }).catch((error) => {
            toast.error(error.message);
        }).finally(() => setLoader(false));
    }

    useEffect(() => {
        getRecords();
    }, [])

    return (
        <Row>
            {records.counts && records.counts.map((rc) => <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
                <Card>
                    <Card.Body>
                        <Row>
                            <div className="col-9">
                                <div className="d-flex align-items-center align-self-start">
                                    <h3 className="mb-0">{rc.count}</h3>

                                </div>
                            </div>
                            <div className="col-3">
                                <div className="icon icon-box-success ">
                                    <span className={rc.icon} style={{ fontSize: 30 }}></span>
                                </div>
                            </div>
                        </Row>
                        <h6 className="text-muted font-weight-normal">
                            {rc.label}
                        </h6>
                    </Card.Body>
                </Card>
            </div>)}
        </Row>
    )
}


