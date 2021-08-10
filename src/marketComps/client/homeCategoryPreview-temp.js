import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { doApiGet, URL_API } from '../../services/apiSer'
import ProdBoxSmallHorizontal from './prodBoxSmallHorizontal'

function HomeCategoryPreview(props) {
  return (
    <div>
      <div className="modern category_img col-md-3 align-items-lg-center justify-content-md-center d-flex">
        <div className="insideframe   text-center align-items-lg-center ">
          <h2 className="category_name text-light fw-bolder">Decorative Art</h2>
          <p className=" text-light">12 auctions</p>
          <span className="read-more btn btn-outline-light rounded-pill px-4 py-2 mt-4 fw-bold">
            <span style={{ fontSize: 'smaller' }}> VIEW MORE</span>
          </span>
        </div>
        <span className="span1"></span>
        <span className="span2"></span>
      </div>
      <ProdBoxSmallHorizontal />
    </div>
  )
}

export default HomeCategoryPreview
