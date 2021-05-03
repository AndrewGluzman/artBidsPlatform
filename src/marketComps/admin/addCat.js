import React from 'react';
import { useForm } from "react-hook-form";
import {  doApiMethod, URL_API } from '../../services/apiSer';
import { Link, useHistory } from "react-router-dom";

function AddCat(props) {


  let history = useHistory()
  const { register, handleSubmit, errors } = useForm();

  let nameRef = register({ required: true, minLength: 3 });
  let infoRef = register({ required: true, minLength: 3 });
  let idRef = register({ required: true, min: 1 });

  const onFormSub = (dataBody) => {
    console.log(dataBody);
    
    // doApi(dataBody)
    doApi(dataBody);
  }

  const doApi = async(dataBody) => {
    let url = URL_API + "/categories";
    let data = await doApiMethod(url,"POST",dataBody);
    // if succed we will get _id prop
    // console.log(data);
    if(data._id){
      alert("category added");
      history.push("/admin/category");
    }
    else{
      alert("There is problem choose another short id");
    }
  }

  // 15:02

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onFormSub)} className="col-lg-6 mx-auto p-2 shadow mt-3">
        <h1>Add new Category</h1>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">name</label>
          <input defaultValue="" ref={nameRef} name="name" type="text" className="form-control" id="name" />
          {errors.name && <span className="text-danger">Enter vaild name (at least 2 charts)</span>}
        </div>

        <div className="mb-3">
          <label htmlFor="info" className="form-label">info</label>
          <input defaultValue="" ref={infoRef} name="info" type="text" className="form-control" id="info" />
          {errors.info && <span className="text-danger">Enter info (at least 2 charts)</span>}
        </div>

        <div className="mb-3">
          <label htmlFor="s_id" className="form-label">short id (choose something not in use):</label>
          <input defaultValue="7" ref={idRef} name="s_id" type="text" className="form-control" id="s_id" />
          {errors.s_id && <span className="text-danger">Enter valid short id higer than 0</span>}
        </div>
       
        <button type="submit" className="btn btn-primary">Add product</button>


      </form>

    </div>
  )
}

export default AddCat