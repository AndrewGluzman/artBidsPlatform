import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { doApiGet, doApiMethod, URL_API } from '../../services/apiSer'

import Header from './header'
import TimerSingleProd from './timerSingleProd'
import ReactImageZoom from 'react-image-zoom'
import BottomTabs from './bottomTabs'

function ProdSingleInfo(props) {
  let dispatch = useDispatch()
  let history = useHistory()
  let [prodData, setProdData] = useState({})
  let [prodArrBids, setProdArrBids] = useState(Number)
  let [prodPriceInp, setProdPriceInp] = useState(Number)
  let [onloadPrice, setOnloadPrice] = useState()
  const { register, handleSubmit, errors } = useForm()

  let bidRef = register({ required: true, min: onloadPrice + 1 })
  let prodId = props.match.params.id
  // let img
  // let propsImg = {}

  useEffect(() => {
    doApiGetProdInfo()
  }, [])

  const doApiGetProdInfo = async () => {
    let url = URL_API + '/prods/single/' + prodId
    let data = await doApiGet(url)
    let url_cat = URL_API + '/categories/single/' + data.category_s_id
    let dataCat = await doApiGet(url_cat)
    data.catName = dataCat.name

    setProdData(data)
    setProdArrBids(data.bids.length)

    const getCurrentPricePromise = new Promise((resolve, reject) => {
      resolve(
        data.bids.length != 0
          ? data.bids[data.bids.length - 1].price
          : data.price,
      )
    })

    getCurrentPricePromise.then((resp) => {
      setProdPriceInp(resp)
      setOnloadPrice(resp)
      bidRef = register({ required: true, min: resp })
    })

    // img = prodData.img.includes('http') ? prodData.img : URL_API + prodData.img
    // propsImg = {
    //   zoomPosition: 'original',
    //   width: 350,
    //   zoomWidth: 350,
    //   img: img,
    // }
  }

  const onBidSub = (dataBody) => {
    checkIfTokenValid()
    console.log(dataBody)
    postBid(dataBody)
  }

  const postBid = async (dataBody) => {
    let url = URL_API + '/prods/bidup/' + prodId
    let data = await doApiMethod(url, 'PUT', dataBody)
    doApiGetProdInfo()
  }

  const buyNow = () => {
    prodData.count = 1 ///-----
    dispatch({ type: 'UPDATE_THE_CART', item: prodData[0] })
    history.push('/checkout')
  }

  const checkIfTokenValid = async () => {
    if (!localStorage['tok']) history.push('/login')
    let url = URL_API + '/users/myInfo'
    let data = await doApiMethod(url, 'GET')
    if (!data._id) {
      localStorage.removeItem('tok')
      history.push('/login')
    }
  }
  const deadline = (someDate) => {
    var date = new Date(someDate) // Now
    date.setDate(date.getDate() + 30)

    return date
  }

  // let img = prodData.img.includes('http')
  //   ? prodData.img
  //   : URL_API + prodData.img
  // const propsImg = {
  //   zoomPosition: 'original',
  //   width: 350,
  //   zoomWidth: 350,
  //   img: img,
  // }
  return (
    <React.Fragment>
      <Header />

      <div className="container mb-3">
        <div>
          <div className="breadcrumb">
            <Link className="breadcrumb-item" to="/">
              Home
            </Link>
            <Link
              className="breadcrumb-item"
              to={'/cat/' + prodData.category_s_id}
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
            <div className="col-lg-5  position-relative ">
              <div className="w-100 p-5 shadow pic">
                {() => {
                  const propsImg = {
                    zoomPosition: 'original',
                    width: 350,
                    zoomWidth: 350,
                    img: prodData.img?.includes('http')
                      ? prodData.img
                      : URL_API + prodData.img,
                  }
                  return <ReactImageZoom {...propsImg} />
                }}

                <i className="bi bi-search rounded-circle py-1 px-2 bg-light"></i>
                <div className="yflag bg-warning p-5 ps-1 col-5">
                  <h6 className="">NO RESERVE</h6>
                </div>
              </div>

              <div className="row d-flex">
                <img
                  className="col-3 p-3 mt-lg-1"
                  src="https://images.pexels.com/photos/1762973/pexels-photo-1762973.jpeg"
                ></img>
                <img
                  className="col-3 p-3 mt-lg-1"
                  src="https://images.pexels.com/photos/1690351/pexels-photo-1690351.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                ></img>
              </div>

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
                    ${prodData.bids[prodData.bids.length - 1].price.toFixed(2)}
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
                <p className="mb-0 mt-4">
                  Auction ends: {deadline(prodData.date_created).toDateString()}
                </p>
                <p>
                  Timezone: UTC{' '}
                  {deadline(prodData.date_created).getTimezoneOffset() / 60}
                </p>
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
                          setProdPriceInp(prodPriceInp - 1)
                      }}
                    >
                      -
                    </button>
                    <input
                      defaultValue={prodPriceInp ? prodPriceInp + 1 : ''}
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
                        setProdPriceInp(prodPriceInp + 1)
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
                <p>
                  SKU:
                  {prodData._id
                    ? prodData._id
                        .substring(prodData._id.length - 8, prodData._id.length)
                        .toUpperCase()
                    : ''}
                </p>
                <p className="mb-0 mt-4">Category: {prodData.catName}</p>
                <p>Tags: {prodData.tags}</p>
              </div>
            </div>
          </div>
          <BottomTabs item={prodData} />
        </div>
      </div>
    </React.Fragment>
  )
}

export default ProdSingleInfo
