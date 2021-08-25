import React from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import { doApiMethod, URL_API } from '../../services/apiSer'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

function LoginClient(props) {
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
    //dataBody -> מכיל אובייקט עם המאפיינים לפי השמות של האינפוטים והסלקטים
    console.log(dataBody)
    doApi(dataBody)
  }
  // 13:15
  const doApi = async (dataBody) => {
    let url = URL_API + '/users/login'
    // dataBody > אובייקט שמכיל את האימייל והסיסמא מהטופס
    let data = await doApiMethod(url, 'POST', dataBody)
    console.log(data)
    // login success
    if (data.token) {
      localStorage.setItem('tok', data.token)

      let url2 = URL_API + '/users/myInfo'
      let userInfo = await doApiMethod(url2, 'GET')

      localStorage.setItem('userName', userInfo.name)
      toast.success('Wellcome back ' + userInfo.name)

      history.push('/')
    } else {
      // addToast("Try again , user or password worng",
      //   {
      //     appearance: 'error',
      //     autoDismiss: true
      //   }
      // )
      // TODO : show toaste message
      alert('try again , user or password worng')
    }
  }
  return (
    <React.Fragment>
      {/* <Header /> */}
      <div className="container">
        <div className="breadcrumb">
          <Link className="breadcrumb-item text-secondary" to="/">
            Home/
          </Link>
        </div>
        <h1 className="h3 fw-bolder mb-5">
          <span>Sign in:</span>
        </h1>
        <div style={{ minHeight: '50vh' }}>
          <form
            onSubmit={handleSubmit(onFormSub)}
            className="col-lg-6 mx-auto p-2 shadow mt-3"
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
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-primary">
                Log in
              </button>
              <Link to="/signup" className="btn btn-danger">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  )
}

export default LoginClient
