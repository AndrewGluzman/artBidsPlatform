import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HeaderAdmin from "../admin/headerAdmin";
import AccSettings from "./accSetings";

// import Login from "./login";
// import ListProdAdmin from "./listProdAdmin";
// import AuthAdmin from "./authAdmin";
// import AddProd from "./addProd";
// import CategoryList from "./categoryList";
// import AddCat from "./addCat";
// import UserList from "./usersList";
// import EditProd from "./editProd";
// import UserCartsOrders from "./userCartsOrders";
// import CartInfo from "./cartInfo";

function ProfilePage(props) {
  return (
    // <Router>
    <React.Fragment>
      {/* סטריקט דואג שאנחנו באדמין ויו אר אל פנימי שלו */}
      <HeaderAdmin />
      <div className="container-fluid">
        <div className="row">
          {/* ADD TO Comp sideNavAdmin */}
          {/* {localStorage["tok"] ? ( */}
          <nav className="col-2  admin_nav_side" style={{ minHeight: "100vh" }}>
            <Link className="d-block" to="/profile/accountSettings">
              Account Settings
            </Link>
            <Link className="d-block" to="/profile/userProducts">
              My works for sale.
            </Link>
            <Link className="d-block" to="/profile/userPurchases">
              My puchases.
            </Link>
            {/* <Link className="d-block" to="/admin/category">
              Category
            </Link>
            <Link className="d-block" to="/admin/users">
              Users
            </Link>
            <Link className="d-block" to="/admin/userCarts">
              Users orders
            </Link> */}
          </nav>
          {/* ) : (
            <nav
              className="col-2  admin_nav_side"
              style={{ minHeight: "100vh" }}
            >
              <Link className="d-block" to="/">
                Home page
              </Link>
            </nav>
          )} */}

          <div className="col-9">
            <Switch>
              <Route
                exact
                path={`/profile/accountSettings`}
                component={AccSettings}
              />
              <Route
                exact
                path={`/profile/userProducts`}
                component={userProducts}
              />
              {/* <Route exact path={`/admin/addProd`} component={AddProd} />
              <Route exact path={`/admin/editProd/:id`} component={EditProd} />
              <Route exact path={`/admin/category`} component={CategoryList} />
              <Route exact path={`/admin/addCategory`} component={AddCat} />
              <Route exact path={`/admin/users`} component={UserList} />
              <Route
                exact
                path={`/admin/userCarts`}
                component={UserCartsOrders}
              />
              <Route exact path={`/admin/cartInfo/:id`} component={CartInfo} /> */}
            </Switch>
          </div>
        </div>
      </div>
    </React.Fragment>
    // </Router>
  );
}

export default ProfilePage;
