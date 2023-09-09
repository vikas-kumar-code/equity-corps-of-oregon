import Image from "next/image";
import Link from "next/link";
import React from "react";

const Impact = () => {
  return (
    <div>
      <section className="bg-dark text-center py-3">
        <div className="container">
          <div className="col-12 col-md-7 mx-auto">
            <h1 className="text-white fs-lg-5 fs-md-4 fs-3 my-4 fw-bolder">
              Impact
            </h1>
          </div>
        </div>
      </section>

      <section className="pb-0">
        <div className="container d-flex jutify-content-center align-items-center">
          <Image
            src="/images/hero/impact.png"
            alt="Vercel Logo"
            className="img-fluid"
            width={500}
            height={654}
            priority
          />
          <div>
            <div className="mx-5">
              <p className="fs-3 text-dark">
                A National Leader in Universal Representation
              </p>
              <p className="fs-1">
                The immigration system is racialized, unfair, and difficult to
                navigate by design. Universal legal representation helps keep
                families and communities whole by providing access to
                immigration legal services. For people facing deportation,
                whether or not they have legal representation often determines
                the success of their{" "}
                <Link
                  className="text-warning text_link"
                  href="https://scholarship.law.upenn.edu/penn_law_review/vol164/iss1/2/"
                  target="_blank"
                >
                  case
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
        <div className="w-100 d-flex justify-content-center mt-4">
          <div className="w-75">
            <p className="fs-1">
              Without representation, a person in removal proceedings is 5.5
              times more likely to lose their case and be ordered removed from
              the United States, regardless of the merits of their case. Many
              people in removal proceedings have valid legal claims to remain
              here and continue to contribute to their community, but they have
              no way to articulate these claims without legal assistance.
            </p>

            <p className="fs-1">
              When immigrant Oregonians are deported, our entire state suffers.
              If a family’s breadwinner is deported, family members face housing
              and food insecurity. Children must cope with the incredible trauma
              of family separation, with long-lasting psychological impacts.
              Children’s school attendance and performance are also negatively
              affected, increasing their likelihood of dropping out and earning
              significantly less as adults.
            </p>
          </div>
        </div>
      </section>
      <div className="my-5 text-center pb-5">
        <Link
          href="https://universalrep.org/"
          className="fs-3  bg-dark text-warning p-3 rounded-4 text_link"
          target="_blank"
        >
          Learn more about the importance of Universal Representation in Oregon
        </Link>
      </div>

      <div className="px-xl-8 px-md-5 px-3 pb-8 text-center">
        <Image
          src="/images/hero/universal.png"
          alt="Vercel Logo"
          className="img-fluid"
          width={1100}
          height={754}
          priority
        />
      </div>

      <div className="w-100 d-flex justify-content-center">
        <div className="w-75">
          <h2>By the Numbers</h2>
          <p className="fs-1">
            Universal Representation continues the work of a pilot program,
            funded by Multnomah County, the City of Portland, and the State of
            Oregon, which has provided attorney access to immigrant Oregonians
            facing deportation since October 2018. As of early 2023, under the
            program
          </p>
          <ul className="fs-1">
            <li>
              2,700+ individual Oregonians have enrolled in the program and have
              received services
            </li>
            <li>
              600+ of total enrollees were added since March, 2022, when SB1543
              was enacted
            </li>
            <li>
              750+ Oregonians who faced violence or persecution were empowered
              to request asylum
            </li>
            <li>350+ Oregonians have applied for work authorization</li>
          </ul>
          <h2 className="mt-5">Passing Universal Representation in Oregon</h2>
          <p className="fs-1">
            In 2022, after years of grassroots advocacy by the immigrant
            community and immigrant justice organizations, the Oregon
            Legislature passed a law to bring us closer to achieving universal
            legal representation.
          </p>
          <p className="fs-1">
            With the passage of SB 1543, the state legislature approved the
            establishment of Universal Representation for immigrant Oregonians.
            By reducing civic exclusions, family separation, deportation, and
            detention based on race and ethnicity, Universal Representation
            promotes due process and equitable access to justice for Oregon’s
            immigrant communities of color and advances the collective
            prosperity of all Oregonians.
          </p>
          <p className="fs-1">
            Funding allocated through SB 1543 in 2022 has been critical in
            building an effective statewide Universal Representation system:
          </p>
          <ul className="fs-1">
            <li>
              When new immigrant Oregonians have arrived to our state, Universal
              Representation has been able to help them navigate the complex
              immigration system, providing services that are critical to folks
              fleeing violence, persecution and extreme poverty.
            </li>
            <li>
              Universal Representation has successfully launched detained legal
              services and provided representation to 11 Oregonians in the last
              quarter.
            </li>
            <li>
              A centralized statewide call center has been created to provide
              immigrant Oregonians with updates on their active cases.
            </li>
          </ul>
        </div>
      </div>
      <div className="px-xl-8 px-md-5 px-3 pb-5 mt-5 text-center">
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

export default Impact;
