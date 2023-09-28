"use client";
import React, { useEffect, useState } from "react";
import StatusCard from "./StatusCard";
import ListRecentInvoices from "./ListRecentInvoices";
import ListRecentCaseInvitations from "./ListRecentCaseInvitations";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import common from "@/utils/common";
import ListAttorney from "./ListAttorney";

const DashboardData = () => {
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
    <div>
      <StatusCard records={records} loader={loader} />
      <div className="row">
        <div className="col-md-7">
          <ListRecentInvoices records={records} loader={loader} />
        </div>
        {records.role_id === 1 && (
          <div className="col-md-5">
            <ListAttorney records={records} loader={loader} />
          </div>
        )}
        {records.role_id === 3 && (
          <div className="col-md-5">
            <ListRecentCaseInvitations records={records} loader={loader} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardData;
