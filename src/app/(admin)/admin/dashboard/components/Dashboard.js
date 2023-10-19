"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import common from "@/utils/common";

import Cards from "./Cards";
import RecentAttorney from "./RecentAttorney";
import RecentInvoices from "./RecentInvoices";
import RecentCaseInvitations from "./RecentCaseInvitations";
import { Spinner } from "react-bootstrap";
import DashboardShimmer from "./DashboardShimmer";

const Dashboard = () => {
  const [records, setRecords] = useState([]);
  const [loader, setLoader] = useState(true);

  const getRecords = async () => {
    setLoader(true);
    await fetch(common.apiPath(`/admin/dashboard`))
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
  }, []);

  return !loader ? (
    <div>
      <DashboardShimmer />
    </div>
  ) : (
    <>
      <Cards records={records} loader={loader} />
      <div className="row">
        {records.recentInvoices && (
          <div className="col-md-6">
            <RecentInvoices records={records} loader={loader}/>
          </div>
        )}
        {records.recentAttorney && (
          <div className="col-md-6">
            <RecentAttorney records={records} />
          </div>
        )}
        {records.recentCaseInvitations && (
          <div className="col-md-6">
            <RecentCaseInvitations records={records} />
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
