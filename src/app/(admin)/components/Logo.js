import React from "react";

export default function Logo({ className = "" }) {
  return (
    <a className={"brand-logo " + className} href="/admin/dashboard">
      EC<span style={{ color: "#ca8a2e" }}>O</span>
    </a>
  );
}
