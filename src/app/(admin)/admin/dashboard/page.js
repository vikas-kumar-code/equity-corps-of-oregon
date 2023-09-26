"use client";
import StatusCard from "./components/StatusCard";
import { useEffect } from "react";
import { useState } from "react";
import common from "@/utils/common";
import { toast } from "react-toastify";
import ListInvoices from "./components/ListInvoices";
import { Col, Row } from "react-bootstrap";
import { useSearchParams } from "next/navigation";
import ListAttorney from "./components/ListAttorney";

export const metadata = {
  title: `Dashboard - Admin Panel`,
};
export default async function Dashboard() {
  const [records, setRecords] = useState(1);
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
    <div className="content-wrapper">
      <StatusCard records={records} />
      <Row>
        <Col md={7}>
          <ListInvoices records={records} loader={loader} />
        </Col>
        <Col md={5}>
          {/* {records.role_id === 1 && ( */}
            <ListAttorney records={records} loader={loader} />
          {/* )} */}
        </Col>
      </Row>
    </div>
  );
}