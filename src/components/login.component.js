import React, { Component } from "react";
import Button from "./Button";
import ReactDOM from "react-dom";
import Peminjam from "../app/Peminjam/index";
import Admin from "../app/Admin/index";
import Swal from 'sweetalert2'

import withReactContent from 'sweetalert2-react-content'

// import { useHistory } from "react-router";
const MySwal = withReactContent(Swal)

export default class Login extends Component {
  constructor() {
    super();
    // this.state = {
    //   email: document.getElementById("email").value,
    //   password: document.getElementById("password").value,
    // };
  }
  handleLogin = () => {
    // const history = useHistory();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if (email == "admin@admin.com" && password == "admin123") {
      // this.props.history.push("/peminjam/dashboard");
      ReactDOM.render(
        <React.StrictMode>
          <Admin />
        </React.StrictMode>,
        document.getElementById("root")
      );
    } else {
        MySwal.fire({
            title: "Gagal!!!",
            text: "Username atau Password Salah",
        })
    }

  };
  emailChecker = (email) => {
    const emailHelp = document.getElementById("emailHelp");
    if (email == "") {
        emailHelp.innerHTML = "Email tidak boleh kosong!";
        emailHelp.style.color = "red";
        return false;
    } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) == false) {
        emailHelp.innerHTML = "Email tidak valid!";
        emailHelp.style.color = "red";
        return false;
    } else {
        emailHelp.innerHTML = "Sesuai!";
        emailHelp.style.color = "green";
        return true;
    }
};

passwordChecker = (password) => {
    const passwordHelp = document.getElementById("passwordHelp");
    if (password === "") {
        passwordHelp.innerHTML = "Password tidak boleh kosong!";
        passwordHelp.style.color = "red";
        return false;
    } else if (password.length < 8) {
        passwordHelp.innerHTML = "Minimal 8 karakter";
        passwordHelp.style.color = "red";
        return false;
    } else {
        passwordHelp.innerHTML = "Sesuai!";
        passwordHelp.style.color = "green";
        return true;
    }
};
  componentDidMount() {
    console.log("component did mount");
  }
  render() {
    return (
      // <div style={{position:"absolute"}}>
      <form className="form-new">
        <h3>Sign In</h3>

        <div className="form-group">
          <label>Email address</label>
          <input
            id="email"
            type="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
          id="password"
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>

        <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>
        <Button label="Sign In"handleClick={this.handleLogin} />
        
        <p className="text-left">
          Belum punya akun? <a href="sign-up">Daftar</a> sekarang.
        </p>
      </form>
      
    );
  }
}
