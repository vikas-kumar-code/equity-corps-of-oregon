import Image from 'next/image'

export default function About() {
  return (
    <div>
      <section className="bg-dark text-center py-9">
        <div className="container">
          <p className="text-light fs-1">About</p>
          <div className="col-12 col-md-7 mx-auto">
            <h1 className="text-white fs-lg-7 fs-md-4 fs-3 my-4">We love to make great things, things that matter.</h1>
          </div>
          <p className="w-md-50 text-light mx-auto">Funding handshake buyer business-to-business metrics iPad partnership. First mover advantage innovator success deployment non-disclosure.</p>
        </div>
      </section>

      <section className="pb-0">
        <div className="container">
          <div className="gallery-wraper">
            <div className="img-wraper">
                <Image
                  src="/images/gallery/1.png"
                  alt="Vercel Logo"
                  className="img-fluid"
                  width={340}
                  height={343}
                  priority
                />
            </div>
            <div className="img-wraper">
                <Image
                  src="/images/gallery/2.png"
                  alt="Vercel Logo"
                  className="img-fluid"
                  width={408}
                  height={727}
                  priority
                />
            </div>
            <div className="img-wraper">
                <Image
                  src="/images/gallery/3.png"
                  alt="Vercel Logo"
                  className="img-fluid"
                  width={340}
                  height={343}
                  priority
                />
            </div>
            <div className="img-wraper">
                <Image
                  src="/images/gallery/4.png"
                  alt="Vercel Logo"
                  className="img-fluid"
                  width={340}
                  height={343}
                  priority
                />
            </div>
            <div className="img-wraper">
                <Image
                  src="/images/gallery/5.png"
                  alt="Vercel Logo"
                  className="img-fluid"
                  width={340}
                  height={343}
                  priority
                />
            </div>
          </div>
          <div className="px-xl-8 px-md-5 px-3 py-8">
            <p className="fs-1">Our Story</p>
            <h1 className="fs-lg-6 fs-md-4 fs-3 my-4">Handshake infographic mass market crowdfunding iteration.</h1>
            <p className="fs-1">Conversion angel investor entrepreneur first mover advantage. Handshake infographic mass market crowdfunding iteration. Traction stock user experience deployment beta innovator incubator focus. Sales user experience branding growth hacking holy grail monetization conversion prototype stock network effects. Learning curve network effects return on investment bootstrapping business-to-consumer.</p>
          </div>
        </div>
      </section>




      <section className="bg-dark">
        <div className="container">
          <p className="text-center text-light">Our numbers</p>
          <h1 className="text-center text-white w-lg-75 mx-auto fs-xl-6 fs-lg-4 fs-3">Handshake infographic mass market crowdfunding iteration.</h1>
          <div className="row mt-5">
            <div className="col-md-4 col-sm-6 text-center">
              <h1 className="text-success fs-5 fs-md-6 fs-lg-7 fs-xl-9">120M</h1>
              <p className="text-light fs-2">Cool feature title</p>
            </div>
            <div className="col-md-4 col-sm-6 text-center">
              <h1 className="text-success fs-5 fs-md-6 fs-lg-7 fs-xl-9">10.000</h1>
              <p className="text-light fs-2">Cool feature title</p>
            </div>
            <div className="col-md-4 col-sm-6 text-center">
              <h1 className="text-success fs-5 fs-md-6 fs-lg-7 fs-xl-9">240</h1>
              <p className="text-light fs-2">Cool feature title</p>
            </div>
          </div>
        </div>
      </section>




      <section>
        <div className="container">
          <div className="px-xl-8 px-md-5 px-3">
            <p className="text-gray fs-1">Our team</p>
            <h1 className="text-black fs-lg-6 fs-md-4 fs-3 my-4">The leadership team</h1>
            <p className="text-gray fs-1 w-lg-75">Conversion angel investor entrepreneur first mover advantage. Handshake infographic mass market crowdfunding iteration. Traction stock user experience deployment beta innovator incubator focus.</p>
          </div>
          <div className="row mt-7">
            <div className="col-md-4 col-sm-6 mb-5 mb-lg-0 text-center text-sm-left"><a href="#">
              <Image
                  src="/images/team/1.png"
                  alt="Vercel Logo"
                  className="img-fluid"
                  width={300}
                  height={354}
                  priority
                />
              </a>
              <h1 className="fs-3 mt-3">Michael Scott</h1>
              <p className="fs-1">General Manager</p>
            </div>
            <div className="col-md-4 col-sm-6 mb-5 mb-lg-0 text-center text-sm-left"><a href="#"><Image
                  src="/images/team/2.png"
                  alt="Vercel Logo"
                  className="img-fluid"
                  width={300}
                  height={354}
                  priority
                /></a>
              <h1 className="fs-3 mt-3">Dwight Schrute</h1>
              <p className="fs-1">General Manager</p>
            </div>
            <div className="col-md-4 col-sm-6 mb-5 mb-lg-0 text-center text-sm-left"><a href="#"><Image
                  src="/images/team/3.png"
                  alt="Vercel Logo"
                  className="img-fluid"
                  width={300}
                  height={354}
                  priority
                /></a>
              <h1 className="fs-3 mt-3">Pam Beetsley</h1>
              <p className="fs-1">General Manager</p>
            </div>
          </div>
        </div>
      </section>




      <section className="bg-dark">
        <div className="container">
          <div className="px-xl-8 px-md-5 px-3">
            <p className="text-light fs-1">Our values</p>
            <h1 className="text-white fs-lg-6 fs-md-4 fs-3 my-lg-4 my-3">Things in we believe</h1>
            <p className="text-light w-lg-75 fs-1">Conversion angel investor entrepreneur first mover advantage. Handshake infographic mass market crowdfunding iteration. Traction stock user experience deployment beta innovator incubator focus.</p>
            <div className="row mt-5">
              <div className="col-md-3"><Image
                  src="/images/values/1.png"
                  alt="Vercel Logo"
                  className="img-fluid"
                  width={150}
                  height={151}
                  priority
                /></div>
              <div className="col-md-9 mt-2 mb-md-0">
                <h1 className="text-white fs-2 fs-lg-3 my-2">We are commited.</h1>
                <p className="text-light fs-1">Conversion angel investor entrepreneur first mover advantage. Handshake infographic mass market crowdfunding iteration.</p>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-md-3"><Image
                  src="/images/values/2.png"
                  alt="Vercel Logo"
                  className="img-fluid"
                  width={150}
                  height={151}
                  priority
                /></div>
              <div className="col-md-9 mt-2 mb-md-0">
                <h1 className="text-white fs-2 fs-lg-3 my-2">We are responsible.</h1>
                <p className="text-light fs-1">Conversion angel investor entrepreneur first mover advantage. Handshake infographic mass market crowdfunding iteration.</p>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-md-3"><Image
                  src="/images/values/3.png"
                  alt="Vercel Logo"
                  className="img-fluid"
                  width={150}
                  height={151}
                  priority
                /></div>
              <div className="col-md-9 mt-2 mb-md-0">
                <h1 className="text-white fs-2 fs-lg-3 my-2">We aim for progress.</h1>
                <p className="text-light fs-1">Conversion angel investor entrepreneur first mover advantage. Handshake infographic mass market crowdfunding iteration.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
