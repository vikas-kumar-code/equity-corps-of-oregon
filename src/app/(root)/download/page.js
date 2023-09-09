import Link from 'next/link'
import React from 'react'

const Download = () => {
  return (
    <div>
        <section className="bg-dark text-center pt-9">
        <div className="container">
          <div className="col-12 col-md-7 mx-auto">
            <h1 className="text-white fs-lg-5 fs-md-4 fs-3 my-4 fw-bolder">
              Download
            </h1>
          </div>
        </div>
      </section>
      <section className="pb-0">
        <div className="container">
          <div className="px-xl-3 px-md-2 px-1">
              <Link
                href="https://equitycorps.org/wp-content/uploads/2023/01/ECO-Strategic-Support-Implementation.pdf"
                className="fs-2 text-warning text_link"
                target="_blank"
              >
                Survey Form – English
              </Link>
          </div>
          <div className="px-xl-3 px-md-2 px-1 my-3">
              <Link
                href="https://equitycorps.org/wp-content/uploads/2023/04/LTO-Survey-Haitian-Creole.pdf"
                className="fs-2 text-warning text_link"
                target="_blank"
              >
                Fòm Sondaj Kreyòl Ayisyen
              </Link>
          </div>
          <div className="px-xl-3 px-md-2 px-1">
              <Link
                href="https://equitycorps.org/wp-content/uploads/2023/04/LTO-Survey-Spanish.pdf"
                className="fs-2 text-warning text_link"
                target="_blank"
              >
                Formulario de encuesta en español
              </Link>
          </div>
          <div className="px-xl-3 px-md-2 px-1 my-3">
              <Link
                href="https://equitycorps.org/wp-content/uploads/2023/04/LTO-Survey-French.pdf"
                className="fs-2 text-warning text_link"
                target="_blank"
              >
                Formulaire d’enquête Français
              </Link>
          </div>
          <div className="px-xl-3 px-md-2 px-1">
              <Link
                href="https://equitycorps.org/wp-content/uploads/2023/04/LTO-Survey-Portuguese.pdf"
                className="fs-2 text-warning text_link"
                target="_blank"
              >
                Formulário de Pesquisa Português
              </Link>
          </div>
          <div className="px-xl-3 px-md-2 px-1 my-3">
              <Link
                href="https://equitycorps.org/wp-content/uploads/2023/04/LTO-Survey-Persian.pdf"
                className="fs-2 text-warning text_link"
                target="_blank"
              >
                فرم نظرسنجی فارسی
              </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Download