"use client";
import { signOut } from "next-auth/react";
import { Button } from "react-bootstrap";
import "./style.css";

export default function Account() {
  return (
    <div className="text-center w-100 py-5">
      <h1>Attorney Account</h1>
      <p>On Progress...</p>
      <Button
        variant="secondary"
        eventKey="4.2"
        onClick={() => signOut({ callbackUrl: "/login" })}
      >
        Sign Out
      </Button>
    </div>
  );
}
