import { useHistory } from 'react-router'

// export const URL_API = "http://monkeys.co.il";

let myApi = 'http://localhost:3004'
if (!window.location.href.includes('localhost:')) {
  // say that its in real service:
  myApi = 'https://my-market2025.herokuapp.com'
}

export const URL_API = myApi

export const doApiGet = async (_url) => {
  try {
    let resp = await fetch(_url)
    let data = await resp.json()
    return data
  } catch (err) {
    // console.log(err)
    alert('there problem , come back tommrow!')
    return err
  }
}

export const doApiMethod = async (_url, _method, _body) => {
  try {
    let resp = await fetch(_url, {
      method: _method,
      body: JSON.stringify(_body),
      headers: {
        'auth-token': localStorage['tok'],
        'content-type': 'application/json',
      },
    })
    let data = await resp.json()
    return data
  } catch (err) {
    // console.log(err)
    alert('there problem , come back tommrow!')
    return err
  }
}
//saves favorites in local storage and sends favorites to db
export const changeFavorites = async (prodId, state) => {
  let favorites = !localStorage['favorites']
    ? []
    : JSON.parse(localStorage.getItem('favorites'))
  if (state) {
    favorites = [...favorites, prodId]
    localStorage.setItem('favorites', JSON.stringify(favorites))
  } else {
    favorites = favorites.filter((item) => item != prodId)
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }
  if (localStorage['tok']) {
    let url = URL_API + '/users/favorites/' + prodId
    let data = await doApiMethod(url, 'PUT', { favArr: favorites })
    console.log(data)
  }
}
export const checkIfTokenValid = async () => {
  let url = URL_API + '/users/myInfo'
  let data = await doApiMethod(url, 'GET')
  if (!data._id) {
    localStorage.removeItem('tok')
    return false
  }
  return true
}
