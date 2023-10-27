import { Card, Row } from "react-bootstrap";

const Cards = ({ records, loader }) => {
  const cardData = [
    {
      clas1: "col-xl-3 col-sm-6 grid-margin",
      label: "Total Case",
      icon: "mdi mdi-alpha-c-circle",
    },
    {
      clas1: "col-xl-3 col-sm-6 grid-margin",
      label: "Total User",
      icon: "mdi mdi-account",
    },
    {
      clas1: "col-xl-3 col-sm-6 grid-margin",
      label: "Total Invoice",
      icon: "mdi mdi-receipt",
    },
    {
      clas1: "col-xl-3 col-sm-6 grid-margin",
      label: "Total Attorney",
      icon: "mdi mdi-account",
    },
  ];

  return (
    <>
      {!loader ? (
        <div className="row">
          {records?.counts &&
            records?.counts?.map((data, i) => {
              const { count, label, icon } = data;
              return (
                <div
                  key={`status-card-${i}`}
                  className="col-xl-3 col-sm-6 grid-margin stretch-card"
                >
                  <Card>
                    <Card.Body>
                      <Row>
                        <div className="col-9">
                          <div className="d-flex align-items-center align-self-start">
                            <h3 className="mb-0">{count}</h3>
                          </div>
                        </div>
                        <div className="col-3">
                          <div className="icon icon-box-success ">
                            <span
                              className={icon}
                              style={{ fontSize: 30 }}
                            ></span>
                          </div>
                        </div>
                      </Row>
                      <h5 className="text-muted font-weight-normal">{label}</h5>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
        </div>
      ) : (
        <div className="row">
          {cardData?.map((data, i) => {
            const { label, icon } = data;
            return (
              <div
                key={`status-card-${i}`}
                className="col-xl-3 col-sm-6 grid-margin stretch-card"
              >
                <Card>
                  <Card.Body className="skeleton-box-gray shimmer-card">
                    <Row>
                      <div className="col-9">
                        <div className="d-flex align-items-center align-self-start">
                          <h3 className="mb-0"></h3>
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="icon icon-box-success ">
                          <span
                            className={icon}
                            style={{ fontSize: 30 }}
                          ></span>
                        </div>
                      </div>
                    </Row>
                    <h5 className="text-muted font-weight-normal">{label}</h5>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Cards;
