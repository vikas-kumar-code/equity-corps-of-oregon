import "../styles/backend-theme.css";
import "../styles/globals.css";
import "../styles/whitetheme.css";
import "../styles/materialdesignicons.min.css";
import "../styles/animation.css";
import { Inter } from "next/font/google";
import Provider from "@/app/components/Provider";
import Navigation from "./components/navigation";
import SignOut from "../components/SignOut";
import NotificationContainer from "./components/NotificationContainer";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: `${process.env.APP_NAME} - Admin Panel`,
  description: `${process.env.APP_NAME} - Admin Panel`,
};

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body className="whitetheme">
        <Provider>
          <NotificationContainer />
          <main>
            <div className="container-scroller">
              <Navigation />
              <div className="container-fluid page-body-wrapper">
                <nav className="navbar p-0 fixed-top d-flex flex-row">
                  <div className="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center border-bottom bg-white">
                    <a
                      className="brand-logo fs-2"
                      href="/admin/dashboard"
                    >
                      EC<span style={{ color: "#ca8a2e" }}>O</span>
                    </a>
                  </div>
                  <div className="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
                    <button
                      className="navbar-toggler navbar-toggler align-self-center"
                      type="button"
                      data-toggle="minimize"
                      id="toggle-menu"
                    >
                      <span className="mdi mdi-menu"></span>
                    </button>
                    <SignOut />

                    <button
                      className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
                      type="button"
                      data-toggle="offcanvas"
                      id="sidebar-toggle-btn"
                    >
                      <span className="mdi mdi-format-line-spacing"></span>
                    </button>
                  </div>
                </nav>
                <div className="main-panel">
                  {children}
                  <footer className="footer">
                    <div className="d-sm-flex justify-content-center justify-content-sm-between">
                      <span className="text-muted d-block text-center text-sm-left d-sm-inline-block">
                        Copyright © {process.env.APP_NAME}{" "}
                        {new Date().getFullYear()}
                      </span>
                    </div>
                  </footer>
                </div>
              </div>
            </div>
          </main>
          <Script src="/script.js" />
        </Provider>
      </body>
    </html>
  );
}
