import Link from "next/link";
import React from "react";

const GetInvolved = () => {
  return (
    <div>
      <section className="bg-dark text-center py-3">
        <div className="container">
          <div className="col-12 col-md-7 mx-auto">
            <h1 className="text-white fs-lg-5 fs-md-4 fs-3 my-4 fw-bolder">
              Become an ECO Attorney
            </h1>
          </div>
        </div>
      </section>
      <section className="pb-0">
        <div className="container">
          <div className="px-xl-8 px-md-5 px-3">
            <p className="fs-3 text-dark">
              Interested in representing immigrants through Equity Corps of
              Oregon?
            </p>
            <p className="fs-1">
              Equity Corps of Oregon’s objective is to provide universal
              representation, which protects our communities by ensuring that no
              person faces the risk of deportation or exclusion without legal
              consultation and representation. Equity Corps ultimately aims to
              end unjust and unfair deportations and civic exclusions by
              providing access to an attorney and support services for every
              eligible Oregonian at risk of removal or civic exclusion on
              account of their immigration status.
            </p>
            <p className="fs-3 text-dark">ECO Attorneys</p>
            <p className="fs-1">
              Equity Corps of Oregon provides legal representation through a
              collaborative of attorneys throughout the state, including
              attorney fellows, attorneys working at partner organizations,
              select private attorneys, and more.
            </p>
            <p className="fs-3 text-dark">ECO Panel Attorney Program</p>
            <p className="fs-1">
              Equity Corps established a Panel Attorney Program to represent
              people eligible for services. Registered ECO Panel Attorneys
              provide legal representation to individuals enrolled with ECO in
              order to achieve this goal. Learn more at
              <Link
                className="text-warning text_link"
                href="https://equitycorps.org/panel-attorney/"
              >
                https://equitycorps.org/panel-attorney/
              </Link>
            </p>
            <div className="mt-5 me-4 text-center">
          <Link
            href="https://equitycorps.org/impact/"
            className="fs-2  bg-dark text-warning p-3 rounded-4 text_link"
          >
           Learn more about ECO’s Impact
          </Link>
          </div>
          </div>
        </div>
      </section>

      <section className="pb-0">
        <div className="container">
          <div className="px-xl-8 px-md-5 px-3">
            <p className="fs-3 text-dark">
            Technical Guidance
            </p>
            <p className="fs-1">
            OWR’s Equity Corps of Oregon program has established a <Link className="text-warning text_link" href='https://equitycorps.org/wp-content/uploads/2023/01/ECO-Strategic-Support-Implementation.pdf'>Strategic & Technical Support Services program</Link> to support attorneys and accredited representatives in the ECO network in their representation of ECO participants.
            </p>
            <p className="fs-1">
            Immigration law is complex. Immigration advocates, particularly new attorneys or accredited reps or those who do not regularly practice immigration law in the field, often encounter difficult questions of law and fact. The program aims to bring a sense of community to the ECO network, and in so doing, sharpen the ability and resilience of all ECO practitioners in their client-facing work.
            </p>
          </div>
        </div>
      </section>    
    </div>
  );
};

export default GetInvolved;
