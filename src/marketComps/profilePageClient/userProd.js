import React from 'react'
import { Link } from 'react-router-dom'
import { doApiGet, doApiMethod, URL_API } from '../../services/apiSer'
import Timer from './timerProd'

function UserProd(props) {
  let item = props.item

  const delProd = async (_id) => {
    if (window.confirm('are you sure you want to delete?')) {
      let url = URL_API + '/prods/userRegular/' + _id
      let data = await doApiMethod(url, 'DELETE', {})
      if (data.n == 1) {
        //refresh the table
        props.doApi()
      } else {
        alert('there problem')
      }
    }
  }
  const statusCheck = (item) => {
    if (item.status == -1) {
      return (
        <div className="d-flex">
          <button className=" w-50 btn btn-dark px- text-light rounded-pill">
            Pending
          </button>
          <div>
            <button
              onClick={() => {
                delProd(item._id)
              }}
              className="btn btn-danger mx-2"
            >
              del
            </button>
            <Link to={'/profile/editProd/' + item._id} className="btn btn-dark">
              Edit
            </Link>
          </div>
        </div>
      )
    } else if (item.status == 0) {
      return (
        <div className="border bg-danger p-1 text-light rounded-pill">
          On Sale
        </div>
      )
    } else if (item.status == 1) {
      return (
        <div className="border bg-info p-1 text-light rounded-pill">
          Payment in Process
        </div>
      )
    } else if (item.status == 3) {
      return (
        <div className="border bg-success p-1 text-light rounded-pill">
          Sold
        </div>
      )
    } else if (item.status == 2) {
      return (
        <div className="border bg-info p-1 text-light rounded-pill">
          Finished
        </div>
      )
    } else if (item.status == -2) {
      return (
        <div className="d-flex">
          <button className=" w-25 btn btn-warning p-1 text-dark rounded-pill">
            Rejected
          </button>
          <button
            onClick={() => {
              delProd(item._id)
            }}
            className="btn btn-danger mx-2"
          >
            del
          </button>
          <Link to={'/profile/editProd/' + item._id} className="btn btn-dark">
            Edit
          </Link>
          <button
            onClick={() => {
              statusUpdate(item._id, -1)
            }}
            className="btn btn-primary mx-2"
          >
            resubmit
          </button>
        </div>
      )
    }
  }

  const statusUpdate = async (prodId, status) => {
    let data = await doApiMethod(
      URL_API + '/prods/statusUpate/' + prodId + '?resubmit=0',
      'PUT',
      {
        status: status,
      },
    )

    if (data.n == 1) {
      alert('prod updated')
      props.doApi()
    } else {
      alert('There is problem try again laterkkkkk')
    }
  }

  const dateConverter = (date) => {
    let newDate = new Date(date)
    return newDate.toDateString()
  }

  return (
    <tr key={item._id}>
      <td>{props.prodNum + 1}</td>
      <td>
        <Link to={'/single/' + item._id} className="fw-bold">
          {item.name}
        </Link>
      </td>
      <td>{item.category_s_id}</td>
      <td>${item.starting_bid}</td>
      <td>
        $
        {!item.bids[item.bids.length - 1]
          ? 0
          : item.bids[item.bids.length - 1].price}
      </td>
      <td>{dateConverter(item.date_created)}</td>
      <td className="text-center">{statusCheck(item)}</td>
    </tr>
  )
}

export default UserProd
