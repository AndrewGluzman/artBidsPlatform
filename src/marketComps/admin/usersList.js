import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { doApiGet, doApiMethod, URL_API } from '../../services/apiSer';

function UsersList(props) {
  let [users_ar, setUsersAr] = useState([]);

  useEffect(() => {
    doApi();
  }, [])

  const doApi = async () => {
    let url = URL_API + "/users";
    let data = await doApiMethod(url,"GET");
    setUsersAr(data);
  }

  const delProd = async(_id) => {
    if(window.confirm("are you sure you want to delete?")){
      let url = URL_API + "/users/"+_id;
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

  const onChangeRole = async(_id) => {
    let url = URL_API + "/users/changeRole/"+_id;
    let data = await doApiMethod(url,"PATCH",{});
    if(data.n == 1){
      doApi();
    }
    else{
      alert("something worng, or maybe its you!!!! and you cant change your role!!!")
    }
  }

  return (
    <div>
      <h1>List of Prod in shop:</h1>
      {/* <Link to="/admin/addCategory">add new Categoty</Link> */}
      <table className="table table-striped">
        {/* TODO: mouseover will shoe info of prod */}
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Role</th>
            <th>del/edit</th>
          </tr>
        </thead>
        {/* TODO: add pagenation */}
        <tbody>

          {users_ar.map((item,i) => {
            let classRoleBtn = (item.role == "admin") ? "btn btn-success" : "btn btn-warning"
            return (
              <tr key={item._id}>
                <td>{i+1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.address}</td>
                <td><button onClick={() => {
                  onChangeRole(item._id)
                }} className={classRoleBtn}>
                {item.role}
                  </button></td>
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

export default UsersList;