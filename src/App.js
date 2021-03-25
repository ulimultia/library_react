import React , { Fragment } from 'react';
import { BrowserRouter, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
// import App from "./App";
// import './App.css';
// import Login from "./components/login.component";
// import SignUp from "./components/signup.component";
import LayoutPeminjam from "layouts/Peminjam"
import LayoutdAdmin from "layouts/Admin";
import Index from "layouts/Login.js"
import Register from "layouts/Register.js"

function App() {
  return (
    <BrowserRouter>
      <Fragment>
        {/* <Header /> */}
        {/* <Route exact path="/"  component={Index} /> */}
        <Route exact path="/"  render={(props) => <Index {...props} />} />
        <Route path="/register"  render={(props) => <Register {...props} />} />
        {/* <Route path="/admin/dashboard" component={LayoutdAdmin} /> */}
        {/* <Route path="/admin/" component={LayoutdAdmin>} /> */}
        
        <Route path="/admin" render={(props) => <LayoutdAdmin {...props} />} />
        {/* <Redirect to="/admin/dashboard" /> */}
        <Route path="/peminjam" render={(props) => <LayoutPeminjam {...props} />} />
        {/* <Route path="/peminjam/" component={LayoutPeminjam} /> */}
        {/* <Redirect to="/peminjam/dashboard" /> */}
      </Fragment>
    </BrowserRouter>
  // <Router>
  //   <div className="App">
  //     <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
  //       <div className="container">
  //         <Link className="navbar-brand" to={"/sign-in"}>KreasiTech</Link>
  //         <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
  //           <ul className="navbar-nav ml-auto">
  //             <li className="nav-item">
  //               <Link className="nav-link" to={"/sign-in"}>Login</Link>
  //             </li>
  //             <li className="nav-item">
  //               <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
  //             </li>
  //           </ul>
  //         </div>
  //       </div>
  //     </nav>

  //     <div className="auth-wrapper">
  //       <div className="auth-inner">
  //         <Switch>
  //           <Route exact path='/' component={Login} />
  //           <Route path="/sign-in" component={Login} />
  //           <Route path="/sign-up" component={SignUp} />
  //         </Switch>
  //       </div>
  //     </div>
  //   </div>
  // </Router>
  );
}

export default App;