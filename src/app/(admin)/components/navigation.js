"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from 'next/navigation'

export default function Navigation() {
    const pathname = usePathname();
    return (
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
                <li className={pathname === "/admin/dashboard" ? 'nav-item menu-items active' : 'nav-item menu-items'}>
                    <Link href="/admin/dashboard" className="nav-link">
                        <span className="menu-icon">
                            <i className="mdi mdi-speedometer"></i>
                        </span>
                        <span className="menu-title">Dashboard</span>
                    </Link>
                </li>
                <li className={pathname === "/admin/cases" ? 'nav-item menu-items active' : 'nav-item menu-items'}>
                    <Link href="/admin/cases" className="nav-link">
                        <span className="menu-icon">
                            <i className="mdi mdi-speedometer"></i>
                        </span>
                        <span className="menu-title">Cases</span>
                    </Link>
                </li>
                <li className={pathname === "/admin/questions" ? 'nav-item menu-items active' : 'nav-item menu-items'}>
                    <Link href="/admin/questions" className="nav-link">
                        <span className="menu-icon">
                            <i className="mdi mdi-laptop"></i>
                        </span>
                        <span className="menu-title">Questions</span>
                    </Link>
                </li>
                <li className={pathname === "/admin/users" ? 'nav-item menu-items active' : 'nav-item menu-items'}>
                    <Link href="/admin/users" className="nav-link">
                        <span className="menu-icon">
                            <i className="mdi mdi-laptop"></i>
                        </span>
                        <span className="menu-title">Users</span>
                    </Link>
                </li>
                <li className={pathname === "/admin/attorney-applications" ? 'nav-item menu-items active' : 'nav-item menu-items'}>
                    <Link href="/admin/attorney-applications" className="nav-link">
                        <span className="menu-icon">
                            <i className="mdi mdi-laptop"></i>
                        </span>
                        <span className="menu-title">Attorney Applications</span>
                    </Link>
                </li>
                <li className={pathname === "/admin/email-templates" ? 'nav-item menu-items active' : 'nav-item menu-items'}>
                    <Link href="/admin/email-templates" className="nav-link">
                        <span className="menu-icon">
                            <i className="mdi mdi-laptop"></i>
                        </span>
                        <span className="menu-title">Email Templates</span>
                    </Link>
                </li>
                <li className={pathname === "/admin/roles" ? 'nav-item menu-items active' : 'nav-item menu-items'}>
                    <Link className="nav-link" href="/admin/roles">
                        <span className="menu-icon">
                            <i className="mdi mdi-playlist-play"></i>
                        </span>
                        <span className="menu-title">Roles</span>
                    </Link>
                </li>
                <li className={pathname === "/admin/settings" ? 'nav-item menu-items active' : 'nav-item menu-items'}>
                    <Link className="nav-link" href="/admin/settings">
                        <span className="menu-icon">
                            <i className="mdi mdi-table-large"></i>
                        </span>
                        <span className="menu-title">Settings</span>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
