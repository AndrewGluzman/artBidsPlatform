import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CartItem from './cartItem'
import './css/cart.css'

function CartSide(props) {
  let dispatch = useDispatch()
  let [animClassCss, setAnimCss] = useState('')
  let total = 0
  console.log('total', total)

  let showCart = useSelector((myStore) => myStore.showCart)
  let carts_ar = useSelector((myStore) => myStore.carts_ar)
  useEffect(() => {
    console.log('show')
    if (showCart) {
      setAnimCss('cart_side_start')
    } else {
      setAnimCss('cart_side_out')
    }
  }, [showCart])

  return (
    <React.Fragment>
      {
        // todo: enter in animation from right side

        <div className={'cart_side p-3 rounded ' + animClassCss}>
          <button
            onClick={() => {
              dispatch({ type: 'SHOW_HIDE_CART', flag: false })
            }}
            className="btn  float-end"
          >
            <i class="bi bi-x-circle"></i>
          </button>
          <h2>Cart:</h2>
          <div className="cart_items">
            {carts_ar.map((item) => {
              if (item.count > 0) {
                total += item.price * item.count
                return <CartItem key={item._id} item={item} />
              }
            })}
          </div>
          <div className="d-flex justify-content-between mt-2 align-items-center">
            <h4 className="mt-2">Total: {total.toFixed(2)} Nis</h4>
            {localStorage['tok'] ? (
              <Link
                to="/checkout"
                className="btn btn-outline-success rounded-pill me-2"
              >
                Checkout
              </Link>
            ) : (
              <Link
                to="/login"
                className="btn btn_filter text-white rounded-pill mb-2 p-2 mx-2"
              >
                Sign in..
              </Link>
            )}
          </div>
        </div>
      }
    </React.Fragment>
  )
}

export default CartSide
