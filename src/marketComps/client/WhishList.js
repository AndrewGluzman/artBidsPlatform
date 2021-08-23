import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  doApiGet,
  URL_API,
  checkIfTokenValid,
  doApiMethod,
} from '../../services/apiSer'
import CartSide from './cartSide'
import Header from './header'
import ProdBox from './prodBox'

function WhishList(props) {
  let [favorites, setFavorites] = useState([])
  let [loadingShow, setLoadingShow] = useState(true)
  let [removed, setRemoved] = useState(false)
  let counter = 1
  useEffect(() => {
    checkIfTokenValid()

    setLoadingShow(true)
    loadFavorites()
  }, [removed])

  const loadFavorites = async () => {
    if (localStorage['tok']) {
      let url = URL_API + `/users/favorites`
      let favoritesid = await doApiMethod(url, 'POST', {})
      getFavorites(favoritesid)
      //
      // setLoadingShow(false)
      return
    }
    if (localStorage['favorites']) {
      let favoritesid = JSON.parse(localStorage.getItem('favorites'))
      getFavorites(favoritesid)
    }
  }

  const getFavorites = async (favorites) => {
    let url = URL_API + '/prods/whishlist'
    let data = await doApiMethod(url, 'POST', { fav: favorites })
    console.log(data)

    setFavorites(data)
    setLoadingShow(false)
  }

  const checkIfremoved = (data) => {
    if (!data) {
      if (!removed) {
        setRemoved(true)
      }
      if (removed) {
        setRemoved(false)
      }
    }
  }
  return (
    <React.Fragment>
      <Header />
      <CartSide />
      <div className="container">
        <hr className="for_h2" />
        <h2 className="h2_hr">
          <span>Whishlist 💖 :</span>
        </h2>
        {loadingShow && (
          <div className="text-center">
            <img src="/images/loading.gif" />
          </div>
        )}
        {/* במידה וסיים לקבל מידע והמערך הריק יציג הודעת אי מציאת מוצרים */}
        {!loadingShow && favorites.length == 0 && (
          <div className="text-center">Not found products...</div>
        )}
        {favorites ? (
          <div className="row mb-5">
            {favorites?.map((item) => {
              return (
                <ProdBox key={item._id} item={item} removed={checkIfremoved} />
              )
            })}
          </div>
        ) : (
          <div className="text-center">
            <img src="/images/loading.gif" />
          </div>
        )}
      </div>
    </React.Fragment>
  )
}

export default WhishList
