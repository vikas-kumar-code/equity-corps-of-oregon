"use client"

import { signOut } from "next-auth/react"

export default function SignOut() {
  return (
    <button className="nav-link btn btn-danger create-new-button" onClick={()=>signOut({callbackUrl:'/login'})}>Sign Out</button>
  )
}
