"use client"
import Link from 'next/link';
import React, { useState } from 'react'
import { Spinner } from 'react-bootstrap'

export default function ForgotPasswordForm() {
    const [fields, setFields] = useState({});
    const [error, setError] = useState(null);
    const [loader, setLoader] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);

    }
    return (
        <form onSubmit={handleSubmit}>
            {error !== null && <p className="text-danger text-center">{error}</p>}
            <div className="form-group">
                <label>Email *</label>
                <input type="text" className="form-control p_input" onChange={(event) => setFields({ ...fields, email: event.target.value })} />
            </div>
            <div className="form-group d-flex align-items-center justify-content-between">
                <Link href="/login" className="forgot-pass">Login</Link>
            </div>
            <div className="text-center d-grid">
                <button type="submit" className="btn btn-primary btn-block enter-btn" disabled={loader}>
                    {loader && <Spinner
                        size="sm"
                        variant="light"
                        className="me-1"
                    />}
                    Submit
                </button>
            </div>
        </form>
    )
}


