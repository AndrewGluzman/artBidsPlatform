import React from 'react'
import { Navbar, Container, NavDropdown, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../../App.css'

function NavBar(props) {
  return (
    <>
      <nav className="navbar p-0 navbar-expand-lg navbar-light shadow mb-md-5 mt-md-1">
        <div className="container-fluid p-sm-0 ">
          <a class="navbar-brand" href="#"></a>

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
              <ul className="navbar-nav  align-items-center ">
                <li className="nav-item bg-white  mx-md-4 m-sm-0 d-sm-none d-md-block cat_title ">
                  <h6
                    className="nav-link text-dark categories_title h6 mt-1 p-3 mx-4 fw-bolder navbar-text"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    data-mdb-animation-start="onHover"
                  >
                    <i className="bi bi-list me-1 navbar-text"></i> CATEGORIES
                  </h6>
                  <ul
                    className="dropdown-menu  px-5"
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
                    <li>
                      <a
                        className="dropdown-item fw-bold text-secondary"
                        href="#"
                      >
                        Photography
                      </a>
                    </li>
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
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link active " aria-current="page">
                    <Link to="/">
                      <p className="navbar-text fw-bolder m-2  text-light text-decoration-none ">
                        Home
                      </p>
                    </Link>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active " aria-current="page" href="#">
                    <p className="navbar-text fw-bolder m-2 text-light ">
                      Artists
                    </p>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active " aria-current="page" href="#">
                    <p className="navbar-text fw-bolder m-2 text-light ">
                      About
                    </p>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active " aria-current="page" href="#">
                    <p className="navbar-text fw-bolder m-2 text-light ">
                      Contact
                    </p>
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-5 align-items-center  ">
              <ul className="navbar-nav justify-content-end ">
                {!localStorage['tok'] ? (
                  <li className="nav-item">
                    <a className="nav-link active " aria-current="page">
                      <Link to="/login">
                        <p className="navbar-text fw-bolder m-2  text-light text-decoration-none ">
                          Sign in
                        </p>
                      </Link>
                    </a>
                  </li>
                ) : (
                  <>
                    <li className="nav-item">
                      <a className="nav-link active " aria-current="page">
                        <Link to="/profile/accountSettings">
                          <p className="navbar-text fw-bolder m-2  text-light text-decoration-none ">
                            Account
                          </p>
                        </Link>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link active btn p-0 pt-2 "
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
    </>
  )
}

export default NavBar
