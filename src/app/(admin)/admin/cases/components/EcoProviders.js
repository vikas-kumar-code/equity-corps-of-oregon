import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";

export default function EcoProviders({ record }) {
  const [show, setShow] = useState(false);
  if (record?.case_invitations && record?.case_invitations.length > 0) {
    if (show) {
      return (
        <ul>
          {record.case_invitations.map((item) => (
            <li>{item?.user?.name}</li>
          ))}
          <Button
            variant="link"
            className="px-0"
            onClick={() => setShow(false)}
          >
            Show less
          </Button>
        </ul>
      );
    } else {
      return (
        <>
          {record.case_invitations[0].user.name}
          {record.case_invitations.length > 1 && (
            <Button
              variant="link"
              className="p-2"
              onClick={() => setShow(true)}
            >
              Show more
            </Button>
          )}
        </>
      );
    }
  }else{
    return 'N/A'
  }
}
