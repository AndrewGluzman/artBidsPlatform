import React, { useState, useEffect } from 'react'
import LazyLoad from 'react-lazyload'
import HomeCatList from './homeCatList'
import {
  doApiGet,
  doApiMethod,
  URL_API,
  checkIfTokenValid,
} from '../../services/apiSer'
import ProdBox from './prodBox'
import HomeCategoryPreview from './homeCategoryPreview'

function Homelist(props) {
  // const orderCategoriesId = ["3", "1", "2", "5"]
  let [cat_ar, setcatAr] = useState([])
  const [latestProds, setLatestProds] = useState([])

  useEffect(() => {
    doApi()
    checkIfTokenValid()
    getLatestProds()
  }, [])

  const doApi = async () => {
    let url = URL_API + '/categories'
    let data = await doApiGet(url)
    setcatAr(data)
  }
  const getLatestProds = async () => {
    let url = URL_API + '/prods/allonsale?perpage=4'
    let data = await doApiMethod(url, 'GET')
    setLatestProds(data)
    console.log(data)
  }

  return (
    <div className="container-fluid">
      <div className="container-fluid">
        <section className="hero"></section>

        <section className="container text-center mb-5 mt-5">
          <div className="title">
            <h3 className="fw-bolder h2">ENDING AUCTIONS</h3>
            <h2 className="col-4 mx-lg-auto">
              <span>
                <i style={{ color: '#BE263F' }} className="bi bi-hammer"></i>
              </span>
            </h2>
          </div>
          <div className=" ending-auctions row">
            {latestProds.map((item) => {
              return <ProdBox key={item._id} item={item} />
            })}
          </div>
        </section>
        <section className="moderncontemporary row my-5">
          <div className="contemporary col-md-6 position-relative">
            <div className="insideframe position-absolute mt-2">
              <h2 className="category_name text-light fw-bolder">
                Contemporary Fine Art
              </h2>
              <p className=" text-light">20 auctions</p>
              <span className="read-more btn btn-outline-light rounded-pill px-4 py-2 mt-4 fw-bold">
                <span style={{ fontSize: 'smaller' }}> VIEW MORE</span>
              </span>
            </div>
            <span className="span1"></span>
            <span className="span2"></span>
          </div>
          <div className="modern col-md-6 position-relative">
            <div className="insideframe position-absolute mt-2">
              <h2 className="category_name text-light fw-bolder">
                Decorative Art
              </h2>
              <p className=" text-light">12 auctions</p>
              <span className="read-more btn btn-outline-light rounded-pill px-4 py-2 mt-4 fw-bold">
                <span style={{ fontSize: 'smaller' }}> VIEW MORE</span>
              </span>
            </div>
            <span className="span1"></span>
            <span className="span2"></span>
          </div>
        </section>
        {cat_ar.map((item) => {
          return (
            <LazyLoad key={item.s_id} height={500}>
              <HomeCatList catId={item.s_id} />
            </LazyLoad>
          )
        })}
      </div>
    </div>
  )
}

export default Homelist
