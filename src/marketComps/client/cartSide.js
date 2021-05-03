import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./css/cart.css"


function CartSide(props) {
  let dispatch = useDispatch();

  let showCart = useSelector((myStore) => myStore.showCart )
  return (
    <React.Fragment>
      { 
      // todo: enter in animation from right side
      showCart && 
      <div className="cart_side p-3">
        <button onClick={() => {
          dispatch({type:"SHOW_HIDE_CART",flag:false})
        }} className="btn btn-danger float-end">X</button>
      </div>
      }
    </React.Fragment>
  )
}

export default CartSide