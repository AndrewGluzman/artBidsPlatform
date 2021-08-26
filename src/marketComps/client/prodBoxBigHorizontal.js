import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LazyLoad from 'react-lazyload'
import { Link } from 'react-router-dom'
import {
  URL_API,
  changeFavorites,
  doApiMethod,
  checkIfTokenValid,
} from '../../services/apiSer'
import MyVerticallyCenteredModal from './modlal'
import { Modal } from 'react-bootstrap'
import './css/zoomOnImagePlugin.css'
import '../../App.css'
import InnerImageZoom from 'react-inner-image-zoom'
import TimerSingleProd from './timerSingleProd'

function ProdBoxBigHorizontal(props) {
  let dispatch = useDispatch()

  // let cartProd = props.item.count || 0
  let [countProd, setCountProd] = useState(0)
  const [modalShow, setModalShow] = React.useState(false)
  let carts_ar = useSelector((mystore) => mystore.carts_ar)
  const [stateFavorites, setstateFavorites] = useState(false)

  let item = props.item

  useEffect(() => {
    // check if the product in the cart from redux
    // and update the counter of prod

    carts_ar.map((prodItem) => {
      if (prodItem._id == item._id) {
        setCountProd(prodItem.count)
      }
    })
    checkFavorites()
  }, [carts_ar])

  const checkFavorites = async () => {
    // checkIfTokenValid()needed to check it in home page
    if (localStorage['tok']) {
      let url = URL_API + `/users/favorites`
      let favorites = await doApiMethod(url, 'POST', {})
      favorites.includes(item._id)
        ? setstateFavorites(true)
        : setstateFavorites(false)
      return
    }

    if (localStorage['favorites']) {
      JSON.parse(localStorage.getItem('favorites')).includes(item._id)
        ? setstateFavorites(true)
        : setstateFavorites(false)
    }
  }

  const addProd = () => {
    setCountProd(countProd + 1)
    item.count = countProd + 1
    dispatch({ type: 'UPDATE_THE_CART', item: item })
  }

  const reduceProd = () => {
    if (countProd > 0) {
      setCountProd(countProd - 1)
      item.count = countProd - 1
      dispatch({ type: 'UPDATE_THE_CART', item: item })
    }
  }

  return (
    <LazyLoad height="100" className="col-md-12  py-3  ProdBoxBigHorizontal">
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        element={modalElement(item)}
        animation={true}
      />

      <div className="card  rounded-0 border-0 shadow position-relative ">
        <div style={{ minHeight: '300px' }} className="d-flex g-0">
          <div className="col-md-4 align-self-center d-flex ms-2">
            {item.img.includes('http') ? (
              <img
                className=" img-fluid mx-auto  my-3"
                style={{ maxHeight: '250px', maxWidth: '200px' }}
                src={item.img}
              ></img>
            ) : (
              <img
                className=" img-fluid mx-auto  my-3"
                style={{ maxHeight: '250px', maxWidth: '200px' }}
                src={URL_API + item.img}
              ></img>
            )}
          </div>
          <div className="col-md-8 d-flex align-items-center">
            <div className="card-body " style={{ maxHeight: '250px' }}>
              <div className="d-flex">
                <div className="d-flex pt-1 px-4 col-7 easy_shadow justify-content-between text-center mb-3 bg-body rounded small_timer">
                  <TimerSingleProd date={item.date_created} />
                </div>
                {/* Buttons bid, view, fav*/}
                <div className=" col-5 card_small d-flex align-items-center justify-content-center mb-3">
                  <Link
                    to={'/single/' + item._id}
                    className="shadow  py-1 px-2 bi bi-hammer  btn btn-danger rounded-circle text-decoration-none "
                  ></Link>
                  <button
                    onClick={() => setModalShow(true)}
                    to={'/single/' + item._id}
                    className="shadow py-1 mx-4 px-2 bi bi-eye btn btn-danger rounded-circle text-decoration-none "
                  ></button>

                  <button
                    className={` shadow py-1 px-2 bi bi-heart  btn btn-danger rounded-circle text-decoration-none ${
                      stateFavorites ? 'favorite2' : ''
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
              </div>
              <Link
                to={'/single/' + item._id}
                className=" text-dark text-decoration-none "
              >
                <h5 className="prod_name_box">{item.name}</h5>
              </Link>
              <p className="text-secondary mt-3 fw-light">{item.info} </p>

              {item.bids[0] ? (
                <h6>
                  Current Bid: $
                  {item.bids[item.bids.length - 1].price.toFixed(2)}
                </h6>
              ) : (
                <h6>Starting Bid: ${item.price.toFixed(2)}</h6>
              )}
            </div>
          </div>
        </div>
      </div>
    </LazyLoad>
  )
}

export default ProdBoxBigHorizontal

const modalElement = (item_modal) => {
  let prodData = [item_modal]

  return (
    <>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div closeButton></div>
        <div className="">
          {prodData.map((item) => {
            let img = item.img?.includes('http') ? item.img : URL_API + item.img

            return (
              <div key={item._id}>
                <div className="row align-items-md-center">
                  <div className="col-lg-5  position-relative ">
                    <div className="w-100 p-4 shadow">
                      <div
                        className="
                   justify-content-center  d-flex"
                      >
                        <InnerImageZoom
                          src={img}
                          zoomSrc={img}
                          zoomType="hover"
                          zoomPreload={true}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 text-center text-lg-start ms-4 p-lg-0 text-secondary">
                    <p className="h2 fw-bolder text-dark ">{item.name}</p>
                    {/* //checks if there is bids exist if no shows starting price */}
                    <div className="border-bottom pb-3">
                      {item.bids != 0 ? (
                        <h4 className="fw-light text-dark mt-4">
                          Winning Bid:
                          <span className="">
                            ${item.bids[item.bids.length - 1].price.toFixed(2)}
                          </span>
                        </h4>
                      ) : (
                        <h4 className="text-dark">
                          Starting price is : ${item.price}
                        </h4>
                      )}
                    </div>
                    <p className="text-secondary mt-3">{item.info} </p>

                    <div className="col-lg-5 p-lg-0  float-lg-end ">
                      <Link
                        to={'/single/' + item._id}
                        className=" float-lg-end ms-lg-1 btn btn-outline-danger tw-bold w-75 rounded-pill me-2 modal-button-buynow "
                      >
                        <i class="bi bi-hammer"></i> BID NOW!
                      </Link>
                    </div>
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
              </div>
            )
          })}
        </div>
      </Modal.Body>
    </>
  )
}
