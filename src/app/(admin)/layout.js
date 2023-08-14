import '../styles/backend-theme.css'
//import 'bootstrap/dist/css/bootstrap.min.css';

import '../styles/globals.css'
import { Inter } from 'next/font/google'
import Provider from '../components/Provider'
import Navigation from "./components/navigation"
import SignOut from '../components/SignOut'
import Image from 'next/image'
import NotificationContainer from './components/NotificationContainer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: `${process.env.APP_NAME} - Admin Panel`,
    description: `${process.env.APP_NAME} - Admin Panel`,
}

export default function AdminLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Provider>
                    <NotificationContainer />
                    <main>
                        <div className="container-scroller">
                            <Navigation />
                            <div className="container-fluid page-body-wrapper">
                                <nav className="navbar p-0 fixed-top d-flex flex-row">
                                    <div className="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
                                        <a className="navbar-brand brand-logo-mini" href="index.html">

                                            <Image
                                                src="/images/logo.png"
                                                width={35}
                                                height={35}
                                            />
                                        </a>
                                    </div>
                                    <div className="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
                                        <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
                                            <span className="mdi mdi-menu"></span>
                                        </button>
                                        <SignOut />

                                        <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                                            <span className="mdi mdi-format-line-spacing"></span>
                                        </button>
                                    </div>
                                </nav>
                                <div className="main-panel">
                                    {children}
                                    <footer className="footer">
                                        <div className="d-sm-flex justify-content-center justify-content-sm-between">
                                            <span className="text-muted d-block text-center text-sm-left d-sm-inline-block">Copyright © `${process.env.APP_NAME}` of Oregon {new Date().getFullYear()}</span>
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

