import common from "@/utils/common";
import moment from "moment";
import React from "react";
import { Button } from "react-bootstrap";

export default function PaymentButtons(props) {
  if (props?.item?.payments && Array.isArray(props?.item?.payments)) {
    const payments = props.item.payments;
    return payments.map((item, index) => {
      return (
        <Button variant="none" className="m-1 border text-success">
          {common.currencyFormat(item.amount)}
          {" at "}
          {moment(item.added_on).format("MM-DD-YYYY h:mm A")}
        </Button>
      );
    });
  } else {
    return <></>;
  }
}
