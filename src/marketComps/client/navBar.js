import React, { useEffect, useState } from 'react'
import { doApiGet, URL_API } from '../../services/apiSer'
import { Link } from 'react-router-dom'
import '../../App.css'

function NavBar(props) {
  let [cat, setCat] = useState({})
  let [prods_ar, setProdsAr] = useState([])
  let [dropMenue, setdropMenu] = useState(false)

  useEffect(() => {
    doApi()
  }, [])

  const doApi = async () => {
    // // first get the category name by its id from props
    // let url1 = URL_API + '/categories/single/' + props.catId
    // let catInfo = await doApiGet(url1)
    // setCat(catInfo)
    // // second: get the list of prods of the same category
    // let url = URL_API + '/prods/?cat=' + props.catId + '&perPage=4'
    // console.log(url)
    // let prodsData = await doApiGet(url)
    // console.log(prodsData)
    // setProdsAr(prodsData)
  }
  return (
    <>
      <nav className="navbar p-0 navbar-expand-lg navbar-light shadow mb-md-5 mt-md-1">
        <div className="container-fluid p-sm-0 ">
          <a className="navbar-brand" href="#"></a>

          <button
            className="navbar-toggler .navbar-brand m-2 bg-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon justify-content-end"></span>
          </button>
          <div className="collapse navbar-collapse  " id="navbarNavDropdown">
            <div className="col-md-7 align-items-center">
              <ul className="navbar-nav  align-items-center position-relative ">
                <div className="d-flex align-items-lg-center">
                  <li
                    className="nav-item bg-white  mx-md-4 m-sm-0 d-sm-none d-md-block cat_title"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    onClick={() => {
                      if (dropMenue) {
                        setdropMenu(false)
                      } else {
                        setdropMenu(true)
                      }
                    }}
                  >
                    {' '}
                    <div>
                      <h6 className="w-100 nav-link text-dark categories_title h6 mt-1 p-3 mx-4 fw-bolder navbar-text">
                        <i className="bi bi-list me-1 navbar-text"></i>
                        CATEGORIES
                      </h6>
                    </div>
                  </li>
                  {dropMenue && (
                    <div class="drop_menue text-decoration-none px-3 pt-4 mx-1 mt-2 col-3 shadow">
                      <div
                        onClick={() => {
                          setdropMenu(false)
                        }}
                      >
                        <Link to="/cat/10">
                          <p className="fw-bold text-secondary px-1 dropdown_item">
                            Paintings
                          </p>
                        </Link>
                      </div>
                      <div
                        onClick={() => {
                          setdropMenu(false)
                        }}
                      >
                        <Link to="/cat/1">
                          <p className="fw-bold text-secondary px-1 dropdown_item">
                            Photography
                          </p>
                        </Link>
                      </div>
                      <div
                        onClick={() => {
                          setdropMenu(false)
                        }}
                      >
                        <Link to="/cat/2">
                          <p className="fw-bold text-secondary px-1 dropdown_item">
                            Digital Art
                          </p>
                        </Link>
                      </div>
                      <div
                        onClick={() => {
                          setdropMenu(false)
                        }}
                      >
                        <Link to="/cat/3">
                          <p className="fw-bold text-secondary px-1 dropdown_item">
                            Sculpture
                          </p>
                        </Link>
                      </div>
                      <div
                        onClick={() => {
                          setdropMenu(false)
                        }}
                      >
                        <Link to="/cat/5">
                          <p className="fw-bold text-secondary px-1 dropdown_item">
                            Drawing
                          </p>
                        </Link>
                      </div>
                      <div
                        onClick={() => {
                          setdropMenu(false)
                        }}
                      >
                        <Link to="/cat/4">
                          <p className="fw-bold text-secondary px-1 dropdown_item">
                            Installations
                          </p>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
                <li className="nav-item ">
                  <Link to="/">
                    <p className="navbar-text fw-bolder m-2  text-light text-decoration-none ">
                      Home
                    </p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/artists">
                    <p className="navbar-text fw-bolder m-2 text-light ">
                      Artists
                    </p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/about">
                    <p className="navbar-text fw-bolder m-2 text-light ">
                      About
                    </p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/contact">
                    <p className="navbar-text fw-bolder m-2 text-light ">
                      Contact
                    </p>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-5 align-items-center  ">
              <ul className="navbar-nav justify-content-sm-center justify-content-lg-end align-items-center ">
                {!localStorage['tok'] ? (
                  <li className="nav-item text-center">
                    {/* <a className="nav-link active " aria-current="page"> */}
                    <Link to="/login">
                      <p className="navbar-text fw-bolder m-2  text-light text-decoration-none ">
                        Sign in
                      </p>
                    </Link>
                    {/* </a> */}
                  </li>
                ) : (
                  <>
                    <li className="nav-item text-center">
                      {/* <a className="nav-link active " aria-current="page"> */}
                      <Link to="/profile/accountSettings">
                        <p className="navbar-text fw-bolder m-2  text-light text-decoration-none ">
                          Account
                        </p>
                      </Link>
                      {/* </a> */}
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link active btn  "
                        aria-current="page"
                        onClick={props.onLogOut}
                      >
                        <p className="navbar-text fw-bolder m-2  text-light text-decoration-none ">
                          Sign Out
                        </p>
                      </a>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
      {/* {dropMenue && (
        <div className="position-absolute drop_menue text-decoration-none px-5 pt-2 mx-1 col-2">
          <div>
            <Link to="/cat/1">
              <p className="fw-bold text-secondary px-1">Paintings</p>
            </Link>
          </div>
          <div>
            <Link to="/cat/1">
              <p className="fw-bold text-secondary px-1">Photography</p>
            </Link>
          </div>
          <div>
            <Link to="/cat/1">
              <p className="fw-bold text-secondary px-1">Digital Art</p>
            </Link>
          </div>
          <div>
            <Link to="/cat/1">
              <p className="fw-bold text-secondary px-1">Sculpture</p>
            </Link>
          </div>
        </div>
      )} */}
    </>
  )
}

export default NavBar
{
  /* <ul
                    className="dropdown-menu  px-5 "
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li>
                      <a
                        className="dropdown-item fw-bold text-secondary"
                        href="#"
                      >
                        Paintings
                      </a>
                    </li>
                    <div>
                      <Link to="/cat/1">
                        <p className="fw-bold text-secondary"></p>Photography
                      </Link>
                    </div>
                    <li>
                      <a
                        className="dropdown-item fw-bold text-secondary"
                        href="#"
                      >
                        Digital Art
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item fw-bold text-secondary"
                        href="#"
                      >
                        Sculpture
                      </a>
                    </li>
                  </ul> */
}
