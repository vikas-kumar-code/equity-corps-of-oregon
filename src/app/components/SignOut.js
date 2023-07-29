"use client"

import { signOut, useSession } from "next-auth/react"
import Image from "next/image"

export default function SignOut() {
  const session = useSession();
  return (

    <ul className="navbar-nav navbar-nav-right">
      <li className="nav-item dropdown d-none d-lg-block">
        <button className="nav-link btn btn-danger create-new-button" onClick={() => signOut({ callbackUrl: '/login' })}>Sign Out</button>
      </li>

      <li className="nav-item dropdown">
        <a className="nav-link" id="profileDropdown" href="#" data-bs-toggle="dropdown">
          <div className="navbar-profile">
            <Image
              src="/images/faces/face15.jpg"
              width={35}
              height={35}
            />
            <p className="mb-0 d-none d-sm-block navbar-profile-name">{/* {session.user.name} */}</p>
            <i className="mdi mdi-menu-down d-none d-sm-block"></i>
            {JSON.stringify(session)}
          </div>
        </a>

      </li>
    </ul>
  )
}
