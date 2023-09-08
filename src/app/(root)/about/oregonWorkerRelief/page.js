import Image from "next/image";
import Link from "next/link";
import React from "react";

const OregonWorkerRelief = () => {
  return (
    <div>
      <section className="bg-dark text-center py-3">
        <div className="container">
          <div className="col-12 col-md-7 mx-auto">
            <h1 className="text-white fs-lg-5 fs-md-4 fs-3 my-4 fw-bolder">
              Oregon Worker Relief
            </h1>
          </div>
        </div>
      </section>

      <section className="pb-0">
        <div className="container">
          <div className="px-xl-8 px-md-5 px-3 pb-5">
            <p className="fs-3">ECO is part of Oregon Worker Relief</p>
            <p className="fs-1">
              Equity Corps of Oregon is proud to be part of{" "}
              <Link
                href="https://workerrelief.org/"
                className="text-warning text_link"
                target="_blank"
              >
                Oregon Worker Relief
              </Link>{" "}
              . The Oregon Worker Relief Coalition is a statewide network of
              community-based organizations dedicated to providing assistance to
              immigrant Oregonians excluded from federal and state safety-net
              programs.
            </p>
            <p className="fs-1">
              Oregon Worker Relief is a registered Oregon nonprofit. Multiple
              organizations are members and participate in the organization’s
              operations.
            </p>
            <p className="fs-1">
              ECO was initially created to serve immigrant Oregonians who were
              at risk of deportation or in removal proceedings and could not
              afford legal services to help them fight their removal. In 2022,
              Oregon Worker Relief, in collaboration with many community based
              organizations, nonprofits and legal service providers fought for
              an expansion of ECO to create a more equitable and inclusive
              program.
            </p>
            <p className="fs-1">
              <Link
                href="https://universalrep.org/"
                className="text-warning text_link"
                target="_blank"
              >
                Universal Representation
              </Link>{" "}
              (SB1543) successfully passed the Oregon legislature in 2022 to
              create a permanent statewide Universal Navigation and
              Representation program which embeds access to justice in
              community. As part of Oregon Worker Relief, ECO is now a
              collaborative of community-based organizations, nonprofits, and
              attorneys working to provide Universal Legal Representation to all
              immigrants in Oregon.
            </p>
          </div>

          <div className="text-center">
            <Link
              href="https://workerrelief.org/"
              className="fs-3 bg-dark text-warning p-3 rounded-4 text_link"
              target="_blank"
            >
              Oregon Worker Relief Website
            </Link>
          </div>
          <div className="px-xl-8 px-md-5 px-3 pb-3 my-5">
            <p className="fs-3">Oregon Worker Relief Program</p>
            <p className="fs-1">
            Oregon Worker Relief provides direct support to immigrant Oregonians who are facing:
            </p>
            <ul>
            <li className="fs-1">Lost work and wages due to COVID-19</li>
              <li className="fs-1">Extreme heat, smoke and other climate disasters</li>
              <li className="fs-1">Complex immigration system</li>
              <li className="fs-1">Eviction and the housing crisis</li>
            </ul>
          </div>
          <div className="px-xl-8 px-md-5 px-3 pb-5">
            <p className="fs-3">Defending Everyone</p>
            <p className="fs-1">
            Funding allocated through SB 1543 in 2022 has been critical in building an effective statewide Universal Representation system:
            </p>
            <ul>
              <li className="fs-1">When new immigrant Oregonians have arrived to our state, Universal Representation has been able to help them navigate the complex immigration system, providing services that are critical to folks fleeing violence, persecution and extreme poverty.</li>
              <li className="fs-1">Universal Representation has successfully launched detained legal services and prevented the deportation of 11 hard-working Oregonians in the last quarter. </li>
              <li className="fs-1">A centralized statewide call center has been created to provide immigrant Oregonians with updates on their active cases.</li>
            </ul>
              <p className="fs-1">With the creation of infrastructure for an effective statewide Universal Representation system, consistent funding is critical to guarantee the program’s ability to provide quality legal services to immigrant Oregonians.</p>
          </div>
        </div>
      </section>
      <div className="px-xl-8 px-md-5 px-3 pb-5 text-center">
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

export default OregonWorkerRelief;
