import React, { useRef } from 'react'
import { useHistory } from 'react-router-dom'

function Footer(props) {
  let searchRef = useRef()
  let history = useHistory()

  const onSearchClick = () => {
    let searchQ = searchRef.current.value
    let url = '/search/?q=' + searchQ
    if (searchQ.length > 0) {
      history.push(url)
    }
    // alert(searchQ);
  }

  return (
    <>
      <section className="search_before_footer p-2 border border-1 justify-content-md-end d-flex pe-4 my-5">
        <div className="col-md-4 d-flex my-3 my-lg-0 ">
          <input
            onKeyDown={(evt) => {
              if (evt.key == 'Enter') {
                onSearchClick()
              }
            }}
            ref={searchRef}
            type="search"
            className="circleB justify-content-center"
            placeholder="  Search products"
          />
          <button onClick={onSearchClick} className="btn btn-dark search_btn">
            {searchIcon()}
          </button>
        </div>
      </section>
      <footer className="text-center text-lg-start text-dark">
        {/* <!-- Grid container --> */}
        <div className="container p-4 pb-0">
          {/* <!-- Section: Links --> */}
          <section className="">
            {/* <!--Grid row--> */}
            <div className="row">
              {/* <!-- Grid column --> */}
              <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">$4ART</h6>
                <p>
                  Our company specilized in selling art for individuals and
                  organizations, here you can use rows and columns to organize
                  your footer content. Lorem ipsum dolor sit amet, consectetur
                  adipisicing elit.
                </p>
              </div>
              {/* <!-- Grid column --> */}

              <hr className="w-100 clearfix d-md-none" />

              {/* <!-- Grid column --> */}
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Products
                </h6>
                <p>
                  <a className="text-secondary">MDBootstrap</a>
                </p>
                <p>
                  <a className="text-secondary">MDWordPress</a>
                </p>
                <p>
                  <a className="text-secondary">BrandFlow</a>
                </p>
                <p>
                  <a className="text-secondary">Bootstrap Angular</a>
                </p>
              </div>
              {/* <!-- Grid column --> */}

              <hr className="w-100 clearfix d-md-none" />

              {/* <!-- Grid column --> */}
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Useful links
                </h6>
                <p>
                  <a className="text-secondary">Your Account</a>
                </p>
                <p>
                  <a className="text-secondary">Become an Affiliate</a>
                </p>
                <p>
                  <a className="text-secondary">Shipping Rates</a>
                </p>
                <p>
                  <a className="text-secondary">Help</a>
                </p>
              </div>

              {/* <!-- Grid column --> */}
              <hr className="w-100 clearfix d-md-none" />

              {/* <!-- Grid column --> */}
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Contact
                </h6>
                <p>
                  <i className="fas fa-home mr-3"></i> New York, NY 10012, US
                </p>
                <p>
                  <i className="fas fa-envelope mr-3"></i> info@gmail.com
                </p>
                <p>
                  <i className="fas fa-phone mr-3"></i> + 01 234 567 88
                </p>
                <p>
                  <i className="fas fa-print mr-3"></i> + 01 234 567 89
                </p>
              </div>
              {/* <!-- Grid column --> */}
            </div>
            {/* <!--Grid row--> */}
          </section>
          {/* <!-- Section: Links --> */}

          <hr className="my-3" />
          {/* <!-- Section: Copyright --> */}
          <section className="p-3 pt-0">
            <div className="row d-flex align-items-center">
              {/* <!-- Grid column --> */}
              <div className="col-md-7 col-lg-8 text-center text-md-start">
                {/* <!-- Copyright --> */}
                <div className="p-3">
                  Copyright:© 2021
                  <a className="text-white" href="https://mdbootstrap.com/">
                    $4Art.com
                  </a>
                </div>
                {/* <!-- Copyright --> */}
              </div>
              {/* <!-- Grid column --> */}

              {/* <!-- Grid column --> */}
              <div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
                {/* <!-- Facebook --> */}
                <a
                  className="btn btn-outline-light btn-floating m-1"
                  className="text-secondary"
                  role="button"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>

                {/* <!-- Twitter --> */}
                <a
                  className="btn btn-outline-light btn-floating m-1"
                  className="text-secondary"
                  role="button"
                >
                  <i className="fab fa-twitter"></i>
                </a>

                {/* <!-- Google --> */}
                <a
                  className="btn btn-outline-light btn-floating m-1"
                  className="text-secondary"
                  role="button"
                >
                  <i className="fab fa-google"></i>
                </a>

                {/* <!-- Instagram --> */}
                <a
                  className="btn btn-outline-light btn-floating m-1"
                  className="text-secondary"
                  role="button"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
              {/* <!-- Grid column --> */}
            </div>
          </section>
          {/* <!-- Section: Copyright --> */}
        </div>
        {/* <!-- Grid container --> */}
      </footer>
    </>
  )
}

export default Footer
const searchIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-search"
      viewBox="0 0 16 16"
    >
      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
    </svg>
  )
}
