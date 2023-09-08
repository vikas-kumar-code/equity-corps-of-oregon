import Image from 'next/image'
import Link from 'next/link'

export default function About() {  
  return (
    <div>
      <section className="bg-dark text-center py-3">
        <div className="container">
          <div className="col-12 col-md-7 mx-auto">
            <h2 className="text-white fs-lg-5 fs-md-4 fs-3 my-4 fw-bolder">About Equity Corps of Oregon</h2>
          </div>
          <p className="w-md-50 text-light mx-auto fs-lg-2">ECO provides free, high quality immigration legal services to Oregonians at risk of deportation or civic exclusion due to their immigration status.</p>
        </div>
      </section>

      <section className="pb-0">
        <div className="container">
          <div className="px-xl-8 px-md-5 px-3 pb-8">
            <p className="fs-5 text-dark">About</p>
            <p className="fs-1">Equity Corps of Oregon, or ECO, is a collaborative of community-based organizations, nonprofits, and attorneys working to provide universal legal representation to all eligible immigrants in Oregon so everyone can defend against a deportation or civic exclusion on account of immigration status.

              ECO is part of <a href='https://workerrelief.org/' style={{textDecoration:"underline !important", color:"blue"}}>Oregon Worker Relief</a> , a statewide network of community-based organizations dedicated to providing assistance to immigrant Oregonians excluded from federal and state safety-net programs.

              In addition to providing access to legal representation, ECO offers services such as navigation and social service support, and educates and empowers migrant communities.</p>
          </div>
          <div className="px-xl-8 px-md-5 px-3 pb-8">
            <p className="fs-5 text-dark">History</p>
            <p className="fs-1">The Equity Corps officially launched in the fall of 2018, with support from the City of Portland and Multnomah County. The program is the culmination of a years-long effort by members of the Oregon Ready coalition to create an innovative universal representation model to defend immigrant Oregonians from unjust and unlawful deportations.</p>
            <p className="fs-1">Legal representation is often the difference between an immigrant exercising their rights and accepting an unfair outcome, between an asylum seeker finding refuge or returning to a life-threatening situation, and between a family with mixed status staying together and being split apart. Immigrants who are represented in removal proceedings are fifteen times more likely to apply for relief and five-and-a-half times more likely to win their cases and prevail against unjust deportations when compared to their non-represented counterparts.</p>
            <p className="fs-1">Universal Representation (SB1543) successfully passed the Oregon legislature in 2022 to create a permanent statewide Universal Navigation and Representation program which embeds access to justice in community. Now part of Oregon Worker Relief, ECO is a collaborative of community-based organizations, nonprofits, and attorneys working to provide Universal Legal Representation to all immigrants in Oregon. </p>
          </div>
          <div className="px-xl-8 px-md-5 px-3 pb-8">
            <p className="fs-5 text-dark">Our Story</p>
            <h1 className="fs-lg-3 fs-md-4 fs-3 my-4">Handshake infographic mass market crowdfunding iteration.</h1>
            <p className="fs-1">Conversion angel investor entrepreneur first mover advantage. Handshake infographic mass market crowdfunding iteration. Traction stock user experience deployment beta innovator incubator focus. Sales user experience branding growth hacking holy grail monetization conversion prototype stock network effects. Learning curve network effects return on investment bootstrapping business-to-consumer.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
