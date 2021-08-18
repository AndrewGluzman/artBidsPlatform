import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import {
  doApiGet,
  doApiMethod,
  URL_API,
  changeFavorites,
  checkIfTokenValid,
} from '../../services/apiSer'

import Header from './header'
import TimerSingleProd from './timerSingleProd'
import BottomTabs from './bottomTabs'
import InnerImageZoom from 'react-inner-image-zoom'
import './css/zoomOnImagePlugin.css'

import ReactBnbGallery from 'react-bnb-gallery'
import './css/reactBnbGallery.css'
import Footer from './footer'

function ProdSingleInfo(props) {
  let dispatch = useDispatch()
  let history = useHistory()
  let [prodData, setProdData] = useState([])
  let [prodArrBids, setProdArrBids] = useState(Number)
  let [prodPriceInp, setProdPriceInp] = useState(Number)
  let [onloadPrice, setOnloadPrice] = useState()
  let { register, handleSubmit, errors } = useForm()
  let [ended, setEnded] = useState(false)

  let bidRef = register({ required: true, min: onloadPrice + 1 })
  let prodId = props.match.params.id

  const [isOpen, setIsOpen] = useState(false)
  const [stateFavorites, setstateFavorites] = useState(false)

  useEffect(() => {
    doApiGetProdInfo()
  }, [props.match.params.id, onloadPrice])
  // useEffect(() => {
  // }, [])

  const doApiGetProdInfo = async () => {
    let url = URL_API + '/prods/single/' + prodId
    let data = await doApiGet(url)
    let url_cat = URL_API + '/categories/single/' + data.category_s_id
    let dataCat = await doApiGet(url_cat)
    data.catName = dataCat.name
    // data.imgArr.shift()

    setProdData([data])
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

    //checks if favorites and makes css on button component
    if (localStorage['favorites']) {
      JSON.parse(localStorage.getItem('favorites')).includes(data._id)
        ? setstateFavorites(true)
        : setstateFavorites(false)
    }
  }

  const onBidSub = async (dataBody) => {
    checkIfTokenValid()
    if (!localStorage['tok']) {
      history.push('/login')
    }

    console.log(dataBody)
    postBid(dataBody)
  }

  const postBid = async (dataBody) => {
    let url = URL_API + '/prods/bidup/' + prodId
    let data = await doApiMethod(url, 'PUT', dataBody)
    doApiGetProdInfo()
    console.log(data)
  }

  const buyNow = () => {
    prodData[0].count = 1
    dispatch({ type: 'UPDATE_THE_CART', item: prodData[0] })
    history.push('/checkout')
  }

  const deadline = (someDate) => {
    var date = new Date(someDate) // Now
    date.setDate(date.getDate() + 30)

    return date
  }

  return (
    <React.Fragment>
      <Header />

      <div className="container mb-3">
        {prodData.map((item) => {
          // let img = item.img.includes('http') ? item.img : URL_API + item.img

          const PHOTOS = [...item.imgArr, item.img]

          return (
            <div key={item._id}>
              <ReactBnbGallery
                show={isOpen}
                photos={PHOTOS.map((photoItem) => URL_API + photoItem)}
                onClose={() => setIsOpen(false)}
                showThumbnails={false}
                backgroundColor={'rgba(0, 0, 0, 0.575)'}
              />
              <div className="breadcrumb">
                <Link className="breadcrumb-item" to="/">
                  Home
                </Link>
                <Link
                  className="breadcrumb-item"
                  to={'/cat/' + item.category_s_id}
                >
                  {item.catName}
                </Link>
                <a className="breadcrumb-item active" href="#">
                  {item.name}
                </a>
              </div>
              <div>
                <h2>{item.name}</h2>
                <p className="text-secondary bi bi-eye-fill"> 3456 views</p>
              </div>
              <div className="row">
                <div className="col-lg-5  position-relative ">
                  <div className="w-100 p-5 shadow">
                    <div
                      className="
                   justify-content-center w-100 d-flex"
                    >
                      <InnerImageZoom
                        src={URL_API + item.img}
                        zoomSrc={URL_API + item.img}
                        zoomType="hover"
                        zoomPreload={true}
                      />
                    </div>
                    <div className="yflag bg-warning p-5 ps-1 col-5">
                      <h6 className="">NO RESERVE</h6>
                    </div>
                  </div>

                  <div className="row d-flex">
                    {item.imgArr.map((pic) => {
                      return (
                        <img
                          key={pic}
                          className="col-3 p-3 mt-lg-1 btn"
                          src={URL_API + pic}
                          onClick={() => setIsOpen(true)}
                        ></img>
                      )
                    })}
                  </div>
                </div>
                <div className="col-lg-6 text-center text-lg-start ms-4 p-lg-0 text-secondary">
                  <p className="text-secondary">Info: {item.info} </p>
                  {/* //checks if there is bids exist if no shows starting price */}
                  {prodArrBids != 0 ? (
                    <h4 className="text-dark">
                      Winning Bid:
                      <span className="tw-bold">
                        ${item.bids[item.bids.length - 1].price.toFixed(2)}
                      </span>
                    </h4>
                  ) : (
                    <h4 className="text-dark">
                      Starting price is : ${item.price}
                    </h4>
                  )}
                  <p>Time left:</p>

                  <div className="d-flex py-3 px-4  w-100 justify-content-between text-center shadow  mb-3 bg-body rounded ">
                    <TimerSingleProd
                      date={item.date_created}
                      setEnded={setEnded}
                      ended={ended}
                    />
                  </div>
                  <div>
                    <p className="mb-0 mt-4">
                      Auction ends: {deadline(item.date_created).toDateString()}
                    </p>
                    <p>
                      Timezone: UTC{' '}
                      {deadline(item.date_created).getTimezoneOffset() / 60}
                    </p>
                  </div>
                  {ended ? (
                    ''
                  ) : (
                    <form
                      onSubmit={handleSubmit(onBidSub)}
                      className="row d-flex ms-1 align-items-center"
                    >
                      <div
                        className={`p-1 border my-3 ${
                          prodPriceInp < 100000 ? 'col-lg-3' : 'col-lg-4'
                        }`}
                      >
                        <div className="d-flex w-100">
                          <button
                            type="button"
                            className="btn shadow-none fw-bolder"
                            onClick={() => {
                              if (onloadPrice < prodPriceInp)
                                setProdPriceInp(prodPriceInp - 1)
                            }}
                          >
                            -
                          </button>
                          <input
                            // defaultValue={
                            //   prodPriceInp ? Number(prodPriceInp + 1) : ''
                            // }
                            value={prodPriceInp + 1}
                            ref={bidRef}
                            name="price"
                            type="Number"
                            // onBlur={(e) => {
                            //   setProdPriceInp(Number(e.target.value + 1))
                            // }}
                            // type="Number"
                            // onChange={() => {
                            //   setProdPriceInp()
                            // }}
                            className="fw-bolder form-control border-0 text-center text-decoration-none bg- bg-white"
                            id="bidPriceInp"
                          />

                          <button
                            type="button"
                            onClick={() => {
                              setProdPriceInp(prodPriceInp + 1)
                            }}
                            className="btn shadow-none fw-bolder"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="col-lg-3 px-lg-3 justify-content-md-between d-flex">
                        <button
                          onClick={() => {
                            console.log(ended)
                          }}
                          type="submit"
                          className={`${
                            ended ? 'disabled' : ''
                          } bi bi-hammer btn btn-danger rounded-pill  w-50`}
                        ></button>

                        {/* ///////////////////////////////////////////////////////// */}
                        <button
                          type="button"
                          className={`bi bi-heart-fill btn btn-outline-dark  rounded-circle me-2 ${
                            stateFavorites ? 'favorite' : ''
                          }`}
                          onClick={(event) => {
                            if (stateFavorites) {
                              // event.currentTarget.dataset.state = false
                              setstateFavorites(false)
                              changeFavorites(item._id, false)

                              return
                            }
                            if (!stateFavorites) {
                              // event.currentTarget.dataset.state = false
                              setstateFavorites(true)
                              changeFavorites(item._id, true)

                              return
                            }
                          }}
                        ></button>
                      </div>

                      <div className="col-lg-5 p-lg-0  float-lg-end">
                        <button
                          onClick={buyNow}
                          type="button"
                          className="float-lg-end ms-lg-1 btn btn-outline-secondary w-75 rounded-pill me-2"
                        >
                          BUY NOW FOR ${prodPriceInp + 100}
                        </button>
                      </div>
                    </form>
                  )}
                  <div>
                    <p>
                      SKU:
                      {item._id
                        .substring(item._id.length - 8, item._id.length)
                        .toUpperCase()}
                    </p>
                    <p className="mb-0 mt-4">
                      Category:{' '}
                      <Link to={'/cat/' + item.category_s_id}>
                        {item.catName}
                      </Link>
                    </p>
                    <p>Tags: {item.tags}</p>
                  </div>
                </div>
              </div>

              <BottomTabs item={item} />
            </div>
          )
        })}
      </div>
      <Footer />
      <div className="container-fluid"></div>
    </React.Fragment>
  )
}

export default ProdSingleInfo
