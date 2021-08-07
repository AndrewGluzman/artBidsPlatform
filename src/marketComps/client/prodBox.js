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

function ProdBox(props) {
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
    <LazyLoad height="500" className="col-lg-3 p-2 text-center">
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        element={modalElement(item)}
        animation={true}
      />

      <div className=" px-3 shadow prod_box w-100 card position-relative col-sm-3 ">
        <div className="p-3 overflow-hidden h-100 d-flex justify-content-center ">
          <button
            onClick={() => setModalShow(true)}
            to={'/single/' + item._id}
            className="shadow py-1 px-2 bi bi-eye btn btn-danger rounded-circle text-decoration-none position-absolute"
          ></button>

          <Link
            to={'/single/' + item._id}
            className="shadow py-1 px-2 bi bi-hammer  btn btn-danger rounded-circle text-decoration-none position-absolute"
          ></Link>

          <button
            className={` shadow py-1 px-2 bi bi-heart  btn btn-danger rounded-circle text-decoration-none position-absolute ${
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

          {item.img.includes('http') ? (
            <img className=" h-100" src={item.img}></img>
          ) : (
            <img className=" h-100 " src={URL_API + item.img}></img>
          )}
        </div>

        {/* <div className="card-body align-items-end"></div> */}
        <div className="h-25 align-items-end d-flex">
          <div className="card-body align-items-end bg bg-white  border-top">
            <Link
              to={'/single/' + item._id}
              className=" text-dark text-decoration-none "
            >
              {' '}
              <h5 className="prod_name_box">{item.name}</h5>
            </Link>
            {item.bids[0] ? (
              <h6>
                Current Bid: ${item.bids[item.bids.length - 1].price.toFixed(2)}
              </h6>
            ) : (
              <h6>Starting Bid: ${item.price.toFixed(2)}</h6>
            )}
          </div>
        </div>
      </div>
    </LazyLoad>
  )
}

export default ProdBox

const modalElement = (item_modal) => {
  let prodData = [item_modal]

  return (
    <>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div closeButton></div>
        <div className="">
          {prodData.map((item) => {
            let img = item.img.includes('http') ? item.img : URL_API + item.img

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
                    <p className="h2 tw-bold text-dark ">{item.name}</p>
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
                      <button
                        // onClick={}
                        type="button"
                        className="float-lg-end ms-lg-1 btn btn-outline-danger tw-bold w-75 rounded-pill me-2 modal-button-buynow"
                      >
                        BUY NOW FOR ${item.price + 100}
                      </button>
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

{
  /* <div>Info: {item.info.substr(0, 50)}</div> */
}
{
  /* <div className="my-3 d-flex justify-content-center align-items-center">
          <button className="btn btn-outline-success rounded-circle me-3" onClick={reduceProd}>-</button>
          <span className="h4 mt-1"> {countProd} </span>
          <button className="btn btn-outline-success rounded-circle ms-3" onClick={addProd} >+</button>
        </div>
        <Link to={"/single/"+item._id} className="text-success text-decoration-none">More info</Link> */
}
