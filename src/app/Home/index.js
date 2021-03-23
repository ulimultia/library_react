import React, { Fragment }  from "react";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
// import { createBrowserHistory } from "history";
import LoginPage from "../../layouts/Login";

function Home(){
    return(
      <BrowserRouter>
        <Fragment>
          <Switch>
            <Route path="/index" render={(props) => <LoginPage {...props} />} />
            <Redirect to="/index/login" />
          </Switch>
        </Fragment>
      </BrowserRouter>
    )
  }
  
  export default Home