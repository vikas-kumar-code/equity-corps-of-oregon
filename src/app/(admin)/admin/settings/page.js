import ChangePasswordForm from "./components/change-password-form";
import UpdateProfileForm from "./components/update-profile-form";
import { Alert } from "react-bootstrap";

export const metadata = {
  title: `Settings - Admin Panel`,
};
export default function Settings({ searchParams }) {
  return (
    <div className="content-wrapper">
      <div className="row">
        {Number(searchParams?.is_first_login) === 1 && (
          <div className="col-12">
            <div
              role="alert"
              class="alert alert-danger show d-flex align-items-center"
            >
              <i
                class="mdi mdi-alert-circle"
                style={{ fontSize: 28, marginTop: 0 }}
              ></i>{" "}
              <span className="ms-1">
                {" "}
                You've successfully logged in using an automatically generated
                password. We kindly request that you update your password for
                security purposes.
              </span>
            </div>
          </div>
        )}
        <div className="col-md-6 grid-margin stretch-card">
          <ChangePasswordForm />
        </div>
        <div className="col-md-6 grid-margin stretch-card">
          <UpdateProfileForm />
        </div>
      </div>
    </div>
  );
}
