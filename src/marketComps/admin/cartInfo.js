import React, { useEffect, useState } from 'react';
import { doApiMethod, URL_API } from '../../services/apiSer';

function CartInfo(props) {
  let [cartInfo, setCartInfo] = useState({});
  let [cart_ar, setCartAr] = useState([]);
  let [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    getProductInfoApi();
  }, []);

  const getProductInfoApi = async () => {
    let cartId = props.match.params.id;
    let url = URL_API + "/carts/singleCart/" + cartId;
    let data = await doApiMethod(url, "GET");
    console.log(data);
    setCartInfo(data);
    setCartAr(JSON.parse(data.carts_ar));
    getUserInfo(data.user_id);
  }

  const getUserInfo = async (userId) => {

    let url = URL_API + "/users/singleUser/" + userId;
    let data = await doApiMethod(url, "GET");
    console.log(data)
    setUserInfo(data);
  }

  const changeStatus = async(_status) => {
    let cartId = props.match.params.id;
    let url = URL_API + "/carts/status/" + cartId;
    let data = await doApiMethod(url, "PATCH", {status:_status});
    console.log(data);
    if(data.n == 1){
      getProductInfoApi();
    }
  }

  // Show info of cart and user
  // and change status
  return (
    <div className="container">
      <h1>Info about order:</h1>
      <div>
        <h3>Buyer info:</h3>
        <div>Name: {userInfo.name}</div>
        <div>Phone: {userInfo.phone}</div>
        <div>Address: {userInfo.address}</div>
      </div>
      <hr />
      <div>
        <h3>Info order :</h3>
        <h4>Order status: {cartInfo.status}</h4>
        <div>Change order status: 
          <button className="btn btn-success me-2 ms-2" onClick={() => {
            changeStatus("complete")
          }}>Complete</button>
          <button className="btn btn-warning me-2" onClick={() => {
            changeStatus("pending")
          }}>Pending</button>
          <button className="btn btn-danger" onClick={() => {
            changeStatus("canceled")
          }}>Canceled</button>

        </div>
        <div>Order id: {cartInfo._id}</div>

        <table className="table table-striped">
          <thead>
          <tr>
            <td>#</td>
            <td>name of product</td>
            <td>Count</td>
            <td>Price per unit</td>
            <td>Total</td>
          </tr>
          </thead>
          <tbody>
            {cart_ar.map((item,i) => {
              return(
                <tr>
                  <td>{i + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.count}</td>
                  <td>{item.price}</td>
                  <td>{item.price * item.count}</td>
                </tr>
              )
            } )}
          </tbody>
        </table>
        <h4>Total Cart price: {cartInfo.total}</h4>
      </div>
    </div>
  )
}

export default CartInfo