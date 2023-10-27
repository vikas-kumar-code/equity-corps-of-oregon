"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import common from "@/utils/common";

import Cards from "./Cards";
import RecentAttorney from "./RecentAttorney";
import RecentInvoices from "./RecentInvoices";
// import RecentCaseInvitations from "./RecentCaseInvitations";
import DashboardShimmer from "./DashboardShimmer";

const Dashboard = () => {
  const [records, setRecords] = useState([]);
  const [loader, setLoader] = useState(false);

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

  return (
    <>
      <Cards records={records} loader={loader} />
      {loader ? (<DashboardShimmer />): (<div className="row">
        {records.recentInvoices && (
          <div className="col-md-6">
            <RecentInvoices records={records} loader={loader}/>
          </div>
        )}
        {records.recentAttorney && (
          <div className="col-md-6">
            <RecentAttorney records={records} loader={loader}/>
          </div>
        )}
        {/* {records.recentCaseInvitations && (
          <div className="col-md-6">
            <RecentCaseInvitations records={records} loader={loader}/>
          </div>
        )} */}
      </div>)}
    </>
  );
};

export default Dashboard;
