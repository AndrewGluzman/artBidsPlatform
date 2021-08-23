import React, { useState, useEffect, useRef } from 'react'
import LazyLoad from 'react-lazyload'
import HomeCatList from './homeCatList'

import {
  doApiGet,
  doApiMethod,
  URL_API,
  checkIfTokenValid,
} from '../../services/apiSer'
import ProdBox from './prodBox'
import './css/form.css'
import './css/carusel.css'
import Footer from './footer'
import Carusel from './carusel'
import { Link } from 'react-router-dom'

function Homelist(props) {
  // const orderCategoriesId = ["3", "1", "2", "5"]
  let [cat_ar, setcatAr] = useState([])
  const [latestProds, setLatestProds] = useState([])

  useEffect(() => {
    doApi()
    checkIfTokenValid()
    getLatestProds()
  }, [])

  const doApi = async () => {
    let url = URL_API + '/categories'
    let data = await doApiGet(url)
    setcatAr(data)
  }
  const getLatestProds = async () => {
    let url = URL_API + '/prods/allonsale?perpage=4'
    let data = await doApiMethod(url, 'GET')
    setLatestProds(data)
  }

  return (
    <div className="container-xxl">
      <div className="mb-5">
        <Carusel />
      </div>

      <section className=" text-center mb-5 mt-5">
        {middleTitleWithHammer('ENDING SOON AUCTIONS')}
        <div className=" ending-auctions row">
          {latestProds.map((item) => {
            return <ProdBox key={item._id} item={item} />
          })}
        </div>
      </section>
      <section className="moderncontemporary row my-5">
        <div className="contemporary col-md-6 position-relative">
          <div className="insideframe position-absolute mt-2">
            <h2 className="category_name text-light fw-bolder">
              Contemporary Fine Art
            </h2>
            <p className=" text-light">20 auctions</p>
            <Link to="art_type/Contemporary Fine Art/0">
              <span className="read-more btn btn-outline-light rounded-pill px-4 py-2 mt-4 fw-bold">
                <span style={{ fontSize: 'smaller' }}> VIEW MORE</span>
              </span>
            </Link>
          </div>
          <span className="span1"></span>
          <span className="span2"></span>
        </div>
        <div className="modern col-md-6 position-relative">
          <div className="insideframe position-absolute mt-2">
            <h2 className="category_name text-light fw-bolder">
              Decorative Art
            </h2>
            <p className=" text-light">12 auctions</p>
            <Link to="art_type/Decorative Art/0">
              <span className="read-more btn btn-outline-light rounded-pill px-4 py-2 mt-4 fw-bold">
                <span style={{ fontSize: 'smaller' }}> VIEW MORE</span>
              </span>
            </Link>
          </div>
          <span className="span1"></span>
          <span className="span2"></span>
        </div>
      </section>
      {cat_ar.map((item) => {
        return (
          <LazyLoad key={item.s_id} height={500}>
            <HomeCatList catId={item.s_id} />
          </LazyLoad>
        )
      })}
      <section className=" mb-5 mt-5">
        {middleTitleWithHammer('NEED HELP? CONTACT US')}
        <div class="container">
          <div class="">
            <div class="row">
              {/* <!-- Section Titile --> */}
              <div
                class="col-md-12 wow animated fadeInLeft"
                data-wow-delay=".2s"
              ></div>
            </div>
            <div class="row">
              {/* <!-- Section Titile --> */}
              <div
                class="col-md-6 mt-3 contact-widget-section2 wow animated fadeInLeft"
                data-wow-delay=".2s"
              >
                <p>
                  If you ever dreamed to be well known artist? Making your own
                  exhibition and turn your creations to a valuable works? We are
                  here for you. $4ART work with us today.
                </p>

                <div class="find-widget">
                  Company: <a href="#top">$4ART</a>
                </div>
                <div class="find-widget">
                  Address: <a href="#">86194 Rechovot Smadar Avenue 19 </a>
                </div>
                <div class="find-widget">
                  Phone: <a href="#">+972 054-459-8269</a>
                </div>

                <div class="find-widget">
                  Website: <a href="#top">www.$4ART.com</a>
                </div>
                <div class="find-widget">
                  Program: <a href="#">Mon to Sat: 09:30 AM - 10.30 PM</a>
                </div>
              </div>
              {/* <!-- contact form --> */}
              <div
                class="col-md-6 wow animated fadeInRight shadow mt-3"
                data-wow-delay=".2s"
              >
                <form
                  class="shake"
                  role="form"
                  id="contactForm"
                  name="contact-form"
                  data-toggle="validator"
                >
                  {/* <!-- Name --> */}
                  <div class="form-group label-floating">
                    <label class="control-label pt-2" forlable="name">
                      Name
                    </label>
                    <input
                      class="form-control"
                      id="name"
                      type="text"
                      name="name"
                      required
                      data-error="Please enter your name"
                    />
                    <div class="help-block with-errors"></div>
                  </div>
                  {/* <!-- email --> */}
                  <div class="form-group label-floating">
                    <label class="control-label" for="email">
                      Email
                    </label>
                    <input
                      class="form-control"
                      id="email"
                      type="email"
                      name="email"
                      required
                      data-error="Please enter your Email"
                    />
                    <div class="help-block with-errors"></div>
                  </div>
                  {/* <!-- Subject --> */}
                  <div class="form-group label-floating">
                    <label class="control-label">Subject</label>
                    <input
                      class="form-control"
                      id="msg_subject"
                      type="text"
                      name="subject"
                      required
                      data-error="Please enter your message subject"
                    />
                    <div class="help-block with-errors"></div>
                  </div>
                  {/* <!-- Message --> */}
                  <div class="form-group label-floating">
                    <label for="message" class="control-label">
                      Message
                    </label>
                    <textarea
                      class="form-control"
                      rows="3"
                      id="message"
                      name="message"
                      required
                      data-error="Write your message"
                    ></textarea>
                    <div class="help-block with-errors"></div>
                  </div>
                  {/* <!-- Form Submit --> */}
                  <div class="form-submit mt-5">
                    <button
                      class="btn btn-light"
                      type="submit"
                      id="form-submit"
                    >
                      <i class="material-icons mdi mdi-message-outline"></i>
                      Send Message
                    </button>
                    <div id="msgSubmit" class="h3 text-center hidden"></div>
                    <div class="clearfix"></div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Homelist

const middleTitleWithHammer = (title) => {
  return (
    <div className="title my-5">
      <h3 className="fw-bolder h2 text-center">{title}</h3>
      <h2 className="col-4 mx-lg-auto">
        <span>
          <i style={{ color: '#BE263F' }} className="bi bi-hammer"></i>
        </span>
      </h2>
    </div>
  )
}
