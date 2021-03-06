import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { marketReducer } from '../reducer/marketReducer'

import AppAdmin from './admin/appAdmin'
import Home from './client/home'
import LoginClient from './client/loginClient'
import './client/css/homeList.css'
import SignUp from './client/signup'
// import CategoryPage from './client/categoryPage'
import Checkout from './client/checkout'
import ProdSingleInfo from './client/prodSingleInfo'
import HomeSearch from './client/homeSearch'
import ProfilePage from './profilePageClient/profilePage'
import WhishList from './client/WhishList'
import Artists from './client/Artists'
import About from './client/About'
// import Contact from './client/Contact'
import ArtByType from './client/ArtByType'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './client/header'
import Footer from './client/footer'
import { Link } from 'react-router-dom'
import GetInTouch from './client/getInTouch'

let myStore = createStore(marketReducer, composeWithDevTools())

function AppMarket(props) {
  return (
    <Provider store={myStore}>
      <Router>
        {/* switch of the content */}
        <Header />
        <Switch>
          <Route exact path={`/`} component={Home} />
          <Route exact path={`/login`} component={LoginClient} />
          <Route exact path={`/signup`} component={SignUp} />
          {/* <Route exact path={`/cat/:id`} component={CategoryPage} /> */}
          {/* <Route exact path={`/cat/:id/:page`} component={CategoryPage} /> */}
          <Route exact path={`/checkout`} component={Checkout} />
          <Route exact path={`/single/:id`} component={ProdSingleInfo} />
          <Route exact path={`/search/`} component={HomeSearch} />
          <Route exact path={`/whishlist/`} component={WhishList} />
          <Route exact path={`/artists/`} component={Artists} />
          <Route exact path={`/about/`} component={About} />
          <Route exact path={`/art_type/:type/:page`} component={ArtByType} />
          <Route exact path={`/contact/`} component={GetInTouch} />
          <Route path={`/profile/`} component={ProfilePage} />
          {/* show appADmin when there /admin in the url */}
          <Route path={`/admin`} component={AppAdmin} />
        </Switch>
        <Footer />
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Provider>
  )
}

export default AppMarket
