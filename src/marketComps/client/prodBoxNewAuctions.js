import React from 'react'
import { Link } from 'react-router-dom'
import { URL_API } from '../../services/apiSer'
function ProdBoxNewAuctions(props) {
  let item = props.item
  return (
    <div className="card  rounded-0 border-0  ">
      <div style={{ minHeight: '100px' }} className="d-flex g-0">
        <div className="col-md-4 align-self-center d-flex ms-2">
          {item.img.includes('http') ? (
            <img
              className=" img-fluid mx-auto  my-3"
              style={{ maxHeight: '80px' }}
              src={item.img}
            ></img>
          ) : (
            <img
              className=" img-fluid mx-auto  my-3"
              style={{ maxHeight: '80px' }}
              src={URL_API + item.img}
            ></img>
          )}
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <Link
              to={'/single/' + item._id}
              className=" text-dark text-decoration-none "
            >
              {' '}
              <h5
                className="prod_name_box fw-bold "
                style={{ fontSize: '1em' }}
              >
                {item.name}
              </h5>
            </Link>
            {item.bids[0] ? (
              <h6>
                <span className="text-secondary"> Current Bid:</span> $
                {item.bids[item.bids.length - 1].price.toFixed(2)}
              </h6>
            ) : (
              <h6>
                <span className="text-secondary">Starting Bid:</span> $
                {item.price.toFixed(2)}
              </h6>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProdBoxNewAuctions
