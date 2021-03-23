import React, { Component } from "react";
import Button from "./Button";
import ReactDOM from "react-dom";
import Peminjam from "../app/Peminjam/index";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
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
    

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if (email == "admin@admin.com" && password == "admin123") {
      ReactDOM.render(
        <React.StrictMode>
          <Peminjam />
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
  componentDidMount() {
    console.log("component did mount");
  }
  render() {
    return (
      <form>
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

        <button type="button" onClick={this.handleLogin} className="btn btn-primary btn-block">Sign In</button>
        <p className="text-left">
          Belum punya akun? <a href="sign-up">Daftar</a> sekarang.
        </p>
      </form>
    );
  }
}
