import ForgotPasswordForm from "./ForgotPasswordForm";

export default function Login() {
  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="row w-100 m-0">
          <div className="content-wrapper full-page-wrapper d-flex align-items-center auth login-bg">
            <div className="card col-lg-4 mx-auto">
              <div className="card-body px-5 py-5">                
                <ForgotPasswordForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
