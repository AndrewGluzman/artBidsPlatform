import React, { useEffect, useState } from 'react'
import '../../App.css'
import { doApiGet, doApiMethod, URL_API } from '../../services/apiSer'
import ProdBox from './prodBox'

function BottomTabs(props) {
  const [toggleState, setToggleState] = useState(1)
  const [bid, setBids] = useState([])
  const [artistWorks, setArtistWorks] = useState([])
  const [artist, setArtist] = useState({})

  useEffect(() => {
    getApiArtistInfo()
    setBids(props.item.bids)
  }, [props.item.bids])

  const getApiArtistInfo = async () => {
    let url = URL_API + '/artists/single/' + props.item.artist_id
    let data = await doApiGet(url)
    setArtist(data)
    let url2 = URL_API + '/prods/artistprods?artist_id=' + props.item.artist_id
    let artistProds = await doApiGet(url2)
    console.log(artistProds)
    setArtistWorks(artistProds)
  }

  const toggleTab = (index) => {
    setToggleState(index)
  }

  const bidDate = (someDate) => {
    var date = new Date(someDate) // Now

    return date
  }

  //trigers lazyload for loading cards
  const scroll = () => {
    window.scroll({
      top: window.pageYOffset + 1,
      left: 0,
      behavior: 'smooth',
    })
  }
  return (
    <div className="">
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
          onClick={() => {
            toggleTab(4)
            scroll()
          }}
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
          <p>
            {props.item.size}, {props.item.technique}, {props.item.year_created}
          </p>
          <br />
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
                ? bid
                    .slice(0)
                    .reverse()
                    .map((bidItem, i) => {
                      return (
                        <tr key={i}>
                          <th scope="row">{bid.length - i}</th>
                          <td>
                            {bidDate(bidItem.date_created).toLocaleString(
                              'en-IL',
                              {
                                timeZone: 'Asia/Jerusalem',
                              },
                            )}
                          </td>
                          <td className="tw-bolder fs-6">
                            ${bidItem.price.toFixed(2)}
                          </td>
                          <td>{bidItem.email}</td>
                        </tr>
                      )
                    })
                : ''}
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
          <div className="row d-flex align-items-lg-center">
            <div className="col-lg-2">
              <img
                className="w-100 p-2 float-start profileImg"
                src={URL_API + artist.avatar}
              ></img>
            </div>
            <div className=" row d-flex col-lg-4 p-3">
              <h2>{artist.artist_name}</h2>
              <h5>Art field: {artist.artist_type}</h5>
              <p>Studio Location: {artist.artist_address}</p>
            </div>
          </div>
          <div className="px-2">
            <h5>About me</h5>
            <hr />
            <p>{artist.artist_bio}</p>
          </div>
        </div>
        <div
          className={toggleState === 4 ? 'content  active-content' : 'content'}
        >
          {artistWorks[1] ? (
            <h2>Current works on Auction</h2>
          ) : (
            <h3>Additional works soon...</h3>
          )}
          <hr />
          <div className="row mb-5">
            {artistWorks.map((item) => {
              return <ProdBox key={item._id} item={item} />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BottomTabs
