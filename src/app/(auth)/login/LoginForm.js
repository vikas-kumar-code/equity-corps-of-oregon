"use client"
import { signIn } from 'next-auth/react';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { Spinner } from 'react-bootstrap'

export default function LoginForm() {
    const [fields, setFields] = useState({});
    const [error, setError] = useState(null);
    const [loader, setLoader] = useState(false);
    const route = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);
        const result = await signIn("credentials", {
            username: fields.username,
            password: fields.password,
            redirect: false,
            callbackUrl: '/admin/dashboard'
        });
        if (result.error) {
            setError('Username or password is invalid!');
        }
        else if (result.ok) {
            route.push('/admin/dashboard');
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            {error !== null && <p className="text-danger text-center">{error}</p>}
            <div className="form-group">
                <label>Username or email *</label>
                <input type="text" className="form-control p_input" onChange={(event) => setFields({ ...fields, username: event.target.value })} />
            </div>
            <div className="form-group">
                <label>Password *</label>
                <input type="password" className="form-control p_input" onChange={(event) => setFields({ ...fields, password: event.target.value })} />
            </div>
            <div className="form-group d-flex align-items-center justify-content-between">
                <div className="form-check">
                    <label className="form-check-label">
                        <input type="checkbox" className="form-check-input" /> Remember me </label>
                </div>
                <a href="#" className="forgot-pass">Forgot password</a>
            </div>
            <div className="text-center d-grid">
                <button type="submit" className="btn btn-primary btn-block enter-btn" disabled={loader}>
                    {loader && <Spinner
                        size="sm"
                        variant="light"
                        className="me-1"
                    />}
                    Login
                </button>
            </div>
        </form>
    )
}


