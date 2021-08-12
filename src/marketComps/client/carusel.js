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
          <div align="center" class="carousel-item active   text-white">
            <div className="designed_item position-relative">
              <img src={URL_API + '/prods_images/slide1.jpg'}></img>
              <div className="text-center fw-bolder position-absolute slide-in-blurred-right name">
                <p className="h3 ">JESSICA SOBOL</p>
                <p className="mb-2">OIL ON CANVAS</p>
              </div>
              <h2 className=" slide-in-blurred-left-slowest ">VAN GOH'S</h2>
              <h1 className="slide-in-blurred-left"> DREAM</h1>
              <div className="border-1 border border-light price position-absolute p-3  align-items-center slide-in-blurred-bottom">
                <p className="m-0 p-0">
                  SOLD AT:<span className=""> $1,350</span>
                </p>
              </div>
            </div>
          </div>
          {/* <div class="carousel-item"></div> */}
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
