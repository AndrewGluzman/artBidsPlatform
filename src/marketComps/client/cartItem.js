import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function CartItem(props) {
  let dispatch = useDispatch()

  let item = props.item

  useEffect(async () => {
    // item.name =
    //   (await item.name.length) > 11
    //     ? item.name.substr(0, 10) + '...'
    //     : item.name
  }, [props])

  const delFromCart = () => {
    item.count = 0
    dispatch({ type: 'UPDATE_THE_CART', item: item })
  }

  return (
    <div className="p-4 mt-3 easy_shadow">
      {item.name} : {item.count} , ${item.price.toFixed(2)}
      <span onClick={delFromCart} className="float-end text-danger ">
        <i class="bi bi-x"></i>
      </span>
    </div>
  )
}

export default CartItem
