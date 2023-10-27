"use client";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Spinner } from "react-bootstrap";
import Link from "next/link";

export default function LoginForm() {
  const [fields, setFields] = useState({});
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  const route = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const result = await signIn("credentials", {
      email: fields.email,
      password: fields.password,
      redirect: false,
      callbackUrl: "/login",
    });
    if (result.error) {
      if (result.error === "CredentialsSignin") {
        setError("Email or password is invalid!");
      } else {
        setError(result.error);
      }
      setLoader(false);
    } else if (result.ok) {
      route.push("/login");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      {error !== null && <p className="text-danger text-center">{error}</p>}
      <div className="form-group">
        <label className="auth-label">Email *</label>
        <input
        placeholder="Enter email"
          type="text"
          className="form-control p_input"
          onChange={(event) =>
            setFields({ ...fields, email: event.target.value })
          }
        />
      </div>
      <div className="form-group">
        <label className="auth-label">Password *</label>
        <input
        placeholder="Enter password"
          type="password"
          className="form-control p_input"
          onChange={(event) =>
            setFields({ ...fields, password: event.target.value })
          }
        />
      </div>
      <div className="form-group d-flex align-items-center justify-content-between">
        <Form.Check          
          type="checkbox"
          id="remember-me"
          label="Remember me"
          className="text-black"
          onChange={(e) => {
            setFields({ ...fields, remember: e.target?.checked ? 1 : 0 });
          }}
        />
        <Link href="/forgot-password" className="forgot-pass">
          Forgot password
        </Link>
      </div>
      <div className="text-center d-grid">
        <button
          type="submit"
          className="btn btn-primary btn-lg"
          disabled={loader}
        >
          {loader && <Spinner size="sm" variant="light" className="me-1" />}
          Login
        </button>
      </div>
    </form>
  );
}
