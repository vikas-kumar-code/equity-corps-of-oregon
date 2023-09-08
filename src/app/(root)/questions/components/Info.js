import Image from "next/image";
import React from "react";
import { Button } from "react-bootstrap";

const Info = (props) => {
  const { data, next } = props;
  return (
    <div>
      <div className="default_qs_layout">
        <Image
          src={data?.imgUrl}
          width={700}
          height={100}
          className="img-fluid"
          alt="submit-question"
        />
        <h4 className="show-up-animation-fast text-warning">{data?.label}</h4>
        {data.button && (
          <Button
            onClick={() => next()}
            size="md"
            variant="success"
            style={{ color: "white" }}
            className="show-up-animation-fast"
          >
            Start
          </Button>
        )}
      </div>
    </div>
  );
};

export default Info;
