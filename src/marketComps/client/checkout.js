import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from './header';
import CartSide from './cartSide';
import AuthClient from './authClient';
import { doApiMethod, URL_API } from '../../services/apiSer';
function Checkout(props) {
  let carts_ar = useSelector(myStore => myStore.carts_ar);
  let totalCart = 0;

  const checkoutReal = async() => {
    let obj = {
      carts_ar:JSON.stringify(carts_ar),
      total:totalCart
    }
    let url = URL_API+"/carts";
    try{
      let data = await doApiMethod(url,"POST",obj)
      if(data.n == 1){
        alert("Your order been updated")
      }
      else if(data._id){
        alert("Your order on process we will contact you soon to get your money!")
      }
      else{
        alert("there problem come back tommrow")
      }
    }
    catch(err){
      console.log(err);
      alert("there problem come back tommrow 222")
    }

  }

  return (
    <React.Fragment>
      <AuthClient />
      <Header />
      <CartSide />
      <div className="container">
        <h1>Checkout</h1>
        <h3>List of product in your cart:</h3>
        <div className="row">
          <div className="col-lg-9 p-2">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Price</th>
                  <th>img</th>
                  <th>---</th>
                </tr>
              </thead>
              <tbody>
                {carts_ar.map((item, i) => {
                  totalCart += item.count * item.price;
                  return (
                    <tr>
                      <td>{i + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.count}</td>
                      <td>{(item.count * item.price).toFixed(2)}</td>
                      <td className="w-25"><img src={item.img} className="w-50" /></td>
                      <td >
                        <div className="d-flex">
                          <button className="btn btn-info">-</button>
                          <button className="btn btn-info">+</button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>


          </div>
          <div className="col-lg-3 border p-2 d-flex align-items-center" style={{ height: "300px" }}>
            <div>
              <h3>Total price: {totalCart.toFixed(2)} nis</h3>
              <button onClick={checkoutReal} className="btn btn-outline-info w-100">Commit buy</button>
            </div>
          </div>
        </div>

      </div>
    </React.Fragment>
  )
}

export default Checkout