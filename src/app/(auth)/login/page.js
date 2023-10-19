import { redirectToDashboard } from "@/utils/serverHelpers";
import LoginForm from "./LoginForm";

export default async function Login() {
  await redirectToDashboard();
  return (
    <div className="container-scroller auth-bg">
      <div className="page-body-wrapper">
        <div className="d-flex justify-content-center align-items-center w-100">
          <div className="auth-yellow-bg w-100 shadow" style={{ maxWidth:440, borderRadius:15 }}>
            <div className="card-body p-5">
              <h3 className="text-left mb-3 text-white fw-bold fs-3">ECO Provider Portal Login</h3>
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
