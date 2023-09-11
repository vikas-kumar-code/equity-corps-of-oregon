import moment from "moment";
import LoadingOverlay from "react-loading-overlay";
const { Table, Button } = require("react-bootstrap");

export default function ListInvoice({ records, getRecord, deleteRecord }) {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Invoice</th>
          <th>Total Amount</th>
          <th>Added On</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {records.map((item, index) => (
          <tr>
            <td>{index+1}</td>
            <td>{item.name}</td>
            <td>{item.total_amount?.toFixed(2)}</td>
            <td>{moment(item.added_on).format("D MMM, YYYY")}</td>
            <td>
              <Button
                variant="info"
                size="sm"
                className="me-2"
                onClick={() => getRecord(item.id)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                className="me-2"
                onClick={() => deleteRecord(item.id)}
              >
                Delete
              </Button>
              <Button variant="primary" size="sm">
                View
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
