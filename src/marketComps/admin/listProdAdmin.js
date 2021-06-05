import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { doApiMethod, URL_API } from "../../services/apiSer";

function ListProdAdmin(props) {
  let [prods_ar, setProdsAr] = useState([]);

  useEffect(() => {
    doApi();
  }, []);

  //pulls two arays of all products and users and joins into one
  const doApi = async () => {
    let url = URL_API + "/prods/adminprods?sort=_id&reverse=yes&perPage=200";
    let dataProds = await doApiMethod(url, "GET");

    let url2 = URL_API + "/users";
    let dataUsers = await doApiMethod(url2, "GET");

    let prodsWithUser = dataProds.filter((item) => {
      dataUsers.forEach((element) => {
        if (item.user_id == element._id) {
          item.ownerEmail = element.email;
        }
      });
      return item;
    });

    setProdsAr(prodsWithUser);
  };

  const delProd = async (_id) => {
    if (window.confirm("are you sure you want to delete?")) {
      let url = URL_API + "/prods/" + _id;
      let data = await doApiMethod(url, "DELETE", {});
      if (data.n == 1) {
        //refresh the table
        doApi();
      } else {
        alert("there problem");
      }
    }
  };

  return (
    <div>
      <h1>List of Prod in shop:</h1>
      <Link to="/admin/addProd">add new prod</Link>
      <table className="table table-striped">
        {/* TODO: mouseover will shoe info of prod */}
        <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th>category</th>
            <th>price</th>
            <th>qty</th>
            <th>user</th>
            <th>del/edit</th>
          </tr>
        </thead>
        {/* TODO: add pagenation */}
        <tbody>
          {prods_ar.map((item, i) => {
            return (
              <tr key={item._id}>
                <td>{i + 1}</td>
                <td>{item.name}</td>
                <td>{item.category_s_id}</td>
                <td>{item.price}</td>
                <td>{item.qty}</td>
                <td>{item.ownerEmail}</td>
                <td>
                  <button
                    onClick={() => {
                      delProd(item._id);
                    }}
                    className="btn btn-danger"
                  >
                    del
                  </button>
                  <Link
                    to={"/admin/editProd/" + item._id}
                    className="btn btn-dark"
                  >
                    edit
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ListProdAdmin;
