"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "../styles/frontNav.css";
import { BiSolidDownArrow } from "react-icons/bi";
import { useSession } from "next-auth/react";

export default function FrontNavigation() {
  const pathname = usePathname();
  const session = useSession()
  return (
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <Link
            href="/"
            className={pathname === "/" ? "nav-link active" : "nav-link"}
          >
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            href="/getLegalHelp"
            className={
              pathname === "/getLegalHelp" ? "nav-link active" : "nav-link"
            }
          >
            Get Legal Help
          </Link>
        </li>
        <li>
          <div className="dropdown">
            <button className="dropbtn">About <BiSolidDownArrow className="arrow" /></button>
            <div class="dropdown-content">
              <Link
                href="/about"
                className={
                  pathname === "/about" ? "nav-link active" : "nav-link"
                }
              >
                About Eco
              </Link>
              <Link
                href="/about/impact"
                className={
                  pathname === "/about/impact" ? "nav-link active" : "nav-link"
                }
              >
                Impact
              </Link>
              <Link
                href="/about/oregonWorkerRelief"
                className={
                  pathname === "/about/oregonWorkerRelief"
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                Oregon Worker Relief
              </Link>
              <Link
                href="/about/attorneysInfo"
                className={
                  pathname === "/about/attorneysInfo"
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                Info For Attorneys
              </Link>
              <Link
                href="/about/FAQ"
                className={
                  pathname === "/about/FAQ" ? "nav-link active" : "nav-link"
                }
              >
                FAQ
              </Link>
            </div>
          </div>
        </li>
        <li>
          <div class="dropdown">
            <button class="dropbtn">Get Involved <BiSolidDownArrow className="arrow" /></button>
            <div class="dropdown-content">
              <Link
                href="/getInvolved"
                className={
                  pathname === "/getInvolved" ? "nav-link active" : "nav-link"
                }
              >
                Become an ECO Attorney
              </Link>
              <Link
                href="/getInvolved/attorneyProgram"
                className={
                  pathname === "/getInvolved/attorneyProgram"
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                ECO Panel Attorney Program
              </Link>
              <Link
                href="/getInvolved/ecoClinic"
                className={
                  pathname === "/getInvolved/ecoClinic"
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                ECO Clinics
              </Link>
            </div>
          </div>
        </li>
        <li className="nav-item">
          <Link
            href="https://secure.actblue.com/donate/equity-corps"
            className={
              pathname === "https://secure.actblue.com/donate/equity-corps"
                ? "nav-link active"
                : "nav-link"
            }
          >
            Donate
          </Link>
        </li>
        <li className="nav-item">
          <Link
            href="/download"
            className={
              pathname.startsWith("/download") ? "nav-link active" : "nav-link"
            }
          >
            Downloads
          </Link>
        </li>
        {session.data !== null && session.status === 'authenticated' ? (
          <li className="nav-item mt-2 mt-lg-0">
            <Link
              href="/login"
              className={
                pathname.startsWith("/login") ? "nav-link active" : "nav-link"
              }
            >
              My Account
            </Link>
          </li>
        ) : (
          <li className="nav-item mt-2 mt-lg-0">
            <Link
              href="/login"
              className={
                pathname.startsWith("/login") ? "nav-link active" : "nav-link"
              }
            >
              Log In
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
