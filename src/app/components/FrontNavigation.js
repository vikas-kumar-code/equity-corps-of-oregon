"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation'

export default function FrontNavigation() {
    const pathname = usePathname();
    return (
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                <li className="nav-item"><Link href="/" className={pathname === "/" ? 'nav-link active' : 'nav-link'}>Home</Link></li>
                <li className="nav-item"><Link href="/" className={pathname === "/" ? 'nav-link active' : 'nav-link'}>Get Legal Help</Link></li>
                <li className="nav-item"><Link href="/about" className={pathname.startsWith('/about') ? 'nav-link active' : 'nav-link'}>About</Link></li>
                <li className="nav-item"><Link href="/about" className={pathname.startsWith('/about') ? 'nav-link active' : 'nav-link'}>Get Involved</Link></li>
                <li className="nav-item"><Link href="/about" className={pathname.startsWith('/about') ? 'nav-link active' : 'nav-link'}>Donate</Link></li>
                <li className="nav-item"><Link href="/about" className={pathname.startsWith('/about') ? 'nav-link active' : 'nav-link'}>Downloads</Link></li>
                <li className="nav-item mt-2 mt-lg-0"><Link href="/login" className={pathname.startsWith('/login') ? 'nav-link active' : 'nav-link'}>Log In</Link></li>
            </ul>
        </div>
    )
}
