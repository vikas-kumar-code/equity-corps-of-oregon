"use client";
import common from "@/utils/common";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import LoadingOverlay from "react-loading-overlay";
import { toast } from "react-toastify";
LoadingOverlay.propTypes = undefined;

export default function Navigation() {
  const pathname = usePathname();
  const [modules, setModules] = useState([1, 2, 3, 4, 5, 6, 7]);

  const getModules = async () => {
    fetch(common.apiPath(`/admin/modules`))
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setModules(data.records);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    getModules();
  }, []);

  useEffect(() => {
    if (modules.length > 0) {
      let navigationMenu = document.querySelectorAll(".admin-panel-nav-item");
      let currentMenu = "";
      navigationMenu.forEach((menu) => {
        menu.addEventListener("mouseover", (event) => {
          if (document.body.className.includes("sidebar-icon-only")) {
            if (currentMenu !== "") {
              if (currentMenu.className.includes("active")) {
                currentMenu.className = `nav-item menu-items active admin-panel-nav-item`;
              } else {
                currentMenu.className = `nav-item menu-items admin-panel-nav-item`;
              }
            }
            menu.className = `${menu.className} hover-open`;
            currentMenu = menu;
          }
        });
        menu.addEventListener("mouseout", (event) => {
          if (menu.className.includes("active")) {
            menu.className = `nav-item menu-items active admin-panel-nav-item`;
          } else {
            menu.className = `nav-item menu-items admin-panel-nav-item`;
          }
        });
      });
    }
  }, [modules]);

  return (
    <>
      <div id="sidebar-backdrop" className=""></div>
      <nav className={"sidebar sidebar-offcanvas"} id="offcanvasSidebar">
        <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
          <a className="sidebar-brand brand-logo" href="/admin/dashboard">
            EC<span style={{ color: "#ca8a2e" }}>O</span>
          </a>
          <a className="sidebar-brand brand-logo-mini" href="/admin/dashboard">
            EC<span style={{ color: "#ca8a2e" }}>O</span>
          </a>
        </div>

        <ul className="nav">
          {modules.map((module, index) => {
            return module?.label ? (
              <li
                key={`nav-${index}`}
                className={
                  pathname === module.url
                    ? "nav-item menu-items active admin-panel-nav-item"
                    : "nav-item menu-items admin-panel-nav-item"
                }
              >
                <Link href={common.basePath(module.url)} className="nav-link">
                  <span className="menu-icon">
                    <i className={module.icon}></i>
                  </span>
                  <span className="menu-title">{module.label}</span>
                </Link>
              </li>
            ) : (
              <li
                key={`nav-${index}`}
                className={"nav-item menu-items active my-1 skeleton-box"}
              >
                <Link href="#" className="nav-link" style={{ height: 43 }}>
                  <span className="menu-icon"></span>
                  <span className="menu-title"></span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
