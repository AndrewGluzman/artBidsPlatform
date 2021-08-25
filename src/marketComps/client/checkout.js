import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
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
        <h1>Checkout</h1>
        <h3>List of product in your cart:</h3>
        <div className="row">
          <div className="col-lg-9 p-2">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Price</th>
                  <th>img</th>
                  <th>---</th>
                </tr>
              </thead>
              <tbody>
                {carts_ar.map((item, i) => {
                  totalCart += item.count * item.price
                  return (
                    <tr>
                      <td>{i + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.count}</td>
                      <td>{(item.count * item.price).toFixed(2)}</td>
                      <td className="w-25 p-3">
                        <img src={URL_API + item.img} className="w-50" />
                      </td>
                      <td>
                        <div className="d-flex">
                          <button
                            onClick={() => {
                              reduceProd(item)
                            }}
                            className="btn btn-outline-danger rounded-circle px-3 py-2"
                          >
                            <span className="">X</span>
                          </button>
                          {/* <button
                            onClick={() => {
                              addProd(item)
                            }}
                            className="btn btn-info"
                          >
                            +
                          </button> */}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div
            className="col-lg-3 border p-2 d-flex justify-content-center align-items-center text-center"
            style={{ height: '300px' }}
          >
            <div>
              <h3>Total price: ${totalCart.toFixed(2)}</h3>
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
