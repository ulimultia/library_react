import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from "reactstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
const ModalAddUser = (props) => {
  const { buttonLabel, classButton, modalName, className } = props;

  const [nikAdd, setNIK] = useState("");
  const [labelNIK, setLabelNIK] = useState("");
  const [usernameAdd, setUsername] = useState("");
  const [labelUsername, setLabelUsername] = useState("");
  const [namaAdd, setNama] = useState("");
  const [labelNama, setLabelNama] = useState("");
  const [kelaminAdd, setKelamin] = useState("");
  const [labelKelamin, setLabelKelamin] = useState("");
  const [tempatAdd, setTempat] = useState("");
  const [labelTempat, setLabelTempat] = useState("");
  const [tanggalAdd, setTanggal] = useState("");
  const [labelTanggal, setLabelTanggal] = useState("");
  const [alamatAdd, setAlamat] = useState("");
  const [labelAlamat, setLabelAlamat] = useState("");
  const [fotoAdd, setFoto] = useState("");
  const [labelFoto, setLabelFoto] = useState("");
  const [roleAdd, setRole] = useState([]);
  const [labelRole, setLabelRole] = useState("");
  const role = [roleAdd];
  const [teleponAdd, setTelepon] = useState("");
  const [labelTelepon, setLabelTelepon] = useState("");
  const [passwordAdd, setPassword] = useState("");
  const [labelPassword, setLabelPassword] = useState("");
  const [modal, setModal] = useState(false);

  const onChangeNIK = (event) => {
    setNIK(event.target.value);
  };
  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };
  const onChangeNama = (event) => {
    setNama(event.target.value);
  };
  const onChangeKelamin = (event) => {
    setKelamin(event.target.value);
  };
  const onChangeTempat = (event) => {
    setTempat(event.target.value);
  };
  const onChangeTanggal = (event) => {
    setTanggal(event.target.value);
  };
  const onChangeAlamat = (event) => {
    setAlamat(event.target.value);
  };
  const onChangeFoto = (event) => {
    setFoto(event.target.value);
  };
  const onChangeRole = (event) => {
    setRole(event.target.value);
  };
  const onChangeTelepon = (event) => {
    setTelepon(event.target.value);
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const toggle = () => setModal(!modal);

  const handleAdd = () => {
    var isValid = true;
    // validasi NIK

    if (nikAdd === "") {
      isValid = false;
      setLabelNIK("Tidak boleh kosong");
    } else {
      setLabelNIK("");
    }
    if (usernameAdd === "") {
      isValid = false;
      setLabelUsername("Tidak boleh kosong");
    } else {
      setLabelUsername("");
    }
    if (namaAdd === "") {
      isValid = false;
      setLabelNama("Tidak boleh kosong");
    } else {
      setLabelNama("");
    }
    if (kelaminAdd === "Pilih Salah Satu") {
      isValid = false;
      setLabelKelamin("Tidak boleh kosong");
    } else {
      setLabelKelamin("");
    }
    if (tempatAdd === "") {
      isValid = false;
      setLabelTempat("Tidak boleh kosong");
    } else {
      setLabelTempat("");
    }
    if (tanggalAdd === "") {
      isValid = false;
      setLabelTanggal("Tidak boleh kosong");
    } else {
      setLabelTanggal("");
    }
    if (alamatAdd === "") {
      isValid = false;
      setLabelAlamat("Tidak boleh kosong");
    } else {
      setLabelAlamat("");
    }
    // if (fotoAdd === "") {
    //   isValid = false;
    //   setLabelFoto("Tidak boleh kosong");
    // } else {
    //   setLabelFoto("");
    // }
    if (roleAdd === "Pilih Salah Satu") {
      isValid = false;
      setLabelRole("Tidak boleh kosong");
    } else {
      setLabelRole("");
    }
    if (teleponAdd === "") {
      isValid = false;
      setLabelTelepon("Tidak boleh kosong");
    } else {
      setLabelTelepon("");
    }
    if (passwordAdd === "") {
      isValid = false;
      setLabelPassword("Tidak boleh kosong");
    } else {
      setLabelPassword("");
    }
    const data = {
      //kiri sesuain api kanan dari fungsinya
      username: usernameAdd,
      password: passwordAdd,
      role: role,
      nama: namaAdd,
      alamat: alamatAdd,
      foto: fotoAdd,
      kelamin: kelaminAdd,
      nik: nikAdd,
      tanggalLahir: tanggalAdd,
      telp: teleponAdd,
      tempatLahir: tempatAdd,
    };
    if (isValid === true) {
      console.log(role);
      axios
        .post("http://localhost:8080/auth/register", data) // memasukkan inputan ke post api
        .then((res) => {
          console.log(res); // menampilkan hasil response dari data inputan yang dikirim
          MySwal.fire({
            title: "Berhasil!!!",
            icon: "success",
            text: "Berhasil Menambahkan User",
          });
          toggle();
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
          }
        });

      //   return <Redirect to="/admin/user" />;
    }
  };

  return (
    <div>
      <Button className={classButton} onClick={toggle}>
        {buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader
          toggle={toggle}
          style={{
            backgroundImage: "linear-gradient(to left, #44a08d, #093637)",
            color: "#ffffff",
          }}
        >
          {modalName}
        </ModalHeader>
        <ModalBody>
          <div className="px-5">
            <Form>
              <label for="labelNikAdd">NIK</label>
              <span class="font-weight-lighter ml-3" id="labelNikAdd">
                {labelNIK}
              </span>
              <div class="input-group mb-2">
                <input
                  type="number"
                  class="form-control"
                  id="nikUserAdd"
                  placeholder="NIK"
                  value={nikAdd}
                  onChange={onChangeNIK}
                ></input>
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fas fa-id-card"></span>
                  </div>
                </div>
              </div>
              <label for="labelUsernameAdd">Username</label>
              <span class="font-weight-lighter ml-3" id="labelUsernameAdd">
                {labelUsername}
              </span>
              <div class="input-group mb-2">
                <input
                  type="text"
                  class="form-control"
                  id="usernameAdd"
                  placeholder="Username"
                  value={usernameAdd}
                  onChange={onChangeUsername}
                ></input>
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fas fa-user"></span>
                  </div>
                </div>
              </div>
              <label for="labelPasswordAdd">Password</label>
              <span class="font-weight-lighter ml-3" id="labelPasswordAdd">
                {labelPassword}
              </span>
              <div class="input-group mb-2">
                <input
                  type="password"
                  class="form-control"
                  id="passwordAdd"
                  placeholder="Password"
                  value={passwordAdd}
                  onChange={onChangePassword}
                ></input>
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fas fa-key"></span>
                  </div>
                </div>
              </div>
              <label for="labelNamaAdd">Nama</label>
              <span class="font-weight-lighter ml-3" id="labelNamaAdd">
                {labelNama}
              </span>
              <div class="input-group mb-2">
                <input
                  type="text"
                  class="form-control"
                  id="namaUserAdd"
                  placeholder="Nama"
                  value={namaAdd}
                  onChange={onChangeNama}
                ></input>
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fas fa-user"></span>
                  </div>
                </div>
              </div>
              <label for="labelRoleAdd">Role</label>
              <span class="font-weight-lighter ml-3 ml-3" id="labelRoleAdd">
                {labelRole}
              </span>

              <div class="input-group mb-2">
                <select
                  class="custom-select"
                  id="roleAdd"
                  value={roleAdd}
                  onChange={onChangeRole}
                >
                  <option value="Pilih Salah Satu">Pilih Salah Satu</option>
                  <option value="admin">Admin</option>
                  <option value="peminjam">Peminjam</option>
                </select>
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fas fa-venus-mars pr-2"></span>
                  </div>
                </div>
              </div>
              <label for="labelKelaminAdd">Jenis Kelamin</label>
              <span class="font-weight-lighter ml-3 ml-3" id="labelKelaminAdd">
                {labelKelamin}
              </span>

              <div class="input-group mb-2">
                <select
                  class="custom-select"
                  id="kelaminuserAdd"
                  value={kelaminAdd}
                  onChange={onChangeKelamin}
                >
                  <option value="Pilih Salah Satu">Pilih Salah Satu</option>
                  <option value="Laki-Laki">Laki-Laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fas fa-venus-mars pr-2"></span>
                  </div>
                </div>
              </div>

              <label for="labelTempatAdd">Tempat Lahir</label>
              <span class="font-weight-lighter ml-3 ml-3" id="labelTempatAdd">
                {labelTempat}
              </span>

              <div class="input-group mb-2">
                <input
                  type="text"
                  class="form-control"
                  id="tempatUserAdd"
                  placeholder="Tempat Lahir"
                  value={tempatAdd}
                  onChange={onChangeTempat}
                ></input>
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fas fa-location-arrow"></span>
                  </div>
                </div>
              </div>

              <div class="input-group mb-2">
                <label for="labelTanggalAdd">Tanggal Lahir</label>
                <span class="font-weight-lighter ml-3" id="labelTanggalAdd">
                  {labelTanggal}
                </span>

                <div class="input-group date" data-provide="datepicker">
                  <input
                    type="date"
                    class="form-control pull-right"
                    id="tanggal_lahiruserAdd"
                    placeholder="Tanggal Lahir"
                    value={tanggalAdd}
                    onChange={onChangeTanggal}
                  ></input>
                  <div class="input-group-append">
                    <div class="input-group-text"></div>
                  </div>
                </div>
              </div>
              <label for="labelTeleponAdd">Telepon</label>
              <span class="font-weight-lighter ml-3" id="labelTeleponAdd">
                {labelTelepon}
              </span>
              <div class="input-group mb-2">
                <input
                  type="text"
                  class="form-control"
                  id="teleponAdd"
                  placeholder="Telepon"
                  value={teleponAdd}
                  onChange={onChangeTelepon}
                ></input>
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fas fa-map-marked-alt"></span>
                  </div>
                </div>
              </div>
              <label for="labelAlamatAdd">Alamat</label>
              <span class="font-weight-lighter ml-3" id="labelAlamatAdd">
                {labelAlamat}
              </span>
              <div class="input-group mb-2">
                <input
                  type="text"
                  class="form-control"
                  id="alamatUserAdd"
                  placeholder="Alamat"
                  value={alamatAdd}
                  onChange={onChangeAlamat}
                ></input>
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fas fa-map-marked-alt"></span>
                  </div>
                </div>
              </div>

              <div class="input-group mb-2">
                <label for="labelFileAdd">Foto</label>
                <span class="font-weight-lighter ml-3" id="labelFileAdd">
                  {labelFoto}
                </span>

                <div class="input-group">
                  <div class="custom-file">
                    <input
                      type="file"
                      class="custom-file-input"
                      id="fotoUserAdd"
                      value={fotoAdd}
                      onChange={onChangeFoto}
                    ></input>
                    <label class="custom-file-label" for="fotoUser">
                      Choose file
                    </label>
                  </div>
                  <div class="input-group-append">
                    <div class="input-group-text">
                      <span class="fas fa-upload pr-2"></span>
                    </div>
                  </div>
                </div>
              </div>
              <ModalFooter>
                <Button
                  type="button"
                  onClick={() => handleAdd()}
                  color="primary"
                >
                  Add
                </Button>{" "}
              </ModalFooter>
            </Form>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ModalAddUser;
