import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { checkIfTokenValid, doApiGet, URL_API } from '../../services/apiSer'
import PageNav from '../misc/pagesNav'
import CartSide from './cartSide'
import MultiRangeSlider from './multiRangeSlider'
import ProdBox from './prodBox'
import ProdBoxBigHorizontal from './prodBoxBigHorizontal'
import ProdBoxNewAuctions from './prodBoxNewAuctions'

function ArtByType(props) {
  let [prods_ar, setProdsAr] = useState([])
  let [prodsNew, setProdsNew] = useState([])
  let [togleView, setTogleView] = useState(true)
  let [cat, setCat] = useState('paint')

  // let [routeQuery, setrouteQuery] = useState('')
  // let [bigestPrice, setBigestPrice] = useState(5000)
  let selectRef = useRef()

  useEffect(() => {
    checkIfTokenValid()
    window.scroll({ top: 250, behavior: 'smooth' })
    catName()
    doApi()

    // props.match -  חשוב מכיוון שנרצה שהפונקציה תפעל כל פעם שיו אר אל משתנה למעלה
  }, [props])

  let currentPage = props.match.params.page || 0
  let artTypeCat = props.match.params.type
  let categoryName = props.match.params.type
  let routeQuery = ''
  if (artTypeCat < 15) {
    routeQuery = 'category_s_id'
    categoryName = cat.name
  }

  const catName = async () => {
    let url1 = URL_API + '/categories/single/' + props.match.params.type
    let dataCat = await doApiGet(url1)
    setCat(dataCat)
  }

  const doApi = async (min, max) => {
    // checks current page

    let url =
      URL_API +
      `/prods/type?type=${artTypeCat}&perPage=8&page=${currentPage}&sort=${selectRef.current.value}&minPrice=${min}&maxPrice=${max}&range=yes&cat=${routeQuery}`
    let prodsData = await doApiGet(url)

    setProdsAr(prodsData)
    let url2 =
      URL_API +
      `/prods/type?type=${artTypeCat}&perPage=14&page=${currentPage}&cat=${routeQuery}&reverse=yes`
    let newProdsData = await doApiGet(url2)
    setProdsNew(newProdsData)

    //Object with bigestPrice
    // let getBigestPrice =
    //   URL_API +
    //   `/prods/type?type=${artTypeCat}&perPage=1&sort=price&reverse=yes`
    // let bigestPriceData = await doApiGet(getBigestPrice)

    // console.log(bigestPriceData)

    // setBigestPrice(bigestPriceData.price)
  }

  const onSortchange = () => {
    doApi()
  }

  return (
    <React.Fragment>
      <CartSide />
      <div className="container-fluid">
        <div className="container-md">
          <div className="breadcrumb">
            <Link className="breadcrumb-item text-secondary" to="/">
              Home/
            </Link>
          </div>
          <h1 className="h3 fw-bolder mb-5">
            <span>{categoryName}</span>
          </h1>
          <hr className="mb-5" />
          <div className="text-center row">
            <div className="col-lg-6 text-center text-lg-start my-3 my-lg-0">
              {
                <PageNav
                  urlPageApi={`/prods/arttype-count?type=${artTypeCat}&cat=${routeQuery}`}
                  perPage="8"
                  // לאן הלינקים של הכפתורים של העמודים יקחו אותנו
                  pageLinkStart={`/art_type/${artTypeCat}/`}
                />
              }
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
                    doApi={doApi}
                    onChange={(e) => {
                      // console.log(`min = ${min}, max = ${max}`)
                    }}
                  />
                </div>
              </div>
              <div className="new_auctions_sec mt-5">
                <h5 className="fw-bolder">New Auctions </h5>
                <hr className="mt-1" />
                {prodsNew.map((item) => {
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
                      className="form-select w-50 "
                    >
                      <option value="name">Name</option>
                      <option value="bids">Popular</option>
                      <option value="date_created">Ending Soon</option>
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
                  return <ProdBox key={item._id} item={item} col={'col-lg-4'} />
                })}
            </div>
          </div>
          <div className="text-center justify-content-center row">
            <div className="col-lg-6 text-center  my-3 my-lg-0">
              {
                <PageNav
                  urlPageApi={`/prods/arttype-count?type=${artTypeCat}&cat=${routeQuery}`}
                  perPage="8"
                  // לאן הלינקים של הכפתורים של העמודים יקחו אותנו
                  pageLinkStart={`/art_type/${artTypeCat}/`}
                />
              }
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ArtByType
