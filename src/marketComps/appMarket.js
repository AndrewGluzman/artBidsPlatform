import React from 'react';
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom';
import {createStore} from 'redux';
import { Provider } from 'react-redux';
import {composeWithDevTools} from "redux-devtools-extension"
import {marketReducer} from "../reducer/marketReducer"


import AppAdmin from './admin/appAdmin';
import Home from "./client/home";
import LoginClient from './client/loginClient';
import "./client/css/homeList.css";
import SignUp from './client/signup';
import CategoryPage from './client/categoryPage';
import Checkout from './client/checkout';
import ProdSingleInfo from './client/prodSingleInfo';
import HomeSearch from './client/homeSearch';

let myStore = createStore(marketReducer , composeWithDevTools());

function AppMarket(props){
  return(
    <Provider store={myStore}>
    <Router>
      {/* switch of the content */}

        <Switch>
          <Route exact path={`/`} component={Home} />
          <Route exact path={`/login`} component={LoginClient} />
          <Route exact path={`/signup`} component={SignUp} />
          <Route exact path={`/cat/:id`} component={CategoryPage} />
          <Route exact path={`/cat/:id/:page`} component={CategoryPage} />
          <Route exact path={`/checkout`} component={Checkout} />
          <Route exact path={`/single/:id`} component={ProdSingleInfo} />
          <Route exact path={`/search/`} component={HomeSearch} /> 
          {/* show appADmin when there /admin in the url */}
          <Route path={`/admin`} component={AppAdmin} />
      
        </Switch>  
    </Router>
    </Provider>
  )
}

export default AppMarket

