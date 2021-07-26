import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LazyLoad from 'react-lazyload'
import { Link } from 'react-router-dom'
import { URL_API } from '../../services/apiSer'

function ProdBox(props) {
  let dispatch = useDispatch()

  // let cartProd = props.item.count || 0
  let [countProd, setCountProd] = useState(0)
  let carts_ar = useSelector((mystore) => mystore.carts_ar)

  let item = props.item

  useEffect(() => {
    // check if the product in the cart from redux
    // and update the counter of prod

    carts_ar.map((prodItem) => {
      if (prodItem._id == item._id) {
        setCountProd(prodItem.count)
      }
    })
  }, [carts_ar])

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
      <div className=" px-3 shadow prod_box w-100 card position-relative ">
        <div className="p-3 overflow-hidden h-100 d-flex justify-content-center ">
          <Link
            to={'/single/' + item._id}
            className="shadow py-1 px-2 bi bi-eye btn btn-danger rounded-circle text-decoration-none position-absolute"
          ></Link>

          <Link
            to={'/single/' + item._id}
            className="shadow py-1 px-2 bi bi-hammer  btn btn-danger rounded-circle text-decoration-none position-absolute"
          ></Link>

          <button className="shadow py-1 px-2 bi bi-heart  btn btn-danger rounded-circle text-decoration-none position-absolute"></button>

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
              className=" text-dark text-decoration-none"
            >
              {' '}
              <h5>{item.name}</h5>
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

        {/* <div>Info: {item.info.substr(0, 50)}</div> */}
        {/* <div className="my-3 d-flex justify-content-center align-items-center">
          <button className="btn btn-outline-success rounded-circle me-3" onClick={reduceProd}>-</button>
          <span className="h4 mt-1"> {countProd} </span>
          <button className="btn btn-outline-success rounded-circle ms-3" onClick={addProd} >+</button>
        </div>
        <Link to={"/single/"+item._id} className="text-success text-decoration-none">More info</Link> */}
      </div>
    </LazyLoad>
  )
}

export default ProdBox
