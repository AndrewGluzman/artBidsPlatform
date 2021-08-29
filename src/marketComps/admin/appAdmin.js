import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Login from './login'
import ListProdAdmin from './listProdAdmin'
import HeaderAdmin from './headerAdmin'
import AuthAdmin from './authAdmin'
import AddProd from './addProd'
import CategoryList from './categoryList'
import AddCat from './addCat'
import UserList from './usersList'
import EditProd from './editProd'
import UserCartsOrders from './userCartsOrders'
import CartInfo from './cartInfo'
import Header from '../client/header'

function AppAdmin(props) {
  return (
    <React.Fragment>
      <AuthAdmin />
      {/* סטריקט דואג שאנחנו באדמין ויו אר אל פנימי שלו */}
      <Route strict path={`/admin/`} component={AuthAdmin} />

      {/* <HeaderAdmin role="Admin panel" /> */}
      <div className="container-xxl pe-0 ">
        <div className="row container-fluid px-0 m-0 ">
          {/* ADD TO Comp sideNavAdmin */}
          {localStorage['tok'] ? (
            <div className="col-2  pt-3  admin_nav_side">
              <Link className="d-block" to="/admin/list">
                Sales
              </Link>
              <Link className="d-block" to="/admin/category">
                Categories
              </Link>
              <Link className="d-block" to="/admin/users">
                Accounts
              </Link>
              <Link className="d-block" to="/admin/userCarts">
                Payed sales
              </Link>
            </div>
          ) : (
            ''
          )}

          <div className="col-10  px-0" style={{ minHeight: '100vh' }}>
            <Switch>
              <Route exact path={`/admin`} component={Login} />
              <Route exact path={`/admin/list`} component={ListProdAdmin} />
              <Route exact path={`/admin/addProd`} component={AddProd} />
              <Route exact path={`/admin/editProd/:id`} component={EditProd} />
              <Route exact path={`/admin/category`} component={CategoryList} />
              <Route exact path={`/admin/addCategory`} component={AddCat} />
              <Route exact path={`/admin/users`} component={UserList} />
              <Route
                exact
                path={`/admin/userCarts`}
                component={UserCartsOrders}
              />
              <Route exact path={`/admin/cartInfo/:id`} component={CartInfo} />
            </Switch>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default AppAdmin
