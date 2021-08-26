import React from 'react'
import LazyLoad from 'react-lazyload'
import { URL_API } from '../../services/apiSer'

function ArtistCard({ item, i }) {
  console.log('https://picsum.photos/200/300?random=' + i)

  return (
    <LazyLoad className="card col-lg-4 border-0 my-2 ">
      <div className="d-flex align-items-center ">
        <img
          className="  profile-artist-Img me-2"
          src={URL_API + item.avatar}
          // src={URL_API + '/prods_images/611c28af76eb6f5efcbbbb66.jpg'}
        ></img>
        <h5 className="motive_color artist_name">{item.artist_name}</h5>
      </div>
      <div
        className="artist-image mt-0 category_img "
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.616), rgba(0, 0, 0, 0.2)),url(${
            item.cover_img
              ? URL_API + item.cover_img
              : 'https://picsum.photos/200/300?random=' + i
          })`,
        }}
      ></div>
    </LazyLoad>
  )
}

export default ArtistCard
