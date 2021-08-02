import React, { useState, useEffect } from 'react'
import LazyLoad from 'react-lazyload'
import HomeCatList from './homeCatList'
import {
  doApiGet,
  doApiMethod,
  URL_API,
  checkIfTokenValid,
} from '../../services/apiSer'

function Homelist(props) {
  // const orderCategoriesId = ["3", "1", "2", "5"]
  let [cat_ar, setcatAr] = useState([])

  useEffect(() => {
    doApi()
    checkIfTokenValid()
  }, [])

  const doApi = async () => {
    let url = URL_API + '/categories'
    let data = await doApiGet(url)
    setcatAr(data)
    console.log(data)
  }

  return (
    <div className="container-fluid">
      <div className="container">
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
