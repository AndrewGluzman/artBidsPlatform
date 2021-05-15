import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function CartItem(props){
  let dispatch = useDispatch();

  let item = props.item;

  useEffect(() => {
    item.name = item.name.length > 11 ? item.name.substr(0,10)+"..." : item.name ;
  },[props])

  const delFromCart = () => {
    item.count = 0;
    dispatch({type:"UPDATE_THE_CART",item:item})
  }

  return(
    <div style={{borderBottom:"2px solid black"}} className="p-1">
      {item.name} : {item.count} , {item.price} Nis
    <span onClick={delFromCart} className="float-end text-danger">x</span>
    </div> 
  )
}

export default CartItem