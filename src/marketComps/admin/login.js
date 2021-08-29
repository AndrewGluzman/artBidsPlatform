import React from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import { doApiMethod, URL_API, checkIfAdmin } from '../../services/apiSer'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

// import { useToasts } from "react-toast-notifications";

function Login(props) {
  const { register, handleSubmit, errors } = useForm()
  let history = useHistory()
  // פונקציה בשיבל לקרוא לתצוגת ההודעות של הטוסט
  // let { addToast } = useToasts();

  let emailRef = register({
    required: true,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  })
  let passRef = register({ required: true, minLength: 3 })

  const onFormSub = (dataBody) => {
    console.log(dataBody)
    doApi(dataBody)
  }

  const doApi = async (dataBody) => {
    let url = URL_API + '/users/admin/login'
    let data = await doApiMethod(url, 'POST', dataBody)

    // error
    if (data.msg) {
      localStorage.removeItem('tok')
      console.log(data.msg)

      // toast.error(data.msg)
    }
    // login success
    else if (data.token) {
      localStorage.setItem('tok', data.token)
      history.push('/admin/list')
      toast.success('Wellcome back Admin')
    } else {
      localStorage.removeItem('tok')
      toast.error('try again later, something went wrong')
    }
  }

  return (
    <main>
      {/* handlesubmit - לא יפעיל את הפונקציה שקיבל כפרמטר
      רק אחרי שאין אפילו טעות אחת */}
      <div className="breadcrumb">
        <Link className="breadcrumb-item text-secondary" to="/">
          Home/
        </Link>
      </div>
      <h1 className="h3 fw-bolder mb-5">
        <span>Sign in:</span>
      </h1>
      <div style={{ minHeight: '50vh' }} className="ms-5">
        <form
          onSubmit={handleSubmit(onFormSub)}
          className="col-lg-6 mx-auto p-5 shadow mt-3"
        >
          <div className="mb-3">
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

          <button
            type="submit"
            className="btn btn_filter text-white rounded-pill  py-2  fw-bol"
          >
            Sign in
          </button>
        </form>
      </div>
    </main>
  )
}

export default Login
