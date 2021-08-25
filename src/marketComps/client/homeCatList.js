import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { doApiGet, URL_API } from '../../services/apiSer'
import ProdBox from './prodBox'
import ProdBoxSmallHorizontal from './prodBoxSmallHorizontal'

function HomeCatList(props) {
  let [cat, setCat] = useState({})
  let [prods_ar, setProdsAr] = useState([])

  useEffect(() => {
    doApi()
  }, [])

  const doApi = async () => {
    // first get the category name by its id from props
    let url1 = URL_API + '/categories/single/' + props.catId
    let catInfo = await doApiGet(url1)
    setCat(catInfo)
    // second: get the list of prods of the same category
    let url = URL_API + '/prods/?cat=' + props.catId + '&perPage=4'
    let prodsData = await doApiGet(url)
    setProdsAr(prodsData)
  }

  return (
    <React.Fragment>
      <div className="d-flex moderncontemporary">
        <div
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.616), rgba(0, 0, 0, 0.5)),
    url('${URL_API}/prods_images/${cat.name}.jpg')`,
          }}
          className="modern category_img col-12 col-md-3 align-items-lg-center justify-content-md-center d-flex"
        >
          <div className="insideframe   text-center align-items-lg-center ">
            <h2 className="category_name text-light fw-bolder">{cat.name}</h2>
            <p className=" text-light">12 auctions</p>
            {/* <Link className=" " to={'/cat/' + cat.s_id}> */}
            <Link to={`/art_type/${cat.s_id}/0`}>
              <span className="read-more btn btn-outline-light rounded-pill px-4 py-2 mt-4 fw-bold text-light">
                <span className="  " style={{ fontSize: 'smaller' }}>
                  VIEW MORE
                </span>
              </span>
            </Link>
          </div>
          <span className="span1"></span>
          <span className="span2"></span>
        </div>
        <div className="row  ms-3 mt-5 col-md-9">
          {prods_ar.map((item) => {
            return <ProdBoxSmallHorizontal key={item._id} item={item} />
          })}
        </div>
      </div>
      {/* ////////////////////////////////////////////////////////////// */}

      {/* <hr className="for_h2" />
      <h2 className="h2_hr">
        <span>{cat.name}</span>
      </h2>
      {prods_ar.length == 0 && (
        <div className="text-center">
          <img width="100" src="/images/loading.gif" />
        </div>
      )}
      <div className="row mb-5">
        {prods_ar.map((item) => {
          return <ProdBox key={item._id} item={item} />
        })}
        <div className="d-flex justify-content-center">
          <Link className="btn btn-dark mt-3" to={'/cat/' + cat.s_id}>
            More products of {cat.name}
          </Link>
        </div>
      </div> */}
    </React.Fragment>
  )
}

export default HomeCatList
