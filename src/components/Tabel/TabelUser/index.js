import React, { useState, useEffect } from "react";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import User from "../../../assets/data/user";
// import Button from "../../Button";
import ModalEditUser from "../../Modal/ModalEditUser/index";
import ModalTopupUser from "../../Modal/ModalTopupUser/index";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ButtonToggle from "reactstrap/lib/ButtonToggle";
import axios from "axios";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from "reactstrap";
const MySwal = withReactContent(Swal);
const userAttributes = [];
const userNew2 = [];
let number = 0;

const handleReset = (id) => {
  MySwal.fire({
    title: "Are you sure?",
    text: "Password akan direset ke pengaturan default!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      MySwal.fire(
        "Success",
        "Berhasil Mereset Password " + User[id].nama,
        "success"
      ).then(() => {});
    }
  });
};

// User.forEach((el) => {
//   userAttributes.push({
//     no: (number = number + 1),
//     nama: el.nama,
//     kelamin: el.kelamin,
//     ttl: el.tempat + ", " + el.tanggal_lahir,
//     alamat: el.alamat,
//     action: (
//       <div className="d-flex flex-wrap">
//         <ModalEditUser
//           classButtonModal="btn btn-success btn-sm fa fa-edit mx-1"
//           id={el.id}
//           modalName="Edit User"
//           nama={el.nama}
//           kelamin={el.kelamin}
//           tempat={el.tempat}
//           tanggal_lahir={el.tanggal_lahir}
//           alamat={el.alamat}
//         ></ModalEditUser>{" "}
//         <Button
//           handleClick={() => handleDelete(el.id - 1)}
//           classButton="btn btn-danger btn-sm fa fa-trash mx-1"
//         ></Button>{" "}
//         <ModalTopupUser
//           classButtonModal="btn btn-info btn-sm fa fa-money-bill-wave mx-1"
//           modalName="Topup User"
//           namatopup={el.nama}
//         ></ModalTopupUser>{" "}
//         <Button
//           handleClick={() => handleReset(el.id - 1)}
//           classButton="btn btn-warning btn-sm fa fa-key mx-1"
//         ></Button>
//       </div>
//     ),
//   });
// });
class TabelUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalEditOpen: false,
      idDetail: 0,
      userNew: [],
      userDetail: [],
      detailUser: [],
      session: {},
      datatable: {
        columns: [
          {
            label: "No",
            field: "no",
            width: 30,
          },
          {
            label: "Username",
            field: "username",
            width: 150,
            attributes: {
              "aria-controls": "DataTable",
              "aria-label": "Username",
            },
          },
          {
            label: "Role",
            field: "role",
            width: 120,
          },
          {
            label: "Action",
            field: "action",
            // sort: 'disabled',
            width: 150,
          },
        ],
        rows: userNew2,
      },
    };
  }
  async componentDidMount() {
    await this.getAllUsers();
    await this.getSession();
    await this.getDetail();
    await console.log(this.state.detailUser);
    await console.log(this.state.userNew);
    await console.log("a");
  }
  handleDelete = (id1) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover the data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        MySwal.fire(
          "Success",
          "Berhasil Menghapus Data " + this.state.userNew[id1].username,
          "success"
        ).then(() => {});
      }
    });
  };
  getSession = () => {
    var obj = localStorage.getItem("userdata"); //memasukkan data session pada var obj
    this.setState({
      session: JSON.parse(obj),
    });
    console.log(this.state.session.data.id);
  };
  getUserDetail = async (id) => {
    await axios
      .get("http://localhost:8080/user/get-detail/" + id)
      .then((response) => {
        this.setState({
          userDetail: response.data,
          idDetail: id,
        });
        this.setState({
          modalEditOpen: true,
        });
        console.log(this.state.modalEditOpen);
        return <div></div>;
      });
    await console.log(this.state.userDetail);
    // console.log(response.data);
    console.log(this.state.idDetail);
  };
  getDetail = (id) => {
    axios
      .get("http://localhost:8080/user/get-detail/" + id)
      .then((response) => {
        this.setState({
          detailUser: response.data,
          modalEditOpen: true,
          idDetail: id,
        });
      });
    console.log(this.state.detailUser);
  };
  getAllUsers = () => {
    axios.get("http://localhost:8080/user/get-all").then((response) => {
      this.setState({
        userNew: response.data.data,
      });
      console.log(this.state.userNew[0].roles[0].name);
      console.log(this.state.userDetail);
      this.state.userNew.forEach((el) => {
        userNew2.push({
          no: (number = number + 1),
          username: el.username,
          role: el.roles.name,
          action: (
            <div className="d-flex flex-wrap">
              <Button
                handleClick={() => this.getDetail(el.id)}
                classButton="btn btn-success btn-sm fa fa-edit mx-1"
              ></Button>{" "}
              <Button
                handleClick={() => this.handleDelete(el.id - 1)}
                classButton="btn btn-danger btn-sm fa fa-trash mx-1"
              ></Button>{" "}
              <ModalTopupUser
                classButtonModal="btn btn-info btn-sm fa fa-money-bill-wave mx-1"
                modalName="Topup User"
                namatopup={el.username}
              ></ModalTopupUser>{" "}
              <Button
                handleClick={() => handleReset(el.id - 1)}
                classButton="btn btn-warning btn-sm fa fa-key mx-1"
              ></Button>
            </div>
          ),
        });
      });
      this.setState({
        widerData: {
          columns: [
            ...this.state.datatable.columns.map((col) => {
              col.maxWidth = 200;
              return col;
            }),
          ],
          rows: [...this.state.datatable.rows],
        },
      });
    });
  };

  render() {
    // console.log(this.state.detailUser);
    // console.log(this.state.userNew);
    console.log(this.state.idDetail);
    return (
      <>
        <Modal isOpen={this.state.modalEditOpen}>
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
                    id="nama"
                    defaultValue={this.state.detailUser.nama}
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
                    defaultValue={this.state.detailUser.kelamin}
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
                    id="tempat"
                    defaultValue={this.state.detailUser.tempat_lahir}
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
                    id="tanggal_lahir"
                    defaultValue={this.state.detailUser.tanggal_lahir}
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
                    defaultValue={this.state.detailUser.alamat}
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
                    // onClick={() => handleEdit()}
                    color="primary"
                  >
                    Edit
                  </Button>{" "}
                </ModalFooter>
              </Form>
            </div>
          </ModalBody>
        </Modal>
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
          data={this.state.widerData}
          entriesOptions={[10, 20, 25]}
          entries={10}
          pagesAmount={4}
          data={this.state.datatable}
          //   pagingTop
          searchTop
          searchBottom={false}
          barReverse
        />
      </>
    );
  }
}

export default TabelUser;
