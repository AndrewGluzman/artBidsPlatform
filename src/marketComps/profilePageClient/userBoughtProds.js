import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { doApiGet, doApiMethod, URL_API } from "../../services/apiSer";
import Timer from "./timerProd";

function UserBidedProducts(props) {
  let [prods_ar, setProdsAr] = useState([]);
  let [user, setUser] = useState({});
  let dispatch = useDispatch();

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    let url =
      URL_API + "/prods/userbidedprods?sort=_id&reverse=yes&perPage=200";
    let data = await doApiMethod(url, "GET");
    let thisUser = await doApiMethod(URL_API + "/users/myInfo", "GET");
    setUser(thisUser);
    setProdsAr(data);
  };

  const delProd = async (_id) => {
    if (window.confirm("are you sure you want to delete?")) {
      let url = URL_API + "/prods/" + _id;
      let data = await doApiMethod(url, "DELETE", {});
      if (data.n == 1) {
        //refresh the table
        doApi();
      } else {
        alert("there problem");
      }
    }
  };
  const statusCheck = (item) => {
    let num = item.status;

    if (num == 0 && item.bids[item.bids.length - 1].user_id == user._id) {
      return (
        <div className="border bg-danger p-1 text-light rounded-pill">
          You wining the bid
        </div>
      );
    } else if (
      num == 1 &&
      item.bids[item.bids.length - 1].user_id == user._id
    ) {
      item.count = 1;
      item.price = item.bids[item.bids.length - 1].price;
      dispatch({ type: "UPDATE_THE_CART", item: item });
      return (
        <div className="border bg-success p-1 text-light rounded-pill">
          You won this bid!
        </div>
      );
    } else {
      return (
        <div className="d-flex">
          <div className="border bg-dark p-1 text-light rounded-pill">
            You outbided!!
          </div>
          <Link to={"/single/" + item._id} className="btn btn-info">
            Place new bid
          </Link>
        </div>
      );
    }
  };

  const dateConverter = (date) => {
    let newDate = new Date(date);
    return newDate.toDateString();
  };

  //

  return (
    <div>
      <h1>My Bids:</h1>
      <table className="table table-striped">
        {/* TODO: mouseover will shoe info of prod */}
        <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th>category</th>
            <th>Starting bid</th>
            <th>Current bid</th>
            <th>Date added</th>
            <th>Status</th>
            <th>del/edit</th>
          </tr>
        </thead>
        {/* TODO: add pagenation */}
        <tbody>
          {prods_ar.map((item, i) => {
            return (
              <tr key={item._id}>
                <td>{i + 1}</td>
                <td>{item.name}</td>
                <td>{item.category_s_id}</td>
                <td>{item.starting_bid}</td>
                <td>
                  {!item.bids[item.bids.length - 1]
                    ? 0
                    : item.bids[item.bids.length - 1].price}
                </td>
                <td>{dateConverter(item.date_created)}</td>
                <td className="text-center">{statusCheck(item)}</td>
                <td>
                  {item.status == 0 ? (
                    <Timer date={item.date_created} />
                  ) : (
                    <div>
                      {user._id == item.bids[item.bids.length - 1].user_id ? (
                        <Link to="/checkout" className="btn btn-info me-2">
                          Pay
                        </Link>
                      ) : (
                        ""
                      )}
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UserBidedProducts;
