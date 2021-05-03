import React, { useState } from "react";
import { useDispatch } from "react-redux";

function ProdBox(props) {
  let dispatch = useDispatch();
  // מאפיין שנוסיף לאחר איסוף המידע כדי לדעת אם הוא קיים בעגלה
  // וכמה ממנו קיימים בעגלה

  let cartProd = props.item.count || 0;
  let [countProd, setCountProd] = useState(cartProd);

  let item = props.item;

  const addProd = () => {
    setCountProd(countProd + 1);
    item.count = countProd + 1;
    dispatch({ type: "UPDATE_THE_CART", item: item });
  };

  const reduceProd = () => {
    if (countProd > 0) {
      setCountProd(countProd - 1);
      item.count = countProd - 1;
      dispatch({ type: "UPDATE_THE_CART", item: item });
    }
  };

  return (
    <div className="col-lg-3 p-2 text-center">
      <div className="p-2 shadow pb-4" style={{ height: "100%" }}>
        <div
          className="prod_img"
          style={{ backgroundImage: `url(${item.img})` }}
        >
          {/* The  img */}
        </div>
        <h3>{item.name}</h3>
        <div>Price: {item.price} nis</div>
        <div>Info: {item.info.substr(0, 50)}</div>
        <div className="mt-3 d-flex justify-content-center align-items-center">
          <button
            className="btn btn-outline-success rounded-circle me-3"
            onClick={reduceProd}
          >
            -
          </button>
          <span className="h4 mt-1"> {countProd} </span>
          <button
            className="btn btn-outline-success rounded-circle ms-3"
            onClick={addProd}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProdBox;
