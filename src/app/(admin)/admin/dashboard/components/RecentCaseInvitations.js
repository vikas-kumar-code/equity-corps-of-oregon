import { Card, Row, Col } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";
import Link from "next/link";

const RecentCaseInvitations = ({ records, loader }) => {
  return (
    <LoadingOverlay active={loader} spinner>
      <Card>
        <Card.Body style={{minHeight: "62vh"}}>
          <Row>
            <Col><h4 className="card-title">Recent Invitations</h4></Col>
            <Col className="text-end text-primary"><Button variant="primary">
              <Link
                href="/admin/case-invitations"
                style={{ textDecoration: "none", color: "white" }}
              >
                View All
              </Link>
            </Button></Col>
          </Row>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th> Name </th>
                  <th> Case Number </th>
                  <th> Status </th>
                </tr>
              </thead>
              <tbody>
                {records.recentCaseInvitations?.map((caseInvitations, i) => {
                  return (
                    <tr key={`caseInvitations-${caseInvitations.id}-${i}`}>
                      <td>{caseInvitations.case.case_number}</td>
                      <td> {caseInvitations.case.title ?? "N/A"} </td>
                      <td>
                        <div
                          className={`badge ${caseInvitations.case.status === 1
                            ? "badge-dark rounded-pill"
                            : caseInvitations.case.status === 2
                              ? "badge-success rounded-pill"
                              : "badge-secondary rounded-pill"
                            }`}
                        >
                          {caseInvitations.case.status === 1
                            ? "Sent"
                            : caseInvitations.case.status === 2
                              ? "Accepted"
                              : "Expired"}
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {(!records.recentCaseInvitations ||
                  records.recentCaseInvitations.length <= 0) && (
                    <tr>
                      <td colSpan={3}>
                        <h6 className="text-gray text-center">No records available</h6>
                      </td>
                    </tr>
                  )}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    </LoadingOverlay>
  );
};

export default RecentCaseInvitations;
