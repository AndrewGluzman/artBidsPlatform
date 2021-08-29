import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import { doApiMethod, URL_API } from '../../services/apiSer'

function AccSettings(props) {
  const { register, handleSubmit, errors, getValues } = useForm()
  const [userData, setUserData] = useState({})
  const history = useHistory()

  useEffect(() => {
    doApiUser()
  }, [])

  const doApiUser = async () => {
    let url = URL_API + '/users/myInfo'
    let data = await doApiMethod(url, 'GET')
    // check if the token is valid and the user is admin
    console.log(data)
    setUserData(data)
  }

  let emailRef = register({
    required: true,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  })
  let passRef = register({ required: false, minLength: 3 })
  let passRef2 = register({
    required: true,
    minLength: 3,
    validate: (val) => {
      return val === getValues().pass
    },
  })
  let nameRef = register({ required: true, minLength: 2 })
  let phoneRef = register({ required: true, minLength: 3 })
  let addressRef = register({ required: false, minLength: 3 })

  const onFormSub = (dataBody) => {
    //dataBody -> מכיל אובייקט עם המאפיינים לפי השמות של האינפוטים והסלקטים
    delete dataBody.pass2

    console.log(dataBody)
    doApi(dataBody)
  }
  // 13:15
  const doApi = async (dataBody) => {
    let url = URL_API + '/users/updateUserInfo/'
    // dataBody > אובייקט שמכיל את האימייל והסיסמא מהטופס
    let data = await doApiMethod(url, 'PUT', dataBody)
    console.log(data)
    // sign up success
    if (data.n == 1) {
      alert('Updated')
    } else {
      alert('There problem , come back next week :) ')
    }
  }
  return (
    <div className="container">
      <div>
        <h3>Account info:</h3>
        <hr />
      </div>
      <form onSubmit={handleSubmit(onFormSub)} className="col-lg-6  p-2  mt-3">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Full name
          </label>
          <input
            defaultValue={userData.name}
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
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            defaultValue={userData.email}
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
        <div className="mb-3">
          <label htmlFor="pass" className="form-label">
            Password
          </label>
          <input
            ref={passRef}
            name="pass"
            type="text"
            className="form-control"
            id="pass"
          />
          {errors.pass && (
            <span className="text-danger">
              Please enter valid Password min 3 charts
            </span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="pass" className="form-label">
            Repeat password
          </label>
          <input
            ref={passRef2}
            name="pass2"
            type="text"
            className="form-control"
            id="pass2"
          />
          {errors.pass2 && (
            <span className="text-danger">passwords dont match!</span>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            defaultValue={userData.phone}
            ref={phoneRef}
            name="phone"
            type="text"
            className="form-control"
            id="phone"
          />
          {errors.phone && (
            <span className="text-danger">
              Please enter valid phone min 9 charts
            </span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            defaultValue={userData.address}
            ref={addressRef}
            name="address"
            type="text"
            className="form-control"
            id="address"
          />
          {errors.address && (
            <span className="text-danger">
              Please enter valid address min 9 charts
            </span>
          )}
        </div>

        <button
          type="submit"
          className="btn btn_filter text-white rounded-pill px-4 py-2 my-4 fw-bol"
        >
          Update
        </button>
      </form>
    </div>
  )
}

export default AccSettings
