import { Card, Row } from "react-bootstrap";

const StatusCard = (props) => {
  const { counts } = props.records;

  return (
    <div className="row">
      {counts?.map((c, i) => {
          const { count, label, icon } = c;
          return (
            <div key={`status-card-${i}`} className="col-xl-3 col-sm-6 grid-margin stretch-card">
              {counts ? (
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
              ) : (
                <Card className="skeleton-box bg-info">
                  <Card.Body>
                    <Row>
                      <div className="col-9">
                        <div className="d-flex align-items-center align-self-start">
                          <h3 className="mb-0">dsgsdg</h3>
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="icon icon-box-success ">
                          <span
                            style={{ fontSize: 30 }}
                          ></span>
                        </div>
                      </div>
                    </Row>
                    <h5 className="text-muted font-weight-normal">sdfgsdfg</h5>
                  </Card.Body>
                </Card>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default StatusCard;
