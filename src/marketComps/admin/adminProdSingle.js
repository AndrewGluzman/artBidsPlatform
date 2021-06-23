import React from "react";
import { Link } from "react-router-dom";
import { doApiGet, doApiMethod, URL_API } from "../../services/apiSer";
import Timer from "../profilePageClient/timerProd";

function AdminProdSingle(props) {
  let item = props.item;

  const delProd = async (_id) => {
    if (window.confirm("are you sure you want to delete?")) {
      let url = URL_API + "/prods/" + _id;
      let data = await doApiMethod(url, "DELETE", {});
      if (data.n == 1) {
        //refresh the table
        props.doApi();
      } else {
        alert("there problem");
      }
    }
  };
  const statusCheck = (num) => {
    if (num == -1) {
      return (
        <div className="border bg-dark p-1 text-light rounded-pill">
          Pending
        </div>
      );
    } else if (num == 0) {
      return (
        <div className="border bg-danger p-1 text-light rounded-pill">
          On Sale
        </div>
      );
    } else if (num == 1) {
      return (
        <div className="border bg-success p-1 text-light rounded-pill">
          Sold
        </div>
      );
    } else if (num == 2) {
      return (
        <div className="border bg-info p-1 text-light rounded-pill">
          Finished
        </div>
      );
    } else if (num == -2) {
      return (
        <div className="border bg-warning p-1 text-dark rounded-pill">
          Rejected
        </div>
      );
    }
  };

  const statusUpdate = async (prodId, status) => {
    let data = await doApiMethod(
      URL_API + "/prods/statusUpdateAdmin/" + prodId,
      "PUT",
      {
        status: status,
      }
    );

    if (data.n == 1) {
      alert("prod updated");
      props.doApi();
    } else {
      alert("There is problem try again laterkkkkk");
    }
  };

  const dateConverter = (date) => {
    let newDate = new Date(date);
    return newDate.toDateString();
  };

  return (
    <tr key={item._id}>
      <td>{props.prodNum + 1}</td>
      <td>
        <Link to={"/single/" + item._id}>{item.name}</Link>
      </td>
      <td>{item.ownerEmail}</td>
      <td>{item.price}</td>
      <td>
        {!item.bids[item.bids.length - 1]
          ? 0
          : item.bids[item.bids.length - 1].price}
      </td>
      <td>{dateConverter(item.date_created)}</td>
      <td className="text-center">{statusCheck(item.status)}</td>
      <td>
        {item.status == 0 ? (
          <Timer date={item.date_created} />
        ) : (
          <div>
            <button
              onClick={() => {
                delProd(item._id);
              }}
              className="btn btn-danger mx-2"
            >
              del
            </button>
            {item.status != 1 && item.status != 2 ? (
              <Link to={"/admin/editProd/" + item._id} className="btn btn-dark">
                edit
              </Link>
            ) : (
              ""
            )}
            {item.status == 2 ? (
              <button
                onClick={() => {
                  statusUpdate(item._id, -1);
                }}
                className="btn btn-primary mx-2"
              >
                resubmit
              </button>
            ) : (
              ""
            )}
            {item.status == -1 ? (
              <React.Fragment>
                <button
                  onClick={() => {
                    statusUpdate(item._id, 0);
                  }}
                  className="btn btn-primary mx-2"
                >
                  Approve
                </button>
                <button
                  onClick={() => {
                    statusUpdate(item._id, -2);
                  }}
                  className="btn btn-warning mx-2"
                >
                  Reject
                </button>
              </React.Fragment>
            ) : (
              ""
            )}
          </div>
        )}
      </td>
    </tr>
  );
}

export default AdminProdSingle;
