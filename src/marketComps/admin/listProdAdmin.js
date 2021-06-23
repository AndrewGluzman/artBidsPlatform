import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { doApiMethod, URL_API } from "../../services/apiSer";
import AdminProdSingle from "./adminProdSingle";

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

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th className="col-1">name</th>
          <th>email</th>
          <th>Starting bid</th>
          <th>Current bid</th>
          <th>Date added</th>
          <th>Status</th>
          <th>del/edit</th>
        </tr>
      </thead>
      {/* TODO: add pagenation */}
      <tbody>
        {prods_ar.map((item, i) => {
          return (
            <AdminProdSingle
              key={item._id}
              prodNum={i}
              item={item}
              doApi={doApi}
            />
          );
        })}
      </tbody>
    </table>
  );
}

export default ListProdAdmin;
{
  /* <div>
<h1>List of Prod in shop:</h1>
<Link to="/admin/addProd">add new prod</Link>
<table className="table table-striped">
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
</div> */
}
