"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

export default function SignOut() {
  const session = useSession();
  return (
    <Nav className="ms-auto mt-3">
      <NavDropdown
        align="end"
        title={
          session.status === "authenticated"
            ? session.data.user.name
            : "Loading.."
        }
        id="nav-dropdown"
      >
        <NavDropdown.Item eventKey="4.1">
        <span class="mdi mdi-settings"></span>
          Settings
        </NavDropdown.Item>
        <NavDropdown.Item
          eventKey="4.2"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          <span class="mdi mdi-logout-variant"></span>
          Sign Out
        </NavDropdown.Item>
      </NavDropdown>
    </Nav>
  );
}
