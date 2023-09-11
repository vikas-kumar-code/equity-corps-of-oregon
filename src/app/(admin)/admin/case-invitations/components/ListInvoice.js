import common from "@/utils/common";
import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const { Table, Button } = require("react-bootstrap");

export default function ListInvoice({ caseId }) {
  const [records, setRecords] = useState([]);
  const [loader, setLoader] = useState(false);

  const getRecords = async () => {
    console.log(caseId);
    let REQUEST_URI = common.apiPath(`/admin/cases/invoice/list/${caseId}`);
    fetch(REQUEST_URI)
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

  console.log(records);

  return (
    <Table responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Total Amount</th>
          <th>Added On</th>
          <th>Action</th>
        </tr>
      </thead>
      {records.map((record) => {
        return (
          <tbody>
            <tr>
              <td>{record.id}</td>
              <td>{record.name}</td>
              <td>{record.total_amount}</td>
              <td>{moment(record.added_on).format("D MMM,  YYYY")}</td>
              <td>
                <Button>Edit</Button>
              </td>
            </tr>
          </tbody>
        );
      })}
    </Table>
  );
}
