import React from 'react'
import { URL_API } from '../../services/apiSer'

function Carusel(props) {
  return (
    <div>
      <div
        id="carouselExampleIndicators"
        class="carousel slide"
        data-bs-ride="carousel"
      >
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div class="carousel-inner  first_slide">
          <div
            id="slide_one"
            align="center"
            class="carousel-item active   text-white"
          >
            <div className="bgq1"></div>

            <div className="designed_item position-relative">
              <img
                id="slide_1"
                src={URL_API + '/prods_images/slide1.jpg'}
              ></img>

              <h2 className=" slide-in-blurred-left-slowest ">VAN GOH'S</h2>
              <h1 className="slide-in-blurred-left"> DREAM</h1>
              <div className="border-1 border border-light price position-absolute p-3  align-items-center slide-in-blurred-bottom">
                <p className="m-0 p-0">
                  SOLD AT:<span className=""> $5,950</span>
                </p>
              </div>
            </div>
          </div>
          <div id="slide_two" class="carousel-item text-white">
            <div className="bgq2"></div>

            <div className="designed_item position-relative">
              <img
                id="slide_2"
                className="slide-in-br-slide2"
                src={URL_API + '/prods_images/slide2.jpg'}
              ></img>
              <h1
                id="slide_two_h1"
                className="position-absolute slide-in-blurred-left-slowest-most"
              >
                MOST
              </h1>
              <h1
                id="slide_two_h12"
                className="position-absolute slide-in-blurred-tr-wanted "
              >
                {' '}
                WANTED
              </h1>
              <h2 id="bidnow_h2" className="position-absolute bounce-in-fwd">
                BID NOW!
              </h2>
              <div
                id="current_div"
                className="price position-absolute p-3  align-items-center slide-in-blurred-bottom-now"
              >
                <p className="m-0 p-0">
                  NOW AT:<span className=""> $1,350</span>
                </p>
              </div>
            </div>
          </div>
          <div id="slide_three" class="carousel-item text-white">
            <div className="bgq3"></div>
            <div className="bgq4 slide-in-bl-yellow-pyramid"></div>

            <div className="designed_item position-relative">
              <h1 id="s4art" className="tracking-in-contract-bck ">
                $4ART
              </h1>
              <h1 id="sell">SELL</h1>
              <h1 id="bid">BID</h1>
              <h1 id="buy">BUY</h1>

              <div
                id="sign_up_now"
                className="price position-absolute p-3  align-items-center flicker-in-1 glow"
              >
                <p className="m-0 p-0">SIGN UP NOW!</p>
              </div>
            </div>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  )
}

export default Carusel
