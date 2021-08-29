import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { doApiMethod, URL_API } from '../../services/apiSer'
import AdminProdSingle from './adminProdSingle'
import AuthAdmin from './authAdmin'

function ListProdAdmin(props) {
  let [prods_ar, setProdsAr] = useState([])

  useEffect(() => {
    doApi()
  }, [])

  //pulls two arays of all products and users and joins into one
  const doApi = async () => {
    let url = URL_API + '/prods/adminprods?sort=_id&reverse=yes&perPage=200'
    let dataProds = await doApiMethod(url, 'GET')

    let url2 = URL_API + '/users'
    let dataUsers = await doApiMethod(url2, 'GET')

    let prodsWithUser = dataProds.filter((item) => {
      dataUsers.forEach((element) => {
        if (item.user_id == element._id) {
          item.ownerEmail = element.email
        }
      })
      return item
    })

    setProdsAr(prodsWithUser)
  }

  return (
    <div className="ms-2 easy_shadow pt-1">
      <h3>Sales status:</h3>

      <table className="table table-hover table-borderless text-secondary py-0 ">
        <thead>
          <tr>
            <th>#</th>
            <th className="col-1">name</th>
            <th>email</th>
            <th>Starting bid</th>
            <th>Current bid</th>
            <th>Date added</th>
            <th>Status</th>
            <th>Controls/Timer</th>
          </tr>
        </thead>
        {/* TODO: add pagenation */}
        <tbody>
          {prods_ar.map((item, i) => {
            return (
              <AdminProdSingle
                key={item._id}
                prodNum={i}
                item={item}
                doApi={doApi}
              />
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ListProdAdmin
