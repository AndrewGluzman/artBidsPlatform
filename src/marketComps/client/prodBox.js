import React, { useEffect, useState } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { URL_API } from '../../services/apiSer';

function ProdBox(props) {
  let dispatch = useDispatch();

  
  // let cartProd = props.item.count || 0
  let [countProd,setCountProd] = useState(0)
  let carts_ar = useSelector(mystore => mystore.carts_ar)

  let item = props.item;

  useEffect(() => {
    // check if the product in the cart from redux
    // and update the counter of prod
  
    carts_ar.map(prodItem => {
        if(prodItem._id == item._id){
          setCountProd(prodItem.count);
        }
      })
   
  },[carts_ar])


  const addProd = () => {
    setCountProd(countProd+1);
    item.count = countProd+1;
    dispatch({type:"UPDATE_THE_CART",item:item})
  }

  const reduceProd = () => {
    if(countProd > 0){

      setCountProd(countProd-1);
      item.count = countProd-1;
      dispatch({type:"UPDATE_THE_CART",item:item})
    }
  }

  return (
    <div className="col-lg-3 p-2 text-center">
      <div className="p-2 shadow pb-4" style={{height:"100%"}}>
        {/* בודק אם היו אר אל חיצוני או קובץ שהעלנו לשרת נוד */}
        {(item.img.includes("http")) ? 
        <div className="prod_img" style={{ backgroundImage: `url(${item.img})` }}> 
            {/* The  img */}
        </div> : 
        <div className="prod_img" style={{ backgroundImage: `url(${URL_API+ item.img})` }}> 
        {/* The  img */}
    </div>
        }
        <h3>{item.name}</h3>
        <div>Price: {item.price} nis</div>
        <div>Info: {item.info.substr(0, 50)}</div>
        <div className="my-3 d-flex justify-content-center align-items-center">
          <button className="btn btn-outline-success rounded-circle me-3" onClick={reduceProd}>-</button>
          <span className="h4 mt-1"> {countProd} </span>
          <button className="btn btn-outline-success rounded-circle ms-3" onClick={addProd} >+</button>
        </div>
        <Link to={"/single/"+item._id} className="text-success text-decoration-none">More info</Link>
      </div>
    </div>
  )
}

export default ProdBox