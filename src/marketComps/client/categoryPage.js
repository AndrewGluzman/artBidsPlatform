import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { doApiGet, URL_API } from '../../services/apiSer'
import PageNav from '../misc/pagesNav'
import CartSide from './cartSide'
import Footer from './footer'
import Header from './header'
import MultiRangeSlider from './multiRangeSlider'
import ProdBox from './prodBox'
import ProdBoxBigHorizontal from './prodBoxBigHorizontal'
import ProdBoxNewAuctions from './prodBoxNewAuctions'

function CategoryPage(props) {
  let [cat, setCat] = useState({})
  let [prods_ar, setProdsAr] = useState([])
  let [togleView, setTogleView] = useState(true)
  let selectRef = useRef()

  useEffect(() => {
    doApi()

    // props.match -  חשוב מכיוון שנרצה שהפונקציה תפעל כל פעם שיו אר אל משתנה למעלה
  }, [props.match])

  const doApi = async () => {
    // להוציא את המידע על הקטגוריה

    let url1 = URL_API + '/categories/single/' + props.match.params.id
    let dataCat = await doApiGet(url1)
    setCat(dataCat)

    // להוציא את כל המוצרים , נניח 8 בדף
    let currentPage = props.match.params.page || 0
    // sort -> לוקח מידע מהסלקט שלנו
    let url =
      URL_API +
      `/prods/?cat=${dataCat.s_id}&perPage=8&page=${currentPage}&sort=${selectRef.current.value}`

    let prodsData = await doApiGet(url)
    setProdsAr(prodsData)
    // לעשות פג'ניישן
  }

  const onSortchange = () => {
    doApi()
    // alert(selectRef.current.value);
  }

  return (
    <React.Fragment>
      <Header />
      <CartSide />
      <div className="container-fluid">
        <div className="container-fluid">
          <div className="breadcrumb">
            <Link className="breadcrumb-item text-secondary" to="/">
              Home/
            </Link>
          </div>
          <h1 className="h3 fw-bolder mb-5">
            <span>Category: {cat.name}</span>
          </h1>
          <hr className="mb-5" />
          <div className="text-center row">
            <div className="col-lg-6 text-center text-lg-start my-3 my-lg-0">
              {cat.s_id && (
                <PageNav
                  urlPageApi={'/prods/count?cat=' + cat.s_id}
                  perPage="8"
                  // לאן הלינקים של הכפתורים של העמודים יקחו אותנו
                  pageLinkStart={'/cat/' + cat.s_id + '/'}
                />
              )}
            </div>
          </div>
          {prods_ar.length == 0 && (
            <div className="text-center">
              <img src="/images/loading.gif" />
            </div>
          )}
          <div className="row mt-3">
            {/* left section */}
            <div className="col-md-3 mt-3 ">
              <div className="filter_sec">
                <h5 className="fw-bolder">Filter by Price Range </h5>
                <hr className="mt-1" />
                <div className="mt-3 py-3 ">
                  <MultiRangeSlider
                    min={0}
                    max={1000}
                    onChange={({ min, max }) =>
                      console.log(`min = ${min}, max = ${max}`)
                    }
                  />{' '}
                </div>
                <div className="d-flex align-items-center justify-content-center mt-4">
                  <button className="btn btn_filter text-white rounded-pill px-4 py-2  fw-bold">
                    FILTER
                  </button>
                  <p className=" ms-3 my-0 p-0">Price:$1,500-$2,500</p>
                </div>
              </div>
              <div className="new_auctions_sec mt-5">
                <h5 className="fw-bolder">New Auctions </h5>
                <hr className="mt-1" />
                {prods_ar.map((item) => {
                  return <ProdBoxNewAuctions key={item._id} item={item} />
                })}
              </div>
            </div>
            {/* Right section */}
            <div className="row col-md-9 mb-5 px-1 fit_content">
              <div className="px-3 w-100">
                <div className="toggle_view_search easy_shadow  d-flex align-items-center py-3 px-1">
                  <div className="col-md-6 d-flex ">
                    <div
                      onClick={() => {
                        setTogleView(true)
                      }}
                      className={`toggle_btn_left btn col-1 p-0 align-items-center justify-content-center d-flex shadow ${
                        togleView ? 'toggle_true' : 'toggle_false'
                      }`}
                    >
                      <i className="bi bi-list-ul "></i>
                    </div>
                    <div
                      onClick={() => {
                        setTogleView(false)
                      }}
                      className={`toggle_btn_right btn col-1 align-items-center justify-content-center d-flex shadow ${
                        !togleView ? 'toggle_true' : 'toggle_false '
                      }`}
                    >
                      <i class="bi bi-grid-3x2-gap"></i>
                    </div>
                  </div>

                  <div className="d-flex col-lg-6 justify-content-center justify-content-lg-end">
                    <label className="mt-1 me-2">Sort by:</label>
                    <select
                      onChange={onSortchange}
                      ref={selectRef}
                      className="form-select w-50"
                    >
                      <option value="name">Name</option>
                      <option value="price">Price</option>
                      <option value="date_created">Added to the shop</option>
                    </select>
                  </div>
                </div>
              </div>

              {togleView &&
                prods_ar.map((item) => {
                  return <ProdBoxBigHorizontal key={item._id} item={item} />
                })}
              {!togleView &&
                prods_ar.map((item) => {
                  return <ProdBox key={item._id} item={item} />
                })}
            </div>
          </div>
          {/* <div className="row mb-5">
          {prods_ar.map((item) => {
            return <ProdBox key={item._id} item={item} />
          })}
        </div> */}
        </div>
      </div>
      <Footer />
    </React.Fragment>
  )
}

export default CategoryPage
