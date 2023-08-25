import { getSession } from "@/utils/serverHelpers";
import LoginForm from "./LoginForm";
import { redirect } from "next/navigation";
import common from "@/utils/common";

export default async function Login() {
  const session = await getSession();
  // if user alredy logged in
  if (session?.user) {
    redirect("./admin/dashboard");
  }
  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="row w-100 m-0">
          <div className="content-wrapper full-page-wrapper d-flex align-items-center auth login-bg">
            <div className="card col-lg-4 mx-auto">
              <div className="card-body px-5 py-5">
                <h3 className="card-title text-left mb-3">Login</h3>
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
