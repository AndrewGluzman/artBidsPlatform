import React, { useEffect, useState } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { doApiGet, URL_API } from '../../services/apiSer';

import Header from './header';

function ProdSingleInfo(props){
  let dispatch = useDispatch();
  let history = useHistory();
  let [prodData,setProdData] = useState({})

  useEffect(() => {
    doApiGetProdInfo()
  },[])

  const doApiGetProdInfo = async() => {
    let prodId = props.match.params.id;
    let url = URL_API+"/prods/single/"+prodId;
    let data = await doApiGet(url);
    console.log(data);
    setProdData(data);
  }

  const buyNow = () => {
    prodData.count = 1;
    dispatch({type:"UPDATE_THE_CART",item:prodData})
    history.push("/checkout")
  }
  

  return(
    <React.Fragment>
      <Header />
      <div className="container">
      <hr className="for_h2"/>
      <h2 className="h2_hr">
            <span>
            More info:
            </span>
          </h2>
        <div className="row">
          <div class="col-lg-3">
          {prodData.img?.includes("http") ? 
          <img src={prodData.img} className="w-100 img-thumbnail" />
          // הוספנו את הקווארי סטרינג ? כדי שירפרש את התמונה כל פעם מחדש
          // כי שמעלים תמונה היא נשארת על אותה כתובת 
            : <img src={URL_API+prodData.img} className="w-100 img-thumbnail" />
            }
            <Link to="/" className="btn btn-dark w-100">Back to list</Link>
          </div>
          <div class="col-lg-9">
            <h2>{prodData.name}</h2>
            <h4>Price per unit: {prodData.price}</h4>
            <p>Info about: {prodData.info} </p>
            <p>QTY in stock : { prodData.qty > 100 ? "100+" : prodData.qty}</p>
            <button onClick={buyNow} className="btn btn-info w-50">Buy now</button>
          </div>
        </div>
      </div>
    </React.Fragment>
     
  )
}

export default ProdSingleInfo