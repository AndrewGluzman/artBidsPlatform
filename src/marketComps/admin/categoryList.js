import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { doApiGet, doApiMethod, URL_API } from '../../services/apiSer';

function CategoryList(props) {
  let [cat_ar, setcatAr] = useState([]);

  useEffect(() => {
    doApi();
  }, [])

  const doApi = async () => {
    let url = URL_API + "/categories";
    let data = await doApiGet(url);
    setcatAr(data);
  }

  const delProd = async(_id) => {
    if(window.confirm("are you sure you want to delete?")){
      let url = URL_API + "/categories/"+_id;
      let data = await doApiMethod(url,"DELETE",{});
      if(data.n == 1){
        //refresh the table
        doApi();
      }
      else{
        alert("there problem")
      }
    }
  }

  return (
    <div>
      <h1>List of Prod in shop:</h1>
      <Link to="/admin/addCategory">add new Categoty</Link>
      <table className="table table-striped">
        {/* TODO: mouseover will shoe info of prod */}
        <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th>info</th>
            <th>Short id</th>
            <th>del/edit</th>
          </tr>
        </thead>
        {/* TODO: add pagenation */}
        <tbody>

          {cat_ar.map((item,i) => {
            return (
              <tr key={item._id}>
                <td>{i+1}</td>
                <td>{item.name}</td>
                <td>{item.info}</td>
                <td>{item.s_id}</td>
                <td>
                  <button onClick={() => {
                    delProd(item._id);
                  }} className="btn btn-danger">del</button>
                  <a href="#" className="btn btn-dark">edit</a>
                </td>
              </tr>
            )
          })}

        </tbody>
      </table>
    </div>
  )
}

export default CategoryList;