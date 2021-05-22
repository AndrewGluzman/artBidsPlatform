import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { doApiMethod, URL_API } from '../../services/apiSer';

function UserCartsOrders(props){
  let [carts_ar,setCarts] = useState([]);

  useEffect(() => {
    doApiGetCarts();
  },[])

  const doApiGetCarts = async() => {
    let url = URL_API+"/carts/allCarts?reverse=yes";
    let data = await doApiMethod(url,"GET");
    console.log(data)
    setCarts(data);
  }

  const getColor = (_status) => {
    switch (_status){
      case "complete":
        return "green";
        break;
      case "pending":
        return "grey";
        break;
      case "canceled":
        return "red";
        break;
    }
  }


  return(
    <div className="container">
      <h2>List of Orders of users and there status:</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>cart_id</th>
            <th>Product</th>
            <th>Total</th>
            <th>Status</th>
            <th>del</th>
            <th>More info</th>
          </tr>
        </thead>
        <tbody>
          {carts_ar.map((item,i) => {
            return(
              <tr key={item._id}>
                <td>{i+1}</td>
                <td>{item._id}</td>
                <td>{JSON.parse(item.carts_ar).length}</td>
                <td>{item.total}</td>
                <td style={{color:getColor(item.status)}}>{item.status}</td>
                <td>----</td>
                <td>
                  <Link to={"/admin/cartInfo/"+item._id} className="btn btn-info">More info</Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div> 
  )
}

export default UserCartsOrders