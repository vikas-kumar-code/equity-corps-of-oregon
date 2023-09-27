import common from "@/utils/common";
import moment from "moment";
import React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

export default function AmountTooltip(props) {
  if (props?.item?.payments && Array.isArray(props?.item?.payments)) {
    const payments = props.item.payments;
    return payments.map((item, index) => {
      return (
          <Button variant="outline-success mx-2">
            {common.currencyFormat(item.amount)} |
            {moment(item.added_on).format("MM-DD-YYYY h:mm:ss A")}
          </Button>  
      );
    });
  } else {
    return <></>;
  }
}
