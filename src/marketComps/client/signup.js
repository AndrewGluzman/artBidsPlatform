import React from 'react';
import Header from './header';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router';
import { doApiMethod, URL_API } from '../../services/apiSer';

function SignUp(props){
  const { register, handleSubmit, errors } = useForm();
  let history = useHistory()
  // פונקציה בשיבל לקרוא לתצוגת ההודעות של הטוסט
  // let { addToast } = useToasts();

  let emailRef = register({ required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i });
  let passRef = register({ required: true, minLength: 3 })
  let nameRef = register({ required: true, minLength: 2 })
  let phoneRef = register({ required: true, minLength: 3 })
  let addressRef = register({ required: false, minLength: 3 })

  const onFormSub = (dataBody) => {
    //dataBody -> מכיל אובייקט עם המאפיינים לפי השמות של האינפוטים והסלקטים
    console.log(dataBody);
   doApi(dataBody)
  }
  // 13:15
  const doApi = async (dataBody) => {
    let url = URL_API + "/users/";
    // dataBody > אובייקט שמכיל את האימייל והסיסמא מהטופס
    let data = await doApiMethod(url, "POST", dataBody);
    console.log(data);
    // sign up success
    if (data._id) {

      history.push("/login");
    }
    else if(data.code == 11000){
      alert("Email already exists in system , try log in")

    }
    else {
      // addToast("Try again , user or password worng",
      //   {
      //     appearance: 'error',
      //     autoDismiss: true
      //   }
      // )
      // TODO : show toaste message 
      alert("There problem , come back next week :) ")
    }
  }
  return(
    <React.Fragment>
      <Header />
      <div className="container">
        <h1>Sign up:</h1>
        <form onSubmit={handleSubmit(onFormSub)} className="col-lg-6 mx-auto p-2 shadow mt-3">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input ref={emailRef} name="email" type="text" className="form-control" id="email" />
          {/* האירור לפי השם של האינפוט מייצר לעצמו מאפיין אם יש שם טעות */}
          {errors.email && <span className="text-danger">Please enter valid Email</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="pass" className="form-label">Password</label>
          <input ref={passRef} name="pass" type="text" className="form-control" id="pass" />
          {errors.pass && <span className="text-danger">Please enter valid Password min 3 charts</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Full name</label>
          <input ref={nameRef} name="name" type="text" className="form-control" id="name" />
          {errors.name && <span className="text-danger">Please enter valid name min 2 charts</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input ref={phoneRef} name="phone" type="text" className="form-control" id="phone" />
          {errors.phone && <span className="text-danger">Please enter valid phone min 9 charts</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input ref={addressRef} name="address" type="text" className="form-control" id="address" />
          {errors.address && <span className="text-danger">Please enter valid address min 9 charts</span>}
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>


      </form>
      </div>
    </React.Fragment>
  )
}

export default SignUp