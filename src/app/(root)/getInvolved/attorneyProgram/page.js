import Link from "next/link";
import React from "react";

const AttorneyProgram = () => {
  return (
    <div>
      <section className="bg-dark text-center py-3">
        <div className="container">
          <div className="col-12 col-md-7 mx-auto">
            <h1 className="text-white fs-lg-5 fs-md-4 fs-3 my-4 fw-bolder">
              ECO Panel Attorney Program
            </h1>
          </div>
        </div>
      </section>

      <section className="pb-0">
        <div className="container">
          <div className="px-xl-8 px-md-5 px-3">
            <p className="fs-3 text-dark">Overview</p>
            <p className="fs-1">
              Equity Corps of Oregon’s objective is to provide universal
              representation, which protects our communities by making sure that
              no individual faces the risk of deportation or exclusion without
              legal consultation and representation. Equity Corps ultimately
              aims to end unjust and unfair deportations and civic exclusions by
              providing access to an attorney and support services for every
              eligible Oregonian at risk of removal or civic exclusion on
              account of immigration status.
            </p>
            <p className="fs-1">
              Equity Corps has established an Attorney Panel Program to
              represent persons eligible for services. Panel attorneys, as known
              as ECO Providers, will be engaged to provide representation to
              individuals enrolled with ECO on their immigration cases in order
              to achieve this goal.
            </p>
            <p className="fs-3 text-dark mt-5">
              ECO Panel Attorney Program Application & Registration
            </p>
            <p className="fs-1">
              You can apply for the ECO Panel Attorney Program and register by
              filling out the{" "}
              <Link
                className="text-warning text_link"
                href="/questions"
              >
                ECO Panel Attorney Program Application & Registration Form
              </Link>
              .
            </p>
            <div className="mt-5 me-4 text-center">
              <Link
                href="/questions"
                className="fs-2 bg-dark text-warning p-3 rounded-4 text_link"
              >
                ECO Panel Attorney Program Application & Registration Form
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-0">
        <div className="container">
          <div className="px-xl-8 px-md-5 px-3">
            <p className="fs-3 text-dark">ECO Billing Authorization</p>
            <p className="fs-1">
              Equity Corps has established a Legal Services Fund that provides
              compensation to ECO-designated providers and reimbursements for
              certain expenses.{" "}
              <Link
                href="https://equitycorps.org/wp-content/uploads/2023/01/ECO-Legal-Services-Fund-.pdf"
                className="text-warning text_link"
                target="_blank"
              >
                The terms and conditions for use of the fund are outlined here
              </Link>
              .
            </p>
            <p className="fs-3 mt-4">ECO Panel Attorney Program Guidance</p>
            <p className="fs-1">
              The{" "}
              <Link
                className="text-warning text_link"
                href="https://equitycorps.org/wp-content/uploads/2023/01/ECO-Panel-Attorney-Program-vJan2023.pdf"
                target="_blank"
              >
                ECO Panel Attorney Program Guidance
              </Link>{" "}
              describes in detail the program’s eligibility requirements, the
              scope of the work, the panel structure, reporting requirements,
              compensation rules and other relevant information.
            </p>
            <div className="container my-5">
              <iframe
                src="https://equitycorps.org/wp-content/uploads/2023/01/ECO-Panel-Attorney-Program-vJan2023.pdf"
                width="100%"
                height="500px"
                style={{ border: "none" }}
                title="PDF in an iframe"
              ></iframe>
              <div className="mt-3">
              <Link
                className="text-warning text_link"
                href="https://equitycorps.org/wp-content/uploads/2023/01/ECO-Panel-Attorney-Program-vJan2023.pdf"
                target="_blank"
              >
                ECO Panel Attorney Program vJan2023
              </Link>
              <Link 
                href="https://equitycorps.org/wp-content/uploads/2023/01/ECO-Panel-Attorney-Program-vJan2023.pdf"
                className="fs-1 bg-dark text-warning p-2 mx-2 rounded-3 text_link"
                target="_blank"
              >
                Download
              </Link>
              </div>
            </div>
            <p className="fs-3 text-dark">Technical Guidance</p>
            <p className="fs-1">
              OWR’s Equity Corps of Oregon program has established a{" "}
              <Link
                className="text-warning text_link"
                href="https://equitycorps.org/wp-content/uploads/2023/01/ECO-Strategic-Support-Implementation.pdf"
                target="_blank"
              >
                Strategic & Technical Support Services program
              </Link>{" "}
              to support attorneys and accredited representatives in the ECO
              network in their representation of ECO participants.
            </p>
            <p className="fs-1">
              Immigration law is complex. Immigration advocates, particularly
              new attorneys or accredited reps or those who do not regularly
              practice immigration law in the field, often encounter difficult
              questions of law and fact. The program aims to bring a sense of
              community to the ECO network, and in so doing, sharpen the ability
              and resilience of all ECO practitioners in their client-facing
              work.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AttorneyProgram;
