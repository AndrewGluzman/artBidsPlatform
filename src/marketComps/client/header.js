import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import NavBar from './navBar'

function Header(props) {
  let history = useHistory()
  let carts_ar = useSelector((store) => store.carts_ar)
  let dispatch = useDispatch()
  let searchRef = useRef()

  const onLogOut = () => {
    // log out the user by delete the token
    localStorage.removeItem('tok')
    localStorage.removeItem('userName')
    history.push('/login')
  }

  const onSearchClick = () => {
    let searchQ = searchRef.current.value
    let url = '/search/?q=' + searchQ
    if (searchQ.length > 0) {
      history.push(url)
    }
    // alert(searchQ);
  }

  return (
    <div className="container-fluid">
      <div className="container-xxl">
        <div className="d-flex row align-items-center my-2">
          <div className="row d-flex col-md-9 align-items-center">
            <p className="col-md-4 align-items-center m-0 text-secondary">
              Call us toll free: +972-541-754-3010
            </p>
            <p className="col-md-6 align-items-center m-0 text-secondary fw-light">
              Send us an email: $4art@$gmail.com
            </p>
          </div>
          <div className="col-md-3 m-0 d-flex justify-content-md-end text-secondary">
            <i className="bi bi-heart pe-2"></i>Whishlist
          </div>
        </div>

        <hr className="m-0" />

        <div className="row  align-items-center p-2">
          <div className="col-md-4 row align-items-center  ms-2">
            <Link to="/" className="col-lg-6 justify-content-start">
              <img src="/logo1.png" className=" logo" />
            </Link>
          </div>
          <div className="col-md-4 d-flex my-3 my-lg-0 justify-content-center">
            <input
              autoFocus
              onKeyDown={(evt) => {
                if (evt.key == 'Enter') {
                  onSearchClick()
                }
              }}
              ref={searchRef}
              type="search"
              className="circleB"
              placeholder="  Search products"
            />
            <button onClick={onSearchClick} className="btn btn-dark search_btn">
              {searchIcon()}
            </button>
          </div>
          <div className="col-md-4 d-flex justify-content-center justify-content-lg-end align-items-center my-2 my-lg-0">
            <h3
              className="cart_header_icon me-2 text-success"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                dispatch({ type: 'SHOW_HIDE_CART', flag: true })
              }}
            >
              {/* פונקציה שיש בה את האייקון
              של הקניות נמצא למטה בקובץ */}
              {cartIcon()}
              {
                // רק אם יש מוצרים בעגלה יוצג האייקון
                carts_ar.length > 0 && (
                  <div
                    className="badge bg-danger"
                    style={{ fontSize: '0.5em' }}
                  >
                    {cartTotal(carts_ar)}
                  </div>
                )
              }
            </h3>
            {localStorage['tok'] ? (
              <Link to="/checkout" className="btn btn-outline-success me-2">
                Checkout
              </Link>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="navbar-nav">
          <NavBar onLogOut={onLogOut} />
        </div>
      </div>
    </div>
  )
}

// מחשב כמה מוצרים יש בסהכ בעגלה
const cartTotal = (carts_ar) => {
  let total = 0
  carts_ar.map((item) => {
    total += item.count
  })
  return total
}

const cartIcon = () => {
  return (
    <i class="bi bi-basket"></i>

    // <svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   width="32"
    //   height="32"
    //   fill="currentColor"
    //   className="bi bi-basket"
    //   viewBox="0 0 16 16"
    // >
    //   <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
    // </svg>
  )
}

const searchIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-search"
      viewBox="0 0 16 16"
    >
      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
    </svg>
  )
}

export default Header
