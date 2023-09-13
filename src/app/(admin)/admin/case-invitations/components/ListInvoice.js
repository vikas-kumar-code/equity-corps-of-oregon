import common from "@/utils/common";
import moment from "moment";
const {
  DropdownButton,
  Dropdown,
  ButtonGroup,
  Card,
  Badge,
} = require("react-bootstrap");

export default function ListInvoice({
  records,
  getRecord,
  deleteRecord,
  showInvoiceDetails,
  maxCompensation,
  sendInvoice,
}) {
  const btnStatus = {
    0: {
      label: "Draft",
      bg: "secondary",
    },
    1: {
      label: "Sent",
      bg: "info",
    },
    2: {
      label: "Paid",
      bg: "success",
    },
  };

  return (
    <Card>
      <Card.Body>
        <div className="table-responsive">
          <h6 className="float-end">
            Maximum compensation - {common.currencyFormat(maxCompensation)}
          </h6>
          <h5 className="">Invoices</h5>
          <div className="table-responsive min-list-height">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Invoice</th>
                  <th>Total Amount</th>
                  <th>Added On</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {records.map((item, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{common.currencyFormat(item.total_amount, 2)}</td>
                    <td>{moment(item.added_on).format("D MMM, YYYY")}</td>
                    <td>
                      <Badge
                        pill
                        bg={btnStatus[item.status].bg || "info"}
                        size="sm"
                      >
                        {btnStatus[item.status].label || "N/A"}
                      </Badge>
                    </td>
                    <td>
                      <DropdownButton
                        as={ButtonGroup}
                        key="action-1"
                        id={`action-btn-1`}
                        variant="primary"
                        title="Action"
                        align="end"
                      >
                        {item.status === 0 && (
                          <Dropdown.Item
                            eventKey="4"
                            onClick={() => sendInvoice(item.id)}
                          >
                            <span class="mdi mdi-send"></span>
                            Send
                          </Dropdown.Item>
                        )}

                        <Dropdown.Item
                          eventKey="1"
                          onClick={() => showInvoiceDetails(item)}
                        >
                          <span className="mdi mdi-eye"></span>
                          View
                        </Dropdown.Item>
                        {item.status <= 1 && (
                          <Dropdown.Item
                            eventKey="2"
                            onClick={() => getRecord(item.id)}
                          >
                            <span class="mdi mdi-pencil"></span>
                            Edit
                          </Dropdown.Item>
                        )}
                        {item.status == 0 && (
                          <Dropdown.Item
                            eventKey="3"
                            onClick={() => deleteRecord(item.id)}
                          >
                            <span class="mdi mdi-delete"></span>
                            Delete
                          </Dropdown.Item>
                        )}
                      </DropdownButton>
                    </td>
                  </tr>
                ))}
                {records.length <= 0 && (
                  <tr>
                    <td colSpan={5}>
                      <h6 className="text-gray">No records available</h6>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
