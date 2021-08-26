import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

function GetInTouch(props) {
  const { register, handleSubmit, errors, getValues } = useForm()

  let emailRef = register({
    required: true,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  })
  let nameRef = register({ required: true, minLength: 2 })

  return (
    <div className="container-xxl get_in_touch">
      <div className="breadcrumb">
        <Link className="breadcrumb-item text-secondary" to="/">
          Home/
        </Link>
      </div>
      <div className="father ps-3 pt-4 pb-2 me-5 w-75 easy_shadow mx-auto position-relative">
        <div className="get_in_touch_form col-lg-8 mx-auto mb-4  overflow-hidden p-5 me-5 w-75 bg-white ">
          <div className="mb-5">
            <h1 className="fw-bolder">Get in Touch</h1>
            <h4 className="text-secondary">
              Feel free to drop us a line below
            </h4>
          </div>
          <form className="mt-5">
            <div className="name_email_inputs d-flex">
              <div className="mb-3 col col-lg-6 m-2">
                <label htmlFor="name" className="form-label">
                  Full name
                </label>
                <input
                  ref={nameRef}
                  name="name"
                  type="text"
                  className="form-control"
                  id="name"
                />
                {errors.name && (
                  <span className="text-danger">
                    Please enter valid name min 2 charts
                  </span>
                )}
              </div>
              <div className="mb-3  col col-lg-6 m-2">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  ref={emailRef}
                  name="email"
                  type="text"
                  className="form-control"
                  id="email"
                />
                {/* האירור לפי השם של האינפוט מייצר לעצמו מאפיין אם יש שם טעות */}
                {errors.email && (
                  <span className="text-danger">Please enter valid Email</span>
                )}
              </div>
            </div>
            <div className="form-outline ms-2">
              <textarea
                placeholder="Message"
                className="form-control w-100 p-0 inputs_outer_glow my-input"
                id="textAreaExample"
                rows="8"
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn btn_filter text-white rounded-pill px-4 py-2 my-4 fw-bold"
            >
              <span className="d-flex align-items-center">
                SEND MESSAGE<i class="bi bi-arrow-right ms-1 pb-1"></i>
              </span>
            </button>
          </form>
          <div className="red-rectangle text-light col-4 position-absolute d-flex justify-content-center  py-5 ">
            <div className="mt-5">
              <h2 className="fw-bolder">Contact us</h2>
              <p className=" mt-4 mb-4">
                <i className="bi bi-geo-alt me-1"></i>
                Chernikovsky 19, Rehovot
              </p>
              <p className=" mb-4 ">
                <i className="bi bi-envelope me-1"></i>
                sales$4art@artmail.com
              </p>
              <p>
                <i className="bi bi-telephone me-1"></i>
                +972(0)54-454-8265
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GetInTouch
