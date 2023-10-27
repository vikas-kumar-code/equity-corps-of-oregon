import Image from 'next/image'
import myImage from '../../../public/images/logos/eco_logo.png';
import Link from 'next/link'

export default async function Home() {
  return (
    <div>
      {/* {JSON.stringify(session)} */}
      <div className="bg-dark">
        <section>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 text-center text-lg-start">
                <h1 className="text-white fs-5 fs-xl-6">ECO Panel Attorney Program</h1>
                <p className="text-white py-lg-3 py-2">Equity Corps of Oregon’s objective is to provide universal representation, which protects our communities by making sure that no individual faces the risk of deportation or exclusion without legal consultation and representation. Equity Corps ultimately aims to end unjust and unfair deportations and civic exclusions by providing access to an attorney and support services for every eligible Oregonian at risk of removal or civic exclusion on account of immigration status.</p>

                <p className="text-white py-lg-3 py-2">Equity Corps has established an Attorney Panel Program to represent persons eligible for services. Panel attorneys, as known as ECO Providers, will be engaged to provide representation to individuals enrolled with ECO on their immigration cases in order to achieve this goal.</p>

              </div>
              <div className="col-lg-6 text-center text-lg-end mt-3 mt-lg-0">
                <Image
                  src={myImage || "/images/logos/eco_logo.png"}
                  alt="Vercel Logo"
                  className="img-fluid eco_logo"
                  width={494}
                  height={423}
                  priority

                />
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="pt-8 pt-lg-0">
        <div className="container">
          <div className="d-flex flex-column-reverse flex-lg-row">
            <div className="col-lg-6">
              <h1 className="fs-lg-4 fs-md-3 fs-xl-5 mb-3 mt-4">Become an ECO Attorney</h1>
              <p>Interested in representing immigrants through Equity Corps of Oregon?

              </p>
            </div>
            <div className="col-lg-6 text-center text-lg-end">
              <Link href="/getInvolved" className="btn btn-primary text-black mb-3 w-75 mt-5">Become an ECO Attorney
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
