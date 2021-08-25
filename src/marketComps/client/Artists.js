import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { doApiGet, URL_API } from '../../services/apiSer'
import ArtistCard from './artistCard'
import CartSide from './cartSide'
import './css/artistPage.css'

function Artists(props) {
  let [search, setSearch] = useState('')
  let [artists, setArtists] = useState([])
  // ישמש בשביל לדעת אם להציג את הלואדינג או לא
  let [loadingShow, setLoadingShow] = useState(true)

  useEffect(() => {
    getArtist()
  }, [props.location])

  const getArtist = async () => {
    let url = URL_API + '/artists/'
    let data = await doApiGet(url)
    console.log(data)
    setArtists(data)
    setLoadingShow(false)
  }

  // const doApiSearch = async (_searchFor) => {
  //   let url = URL_API + '/artists/search?q=' + _searchFor
  //   let data = await doApiGet(url)
  //   setProdsAr(data)
  //   setLoadingShow(false)
  //   console.log(data)
  // }

  return (
    <React.Fragment>
      <CartSide />
      <div className="container">
        <div className="breadcrumb">
          <Link className="breadcrumb-item text-secondary" to="/">
            Home/
          </Link>
        </div>
        <h1 className="h3 fw-bolder mb-5">
          <span>Artists:</span>
        </h1>
        <hr className="mb-5" />

        {loadingShow && (
          <div className="text-center">
            <img src="/images/loading.gif" />
          </div>
        )}
        {/* במידה וסיים לקבל מידע והמערך הריק יציג הודעת אי מציאת מוצרים */}
        {!loadingShow && artists.length == 0 && (
          <div className="text-center">Artist not found...</div>
        )}
        <div className=" row d-flex">
          {artists.map((item, i) => {
            return <ArtistCard key={i} item={item} i={i} />
          })}
        </div>
      </div>
    </React.Fragment>
  )
}

export default Artists
