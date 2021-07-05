import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { doApiGet, doApiMethod, URL_API } from "../../services/apiSer";

import Header from "./header";
import TimerSingleProd from "./timerSingleProd";

function ProdSingleInfo(props) {
  let dispatch = useDispatch();
  let history = useHistory();
  let [prodData, setProdData] = useState({});
  let [prodArrBids, setProdArrBids] = useState(Number);
  let [prodPriceInp, setProdPriceInp] = useState(Number);
  let [onloadPrice, setOnloadPrice] = useState();
  // let [prodCateg, setProdCateg] = useState();
  const { register, handleSubmit, errors } = useForm();

  let bidRef = register({ required: true, min: onloadPrice + 1 });
  let prodId = props.match.params.id;

  useEffect(() => {
    doApiGetProdInfo();
  }, []);

  const doApiGetProdInfo = async () => {
    let url = URL_API + "/prods/single/" + prodId;
    let data = await doApiGet(url);
    let url_cat = URL_API + "/categories/single/" + data.category_s_id;
    let dataCat = await doApiGet(url_cat);
    data.catName = dataCat.name;

    setProdData(data);
    setProdArrBids(data.bids.length);

    const getCurrentPricePromise = new Promise((resolve, reject) => {
      resolve(
        data.bids.length != 0
          ? data.bids[data.bids.length - 1].price
          : data.price
      );
    });

    getCurrentPricePromise.then((resp) => {
      setProdPriceInp(resp);
      setOnloadPrice(resp);
      bidRef = register({ required: true, min: resp });
    });
  };

  const onBidSub = (dataBody) => {
    checkIfTokenValid();
    console.log(dataBody);
    postBid(dataBody);
  };

  const postBid = async (dataBody) => {
    let url = URL_API + "/prods/bidup/" + prodId;
    let data = await doApiMethod(url, "PUT", dataBody);
    doApiGetProdInfo();
    console.log(data);
  };

  const buyNow = () => {
    prodData.count = 1;
    dispatch({ type: "UPDATE_THE_CART", item: prodData });
    history.push("/checkout");
  };

  const checkIfTokenValid = async () => {
    if (!localStorage["tok"]) history.push("/login");
    let url = URL_API + "/users/myInfo";
    let data = await doApiMethod(url, "GET");
    if (!data._id) {
      localStorage.removeItem("tok");
      history.push("/login");
    }
  };

  return (
    <React.Fragment>
      <Header />

      <div className="container">
        <hr className="for_h2" />
        <h2 className="h2_hr">
          <div>More info:</div>
        </h2>
        <div className="breadcrumb">
          <Link className="breadcrumb-item" to="/">
            Home
          </Link>
          <Link
            className="breadcrumb-item"
            to={"/cat/" + prodData.category_s_id}
          >
            {prodData.catName}
          </Link>
          <a className="breadcrumb-item active" href="#">
            {prodData.name}
          </a>
        </div>
        <div>
          <h2>{prodData.name}</h2>
          <p className="text-secondary bi bi-eye-fill"> 3456 views</p>
        </div>
        <div className="row">
          <div className="col-lg-5 ">
            {prodData.img?.includes("http") ? (
              <img
                src={prodData.img}
                className="w-100 p-5 img-thumbnail shadow"
              />
            ) : (
              // הוספנו את הקווארי סטרינג ? כדי שירפרש את התמונה כל פעם מחדש
              // כי שמעלים תמונה היא נשארת על אותה כתובת
              <img
                src={URL_API + prodData.img}
                className="w-100 p-5 img-thumbnail shadow"
              />
            )}
            {/* <Link to="/" className="btn btn-dark w-100">
              Back to list
            </Link> */}
          </div>
          <div className="col-lg-6 text-center text-lg-start ms-4 p-lg-0 text-secondary">
            <p className="text-secondary">Info: {prodData.info} </p>

            {prodArrBids != 0 ? (
              <h4 className="text-dark">
                Winning Bid:
                <span className="tw-bold">
                  ${prodData.bids[prodArrBids - 1].price.toFixed(2)}{" "}
                </span>
              </h4>
            ) : (
              <h4 className="text-dark">
                Starting price is : ${prodData.price}
              </h4>
            )}
            <p>Time left:</p>

            <div className="d-flex py-3 px-4  w-100 justify-content-between text-center shadow  mb-3 bg-body rounded ">
              <TimerSingleProd date={prodData.date_created} />
            </div>
            <div>
              <p className="mb-0 mt-4">Auction ends: June 30, 2021 12:00 am</p>
              <p>Timezone: UTC 0</p>
            </div>
            <form
              onSubmit={handleSubmit(onBidSub)}
              className="row d-flex ms-1 align-items-center"
            >
              <div className="col-lg-3 p-1 border my-3 ">
                <div className="d-flex ">
                  <button
                    type="button"
                    className="btn shadow-none"
                    onClick={() => {
                      if (onloadPrice < prodPriceInp)
                        setProdPriceInp(prodPriceInp - 1);
                    }}
                  >
                    -
                  </button>
                  <input
                    value={prodPriceInp + 1}
                    ref={bidRef}
                    name="price"
                    type="text"
                    // type="Number"
                    // onChange={() => {
                    //   setProdPriceInp(bidRef);
                    // }}
                    className="form-control border-0 text-center text-decoration-none bg- bg-white"
                    id="bidPriceInp"
                  />

                  <button
                    type="button"
                    onClick={() => {
                      setProdPriceInp(prodPriceInp + 1);
                    }}
                    className="btn shadow-none"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="col-lg-3 px-lg-3 justify-content-md-between d-flex">
                <button
                  type="submit"
                  className="bi bi-hammer btn btn-danger rounded-pill  w-50"
                ></button>

                <button
                  type="button"
                  className=" bi bi-heart-fill btn btn-outline-dark  rounded-circle me-2"
                ></button>
              </div>

              <div className="col-lg-6 float-lg-end">
                <button
                  onClick={buyNow}
                  type="button"
                  className="float-lg-end ms-lg-1 btn btn-outline-secondary w-75 rounded-pill me-2"
                >
                  BUY NOW FOR ${prodPriceInp + 100}
                </button>
              </div>
            </form>
            <div>
              <p>SKU:980FD9</p>
              <p className="mb-0 mt-4">Categorie: {prodData.catName}</p>
              <p>Tags: {prodData.tags}</p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ProdSingleInfo;
