import { Card } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";

const RecentCaseInvitations = ({ records, loader }) => {
  return (
    <LoadingOverlay active={loader} spinner>
      <Card>
        <Card.Body>
          <h4 className="card-title">Recent Case Invitations</h4>
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
                          className={`badge ${
                            caseInvitations.case.status === 1
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
                    <td colSpan={6}>
                      <h6 className="text-gray">No records available</h6>
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
