import moment from "moment";
const {
  DropdownButton,
  Dropdown,
  ButtonGroup,
  Card,
} = require("react-bootstrap");

export default function ListInvoice({ records, getRecord, deleteRecord }) {
  return (
    <Card>
      <Card.Body>
        <div className="table-responsive">
        <h5 className="">Invoices</h5>
          <table className="table">
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
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.total_amount?.toFixed(2)}</td>
                  <td>{moment(item.added_on).format("D MMM, YYYY")}</td>
                  <td>
                    <DropdownButton
                      as={ButtonGroup}
                      key="action-1"
                      id={`action-btn-1`}
                      variant="primary"
                      title="Action"
                    >
                      <Dropdown.Item eventKey="1">View</Dropdown.Item>
                      <Dropdown.Item
                        eventKey="2"
                        onClick={() => getRecord(item.id)}
                      >
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item
                        eventKey="3"
                        onClick={() => deleteRecord(item.id)}
                      >
                        Delete
                      </Dropdown.Item>
                    </DropdownButton>
                  </td>
                </tr>
              ))}
              {records.length <= 0 && <tr><td colSpan={5}>
                <h6 className="text-gray">No records available</h6>
                </td></tr>}
            </tbody>
          </table>
        </div>
      </Card.Body>
    </Card>
  );
}
