import common from "@/utils/common";
import { useState } from "react";
import { toast } from "react-toastify";

const { Table } = require("react-bootstrap");

export default function ListInvoice({caseId}) {
  const [records, setRecords] = useState([]);

  const getRecords = async () => {
    let REQUEST_URI = common.apiPath(
      `/admin/cases/invitation/list/${caseId}`
    )
    fetch(REQUEST_URI)
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          setRecords(response.records);
          // setTotalRecords(response.totalRecords);
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
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
  );
}
