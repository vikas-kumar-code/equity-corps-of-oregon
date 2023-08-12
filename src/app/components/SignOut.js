"use client"

import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

export default function SignOut() {
  const session = useSession();
  return (


    <Nav className="ms-auto mt-3">
      <NavDropdown title={session.status === 'authenticated' ? session.data.user.name : 'Loading..'} id="nav-dropdown">
        <NavDropdown.Item eventKey="4.1">Settings</NavDropdown.Item>
        <NavDropdown.Item eventKey="4.2" onClick={() => signOut({ callbackUrl: '/login' })}>Sing Out</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  )
}
