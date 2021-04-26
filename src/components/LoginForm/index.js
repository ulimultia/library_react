import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router";
import axios from "axios";
import {
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  CardHeader,
  Button,
} from "reactstrap";
import users from "assets/data/datauser";

import "./loginForm.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [role, setRole] = useState("");
  const [session, setSession] = useState({});
  const history = useHistory();

  const onChangeUsername = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  const onChangePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const submitLogin = () => {
    // console.log("heheh");
    const data = {
      //kiri sesuain api kanan dari fungsinya
      username: username,
      password: password,
    };
    // console.log(data)
    var getUserData;

    axios
      .post("http://localhost:8080/auth/login", data) // memasukkan inputan ke post api
      .then((res) => {
        console.log(res); // menampilkan hasil response dari data inputan yang dikirim
        setRole(res.data.data.role); //mengisikan role yang didapatkan dari api ke variabel role
        localStorage.setItem("userdata", JSON.stringify(res.data));  //memasukkan semua response data dari api ke dalam session
        console.log(localStorage.getItem("userdata")); //menampilkan isi session

        if (res.data.data.username === data.username) { //menyamakan username inputan dan username response
          console.log("Login Berhasil!");   

          
        }
      }).then(() => {
//testing proses data session
var obj = localStorage.getItem("userdata")    //memasukkan data session pada var obj
setSession(JSON.parse(obj))  // memasukkan parsing json kedalam objek session
console.log(session);   //mengambil salah satu nilai dari objek session
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
        }
      });
  };

  const cekRoles = () => {
      var peminjam = ["PEMINJAM"]
      var admin = ["ADMIN"]
    // const rolee = localStorage.getItem("user");
    console.log(role);
    if (JSON.stringify(role) === JSON.stringify(peminjam)) {
        return <Redirect to="peminjam/dashboard" />;
    }
    else if (JSON.stringify(role) === JSON.stringify(admin)) {
        return <Redirect to="admin/dashboard" />;
    }
  };

  return (
    <>
      {
        cekRoles()
        // cekRoles(role)
        // role=="1" && (
        // <Redirect to="peminjam/dashboard"/>) ,
        // role=="2" && (<Redirect to="admin/dashboard"/>)
      }
      <Card className="text-light card-login">
        <CardHeader className="text-center mt-4">
          <h3>
            <i className="fas fa-book-open"></i>
            <strong> KreasiTech</strong> Library
          </h3>
          <p>LOGIN</p>
          <hr style={{ backgroundColor: "white" }}></hr>
        </CardHeader>
        <CardBody>
          <form className="mx-4 mb-4">
            <FormGroup>
              <Label for="exampleEmail">Username</Label>
              <Input
                type="email"
                // name="email"
                id="exampleEmail"
                placeholder="Masukkan username ..."
                value={username}
                onChange={onChangeUsername}
              />
              {/* <FormText color="muted">
                        We'll never share your email with anyone else.
                        </FormText> */}
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                // name="password"
                id="examplePassword"
                value={password}
                onChange={onChangePassword}
                placeholder="Masukkan password ..."
              />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" /> Check me out
                <span className="form-check-sign">
                  <span className="check"></span>
                </span>
              </Label>
            </FormGroup>
            <Button
              color="primary"
              onClick={submitLogin}
              className="btn-block btn-info"
            >
              LOGIN
            </Button>
          </form>
          <br></br>
          <p className="mx-4 mb-4 text-center">
            Belum punya akun?
            <Link to="/register"> Daftar </Link>
            Sekarang
          </p>
        </CardBody>
      </Card>
    </>
  );
};

export default LoginForm;
