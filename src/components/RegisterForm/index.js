import React from "react";
import { Link } from "react-router-dom";

import {
  FormGroup, Label, Input, FormText,
  Card, CardBody,CardHeader,
  Button,
  Row, Col
} from "reactstrap";

import "./registerForm.css"

const RegisterForm = () => {
  return (
      <>
        <Card className="text-light card-register">
            <CardHeader className="text-center mt-4">
                <h3><i className="fas fa-book-open"></i><strong> KreasiTech</strong> Library</h3>
                <p>REGISTER</p><hr style={{backgroundColor: "white"}}></hr>
            </CardHeader>
            <CardBody >
                <form className="mx-4 mb-4">
                    <Row>
                        <Col xs="12" sm="6">
                            <FormGroup>
                                <Label for="nik">NIK</Label>
                                <Input
                                type="number"
                                name="nik"
                                id="nik"
                                placeholder="1234567890123456"
                                />
                            </FormGroup>
                        </Col>
                        <Col xs="12" sm="6">
                            <FormGroup>
                                <Label for="nama">Nama</Label>
                                <Input
                                type="text"
                                name="nama"
                                id="nama"
                                placeholder="Nama lengkap ..."
                                />
                            </FormGroup>
                        </Col>
                        <Col xs="12" sm="6">
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email ..."
                                />
                            </FormGroup>
                        </Col>
                        <Col xs="12" sm="6">
                            <FormGroup>
                                <Label for="username">Username</Label>
                                <Input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Username ..."
                                />
                            </FormGroup>
                        </Col>
                        <Col xs="12" sm="6">
                            <FormGroup>
                                <Label for="tempat_lahir">Tempat Lahir</Label>
                                <Input
                                type="text"
                                name="tempat_lahir"
                                id="tempat_lahir"
                                placeholder="Tempat lahir  ..."
                                />
                            </FormGroup>
                        </Col>
                        <Col xs="12" sm="6">
                            <FormGroup >
                                <Label for="tanggal_lahir">Tanggal Lahir</Label>
                                <Input
                                type="date"
                                name="tanggal_lahir"
                                id="tanggal_lahir"
                                placeholder="Tanggal lahir  ..."
                                />
                            </FormGroup>
                        </Col>
                        <Col xs="12" sm="6">
                            <FormGroup >
                                <Label for="alamat">Alamat</Label>
                                <Input
                                type="text"
                                name="alamat"
                                id="alamat"
                                placeholder="Alamat  ..."
                                />
                            </FormGroup>
                        </Col>
                        <Col xs="12" sm="6">
                            <FormGroup >
                                <Label for="alamat">Telepon</Label>
                                <Input
                                type="text"
                                name="telepon"
                                id="telepon"
                                placeholder="Telepon  ..."
                                />
                            </FormGroup>
                        </Col>
                        <Col xs="12" sm="6">
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password ..."
                                />
                            </FormGroup>
                        </Col>
                        <Col xs="12" sm="6">
                            <FormGroup>
                                <Label for="password">Konfirmasi Password</Label>
                                <Input
                                type="password"
                                name="cpassword"
                                id="cpassword"
                                placeholder="Konfirmasi password ..."
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup check>
                        <Label check>
                        <Input type="checkbox" />{' '}
                        Check me out
                        <span className="form-check-sign">
                            <span className="check"></span>
                        </span>
                        </Label>
                    </FormGroup>
                    <Button color="primary" type="submit" className="btn-block btn-warning">
                        REGISTER
                    </Button>
                </form><br></br>
                <p className="mx-4 mb-4 text-center">Sudah punya akun?  
                <Link to="/"> Masuk</Link>  Sekarang</p>
            </CardBody>
        </Card>
      </>
  );
};

export default RegisterForm;
