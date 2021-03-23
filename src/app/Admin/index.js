/*!

=========================================================
* Paper Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Fragment }  from "react";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
// import { createBrowserHistory } from "history";
import DashboardAdmin from "../../layouts/Admin";

// const hist = createBrowserHistory();

function Admin(){
  return(
    <BrowserRouter>
      <Fragment>
        <Switch>
          <Route path="/admin" render={(props) => <DashboardAdmin {...props} />} />
          <Redirect to="/admin/dashboard" />
        </Switch>
      </Fragment>
    </BrowserRouter>
  )
}

export default Admin