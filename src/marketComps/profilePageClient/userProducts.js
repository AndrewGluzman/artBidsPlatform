import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { doApiGet, doApiMethod, URL_API } from '../../services/apiSer'
import Timer from './timerProd'
import UserProd from './userProd'

function UserProducts(props) {
  let [prods_ar, setProdsAr] = useState([])

  useEffect(() => {
    doApi()
  }, [])

  const doApi = async () => {
    let url = URL_API + '/prods/userProds?sort=_id&reverse=yes&perPage=200'
    let data = await doApiMethod(url, 'GET')
    setProdsAr(data)
  }

  return (
    <div className="ms-2">
      <h3>Sales status:</h3>
      <table className="table table-striped table-borderless ">
        <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th>category</th>
            <th>Starting bid</th>
            <th>Current bid</th>
            <th>Date added</th>
            <th>Status</th>
          </tr>
        </thead>
        {/* TODO: add pagenation */}
        <tbody>
          {prods_ar.map((item, i) => {
            return (
              <UserProd key={item._id} prodNum={i} item={item} doApi={doApi} />
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default UserProducts
