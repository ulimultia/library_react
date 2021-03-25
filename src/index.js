import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.2.0";
// import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import "assets/css/style.css"
// import "./index.css";
// import DashboardPeminjam from "layouts/Peminjam"
// import DashboardAdmin from "layouts/Admin";
// import { createBrowserHistory } from "history";
// import { Router, BrowserRouter,Route, Switch, Redirect } from "react-router-dom";
// import Index from "components/login.component"
// import Index from "layouts/Login.js"

// const hist = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
// ReactDOM.render(

//   {/* <Router history={hist}> */}
//   <React.StrictMode>
//     {/* <BrowserRouter>
//         <Route path="/" render={(props) => <Index {...props} />} />
//         {/* <Redirect to="/" /> */}
//         <Route path="/admin" render={(props) => <DashboardAdmin {...props} />} />
//         {/* <Redirect to="/admin/" /> */}
//         <Route path="/peminjam" render={(props) => <DashboardPeminjam {...props} />} />
//         {/* <Redirect to="/peminjam/" /> */}
//     </BrowserRouter> */}
//   </React.StrictMode>,
//   // </Router>
//   document.getElementById("root")
// );