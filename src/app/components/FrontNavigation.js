"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";

export default function FrontNavigation() {
  const [toggle, setToggle] = useState(false)
  const [show, setShow] = useState(false)
  const pathname = usePathname();
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
        <li className="nav-item">
          <Dropdown className="drop_down" show={toggle} onMouseEnter={()=>setToggle(true)} onMouseLeave={()=>setToggle(false)}>
            <Dropdown.Toggle
              as="div"
              className={pathname.startsWith("/about") ? "nav-link active" : "nav-link"}
            >
              About
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>
                <Link
                  href="/about"
                  className={
                    pathname === "/about" ? "nav-link active" : "nav-link"
                  }
                >
                  About Eco
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link
                  href="/about/impact"
                  className={
                    pathname === "/about/impact"
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  Impact
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
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
              </Dropdown.Item>
              <Dropdown.Item>
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
              </Dropdown.Item>
              <Dropdown.Item>
                <Link
                  href="/about/FAQ"
                  className={
                    pathname === "/about/FAQ" ? "nav-link active" : "nav-link"
                  }
                >
                  FAQ
                </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </li>

        <li className="nav-item ms-3">
          <Dropdown className="drop_down" show={show} onMouseEnter={()=>setShow(true)} onMouseLeave={()=>setShow(false)}>
            <Dropdown.Toggle as="div" className={
                    pathname.startsWith("/getInvolved") ? "nav-link active" : "nav-link"
                  }>Get Involved</Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>
                <Link
                  href="/getInvolved"
                  className={
                    pathname === "/getInvolved" ? "nav-link active" : "nav-link"
                  }
                >
                  Become an ECO Attorney
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
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
              </Dropdown.Item>
              <Dropdown.Item>
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
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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
      </ul>
    </div>
  );
}
