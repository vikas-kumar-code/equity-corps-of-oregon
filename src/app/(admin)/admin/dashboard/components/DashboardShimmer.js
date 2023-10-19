import React from "react";
import { Badge, Card, Row } from "react-bootstrap";
import "../dashboard.css";

const DashboardShimmer = () => {
  const cardData = [
    {
      clas1: "col-xl-3 col-sm-6 grid-margin",
    },
    {
      clas1: "col-xl-3 col-sm-6 grid-margin",
    },
    {
      clas1: "col-xl-3 col-sm-6 grid-margin",
    },
    {
      clas1: "col-xl-3 col-sm-6 grid-margin",
    },
  ];
  return (
    <>
      <div className="row">
        {cardData.map((card, i) => {
          return (
            <div className={card.clas1}>
              <Card className="shimmer-card">
                <Card.Body className="skeleton-box-gray">
                  <Row>
                    <div className="col-9">
                      <div className="d-flex align-items-center align-self-start">
                        <h3 className="mb-0"></h3>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="icon icon-box-success ">
                        <span className="" style={{ fontSize: 30 }}></span>
                      </div>
                    </div>
                  </Row>
                  <h5 className="text-muted font-weight-normal"></h5>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="table-responsive">
            <table className="table shimmer-table skeleton-box-gray">
              <thead>
                <tr></tr>
              </thead>
              <tbody>
                <tr className="">
                  <td>
                    <span className="ps-2"></span>
                  </td>
                  <td></td>
                  <td>
                    <Badge pill size="sm"></Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-md-6">
          <div className="table-responsive">
            <table className="table shimmer-table">
              <thead>
                <tr></tr>
              </thead>
              <tbody>
                <tr className="skeleton-box-gray">
                  <td>
                    <span className="ps-2"></span>
                  </td>
                  <td></td>
                  <td>
                    <Badge pill size="sm"></Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardShimmer;
