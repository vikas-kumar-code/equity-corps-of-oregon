import '../styles/backend-theme.css'
import { Inter } from 'next/font/google'
import Provider from "../components/provider"
import Navigation from "./components/navigation"
import SignOut from '../components/SignOut'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Equity Corps of Oregon - Admin Panel',
    description: 'Equity Corps of Oregon - Admin Panel',
}

export default function AdminLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Provider>
                    <main>
                        <div className="container-scroller">
                            <Navigation />
                            <div className="container-fluid page-body-wrapper">
                                <nav className="navbar p-0 fixed-top d-flex flex-row">
                                    <div className="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
                                        <a className="navbar-brand brand-logo-mini" href="index.html"><img src="assets/images/logo-mini.svg" alt="logo" /></a>
                                    </div>
                                    <div className="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
                                        <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
                                            <span className="mdi mdi-menu"></span>
                                        </button>

                                        <ul className="navbar-nav navbar-nav-right">
                                            <li className="nav-item dropdown d-none d-lg-block">
                                                <SignOut />
                                            </li>

                                            <li className="nav-item dropdown">
                                                <a className="nav-link" id="profileDropdown" href="#" data-bs-toggle="dropdown">
                                                    <div className="navbar-profile">
                                                        <img className="img-xs rounded-circle" src="assets/images/faces/face15.jpg" alt="" />
                                                        <p className="mb-0 d-none d-sm-block navbar-profile-name">Henry Klein</p>
                                                        <i className="mdi mdi-menu-down d-none d-sm-block"></i>
                                                    </div>
                                                </a>

                                            </li>
                                        </ul>
                                        <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                                            <span className="mdi mdi-format-line-spacing"></span>
                                        </button>
                                    </div>
                                </nav>
                                <div className="main-panel">
                                    {children}
                                    <footer className="footer">
                                        <div className="d-sm-flex justify-content-center justify-content-sm-between">
                                            <span className="text-muted d-block text-center text-sm-left d-sm-inline-block">Copyright © Equity Corps of Oregon {new Date().getFullYear()}</span>
                                            <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center"> Powered By <a href="https://www.bootstrapdash.com/bootstrap-admin-template/" target="_blank">Mitiz Technologies</a></span>
                                        </div>
                                    </footer>
                                </div>
                            </div>
                        </div>
                    </main>
                </Provider>
            </body>
        </html>
    )
}

