import Image from "next/image";
import Link from "next/link";
import React from "react";

const FAQ = () => {
  return (
    <div>
      <section className="bg-dark text-center py-3">
        <div className="container">
          <div className="col-12 col-md-7 mx-auto">
            <h1 className="text-white fs-lg-5 fs-md-4 fs-3 my-4 fw-bolder">
              Frequently Asked Questions
            </h1>
          </div>
        </div>
      </section>

      <div className="d-flex jutify-content-center align-items-center mx-5 px-5 mt-5 pt-5 w-100">
        <Image
          src="/images/hero/worker-relief.png"
          alt="Vercel Logo"
          className="img-fluid"
          width={500}
          height={354}
          priority
        />
        <div className=" w-50 mx-5 text-justify">
          <p className="fs-2">
            By reducing civic exclusions, family separation, deportation, and
            detention based on race and ethnicity, Universal Representation
            promotes due process and equitable access to justice for Oregon’s
            immigrant communities of color and advances the collective
            prosperity of all Oregonians.
          </p>
          <div className="mt-4 me-4">
            <Link
              href="https://equitycorps.org/impact/"
              className="fs-2  bg-dark text-warning p-3 rounded-4 text_link"
              target="_blank"
            >
              Learn more about ECO’s Impact
            </Link>
          </div>
        </div>
      </div>

      <section className="pb-0">
        <div className="container">
          <div className="px-xl-8 px-md-5 px-3 pb-5">
            <p className="fs-3 text-dark">What is ECO?</p>
            <p className="fs-1">
              Equity Corps of Oregon, or ECO, is a universal representation
              program based on the core belief that every eligible Oregonian
              should be able to defend against an unjust or unfair deportation
              or defeat a civic exclusion on account of immigration status.
            </p>
            <p className="fs-1">
              ECO is part of{" "}
              <Link
                className="text-warning text_link"
                href="https://workerrelief.org/"
                target="_blank"
              >
                Oregon Worker Relief
              </Link>{" "}
              , a statewide network of community-based organizations dedicated
              to providing assistance to immigrant Oregonians excluded from
              federal and state safety net programs.
            </p>
            <p className="fs-3 text-dark mt-5">
              How and why did Equity Corps of Oregon start?
            </p>
            <p className="fs-1">
              The Equity Corps officially launched in the fall of 2018, with
              support from the City of Portland and Multnomah County. The
              program is the culmination of a multi-year effort by serveral
              community based organizations, advocates and providers to create
              an innovative universal representation model to defend immigrant
              Oregonians from unjust and unlawful deportations.
            </p>
            <p className="fs-1">
              Legal representation is often the difference between an immigrant
              exercising their rights and accepting an unfair outcome; between
              an asylum seeker receiving refuge or being forced to return to a
              life-threatening situation; and between a family with mixed
              residency status staying together and being split apart.{" "}
              <Link
                className="text-warning text_link"
                href="https://scholarship.law.upenn.edu/penn_law_review/vol164/iss1/2/"
                target="_blank"
              >
                Immigrants who are represented in removal proceedings are
                fifteen times more likely to apply for relief and
                five-and-a-half times more likely to win their cases and prevail
                against unjust deportations when compared to their
                non-represented counterparts.
              </Link>
            </p>
            <p className="fs-1">
              <Link
                className="text-warning text_link"
                href="https://universalrep.org/"
                target="_blank"
              >
                Universal Representation
              </Link>{" "}
              (SB1543) successfully passed the Oregon legislature in 2022 to
              create a permanent statewide Universal Navigation and
              Representation program which embeds access to justice in
              community. Now part of Oregon Worker Relief, ECO is a
              collaborative of community-based organizations, nonprofits, and
              attorneys working to provide{" "}
              <Link
                className="text-warning text_link"
                href="https://universalrep.org/"
                target="_blank"
              >
                Universal Legal Representation
              </Link>{" "}
              to all immigrants in Oregon.
            </p>
            <p className="fs-3 text-dark mt-5">
              How does Universal Representation through Equity Corps of Oregon
              work?
            </p>
            <div className="d-flex">
              <Image
                src="/images/hero/worker-fund.png"
                alt="Vercel Logo"
                className="img-fluid"
                width={500}
                height={400}
                priority
              />
              <ul className="fs-1">
                <li>
                  a statewide call center for all potentially eligible
                  individuals seeking services;{" "}
                </li>
                <li>
                  a statewide network of navigators, embedded in community based
                  organizations, that assist those eligible to enroll in the
                  program
                </li>
                <li>
                  client services fund to solve financial barriers to
                  participation in immigration proceedings;{" "}
                </li>
                <li>
                  central clearinghouse to coordinate legal services in
                  partnership with the Oregon State Bar and to provide support
                  to community-based immigration lawyers and other ECO legal
                  service providers;
                </li>
                <li>
                  expanded funding for nonprofit immigration legal service
                  providers;
                </li>
                <li>
                  an advisory committee to provide expert guidance and
                  recommendations relating to the coordination of services,
                  standards and guidelines, the development of best practices
                  and other matters necessary to the well functioning of the
                  system.{" "}
                </li>
              </ul>
            </div>
            <p className="fs-3 text-dark mt-5">How is ECO funded?</p>
            <p className="fs-1">
              ECO is currently funded by the State of Oregon, which provided
              critical funding to build the necessary infrastructure for this
              large scale program and meet the needs of the community.
            </p>
            <p className="fs-1">
              Funding allocated through SB 1543 in 2022 has been critical in
              building an effective statewide Universal Representation system
            </p>
            <p className="fs-3 text-dark mt-5">
              Is this legal aid or part of the public criminal defense system?
              Why is a universal representation fund needed?
            </p>
            <p className="fs-1">
              No, this is neither Legal Aid nor part of the public criminal
              defense system. A Universal Representation fund is needed because
              deportation and immigration matters are civil law, not criminal
              law.
            </p>
            <p className="fs-1">
              In immigration court, unlike in criminal court proceedings,
              immigrants facing deportation are not provided an attorney if they
              cannot afford one. All around the country, some of the most
              vulnerable members of our society, including children, are forced
              to defend themselves against deportation without a lawyer. While
              the government is always represented by trained prosecutors
              arguing for deportation, many immigrants are provided nothing more
              than telephone interpretation. Having meaningful access to legal
              representation is, by far, the single most outcome-determinative
              factor in whether or not an Oregonian will prevail in their
              immigration case, protect their family, and avoid deportation from
              the United States. Without legal representation, Oregonians who
              have a lawful right to remain in the United States are routinely
              deported.
            </p>
            <p className="fs-3 text-dark mt-5">
              What are the eligibility requirements for someone to receive ECO
              services?
            </p>
            <p className="fs-1">
              Universal Representation services are available only to
              limited-income individuals, so all individuals are screened for
              income eligibility. For current eligibility guidelines please see
              our{" "}
              <Link
                className="text-warning text_link"
                href="https://equitycorps.org/obtain-help/"
                target="_blank"
              >
                Get Legal Help page
              </Link>
              .
            </p>
            <p className="fs-3 text-dark mt-5">
              How does Universal Representation benefit Oregon?
            </p>
            <p className="fs-1">
              When community members are deported without the opportunity to
              have their case fairly decided under the law, our communities, our
              schools, and our workforce are destabilized and community safety
              is undermined. By reducing civic exclusions, family separation,
              deportation, and detention based on race and ethnicity, Universal
              Representation promotes due process and equitable access to
              justice for Oregon’s immigrant communities of color and advances
              the collective prosperity of all Oregonians.
            </p>
            <p className="fs-1">
              By ensuring that Oregonians with a lawful right to remain in the
              country are not unjustly deported, we are potentially adding an
              additional{" "}
              <Link
                className="text-warning text_link"
                href="https://itep.org/undocumented-immigrants-state-local-tax-contributions-2017/"
                target="_blank"
              >
                $40 million
              </Link>{" "}
              each year to our tax base.
            </p>
            <p className="fs-1">
              The program protects the $1.4 billion undocumented immigrants
              spend each year in Oregon, and the investments we make in
              education and employers make in training in their workforce.
            </p>
            <p className="fs-1">
              Undocumented immigrants pay millions in taxes each year, and if
              they no longer live in Oregon, those tax dollars will no longer be
              paid to the state
            </p>
            <p className="fs-1">
              Employers are often forced to replace workers who are unjustly
              deported. This program provides stability to Oregon’s workforce
            </p>
            <p className="fs-1">
              Students enrolled in our schools are often forced to drop out
              after the detention or deportation of a family member. This
              program, which helps prevent unjust deportations, saves money by
              improving graduation rates.
            </p>
          </div>
        </div>
      </section>
      <div className="px-xl-8 px-md-5 px-3 text-center">
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

export default FAQ;
