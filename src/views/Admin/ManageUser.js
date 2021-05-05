import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  Table,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from "reactstrap";
import axios from "axios";
import ModalTopupUser from "../../components/Modal/ModalTopupUser/index";
import TabelUser from "components/Tabel/TabelUser/index";
import ModalAddUser from "../../components/Modal/ModalAddUser/index";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
const MySwal = withReactContent(Swal);
let number = 0;

class Tables extends React.Component {
  constructor(props) {
    super(props);
    this.getAllUsers = this.getAllUsers.bind();

    this.state = {
      modalEdit: false,
      idDetail: 0,
      userNew: [],
      userNew3: [],
      userDetail: [],
      detailUser: [],
      session: {},
      btn: "",
      nama: "",
      kelamin: "",
      tempatLahir: "",
      tanggaLahir: "",
      alamat: "",
      columTable: [
        {
          label: "No",
          field: "no",
          width: 30,
        },
        {
          label: "Username",
          field: "username",
          width: 150,
        },
        {
          label: "Role",
          field: "roles",
          width: 120,
        },
        {
          label: "Action",
          field: "action",
          // sort: 'disabled',
          width: 150,
        },
      ],
      data: {},
    };
  }

  onChangeUser = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  onChangeKelamin = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  onChangeNama = (event) => {
    this.setState({
      nama: event.target.value,
    });
  };
  async componentDidMount() {
    await this.getAllUsers();
    await this.getSession();
    // await this.getDetail();
    // this.toggleEdit();
    // await console.log(this.state.detailUser);
    // await console.log(this.state.userNew);
    // await console.log("a");
  }
  handleReset = (id) => {
    const resetData = {
      password: "12345678",
    };
    MySwal.fire({
      title: "Are you sure?",
      text: "Password akan direset ke pengaturan default!",
      icon: "warning",
      buttons: true,
      showCancelButton: true,
      dangerMode: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#8c8c8c",
      confirmButtonText: "Reset",
      cancelButtonText: "Batal",
    }).then((willDelete) => {
      if (willDelete.isConfirmed) {
        axios
          .put("http://localhost:8080/auth/reset/" + id, resetData)
          .then((response) => {
            console.log(response);
          });
        MySwal.fire("Success", "Berhasil Mereset Password", "success");
      }
    });
  };
  handleDelete = (id1) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover the data!",
      icon: "warning",
      buttons: true,
      showCancelButton: true,
      dangerMode: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#8c8c8c",
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    }).then((willDelete) => {
      if (willDelete.isConfirmed) {
        axios
          .delete("http://localhost:8080/user/delete/" + id1)
          .then((response) => {
            this.setState({
              userNew: [],
              userNew3: [],
              data: {},
            });
            this.getAllUsers();
          });
        MySwal.fire("Success", "Berhasil Menghapus Data", "success");
      }
      console.log(this.state.userNew);
    });
  };
  handleEdit = (id) => {
    const editData = {
      nama: this.state.nama,
      kelamin: this.state.kelamin,
      tempatLahir: this.state.tempatLahir,
      tanggalLahir: this.state.tanggaLahir,
      alamat: this.state.alamat,
    };
    console.log(editData);
    axios
      .put("http://localhost:8080/user/edit/" + id, editData)
      .then((response) => {
        console.log(response);
      });
    MySwal.fire("Success", "Berhasil Mengubah Data", "success");
    this.toggleEdit();
  };
  toggleEdit = (id) => {
    if (this.state.modalEdit === true) {
      this.setState({
        modalEdit: false,
      });
    } else {
      this.getDetail(id);

      this.setState({
        modalEdit: true,
        idDetail: id,
      });
    }
  };
  getSession = () => {
    var obj = localStorage.getItem("userdata"); //memasukkan data session pada var obj
    this.setState({
      session: JSON.parse(obj),
    });
    console.log(this.state.session.data.id);
  };

  getDetail = (id) => {
    axios
      .get("http://localhost:8080/user/get-detail/" + id)
      .then((response) => {
        this.setState({
          detailUser: response.data,
        });
        this.setState({
          nama: response.data.nama,
          kelamin: response.data.kelamin,
          alamat: response.data.alamat,
          tanggalLahir: response.data.tanggalLahir,
          tempatLahir: response.data.tempatLahir,
        });
        console.log(this.state.nama);
      });

    console.log(this.state.detailUser);
  };
  getAllUsers = () => {
    axios.get("http://localhost:8080/user/get-all").then((response) => {
      this.setState({
        userNew: response.data.data,
      });
      // console.log(this.state.userNew[1].roles[0].name);

      this.state.userNew.map((el, key) => {
        return this.state.userNew3.push({
          no: key + 1,
          username: el.username,
          roles: el.roles[0].name,
          action: (
            <Row>
              <Button
                onClick={() => this.toggleEdit(el.id)}
                className="btn btn-success btn-sm fa fa-edit mx-1"
              ></Button>{" "}
              <Button
                onClick={() => this.handleDelete(el.id)}
                className="btn btn-danger btn-sm fa fa-trash mx-1"
              ></Button>{" "}
              <ModalTopupUser
                id={el.id}
                classButtonModal="btn btn-info btn-sm fa fa-money-bill-wave mx-1"
                modalName="Topup User"
                namatopup={el.username}
              ></ModalTopupUser>{" "}
              <Button
                onClick={() => this.handleReset(el.id)}
                className="btn btn-warning btn-sm fa fa-key mx-1"
              ></Button>
            </Row>
          ),
        });
      });
      // this.state.userNew.forEach((el) => {
      //   userNew2.push({
      //     no: (number = number + 1),
      //     username: el.username,
      //     role: el.roles.name,
      //     action: (
      //       <div className="d-flex flex-wrap">
      //         <Button
      //           onClick={() => this.toggleEdit()}
      //           className="btn btn-success btn-sm fa fa-edit mx-1"
      //         ></Button>{" "}
      //         <Button
      //           onClick={() => this.handleDelete(el.id)}
      //           className="btn btn-danger btn-sm fa fa-trash mx-1"
      //         ></Button>{" "}
      //         <ModalTopupUser
      //           classButtonModal="btn btn-info btn-sm fa fa-money-bill-wave mx-1"
      //           modalName="Topup User"
      //           namatopup={el.username}
      //         ></ModalTopupUser>{" "}
      //         <Button
      //           onClick={() => handleReset(el.id)}
      //           className="btn btn-warning btn-sm fa fa-key mx-1"
      //         ></Button>
      //       </div>
      //     ),
      //   });
      // });
      this.setState({
        data: {
          columns: [...this.state.columTable],
          rows: [...this.state.userNew3],
        },
      });
    });
  };

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardBody>
                  <ModalAddUser
                    classButton="btn-primary btn-sm fa fa-plus float-right"
                    modalName="Tambah User"
                    buttonLabel="Tambah User"
                  />
                </CardBody>
              </Card>
            </Col>
            <Col md="12">
              <Card>
                <CardBody>
                  {/* <ModalEditUser
          open={this.state.modalEditOpen}
          classButtonModal="btn btn-success btn-sm fa fa-edit mx-1"
          id={this.state.idDetail}
          modalName="Edit User"
          nama={this.state.detailUser.nama}
          kelamin={this.state.detailUser.kelamin}
          tempat={this.state.detailUser.tempat_lahir}
          tanggal_lahir={this.state.detailUser.tanggal_lahir}
          alamat={this.state.detailUser.alamat}
        ></ModalEditUser> */}

                  <MDBDataTableV5
                    striped
                    small
                    hover
                    scrollX
                    entriesOptions={[10, 20, 25]}
                    entries={10}
                    pagesAmount={4}
                    data={this.state.data}
                    //   pagingTop
                    searchTop
                    searchBottom={false}
                    barReverse
                  />
                </CardBody>
              </Card>
            </Col>
            {}
          </Row>
        </div>
        <Modal
          isOpen={this.state.modalEdit}
          toggle={this.toggleEdit}
          className="modal-md"
        >
          <ModalHeader
            // toggle={toggle}
            style={{
              backgroundImage: "linear-gradient(to left, #44a08d, #093637)",
              color: "#ffffff",
            }}
          >
            Edit User
          </ModalHeader>
          <ModalBody>
            <div className="px-5">
              <Form>
                <label for="nama" class="col-form-label">
                  Nama
                </label>
                <span
                  class="font-weight-lighter ml-3"
                  id="labelNamaEdit"
                ></span>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    name="nama"
                    id="nama"
                    value={this.state.nama}
                    onChange={this.onChangeUser}
                  ></input>
                  <div class="input-group-append">
                    <div class="input-group-text">
                      <span class="fas fa-user"></span>
                    </div>
                  </div>
                </div>
                <label for="labelKelamin">Jenis Kelamin</label>
                <span
                  class="font-weight-lighter ml-3"
                  id="labelKelaminEdit"
                ></span>
                <div class="input-group">
                  <select
                    class="custom-select"
                    id="kelamin"
                    name="kelamin"
                    value={this.state.kelamin}
                    onChange={this.onChangeUser}
                  >
                    <option defaultChecked>Pilih Salah Satu</option>
                    <option value="Laki-Laki">Laki-Laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                  <div class="input-group-append">
                    <div class="input-group-text pr-2">
                      <span class="fas fa-venus-mars"></span>
                    </div>
                  </div>
                </div>
                <label for="tempatlahir" class="col-form-label">
                  Tempat Lahir:
                </label>
                <span
                  class="font-weight-lighter ml-3"
                  id="labelTempatLahirEdit"
                ></span>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    id="tempatLahir"
                    name="tempatLahir"
                    value={this.state.tempatLahir}
                    onChange={this.onChangeUser}
                  ></input>
                  <div class="input-group-append">
                    <div class="input-group-text">
                      <span class="fas fa-location-arrow"></span>
                    </div>
                  </div>
                </div>
                <label for="tanggallahir" class="col-form-label">
                  Tanggal Lahir:
                </label>
                <span
                  class="font-weight-lighter ml-3"
                  id="labelTanggalLahirEdit"
                ></span>
                <div class="input-group">
                  <input
                    type="date"
                    class="form-control"
                    id="tanggalLahir"
                    name="tanggalLahir"
                    value={this.state.tanggalLahir}
                    onChange={this.onChangeUser}
                  ></input>
                  <div class="input-group-append">
                    <div class="input-group-text"></div>
                  </div>
                </div>
                <label for="alamat" class="col-form-label">
                  Alamat:
                </label>
                <span
                  class="font-weight-lighter ml-3"
                  id="labelAlamatEdit"
                ></span>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    id="alamat"
                    name="alamat"
                    value={this.state.alamat}
                    onChange={this.onChangeUser}
                  ></input>
                  <div class="input-group-append">
                    <div class="input-group-text">
                      <span class="fas fa-map-marked-alt"></span>
                    </div>
                  </div>
                </div>
                <ModalFooter>
                  <Button
                    type="button"
                    onClick={() => this.handleEdit(this.state.idDetail)}
                    color="primary"
                  >
                    Edit
                  </Button>{" "}
                </ModalFooter>
              </Form>
            </div>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

export default Tables;
