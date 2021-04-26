import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  FormGroup,
  Label,
  Input,
  FormText,
  Card,
  CardBody,
  CardHeader,
  Button,
  Row,
  Col,
} from "reactstrap";

import "./registerForm.css";
const MySwal = withReactContent(Swal);

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [konfirmasiPassword, setKonfirmasiPassword] = useState("");
  const [nik, setNik] = useState("");
  const [role, setRole] = useState([]);
  const [email, setEmail] = useState("");
  const [foto, setFoto] = useState("");
  const [kelamin, setKelamin] = useState("");
  const [tempatLahir, setTempatLahir] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [alamat, setAlamat] = useState("");
  const [namaLengkap, setNamaLengkap] = useState("");
  const [telepon, setTelepon] = useState("");

  const [labelNIK, setLabelNIK] = useState("");
  const [labelNama, setLabelNama] = useState("");
  const [labelEmail, setLabelEmail] = useState("");
  const [labelUsername, setLabelUsername] = useState("");
  const [labelTempatLahir, setLabelTempatLahir] = useState("");
  const [labelTanggalLahir, setLabelTanggalLahir] = useState("");
  const [labelAlamat, setLabelAlamat] = useState("");
  const [labelTelepon, setLabelTelepon] = useState("");
  const [labelPassword, setLabelPassword] = useState("");
  const [labelKonfirmasiPassword, setLabelKonfirmasiPassword] = useState("");
  const [isValid, setIsValid] = useState(true);

  const onChangeUsername = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  const onChangePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const onChangeKonfirmasiPassword = (event) => {
    const value = event.target.value;
    setKonfirmasiPassword(value);
  };

  const onChangeNik = (event) => {
    const value = event.target.value;
    setNik(value);
  };

  const onChangeEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const onChangeTempatLahir = (event) => {
    const value = event.target.value;
    setTempatLahir(value);
  };

  const onChangeTanggalLahir = (event) => {
    const value = event.target.value;
    setTanggalLahir(value);
  };

  const onChangeAlamat = (event) => {
    const value = event.target.value;
    setAlamat(value);
  };

  const onChangeNamaLengkap = (event) => {
    const value = event.target.value;
    setNamaLengkap(value);
  };

  const onChangeTelepon = (event) => {
    const value = event.target.value;
    setTelepon(value);
  };

  const submitRegister = () => {
    //
    // validasi NIK
    if (nik === "") {
      setIsValid(false);
      setLabelNIK("Tidak boleh kosong");
    } else {
      setLabelNIK("");
    }
    if (namaLengkap === "") {
      setIsValid(false);
      setLabelNama("Tidak boleh kosong");
    } else {
      setLabelNama("");
    }
    if (email === "") {
      setIsValid(false);
      setLabelEmail("Tidak boleh kosong");
    } else {
      setLabelEmail("");
    }
    if (username === "") {
      setIsValid(false);
      setLabelUsername("Tidak boleh kosong");
    } else {
      setLabelUsername("");
    }
    if (tempatLahir === "") {
      setIsValid(false);
      setLabelTempatLahir("Tidak boleh kosong");
    } else {
      setLabelTempatLahir("");
    }
    if (tanggalLahir === "") {
      setIsValid(false);
      setLabelTanggalLahir("Tidak boleh kosong");
    } else {
      setLabelTanggalLahir("");
    }
    if (alamat === "") {
      setIsValid(false);
      setLabelAlamat("Tidak boleh kosong");
    } else {
      setLabelAlamat("");
    }
    if (telepon === "") {
      setIsValid(false);
      setLabelTelepon("Tidak boleh kosong");
    } else {
      setLabelTelepon("");
    }
    if (password === "") {
      setIsValid(false);
      setLabelPassword("Tidak boleh kosong");
    } else {
      setLabelPassword("");
    }
    if (konfirmasiPassword === "") {
      setIsValid(false);
      setLabelKonfirmasiPassword("Tidak boleh kosong");
    } else {
      setLabelKonfirmasiPassword("");
    }

    //
    setFoto(
      "https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png"
    );
    setKelamin("-");
    setRole(["PEMINJAM"]);
    const data = {
      //kiri sesuain api kanan dari fungsinya
      username: username,
      password: password,
      role: role,
      nama: namaLengkap,
      alamat: alamat,
      foto: foto,
      kelamin: kelamin,
      nik: nik,
      tanggalLahir: tanggalLahir,
      telp: telepon,
      tempatLahir: tempatLahir,
    };

    axios
      .post("http://localhost:8080/auth/register", data) // memasukkan inputan ke post api
      .then((res) => {
        console.log(res); // menampilkan hasil response dari data inputan yang dikirim
        if (isValid === true) {
          MySwal.fire({
            title: "Berhasil!!!",
            icon: "success",
            text: "Berhasil Menambahkan User",
          });
          return <Redirect to="/" />;
        }
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
        }
      });
  };
  return (
    <>
      <Card className="text-light card-register">
        <CardHeader className="text-center mt-4">
          <h3>
            <i className="fas fa-book-open"></i>
            <strong> KreasiTech</strong> Library
          </h3>
          <p>REGISTER</p>
          <hr style={{ backgroundColor: "white" }}></hr>
        </CardHeader>
        <CardBody>
          <form className="mx-4 mb-4">
            <Row>
              <Col xs="12" sm="6">
                <FormGroup>
                  <Label for="nik">NIK</Label>
                  <span class="font-weight-lighter ml-3" id="labelNikAdd">
                    {labelNIK}
                  </span>
                  <Input
                    type="number"
                    name="nik"
                    id="nik"
                    placeholder="1234567890123456"
                    value={nik}
                    onChange={onChangeNik}
                  />
                </FormGroup>
              </Col>
              <Col xs="12" sm="6">
                <FormGroup>
                  <Label for="nama">Nama</Label>
                  <span class="font-weight-lighter ml-3" id="labelNamaAdd">
                    {labelNama}
                  </span>
                  <Input
                    type="text"
                    name="nama"
                    id="nama"
                    placeholder="Nama lengkap ..."
                    value={namaLengkap}
                    onChange={onChangeNamaLengkap}
                  />
                </FormGroup>
              </Col>
              <Col xs="12" sm="6">
                <FormGroup>
                  <Label for="email">Email</Label>
                  <span class="font-weight-lighter ml-3" id="labelEmailAdd">
                    {labelEmail}
                  </span>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email ..."
                    value={email}
                    onChange={onChangeEmail}
                  />
                </FormGroup>
              </Col>
              <Col xs="12" sm="6">
                <FormGroup>
                  <Label for="username">Username</Label>
                  <span class="font-weight-lighter ml-3" id="labelUsernameAdd">
                    {labelUsername}
                  </span>
                  <Input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username ..."
                    value={username}
                    onChange={onChangeUsername}
                  />
                </FormGroup>
              </Col>
              <Col xs="12" sm="6">
                <FormGroup>
                  <Label for="tempat_lahir">Tempat Lahir</Label>
                  <span
                    class="font-weight-lighter ml-3"
                    id="labelTempatLahirAdd"
                  >
                    {labelTempatLahir}
                  </span>

                  <Input
                    type="text"
                    name="tempat_lahir"
                    id="tempat_lahir"
                    placeholder="Tempat lahir  ..."
                    value={tempatLahir}
                    onChange={onChangeTempatLahir}
                  />
                </FormGroup>
              </Col>
              <Col xs="12" sm="6">
                <FormGroup>
                  <Label for="tanggal_lahir">Tanggal Lahir</Label>
                  <span
                    class="font-weight-lighter ml-3"
                    id="labelTanggalLahirAdd"
                  >
                    {labelTanggalLahir}
                  </span>

                  <Input
                    type="date"
                    name="tanggal_lahir"
                    id="tanggal_lahir"
                    placeholder="Tanggal lahir  ..."
                    value={tanggalLahir}
                    onChange={onChangeTanggalLahir}
                  />
                </FormGroup>
              </Col>
              <Col xs="12" sm="6">
                <FormGroup>
                  <Label for="alamat">Alamat</Label>
                  <span class="font-weight-lighter ml-3" id="labelAlamatAdd">
                    {labelAlamat}
                  </span>

                  <Input
                    type="text"
                    name="alamat"
                    id="alamat"
                    placeholder="Alamat  ..."
                    value={alamat}
                    onChange={onChangeAlamat}
                  />
                </FormGroup>
              </Col>
              <Col xs="12" sm="6">
                <FormGroup>
                  <Label for="alamat">Telepon</Label>
                  <span class="font-weight-lighter ml-3" id="labelTeleponAdd">
                    {labelTelepon}
                  </span>

                  <Input
                    type="text"
                    name="telepon"
                    id="telepon"
                    placeholder="Telepon  ..."
                    value={telepon}
                    onChange={onChangeTelepon}
                  />
                </FormGroup>
              </Col>
              <Col xs="12" sm="6">
                <FormGroup>
                  <Label for="password">Password</Label>
                  <span class="font-weight-lighter ml-3" id="labelPasswordAdd">
                    {labelPassword}
                  </span>

                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password ..."
                    value={password}
                    onChange={onChangePassword}
                  />
                </FormGroup>
              </Col>
              <Col xs="12" sm="6">
                <FormGroup>
                  <Label for="password">Konfirmasi Password</Label>
                  <span
                    class="font-weight-lighter ml-3"
                    id="labelKonfirmasiPasswordAdd"
                  >
                    {labelKonfirmasiPassword}
                  </span>

                  <Input
                    type="password"
                    name="cpassword"
                    id="cpassword"
                    placeholder="Konfirmasi password ..."
                    value={konfirmasiPassword}
                    onChange={onChangeKonfirmasiPassword}
                  />
                </FormGroup>
              </Col>
            </Row>
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
              onClick={submitRegister}
              className="btn-block btn-warning"
            >
              REGISTER
            </Button>
          </form>
          <br></br>
          <p className="mx-4 mb-4 text-center">
            Sudah punya akun?
            <Link to="/"> Masuk</Link> Sekarang
          </p>
        </CardBody>
      </Card>
    </>
  );
};

export default RegisterForm;
