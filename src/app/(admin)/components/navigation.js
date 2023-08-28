"use client";
import common from "@/utils/common";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import LoadingOverlay from "react-loading-overlay";
import { toast } from "react-toastify";
LoadingOverlay.propTypes = undefined;

export default function Navigation() {
  const pathname = usePathname();
  const [modules, setModules] = useState([]);
  const [loader, setLoader] = useState(false);

  const getModules = async () => {
    setLoader(true);
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
      })
      .finally(() => setLoader(false));
  };

  useEffect(() => {
    getModules();
  }, []);

  useEffect(() => {
    if (modules.length > 0) {
      let navigationMenu = document.querySelectorAll(".admin-panel-nav-item");
      let currentMenu = '';
      navigationMenu.forEach(menu => {
        menu.addEventListener('mouseover', (event) => {
          if (document.body.className.includes('sidebar-icon-only')) {
            if (currentMenu !== '') {
              currentMenu.className = `nav-item menu-items admin-panel-nav-item`;
            }
            menu.className = `${menu.className} hover-open`;
            currentMenu = menu;
          }
        });
        menu.addEventListener('mouseout', (event) => {
          menu.className = `nav-item menu-items admin-panel-nav-item`;
        });
      })
    }
  }, [modules]);

  return (
    <LoadingOverlay active={loader} spinner>
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
          <a className="sidebar-brand brand-logo" href="/admin/dashboard">
            <Image
              src="/images/logo.png"
              alt="ECO"
              width={140}
              height={55}
              priority
            />
          </a>
          <a className="sidebar-brand brand-logo-mini" href="/admin/dashboard">
            <Image
              src="/images/logo.png"
              alt="ECO"
              width={120}
              height={46}
              priority
            />
          </a>
        </div>

        <ul className="nav">
          {modules.map((module, index) => {
            return (
              <li
                key={`nav-${index}`}
                className={
                  pathname === '/' + module.url
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
            );
          })}
        </ul>
      </nav>
    </LoadingOverlay>
  );
}
