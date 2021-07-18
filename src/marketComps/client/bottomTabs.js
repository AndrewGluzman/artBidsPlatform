import React, { useEffect, useState } from 'react'
import '../../App.css'
import { doApiGet, doApiMethod, URL_API } from '../../services/apiSer'

function BottomTabs(props) {
  const [toggleState, setToggleState] = useState(1)
  const [bid, setBids] = useState([])
  const [artist, setArtist] = useState({})

  useEffect(() => {
    getApiArtistInfo()
    setBids(props.item.bids)
  }, [props.item.bids])

  const getApiArtistInfo = async () => {
    let url = URL_API + '/artists/single/' + props.item.artistId
    let data = await doApiGet(url)
    setArtist(data)
  }

  const toggleTab = (index) => {
    setToggleState(index)
  }

  const bidDate = (someDate) => {
    var date = new Date(someDate) // Now

    return date
  }

  return (
    <div className="container">
      <div className="bloc-tabs mt-lg-5">
        <button
          className={toggleState === 1 ? 'tabs active-tabs' : 'tabs'}
          onClick={() => toggleTab(1)}
        >
          DESCRIPTION
        </button>
        <button
          className={toggleState === 2 ? 'tabs active-tabs' : 'tabs'}
          onClick={() => toggleTab(2)}
        >
          AUCTION HISTORY
        </button>
        <button
          className={toggleState === 3 ? 'tabs active-tabs' : 'tabs'}
          onClick={() => toggleTab(3)}
        >
          ARTIST INFO
        </button>
        <button
          className={toggleState === 4 ? 'tabs active-tabs' : 'tabs'}
          onClick={() => toggleTab(4)}
        >
          ARTIST WORKS
        </button>
      </div>

      <div className="content-tabs text-secondary">
        <div
          className={toggleState === 1 ? 'content  active-content' : 'content'}
        >
          <h2>{props.item.name}</h2>
          <hr />
          <p>{props.item.description}</p>
        </div>

        <div
          className={
            toggleState === 2 ? 'content px-md-0  active-content' : 'content'
          }
        >
          <table className="table table-hover table-borderless text-secondary py-0 ">
            <thead>
              <tr>
                <th className="border-1 border-bottom-0" scope="col">
                  #
                </th>
                <th className="border-1 border-bottom-0" scope="col">
                  Date
                </th>
                <th className="border-1 border-bottom-0" scope="col">
                  Price
                </th>
                <th className="border-1 border-bottom-0" scope="col">
                  Email
                </th>
              </tr>
            </thead>
            <tbody className="border-1">
              {bid
                .slice(0)
                .reverse()
                .map((bidItem, i) => {
                  return (
                    <tr key={i}>
                      <th scope="row">{bid.length - i}</th>
                      <td>{bidDate(bidItem.date_created).toLocaleString()}</td>
                      <td className="tw-bolder fs-6">
                        ${bidItem.price.toFixed(2)}
                      </td>
                      <td>{bidItem.email}</td>
                    </tr>
                  )
                })}
              <tr>
                <th>--</th>
                <td>{bidDate(props.item.date_created).toLocaleString()}</td>
                <td>Auction started</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          className={toggleState === 3 ? 'content  active-content' : 'content'}
        >
          <div className="row d-flex">
            <div className="col-lg-2">
              <img
                className="w-100 p-2 float-start profileImg"
                src={artist.avatar}
              ></img>
            </div>
            <div className=" row d-flex col-lg-4 p-3">
              <h2>{artist.name}</h2>
              <h5>Art field: {artist.artistType}</h5>
              <p>Studio Location: {artist.address}</p>
            </div>
          </div>
          <div className="px-2">
            <h5>About me</h5>
            <hr />
            <p>{artist.bio}</p>
          </div>
        </div>
        <div
          className={toggleState === 4 ? 'content  active-content' : 'content'}
        >
          <h2>Content 2</h2>
          <hr />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
            voluptatum qui adipisci.
          </p>
        </div>
      </div>
    </div>
  )
}

export default BottomTabs
