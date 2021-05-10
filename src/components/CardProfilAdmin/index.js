import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Button,
  Card,
  CardBody,
  CardTitle,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const CardProfilAdmin = () => {
  let sessionData = JSON.parse(localStorage.getItem("userdata"));
  let idUser = sessionData.data.id;

  const [detailUser, setdetailUser] = useState({});

  const [editModal, setEditModal] = useState(false);
  const [gantiPass, setGantiPass] = useState(false);

  const [fotoProfil, setFoto] = useState("");

  const [edNik, setEdNik] = useState("");
  const [edNikHelp, setEdNikHelp] = useState("");
  const [edNama, setEdNama] = useState("");
  const [edNamaHelp, setEdNamaHelp] = useState("");
  const [edTempat, setEdTempat] = useState("");
  const [edTempatHelp, setEdTempatHelp] = useState("");
  const [edTanggal, setEdTanggal] = useState("");
  const [edTanggalHelp, setEdTanggalHelp] = useState("");
  const [edKelamin, setEdKelamin] = useState("");
  const [edKelaminHelp, setEdKelaminHelp] = useState("");
  // const [edEmail, setEdEmail] = useState("")
  // const [edEmailHelp, setEdEmailHelp] = useState("")
  // const [edUsername, setEdUsername] = useState("")
  // const [edUsernameHelp, setEdUsernameHelp] = useState("")
  const [edTelp, setEdTelp] = useState("");
  const [edTelpHelp, setEdTelpHelp] = useState("");
  const [edAlamat, setEdAlamat] = useState("");
  const [edAlamatHelp, setEdAlamatHelp] = useState("");
  const [passNow, setPassNow] = useState("");
  const [passNowHelp, setPassNowHelp] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newPassHelp, setNewPassHelp] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [confirmPassHelp, setConfirmPassHelp] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    getAllDetailUser();
  }, []);

  // let edNik = detailUser.nik
  const getAllDetailUser = () => {
    const userHeader = authHeader();

    axios
      .get("http://localhost:8080/user/get-detail/" + idUser, {
        headers: userHeader,
      })
      .then((response) => {
        //   this.setState({
        setdetailUser(response.data);
        setEdNik(response.data.nik);
        setEdNama(response.data.nama);
        setEdKelamin(response.data.kelamin);
        setEdTempat(response.data.tempatLahir);
        setEdTanggal(response.data.tanggalLahir);
        setEdAlamat(response.data.alamat);
        setEdTelp(response.data.telp);
        setFoto(response.data.foto);
      });
  };
  const authHeader = () => {
    const user = JSON.parse(localStorage.getItem("userdata"));
    if (user && user.data.token) {
      return {
        authorization: `Bearer ${user.data.token}`,
      };
    } else {
      return null;
    }
  };
  //fungsi buka dan tutup modal
  const toggleEdit = () => setEditModal(!editModal);
  const toggleGantiPass = () => setGantiPass(!gantiPass);

  // === EDIT PROFIL ===
  const onChangeEdNik = (event) => {
    setEdNik(event.target.value);
  };
  const onChangeEdNama = (event) => {
    setEdNama(event.target.value);
  };
  const onChangeEdTempat = (event) => {
    setEdTempat(event.target.value);
  };
  const onChangeEdTanggal = (event) => {
    setEdTanggal(event.target.value);
    // console.log(edTanggal)
  };
  const fileChange = async (e) => {
    console.log(e.target.files);
    console.log(e);
    console.log(file);

    await setFile(e.target.files[0]);
    // await setFiles([]);
    // await this.setState({
    //   file: e.target.files[0],
    // });
    console.log(file);
  };
  // const onChangeEdEmail = (event) =>{
  //     setEdEmail(event.target.value);
  // }
  // const onChangeEdUsername = (event) =>{
  //     setEdUsername(event.target.value);
  // }
  const onChangeEdTelp = (event) => {
    setEdTelp(event.target.value);
  };
  const onChangeEdAlamat = (event) => {
    setEdAlamat(event.target.value);
  };
  const onChangeEdKelamin = (event) => {
    setEdKelamin(event.target.value);
  };

  // validasi dan feedback edit profil
  const editNow = (e) => {
    e.preventDefault();
    const userHeader = authHeader();

    // console.log("klik edit profil");
    var isValid = true;
    // validasi NIK
    if (isNaN(edNik) === true) {
      isValid = false;
      setEdNikHelp("Harus Angka");
    } else if (edNik === "") {
      isValid = false;
      setEdNikHelp("Tidak boleh kosong");
    } else if (edNik.length < 16) {
      isValid = false;
      setEdNikHelp("Harus 16 digit");
    } else {
      setEdNikHelp("");
    }
    // validasi Nama
    if (edNama === "") {
      isValid = false;
      setEdNamaHelp("Tidak boleh kosong");
    } else {
      setEdNamaHelp("");
    }
    // validasi Tempat Lahir
    if (edTempat === "") {
      isValid = false;
      setEdTempatHelp("Tidak boleh kosong");
    } else {
      setEdTempatHelp("");
    }
    // validasi Tanggal
    if (edTanggal === null) {
      isValid = false;
      setEdTanggalHelp("Tidak boleh kosong");
    } else {
      setEdTanggalHelp("");
    }
    // validasi Email
    // if (edEmail === "") {isValid = false; setEdEmailHelp("Tidak boleh kosong")}
    // else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(edEmail) === false) {isValid = false; setEdEmailHelp("Tidak valid")}
    // else {setEdEmailHelp("")}
    // validasi Usernamw
    // if (edUsername === "") {isValid =false; setEdUsernameHelp("Tidak boleh kosong")}
    // else if (edUsername.length < 5) { isValid = false; setEdUsernameHelp("Minimal 5 karkater")}
    // else {setEdUsernameHelp("")}
    // validasi Telepon
    if (edTelp === "") {
      isValid = false;
      setEdTelpHelp("Tidak boleh kosong");
    } else if (isNaN(edTelp) === true) {
      isValid = false;
      setEdTelpHelp("Harus Angka");
    } else {
      setEdTelpHelp("");
    }
    // validasi Alamat
    if (edAlamat === "") {
      isValid = false;
      setEdAlamatHelp("Tidak boleh kosong");
    } else {
      setEdAlamatHelp("");
    }
    if (edKelamin === "") {
      isValid = false;
      setEdAlamatHelp("Tidak boleh kosong");
    } else {
      setEdKelaminHelp("");
    }
    if (file === null && isValid === true) {
      const fileNull = {
        nik: edNik,
        nama: edNama,
        tempatLahir: edTempat,
        tanggalLahir: edTanggal,
        kelamin: edKelamin,
        alamat: edAlamat,
        telp: edTelp,
        foto: fotoProfil,
      };
      console.log(fileNull);
      axios
        .put("http://localhost:8080/user/edit/" + detailUser.id, fileNull, {
          headers: userHeader,
        })
        .then((response) => {
          setEditModal(false);
          getAllDetailUser();
          MySwal.fire({
            icon: "success",
            title: "Sukses!!!",
            text: "Data berhasil diubah ....",
          });
        });
    }
    const data = new FormData();
    data.append("file", file);
    //feedback
    if (isValid === true) {
      axios
        .post("http://localhost:8080/api/v1/files/uploadfoto", data, {
          headers: userHeader,
        })
        .then((res) => {
          setFile(null);
          const detailDto = {
            nik: edNik,
            nama: edNama,
            tempatLahir: edTempat,
            tanggalLahir: edTanggal,
            kelamin: edKelamin,
            alamat: edAlamat,
            telp: edTelp,
            foto: res.data.name,
          };
          axios
            .put(
              "http://localhost:8080/user/edit/" + detailUser.id,
              detailDto,
              {
                headers: userHeader,
              }
            )
            .then((response) => {
              setEditModal(false);
              getAllDetailUser();
              MySwal.fire({
                icon: "success",
                title: "Sukses!!!",
                text: "Data berhasil diubah ....",
              });
            })
            .catch((error) => {
              MySwal.fire({
                icon: "success",
                title: "Gagal!!!",
                text: error.response.data.message,
              });
            });
        });
    } else {
      MySwal.fire({
        icon: "error",
        title: "Gagal!!!",
        text: "Data gagal diubah. Silahkan cek kembali formulir Anda ....",
      });
    }
  };

  // ==== GANTI PASSWORD ====
  // set state / ubah isi dari variable password yang ada berdasarkan inputan user
  const onChangePassNow = (event) => {
    setPassNow(event.target.value);
  };
  const onChangeNewPass = (event) => {
    setNewPass(event.target.value);
  };
  const onChangeConfirmPass = (event) => {
    setConfirmPass(event.target.value);
  };
  // === validasi dan feedback dari hasilpengecekan
  const editPassNow = () => {
    const userHeader = authHeader();

    var isValid = true;
    // validasi pass saat ini
    if (passNow === "") {
      isValid = false;
      setPassNowHelp("Tidak boleh kosong");
    } else if (passNow.length < 5) {
      isValid = false;
      setPassNowHelp("Minimal 5 karakter");
    } else setPassNowHelp("");
    // validasi pass baru
    if (newPass === "") {
      isValid = false;
      setNewPassHelp("Tidak boleh kosong");
    } else if (newPass === passNow) {
      isValid = false;
      setNewPassHelp("Password baru harus berbeda");
    } else if (newPass.length < 5) {
      isValid = false;
      setNewPassHelp("Minimal 5 karakter");
    } else setNewPassHelp("");
    // validasi konfirmasi password
    if (confirmPass === "") {
      isValid = false;
      setConfirmPassHelp("Tidak boleh kosong");
    } else if (confirmPass !== newPass) {
      isValid = false;
      setConfirmPassHelp("Tidak sesuai");
    } else setConfirmPassHelp("");

    if (isValid === true) {
      let sessionData = JSON.parse(localStorage.getItem("userdata"));
      let uname = sessionData.data.username;
      console.log(uname);
      const userDto = {
        username: uname,
        passwordNew: newPass,
        password: passNow,
      };
      axios
        .put("http://localhost:8080/auth/change", userDto, {
          headers: userHeader,
        })
        .then((response) => {
          setGantiPass(false);
          setPassNowHelp("");
          setPassNow("");
          setNewPass("");
          setConfirmPass("");
          MySwal.fire({
            icon: "success",
            title: "Sukses!!!",
            text: "Password berhasil diubah ....",
          });
        })
        .catch((error) => {
          MySwal.fire({
            icon: "error",
            title: "Gagal!!!",
            text: error.response.data.message + " ....",
          });
          setPassNowHelp("Password salah");
        });
    } else {
      MySwal.fire({
        icon: "error",
        title: "Gagal!!!",
        text: "Password gagal diubah. Silahkan cek kembali formulir Anda ....",
      });
    }
  };

  // handle tanggal lahir
  const handleTgl = (tanggal) => {
    if (tanggal == null) return tanggal;
    else
      return new Intl.DateTimeFormat("en-GB", { dateStyle: "long" }).format(
        new Date(tanggal)
      );
  };
  return (
    <div>
      <Row>
        <Col md="12">
          <Card className="card-user">
            <div className="image" style={{ height: "200px" }}>
              <img
                alt=""
                src="https://www.marketplace.org/wp-content/uploads/2021/01/Books_New-e1611252343470.jpg?fit=2879%2C1619"
                style={{ backgroundPositionX: "80%", objectFit: "cover" }}
              />
            </div>
            <CardBody>
              <div className="author mb-4">
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <img
                    alt=""
                    className="avatar border-gray"
                    src={
                      "http://localhost:8080/api/v1/files/downloadprofil/" +
                      detailUser.foto
                    }
                  />
                  <h5 className="title" style={{ color: "#845f3e" }}>
                    {" "}
                    {detailUser.nama}
                  </h5>
                </a>
                <p className="description">
                  Admin<br></br>
                  <Button
                    round
                    outline
                    color="default"
                    className="btn-sm"
                    onClick={toggleEdit}
                  >
                    <i className="fas fa-pen-alt fa-xs"></i> Edit Profil
                  </Button>
                  <Modal
                    isOpen={editModal}
                    toggle={toggleEdit}
                    className="modal-lg"
                  >
                    <ModalHeader
                      toggle={toggleEdit}
                      style={{
                        backgroundImage:
                          "linear-gradient(to left, #44a08d, #093637)",
                        color: "#ffffff",
                      }}
                    >
                      Edit Profil
                    </ModalHeader>
                    <form>
                      <ModalBody className="mx-4 my-3">
                        <Row>
                          <Col xs="12" sm="6" className="mb-3">
                            <FormGroup>
                              <Label for="nik">NIK</Label>
                              <Input
                                type="number"
                                name="edNik"
                                id="edNik"
                                placeholder="1234567890123456"
                                value={edNik}
                                onChange={onChangeEdNik}
                              />
                              <FormText color="danger">{edNikHelp}</FormText>
                            </FormGroup>
                          </Col>
                          <Col xs="12" sm="6" className="mb-3">
                            <FormGroup>
                              <Label for="nama">Nama</Label>
                              <Input
                                type="text"
                                name="edNama"
                                id="edNama"
                                placeholder="Nama lengkap ..."
                                value={edNama}
                                onChange={onChangeEdNama}
                              />
                              <FormText color="danger">{edNamaHelp}</FormText>
                            </FormGroup>
                          </Col>
                          {/* <Col xs="12" sm="6" className="mb-3">
                                                <FormGroup>
                                                    <Label for="email">Email</Label>
                                                    <Input type="email" name="edEmail" id="edEmail" placeholder="Email ..."
                                                    value={edEmail}
                                                    onChange = {onChangeInput}
                                                    />
                                                    <FormText color="danger">{edEmailHelp}</FormText>
                                                </FormGroup>
                                            </Col> */}
                          {/* <Col xs="12" sm="6" className="mb-3">
                                                <FormGroup>
                                                    <Label for="username">Username</Label>
                                                    <Input type="text" name="edUsername" id="edUsername" placeholder="Username ..."
                                                    value={edUsername}
                                                    onChange = {onChangeEdUsername}
                                                    />
                                                    <FormText color="danger">{edUsernameHelp}</FormText>
                                                </FormGroup>
                          */}
                          <Col xs="12" sm="6" className="mb-3">
                            <FormGroup>
                              <Label for="edTempat">Tempat Lahir</Label>
                              <Input
                                type="text"
                                name="edTempat"
                                id="edTempat"
                                placeholder="Tempat lahir  ..."
                                value={edTempat}
                                onChange={onChangeEdTempat}
                              />
                              <FormText color="danger">{edTempatHelp}</FormText>
                            </FormGroup>
                          </Col>
                          <Col xs="12" sm="6" className="mb-3">
                            <FormGroup>
                              <Label for="edTanggal">Tanggal Lahir</Label>
                              <Input
                                type="date"
                                name="edTanggal"
                                id="edTanggal"
                                placeholder="Tanggal lahir  ..."
                                value={edTanggal}
                                onChange={onChangeEdTanggal}
                              />
                              <FormText color="danger">
                                {edTanggalHelp}
                              </FormText>
                            </FormGroup>
                          </Col>
                          <Col xs="12" sm="6" className="mb-3">
                            <FormGroup>
                              <Label for="nama">Jenis Kelamin</Label>
                              <Input
                                type="select"
                                name="edKelamin"
                                id="edKelamin"
                                placeholder="Nama lengkap ..."
                                value={edKelamin}
                                onChange={onChangeEdKelamin}
                              >
                                <option value="Perempuan">Perempuan </option>
                                <option value="Laki-laki">Laki-laki </option>
                              </Input>
                              <FormText color="danger">
                                {edKelaminHelp}
                              </FormText>
                            </FormGroup>
                          </Col>
                          <Col xs="12" sm="6" className="mb-3">
                            <FormGroup>
                              <Label for="edAlamat">Alamat</Label>
                              <Input
                                type="text"
                                name="edAlamat"
                                id="edAlamat"
                                placeholder="Alamat  ..."
                                value={edAlamat}
                                onChange={onChangeEdAlamat}
                              />
                              <FormText color="danger">{edAlamatHelp}</FormText>
                            </FormGroup>
                          </Col>
                          <Col xs="12" sm="6" className="mb-3">
                            <FormGroup>
                              <Label for="edTelp">Telepon</Label>
                              <Input
                                type="text"
                                name="edTelp"
                                id="edTelp"
                                placeholder="Telepon  ..."
                                value={edTelp}
                                onChange={onChangeEdTelp}
                              />
                              <FormText color="danger">{edTelpHelp}</FormText>
                            </FormGroup>
                          </Col>
                          <Col xs="12" sm="6" className="mb-3">
                            <FormGroup>
                              <Label for="edTelp">Foto Profil</Label>
                              <Input
                                type="file"
                                name="fotoProfil"
                                id="fotoProfil"
                                onChange={fileChange}
                              />
                              {/* <FormText color="danger">{edTelpHelp}</FormText> */}
                            </FormGroup>
                          </Col>
                        </Row>
                      </ModalBody>
                      <ModalFooter
                      // style={{backgroundColor: "#100906"}}
                      >
                        <Button
                          size="sm"
                          color="secondary"
                          onClick={toggleEdit}
                        >
                          Tutup
                        </Button>
                        <Button size="sm" color="info" onClick={editNow}>
                          Simpan
                        </Button>
                      </ModalFooter>
                    </form>
                  </Modal>
                  <Button
                    round
                    outline
                    color="default"
                    className="btn-sm"
                    onClick={toggleGantiPass}
                  >
                    <i className="fas fa-key fa-xs"></i> Ganti Password
                  </Button>
                  <Modal
                    isOpen={gantiPass}
                    toggle={toggleGantiPass}
                    className="modal-sm"
                  >
                    <ModalHeader
                      toggle={toggleGantiPass}
                      style={{
                        backgroundImage:
                          "linear-gradient(to left, #44a08d, #093637)",
                        color: "#ffffff",
                      }}
                    >
                      Ganti Password
                    </ModalHeader>
                    <form>
                      <ModalBody className="mx-3 my-3">
                        <FormGroup className="mb-3">
                          <Label for="password">Passwod Sekarang</Label>
                          <Input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password saat ini ..."
                            value={passNow}
                            onChange={onChangePassNow}
                          />
                          <FormText color="danger">{passNowHelp}</FormText>
                        </FormGroup>
                        <FormGroup className="mb-3">
                          <Label for="newpassword">Password Baru</Label>
                          <Input
                            type="password"
                            name="newpassword"
                            id="newpassword"
                            placeholder="Password baru ..."
                            value={newPass}
                            onChange={onChangeNewPass}
                          />
                          <FormText color="danger">{newPassHelp}</FormText>
                        </FormGroup>
                        <FormGroup className="mb-3">
                          <Label for="cpassword">
                            Konfirmasi Password Baru
                          </Label>
                          <Input
                            type="password"
                            name="cpassword"
                            id="cpassword"
                            placeholder="Konfirmasi password baru ..."
                            value={confirmPass}
                            onChange={onChangeConfirmPass}
                          />
                          <FormText color="danger">{confirmPassHelp}</FormText>
                        </FormGroup>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          type="reset"
                          size="sm"
                          color="secondary"
                          onClick={toggleGantiPass}
                        >
                          Tutup
                        </Button>
                        <Button size="sm" color="info" onClick={editPassNow}>
                          Simpan
                        </Button>
                      </ModalFooter>
                    </form>
                  </Modal>
                </p>
              </div>
              <hr />
              {/* <p className="description text-center">
              "I like the way you work it <br />
              No diggity <br />I wanna bag it up"
              </p> */}
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="6">
          <Card className="card-stats">
            <CardBody>
              <Row>
                <Col md="4" xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i
                      className="fas fa-venus-mars"
                      style={{ color: "#44a08d" }}
                    />
                  </div>
                </Col>
                <Col md="8" xs="7">
                  <div>
                    <p className="card-category">Jenis Kelamin</p>
                    <CardTitle tag="h5">{detailUser.kelamin}</CardTitle>
                    <p />
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="6">
          <Card className="card-stats">
            <CardBody>
              <Row>
                <Col md="4" xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i
                      className="fas fa-calendar-alt"
                      style={{ color: "#44a08d" }}
                    />
                  </div>
                </Col>
                <Col md="8" xs="7">
                  <div>
                    <p className="card-category">TTL</p>
                    <CardTitle tag="h5">
                      {detailUser.tempatLahir +
                        ", " +
                        handleTgl(detailUser.tanggalLahir)}
                    </CardTitle>
                    <p />
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="6">
          <Card className="card-stats">
            <CardBody>
              <Row>
                <Col md="4" xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="fas fa-home" style={{ color: "#44a08d" }} />
                  </div>
                </Col>
                <Col md="8" xs="7">
                  <div>
                    <p className="card-category">Alamat</p>
                    <CardTitle tag="h5">{detailUser.alamat}</CardTitle>
                    <p />
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="6">
          <Card className="card-stats">
            <CardBody>
              <Row>
                <Col md="4" xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="fas fa-phone" style={{ color: "#44a08d" }} />
                  </div>
                </Col>
                <Col md="8" xs="7">
                  <div>
                    <p className="card-category">Telepon</p>
                    <CardTitle tag="h5">{detailUser.telp}</CardTitle>
                    <p />
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CardProfilAdmin;
