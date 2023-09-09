import Image from "next/image";
import Link from "next/link";
import React from "react";

const AttorneysInfo = () => {
  return (
    <div>
      <section className="bg-dark text-center py-3">
        <div className="container">
          <div className="col-12 col-md-7 mx-auto">
            <h1 className="text-white fs-lg-5 fs-md-4 fs-3 my-4 fw-bolder">
              Information for Attorneys
            </h1>
          </div>
        </div>
      </section>
      <div className="mt-5 text-center">
        <Link
          href="https://universalrep.org/"
          className="fs-3  bg-dark text-warning p-3 rounded-4 text_link"
          target="_blank"
        >
          Become an ECO Attorney
        </Link>
      </div>
      <section className="pb-0">
        <div className="container">
          <div className="px-xl-8 px-md-5 px-3 pb-5">
            <p className="fs-3 text-dark">
              ECO Panel Attorney Program Guidance
            </p>
            <p className="fs-1">
              The
              <Link
                href="https://workerrelief.org/"
                className="mx-2 text-warning text_link"
                target="_blank"
              >
                ECO Panel Attorney Program Guidance
              </Link>{" "}
              . describes in detail the program’s eligibility requirements, the
              scope of the work, the panel structure, reporting requirements,
              compensation rules and other relevant information.
            </p>
            <p className="fs-3 text-dark">What is ECO?</p>
            <p className="fs-1">
              Equity Corps of Oregon is a universal representation program based
              on the core belief that every eligible Oregonian should be able to
              defend against an unjust or unfair deportation or defeat a civic
              exclusion on account of immigration status. Panel attorneys will
              be engaged to provide immigration services for those experiencing
              a civic exclusion or threat of deportation on account of
              immigration status.
            </p>
            <p className="fs-3 text-dark">Who is eligible for ECO?</p>
            <p className="fs-1">
              An Oregon resident who otherwise would be unrepresented and whose
              household income is less than 200% of the federal poverty
              guidelines and is either at risk of removal or suffering a civic
              exclusion on account of their immigration status.
            </p>
            <p className="fs-3 text-dark">What services does ECO provide?</p>
            <p className="fs-1">
              ECO provides access to legal services, limited assistance with
              filing fees and ancillary costs, interpretation, and limited
              support through community-based navigation.
            </p>
            <p className="fs-3 text-dark">
              How do I become an ECO Panel Attorney?
            </p>
            <p className="fs-1">
              You can use the online application and registration form at
              equitycorps.org/panel_attorney. Alternatively, you can email
              clearinghouse@equitycorps.org with your resume and a short
              statement explaining your eligibility to be a panel attorney.
            </p>
            <p className="fs-3 text-dark">
              What kind of cases can I expect will be referred to me?
            </p>
            <p className="fs-1">
              For the Court program, cases will be referred for individuals that
              are before the Immigration Court. For the Affirmative program,
              matters are referred for affirmative benefits applications,
              discrete components of a matter or other types of work outside of
              immigration court.
            </p>
            <p className="fs-3 text-dark">
              What are the reasons I can use to decline a referral?
            </p>
            <p className="fs-1">
              Generally, you should only decline a Court referral if you lack
              the capacity or there is a conflict of interest. ECO is a
              universal representation program which means all individuals are
              entitled to Court representation.
            </p>
            <p className="fs-3 text-dark">
              Can I decline a case if I don’t think the judge will grant it?
            </p>
            <p className="fs-1">
              No. ECO is a universal representation program which means all
              individuals are entitled to representation. A panel attorney
              should decline a Court referral only if there is a conflict or a
              lack of capacity.
            </p>
            <p className="fs-3 text-dark">
              What should I do if I identify additional or different relief
              available to my client outside the scope of the affirmative
              referral?
            </p>
            <p className="fs-1">
              Panel attorneys are the attorney in the matter and the affirmative
              scope does not limit any duties the attorney may owe to their
              client. The engagement letter between ECO and the panel attorney
              relates only to compensation. If the client is indigent and
              remains otherwise eligible for ECO, the attorney may seek an
              additional engagement letter, an extension of the existing
              engagement letter, or a modification of the existing engagement
              letter by emailing clearinghouse@equitycorps.org with an
              explanation describing the request.
            </p>
            <p className="fs-3 text-dark">Who is the lawyer in the matter?</p>
            <p className="fs-1">
              The panel attorney is the lawyer for the matter. ECO is a
              universal representation program. Innovation Law Lab acts as a
              Clearinghouse for the ECO program and, in this function, it does
              not provide, and has not, provided legal services in the matters
              referred. The referral information is based on our review of the
              records the individual has shared with us. Suggested guidance
              should not be taken as definitive and all information should be
              verified independently by the provider.
            </p>
          </div>
        </div>
      </section>
      <div className="text-center">
        <span className="fs-3 text-dark mx-2">
          For more detailed information see the FAQ on
        </span>
        <Link
          href="https://equitycorps.org/wp-content/uploads/2023/01/ECO-Panel-Attorney-Program-vJan2023.pdf"
          className="text-warning text_link fs-3"
          target="_blank"
        >
          page 8 of this document.
        </Link>
      </div>
      <div className="px-xl-8 px-md-5 px-3 pb-3 text-center mt-4">
        <Image
          src="/images/hero/help-line.png"
          alt="Vercel Logo"
          className="img-fluid"
          width={1100}
          height={754}
          priority
        />
      </div>
    </div>
  );
};

export default AttorneysInfo;
