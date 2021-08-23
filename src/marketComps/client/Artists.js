import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { doApiGet, URL_API } from '../../services/apiSer'
import CartSide from './cartSide'
import './css/artistPage.css'

function Artists(props) {
  let [search, setSearch] = useState('')
  let [prods_ar, setProdsAr] = useState([])
  // ישמש בשביל לדעת אם להציג את הלואדינג או לא
  let [loadingShow, setLoadingShow] = useState(true)

  useEffect(() => {
    // בשביל לאסוף קווארי סטרינג בצד לקוח
    // props.location -> ככה שאם אנחנו כבר בחיפוש אז הוא יתרנדר מחדש
  }, [props.location])

  const doApiSearch = async (_searchFor) => {
    let url = URL_API + '/artists/search?q=' + _searchFor
    let data = await doApiGet(url)
    setProdsAr(data)
    setLoadingShow(false)
    console.log(data)
  }

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
        <div className="card col-lg-4 border-0">
          <div className="d-flex align-items-center ">
            <img
              className="  profile-artist-Img me-2"
              src="https://images.pexels.com/photos/1562477/pexels-photo-1562477.jpeg"
              // src={URL_API + '/prods_images/611c28af76eb6f5efcbbbb66.jpg'}
            ></img>
            <h4>Rebecca Stoneheiz</h4>
          </div>
          <div
            className="artist-image mt-0 category_img"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0, 0, 0, 0.616), rgba(0, 0, 0, 0.5)),url("https://images.pexels.com/photos/3481026/pexels-photo-3481026.jpeg")',
            }}
          ></div>
        </div>

        {/* <div className=" row d-flex col-lg-4 p-3">
          <h5>Art field: {artist.artist_type}</h5>
          <p>Studio Location: {artist.artist_address}</p>
        </div> */}

        {loadingShow && (
          <div className="text-center">
            <img src="/images/loading.gif" />
          </div>
        )}
        {/* במידה וסיים לקבל מידע והמערך הריק יציג הודעת אי מציאת מוצרים */}
        {!loadingShow && prods_ar.length == 0 && (
          <div className="text-center">Not found products...</div>
        )}
      </div>
    </React.Fragment>
  )
}

export default Artists
