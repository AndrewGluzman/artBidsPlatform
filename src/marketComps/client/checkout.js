import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import CartSide from './cartSide'
import AuthClient from './authClient'
import { doApiMethod, URL_API } from '../../services/apiSer'
import PayPalBtn from '../common/paypalBtn'

function Checkout(props) {
  let dispatch = useDispatch()
  let carts_ar = useSelector((myStore) => myStore.carts_ar)
  let totalCart = 0
  let history = useHistory()

  const checkoutReal = async (_id_paypalOrder = '00000') => {
    let obj = {
      carts_ar: JSON.stringify(carts_ar),
      total: totalCart,
      paypal_id: _id_paypalOrder,
    }
    let url = URL_API + '/carts'
    try {
      let data = await doApiMethod(url, 'POST', obj)
      if (data.n == 1) {
        toast.success('Your order been updated')
      } else if (data._id) {
        toast.success('Thank You for your Purchase!')

        dispatch({ type: 'EMPTY_THE_CART', item: [] })
        history.push('/')
      } else {
        toast.error('there problem come back tommrow')
      }
    } catch (err) {
      console.log(err)
      toast.error('there problem come back tommrow 222')
    }
  }

  const addProd = (item) => {
    item.count += 1
    dispatch({ type: 'UPDATE_THE_CART', item: item })
  }

  const reduceProd = (item) => {
    if (item.count > 0) {
      item.count -= 1
      dispatch({ type: 'UPDATE_THE_CART', item: item })
    }
  }

  return (
    <React.Fragment>
      <AuthClient />
      <CartSide />
      <div className="container">
        <div className="breadcrumb">
          <Link className="breadcrumb-item text-secondary" to="/">
            Home/
          </Link>
        </div>
        <h1 className="h3 fw-bolder mb-5">
          <span>Checkout:</span>
        </h1>
        <div className="row ">
          <div className="col-lg-9 p-2">
            {carts_ar.map((item, i) => {
              totalCart += item.count * item.price
              return (
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <button
                      onClick={() => {
                        reduceProd(item)
                      }}
                      className="btn"
                    >
                      <i class="h3 bi bi-x-circle"></i>
                    </button>
                  </div>
                  <div className="col-2">
                    <img
                      src={URL_API + item.img}
                      className="w-100 p-4 easy_shadow"
                    />
                  </div>
                  <div className="">
                    <Link
                      to={'/single/' + item._id}
                      className=" text-dark text-decoration-none "
                    >
                      <h4 className="ms-5 h4 prod_name_box">{item.name}</h4>
                    </Link>
                    <p className="ms-5 h5">
                      ${(item.count * item.price).toFixed(2)}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
          <div
            className="col-lg-3 mt-5 p-2 d-flex justify-content-center align-items-end text-center"
            style={{ height: '300px' }}
          >
            <div>
              <h3 className="my-4">Total price: ${totalCart.toFixed(2)}</h3>
              {/* <button onClick={checkoutReal} className="btn btn-outline-info w-100">Commit buy</button> */}
              <PayPalBtn
                successFunc={checkoutReal}
                total={totalCart.toFixed(2)}
                clientId="AdN9Nw8APc7nOYkqZA0mpCJt0I-ADKNqwYne-MJL4VDsHgFsGsLr4yeQM5BaGdX9vNg14Yk1AuhxX_To"
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Checkout

// AdN9Nw8APc7nOYkqZA0mpCJt0I-ADKNqwYne-MJL4VDsHgFsGsLr4yeQM5BaGdX9vNg14Yk1AuhxX_To
