import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { doApiGet, URL_API } from '../../services/apiSer';

import Header from './header';
import TimerSingleProd from './timerSingleProd';

function ProdSingleInfo(props) {

  let dispatch = useDispatch();
  let history = useHistory();
  let [prodData, setProdData] = useState({});
  let [prodArrBids, setProdArrBids] = useState(Number);
  let [prodPriceInp, setProdPriceInp] = useState(Number);
  const { register, handleSubmit, errors } = useForm();

  let bidRef = register({ required: true, min: prodArrBids!=0?prodData.bids[prodArrBids-1].price +1:prodData.price });



  useEffect(() => {
    doApiGetProdInfo()
  }, [prodPriceInp])

  const doApiGetProdInfo = async () => {
    let prodId = props.match.params.id;
    let url = URL_API + "/prods/single/" + prodId;
    let data = await doApiGet(url);
    console.log(data.date_created)
    let url_cat = URL_API + "/categories/single/" + data.category_s_id
    let dataCat = await doApiGet(url_cat);
    data.catName = dataCat.name;
    
    setProdData(data);
    setProdArrBids(data.bids.length);
    let price = prodArrBids!=0?prodData.bids[prodArrBids-1].price:prodData.price
    console.log(price);
    setProdPriceInp(price);
  }

const onFormSub = (dataBody) => {
  dataBody.starting_bid = dataBody.price;
  //doApi(dataBody);
};




  const buyNow = () => {
    prodData.count = 1;
    dispatch({ type: "UPDATE_THE_CART", item: prodData })
    history.push("/checkout")
  }

  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <hr className="for_h2" />
        <h2 className="h2_hr">
          <div>
            More info:
            </div>
        </h2>
        <div className="breadcrumb">
          <Link className="breadcrumb-item" to="/">Home</Link>
          <Link className="breadcrumb-item" to={"/cat/" + prodData.category_s_id}>{prodData.catName}</Link>
          <a className="breadcrumb-item active" href="#">{prodData.name}</a>
        </div>
        <div>
          <h2>{prodData.name}</h2>
          <p className="text-secondary">views: 345</p>
        </div>
        <div className="row">
          <div className="col-lg-6">
            {prodData.img?.includes("http") ?
              <img src={prodData.img} className="w-100 img-thumbnail" />
              // הוספנו את הקווארי סטרינג ? כדי שירפרש את התמונה כל פעם מחדש
              // כי שמעלים תמונה היא נשארת על אותה כתובת 
              : <img src={URL_API + prodData.img} className="w-100 img-thumbnail" />
            }
            <Link to="/" className="btn btn-dark w-100">Back to list</Link>
          </div>
          <div className="col-lg-6 text-center text-lg-start p-3 p-lg-0">
            <p className="text-secondary">Info: {prodData.info} </p>

            {prodArrBids!=0?<h4>Current Bid is: {prodData.bids[prodArrBids-1].price}</h4>:<h4>Starting price is : {prodData.price}</h4>}
            <p>Time left:</p>

            <div className="d-flex p-4 w-100 justify-content-between text-center shadow ">
              <TimerSingleProd date={prodData.date_created}/>
            </div>

            <form onSubmit={handleSubmit(onFormSub)}
            className="col-lg-3 mx-auto p-1 border my-3">
              <div className="d-flex   ">
              <button onClick={()=>{
            setProdPriceInp(prodPriceInp-1)
          }} className="btn shadow-none">-</button>
          <input
            defaultValue={prodPriceInp}
            ref={bidRef}
            name="bid"
            type="string"
            className="form-control border-0 text-center text-decoration-none"
            id="bid"
          />
          {errors.bid && (
            <span className="text-danger">
              Value must be greater the current value
            </span>
          )}
          <button onClick={()=>{
            setProdPriceInp(prodPriceInp+1)
          }} className="btn shadow-none">+</button>
          </div>
            </form>

            <button onClick={buyNow} className="btn btn-info w-50">Buy now</button>
          </div>
        </div>
      </div>
    </React.Fragment>

  )
}

export default ProdSingleInfo