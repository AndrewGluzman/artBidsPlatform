import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'

import { toast } from 'react-toastify'

import Header from './header'
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
      <Header />
      <CartSide />
      <div>
        <div className="card">
          <div className="row">
            <div className="col-md-8 cart">
              <div className="title">
                <div className="row">
                  <div className="col">
                    <h4>
                      <b>Shopping Cart</b>
                    </h4>
                  </div>
                  <div className="col align-self-center text-right text-muted">
                    3 items
                  </div>
                </div>
              </div>
              <div className="row border-top border-bottom">
                <div className="row main align-items-center">
                  <div className="col-2">
                    <img
                      className="img-fluid"
                      src="https://i.imgur.com/1GrakTl.jpg"
                    ></img>
                  </div>
                  <div className="col">
                    <div className="row text-muted">Shirt</div>
                    <div className="row">Cotton T-shirt</div>
                  </div>
                  <div className="col">
                    {' '}
                    <a href="#">-</a>
                    <a href="#" className="border">
                      1
                    </a>
                    <a href="#">+</a>{' '}
                  </div>
                  <div className="col">
                    &euro; 44.00 <span className="close">&#10005;</span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="row main align-items-center">
                  <div className="col-2">
                    <img
                      className="img-fluid"
                      src="https://i.imgur.com/ba3tvGm.jpg"
                    ></img>
                  </div>
                  <div className="col">
                    <div className="row text-muted">Shirt</div>
                    <div className="row">Cotton T-shirt</div>
                  </div>
                  <div className="col">
                    {' '}
                    <a href="#">-</a>
                    <a href="#" className="border">
                      1
                    </a>
                    <a href="#">+</a>{' '}
                  </div>
                  <div className="col">
                    &euro; 44.00 <span className="close">&#10005;</span>
                  </div>
                </div>
              </div>
              <div className="row border-top border-bottom">
                <div className="row main align-items-center">
                  <div className="col-2">
                    <img
                      className="img-fluid"
                      src="https://i.imgur.com/pHQ3xT3.jpg"
                    ></img>
                  </div>
                  <div className="col">
                    <div className="row text-muted">Shirt</div>
                    <div className="row">Cotton T-shirt</div>
                  </div>
                  <div className="col">
                    {' '}
                    <a href="#">-</a>
                    <a href="#" className="border">
                      1
                    </a>
                    <a href="#">+</a>{' '}
                  </div>
                  <div className="col">
                    &euro; 44.00 <span className="close">&#10005;</span>
                  </div>
                </div>
              </div>
              <div className="back-to-shop">
                <a href="#">&leftarrow;</a>
                <span className="text-muted">Back to shop</span>
              </div>
            </div>
            <div className="col-md-4 summary">
              <div>
                <h5>
                  <b>Summary</b>
                </h5>
              </div>
              {/* <hr> */}
              <div className="row">
                <div className="col" style="padding-left:0;">
                  ITEMS 3
                </div>
                <div className="col text-right">&euro; 132.00</div>
              </div>
              <form>
                <p>SHIPPING</p>{' '}
                <select>
                  <option className="text-muted">
                    Standard-Delivery- &euro;5.00
                  </option>
                </select>
                <p>GIVE CODE</p>
                <input id="code" placeholder="Enter your code"></input>
              </form>
              <div
                className="row"
                style="border-top: 1px solid rgba(0,0,0,.1); padding: 2vh 0;"
              >
                <div className="col">TOTAL PRICE</div>
                <div className="col text-right">&euro; 137.00</div>
              </div>
              <button className="btn">CHECKOUT</button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Checkout

// AdN9Nw8APc7nOYkqZA0mpCJt0I-ADKNqwYne-MJL4VDsHgFsGsLr4yeQM5BaGdX9vNg14Yk1AuhxX_To
// const checkoutFunc = () => {
//   return (
//     <div className="container">
//       <h1>Checkout</h1>
//       <h3>List of product in your cart:</h3>
//       <div className="row">
//         <div className="col-lg-9 p-2">
//           <table className="table">
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Name</th>
//                 <th>Amount</th>
//                 <th>Price</th>
//                 <th>img</th>
//                 <th>---</th>
//               </tr>
//             </thead>
//             <tbody>
//               {carts_ar.map((item, i) => {
//                 totalCart += item.count * item.price
//                 return (
//                   <tr>
//                     <td>{i + 1}</td>
//                     <td>{item.name}</td>
//                     <td>{item.count}</td>
//                     <td>{(item.count * item.price).toFixed(2)}</td>
//                     <td className="w-25">
//                       <img src={item.img} className="w-50" />
//                     </td>
//                     <td>
//                       <div className="d-flex">
//                         <button
//                           onClick={() => {
//                             reduceProd(item)
//                           }}
//                           className="btn btn-danger"
//                         >
//                           -
//                         </button>
//                         <button
//                           onClick={() => {
//                             addProd(item)
//                           }}
//                           className="btn btn-info"
//                         >
//                           +
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 )
//               })}
//             </tbody>
//           </table>
//         </div>
//         <div
//           className="col-lg-3 border p-2 d-flex justify-content-center align-items-center text-center"
//           style={{ height: '300px' }}
//         >
//           <div>
//             <h3>Total price: ${totalCart.toFixed(2)}</h3>
//             {/* <button onClick={checkoutReal} className="btn btn-outline-info w-100">Commit buy</button> */}
//             <PayPalBtn
//               successFunc={checkoutReal}
//               total={totalCart.toFixed(2)}
//               clientId="AdN9Nw8APc7nOYkqZA0mpCJt0I-ADKNqwYne-MJL4VDsHgFsGsLr4yeQM5BaGdX9vNg14Yk1AuhxX_To"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
