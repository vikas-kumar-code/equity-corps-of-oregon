import Image from 'next/image'
import { getServerSession } from 'next-auth'

export default async function Home() {
  const session = await getServerSession();
  return (
    <div>
      {/* {JSON.stringify(session)} */}
      <div className="bg-dark">
        <section>
          <div className="container">
            <div className="row align-items-center py-lg-0 py-6">
              <div className="col-lg-6 text-center text-lg-start">
                <h1 className="text-white fs-5 fs-xl-6">ECO Panel Attorney Program</h1>
                <p className="text-white py-lg-3 py-2">Equity Corps of Oregon’s objective is to provide universal representation, which protects our communities by making sure that no individual faces the risk of deportation or exclusion without legal consultation and representation. Equity Corps ultimately aims to end unjust and unfair deportations and civic exclusions by providing access to an attorney and support services for every eligible Oregonian at risk of removal or civic exclusion on account of immigration status.</p>

                <p className="text-white py-lg-3 py-2">Equity Corps has established an Attorney Panel Program to represent persons eligible for services. Panel attorneys, as known as ECO Providers, will be engaged to provide representation to individuals enrolled with ECO on their immigration cases in order to achieve this goal.</p>
                <div className="d-sm-flex align-items-center gap-3">
                  <button className="btn btn-success text-black mb-3 w-75">Buy Template</button>
                  <button className="btn btn-outline-light mb-3 w-75">Explore</button>
                </div>
              </div>
              <div className="col-lg-6 text-center text-lg-end mt-3 mt-lg-0">
                <Image
                  src="/images/hero/hero-graphics.png"
                  alt="Vercel Logo"
                  className="img-fluid"
                  width={494}
                  height={423}
                  priority
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      <section>

        <div className="container">
          <p className="text-center fs-1">Our Services</p>
          <h2 className="mx-auto text-center fs-lg-6 fs-md-5 w-lg-75">Handshake infographic mass market crowdfunding iteration.</h2>
          <div className="row gx-xl-7 mt-5">
            <div className="col-md-4 mb-6 mb-md-0 text-center text-md-start">
              <Image
                src="/images/services/1.png"
                alt="Vercel Logo"
                className="w-50 w-md-100"
                width={336}
                height={396}
                priority
              />
              <h4 className="mt-3 my-1">Cool feature title</h4>
              <p className="fs-1 mb-0">Learning curve network effects return on investment.</p><a className="text-dark fs-1 pb-2 fw-bold border-black border-bottom text-decoration-none" href="#">Explore page<i className="fa-solid fa-arrow-right ms-2"></i></a>
            </div>
            <div className="col-md-4 mb-6 mb-md-0 text-center text-md-start">
              <Image
                src="/images/services/2.png"
                alt="Vercel Logo"
                className="w-50 w-md-100"
                width={336}
                height={396}
                priority
              />
              <h4 className="mt-3 my-1">Even cooler feature</h4>
              <p className="fs-1 mb-0">Learning curve network effects return on investment.</p><a className="text-dark fs-1 pb-2 fw-bold border-black border-bottom text-decoration-none" href="#">Explore page<i className="fa-solid fa-arrow-right ms-2"></i></a>
            </div>
            <div className="col-md-4 mb-6 mb-md-0 text-center text-md-start">
              <Image
                src="/images/services/3.png"
                alt="Vercel Logo"
                className="w-50 w-md-100"
                width={336}
                height={396}
                priority
              />
              <h4 className="mt-3 my-1">Cool feature title</h4>
              <p className="fs-1 mb-0">Learning curve network effects return on investment.</p><a className="text-dark fs-1 pb-2 fw-bold border-black border-bottom text-decoration-none" href="#">Explore page<i className="fa-solid fa-arrow-right ms-2"></i></a>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 text-center text-lg-start">
              <Image
                src="/images/offer/1.png"
                alt="Vercel Logo"
                width={496}
                height={646}
                priority
                className="img-fluid"
              />
            </div>
            <div className="col-lg-6">
              <h1 className="fs-xl-5 fs-lg-4 fs-3">We connect our customers with the best, and help them keep up-and stay open.</h1>
              <ul className="list-unstyled my-xl-5 my-3">
                <li className="fs-2 my-4 d-flex align-items-center gap-3 text-black"><i className="fa-solid fa-circle-check fs-4 text-dark"></i><span>We connect our customers with the best.</span></li>
                <li className="fs-2 my-4 d-flex align-items-center gap-3 text-black"><i className="fa-solid fa-circle-check fs-4 text-dark"></i><span>Advisor success customer launch party.</span></li>
                <li className="fs-2 my-4 d-flex align-items-center gap-3 text-black"><i className="fa-solid fa-circle-check fs-4 text-dark"></i><span>Business-to-consumer long tail.</span></li>
              </ul>
              <button className="btn btn-dark">Start now</button>
            </div>
          </div>
        </div>


      </section>

      <section className="pt-8 pt-lg-0">

        <div className="container">
          <div className="d-flex flex-column-reverse flex-lg-row">
            <div className="col-lg-6">
              <h1 className="fs-lg-4 fs-md-3 fs-xl-5 mb-5">We connect our customers with the best, and help them keep up-and stay open.</h1>
              <ul className="list-unstyled">
                <li className="fs-2 shadow-sm offer-list-item"><i className="fa-solid fa-leaf fs-lg-4 fs-3"></i><span>We connect our customers with the best.</span></li>
                <li className="fs-2 shadow-sm offer-list-item"><i className="fa-solid fa-eye fs-lg-4 fs-3"></i><span>Advisor success customer launch party.</span></li>
                <li className="fs-2 shadow-sm offer-list-item"><i className="fa-solid fa-sun fs-lg-4 fs-3"></i><span>Business-to-consumer long tail.</span></li>
              </ul>
            </div>
            <div className="col-lg-6 text-center text-lg-end">
              <Image
                src="/images/offer/2.png"
                alt="Vercel Logo"
                width={444}
                height={728}
                priority
                className="img-fluid"
              />
            </div>
          </div>
        </div>


      </section>


      <section className="pt-0">

        <div className="container mt-0">
          <img className="img-fluid" src="assets/img/offer/3.png" alt="" />
          <Image
            src="/images/offer/3.png"
            alt="Vercel Logo"
            width={1168}
            height={428}
            priority
            className="img-fluid"
          />
          <div className="row mt-5 align-items-center">
            <div className="col-md-6">
              <h2 className="fs-md-4 fs-3 pt-3">We connect our customers with the best, and help them keep up-and stay open.</h2>
            </div>
            <div className="col-md-6">
              <div className="accordion accordion-flush" id="accordionFlushExample">
                <div className="accordion-item"></div>
                <h2 className="accordion-header border-bottom" id="srgdgfdgdgg45">
                  <button className="accordion-button collapsed text-black" type="button" data-bs-toggle="collapse" data-bs-target="#srgdgfdgdgg45tyuu" aria-expanded="false" aria-controls="srgdgfdgdgg45"><span className="fs-1 pe-3">We connect our customers with the best?</span></button>
                </h2>
                <div className="accordion-collapse collapse" aria-labelledby="srgdgfdgdgg45" data-bs-parent="#accordionFlushExample" id="srgdgfdgdgg45tyuu">
                  <div className="accordion-body">
                    <p className="mb-0">Placeholder content for this accordion, which is intended to demonstrate the accordion-flush class. This is the first item's accordion body.</p>
                  </div>
                </div>
                <div className="accordion-item"></div>
                <h2 className="accordion-header border-bottom" id="sxvdgrfhfh276">
                  <button className="accordion-button collapsed text-black" type="button" data-bs-toggle="collapse" data-bs-target="#srgdgfdgdgg45tyuu5ghj" aria-expanded="false" aria-controls="sxvdgrfhfh276"><span className="fs-1 pe-3">Android research &amp; development rockstar? </span></button>
                </h2>
                <div className="accordion-collapse collapse" aria-labelledby="sxvdgrfhfh276" data-bs-parent="#accordionFlushExample" id="srgdgfdgdgg45tyuu5ghj">
                  <div className="accordion-body">
                    <p className="mb-0">Placeholder content for this accordion, which is intended to demonstrate the accordion-flush class. This is the first item's accordion body.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


      </section>


      <section className="pb-0">

        <div className="container">
          <p className="text-center text-gray fs-1">Our Blog</p>
          <h2 className="mx-auto text-center fs-lg-6 fs-md-5 w-lg-75">Value proposition accelerator product management venture</h2>
          <div className="row mt-7 gx-xl-7">
            <div className="col-md-4 text-center text-md-start h-auto mb-5">
              <div className="d-flex justify-content-between flex-column h-100"><a href="#"><img className="w-75 w-md-100 rounded-2" src="assets/img/blog/1.png" alt="" /></a>
                <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2 mt-3"><a href="#">
                  <p className="fw-bold mb-0 text-black">Category</p>
                </a>
                  <p className="mb-0">November 22, 2021</p>
                </div><a href="#">
                  <h5 className="mt-1 mb-3 fs-0 fs-md-1">Pitch termsheet backing validation focus release.</h5>
                </a>
                <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3"><img className="img-fluid" src="assets/img/blog/profile1.png" alt="" /><a href="#">
                  <p className="mb-0 text-gray">Chandler Bing</p>
                </a></div>
              </div>
            </div>
            <div className="col-md-4 text-center text-md-start h-auto mb-5">
              <div className="d-flex justify-content-between flex-column h-100"><a href="#"><img className="w-75 w-md-100 rounded-2" src="assets/img/blog/2.png" alt="" /></a>
                <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2 mt-3"><a href="#">
                  <p className="fw-bold mb-0 text-black">Category</p>
                </a>
                  <p className="mb-0">November 22, 2021</p>
                </div><a href="#">
                  <h5 className="mt-1 mb-3 fs-0 fs-md-1">Seed round direct mailing non-disclosure agreement graphical user interface rockstar.</h5>
                </a>
                <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3"><img className="img-fluid" src="assets/img/blog/profile2.png" alt="" /><a href="#">
                  <p className="mb-0 text-gray">Rachel Green</p>
                </a></div>
              </div>
            </div>
            <div className="col-md-4 text-center text-md-start h-auto mb-5">
              <div className="d-flex justify-content-between flex-column h-100"><a href="#"><img className="w-75 w-md-100 rounded-2" src="assets/img/blog/3.png" alt="" /></a>
                <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2 mt-3"><a href="#">
                  <p className="fw-bold mb-0 text-black">Category</p>
                </a>
                  <p className="mb-0">November 22, 2021</p>
                </div><a href="#">
                  <h5 className="mt-1 mb-3 fs-0 fs-md-1">Beta prototype sales iPad gen-z marketing network effects value proposition</h5>
                </a>
                <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3"><img className="img-fluid" src="assets/img/blog/profile3.png" alt="" /><a href="#">
                  <p className="mb-0 text-gray">Monica Geller</p>
                </a></div>
              </div>
            </div>
          </div>
          <div className="text-center mb-3">
            <button className="btn btn-outline-dark">Load More</button>
          </div>
        </div>

      </section>
    </div>
  )
}
