import ForgotPasswordForm from "./ForgotPasswordForm";

export default function Login() {
  return (
    <div className="container-scroller auth-bg">
      <div className="page-body-wrapper">
        <div className="d-flex justify-content-center align-items-center w-100">
          <div
            className="auth-yellow-bg w-100 shadow"
            style={{ maxWidth: 440, borderRadius: 15 }}
          >
            <div className="card-body p-5">              
              <ForgotPasswordForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
