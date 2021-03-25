import React, { useState }from "react";
import { Link, Redirect } from "react-router-dom";

import {
  FormGroup, Label, Input,
  Card, CardBody,CardHeader,
  Button
} from "reactstrap";
import users from "assets/data/datauser"

import "./loginForm.css"


const LoginForm = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [redirect, setRedirect] = useState(false)
    const [role, setRole] = useState("")

    const onChangeUsername = (event)=>{
        const value = event.target.value
        setUsername(value)
    }

    const onChangePassword = (event)=>{
        const value = event.target.value
        setPassword(value)
    }

    const submitLogin = () => {
        // console.log("heheh");
        const data = {
            //kiri sesuain api kanan dari fungsinya
           username: username,
           password: password 
        }
        console.log(data)
        var getUserData;
        //harusnya pake axios buat cek, sementara pake js aja\
        {users.map(val => {
            if(val.username === data.username){
                getUserData = val
                // console.log(getUserData)
            }
            else{
                console.log("checking user ...");
            }
        })}
        // role = 1 itu user, role = 0 admin
        //kalau berhasil ditemukan
        if(getUserData){
            console.log(getUserData.role);
            if(getUserData.role === 0){
                localStorage.setItem("user", getUserData.role)
                setRedirect(true)
                setRole("0")
            }
            else {
                localStorage.setItem("user", getUserData.role)
                setRedirect(true)
                setRole("1")
            }
        }
    }

    const cekRoles = (role) => {
        if(role==="1") return <Redirect to="peminjam/dashboard"/>
        else if(role==="0") return <Redirect to="admin/dashboard"/>
    }

    return (
      <>
        { 
        // console.log("isirole",role)
        cekRoles(role)
            // cekRoles(role)
            // role=="1" && (
            // <Redirect to="peminjam/dashboard"/>) ,
            // role=="2" && (<Redirect to="admin/dashboard"/>)
        }
        <Card className="text-light card-login">
            <CardHeader className="text-center mt-4">
                <h3><i className="fas fa-book-open"></i><strong> KreasiTech</strong> Library</h3>
                <p>LOGIN</p><hr style={{backgroundColor: "white"}}></hr>
            </CardHeader>
            <CardBody >
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
                        <Input type="checkbox" />{' '}
                        Check me out
                        <span className="form-check-sign">
                            <span className="check"></span>
                        </span>
                        </Label>
                    </FormGroup>
                    <Button color="primary" onClick={submitLogin} className="btn-block btn-info">
                        LOGIN
                    </Button>
                </form><br></br>
                <p className="mx-4 mb-4 text-center">Belum punya akun?  
                <Link to="/register"> Daftar </Link> 
                 Sekarang</p>
            </CardBody>
        </Card>
      </>
  );
};

export default LoginForm;
