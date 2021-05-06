import React from "react";
import { MDBDataTableV5 } from "mdbreact";
import {
  Card,
  CardBody,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

class Kategori extends React.Component {
  constructor(props) {
    super(props);
    this.getAllKategori = this.getAllKategori.bind();
    this.state = {
      categories: [],
      newCategories: [],
      modal: false,
      modalEdit: false,
      idKategori: null,
      editNamaKategori: "",
      namaKategori: "",
      kategoriHelp: "",
      btn: "",
      columTable: [
        {
          label: "#",
          field: "no",
          width: 40,
        },
        {
          label: "Kategori",
          field: "kategori",
          width: 400,
        },
        {
          label: "Kode Kategori",
          field: "kode",
          width: 200,
        },
        {
          label: "Aksi",
          field: "aksi",
          width: 100,
        },
      ],
      data: {},
    };
  }

  async componentDidMount() {
    // await this.authHeader();
    await this.getAllKategori();
    // this.handleGetAll(this.categories);
  }
  authHeader = () => {
    const user = JSON.parse(localStorage.getItem("userdata"));
    if (user && user.data.token) {
      return {
        authorization: `Bearer ${user.data.token}`,
      };
    } else {
      return null;
    }
  };
  // modal toggle tambah
  toggle = () => {
    if (this.state.modal === true) {
      this.setState({
        modal: false,
        btn: "",
        kategoriHelp: "",
      });
    } else {
      this.setState({
        modal: true,
        btn: "Tambah",
      });
    }
  };
  // modal toggle edit
  toggleEdit = (value) => {
    if (this.state.modalEdit === true) {
      this.setState({
        modalEdit: false,
        btn: "",
        kategoriHelp: "",
      });
    } else {
      this.setState({
        modalEdit: true,
        btn: "Ubah",
        idKategori: value.id,
        editNamaKategori: value.namaKategori,
      });
    }
  };
  // handler input
  onChangeInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      // namaKategori: event.target.value,
      // editNamaKategori: event.target.value
    });
  };
  // get all data kategori
  getAllKategori = () => {
    const userHeader = this.authHeader();

    axios
      .get("http://localhost:8080/api/v1/kategori/all", {
        headers: userHeader,
      })
      .then((response) => {
        this.setState({
          categories: response.data.data,
        });
        this.state.categories.map((value, key) => {
          return this.state.newCategories.push({
            no: key + 1,
            kategori: value.namaKategori,
            kode: value.kodeKategori,
            aksi: (
              <Row>
                <Col sm="6">
                  <Button
                    color="success"
                    onClick={() => this.toggleEdit(value)}
                    className="btn btn-sm"
                  >
                    <i className="fas fa-pen-square"> </i>
                  </Button>
                </Col>
                <Col sm="6">
                  <Button
                    className="btn btn-sm btn-danger"
                    onClick={() => this.handleDelete(value.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </Col>
              </Row>
            ),
          });
        });
        this.setState({
          data: {
            columns: [...this.state.columTable],
            rows: [...this.state.newCategories],
          },
        });
      });
  };
  // add and edit
  submitNow = (e) => {
    const userHeader = this.authHeader();

    e.preventDefault();
    let isValid = true;
    // jika button tambah data
    if (this.state.btn === "Tambah") {
      if (this.state.namaKategori === "") {
        isValid = false;
        this.setState({
          kategoriHelp: "Kategori tidak boleh kosong...",
        });
      } else {
        this.setState({
          kategoriHelp: "",
        });
      }

      if (isValid === true) {
        const kategoriDto = {
          namaKategori: this.state.namaKategori,
          kodeKategori: this.state.namaKategori.substr(0, 3).toUpperCase(),
        };
        axios
          .post("http://localhost:8080/api/v1/kategori/add", kategoriDto, {
            headers: userHeader,
          })
          .then((response) => {
            this.setState({
              modal: false,
              namaKategori: "",
              categories: [],
              newCategories: [],
              data: {},
            });
            this.getAllKategori();
          });
        MySwal.fire({
          icon: "success",
          title: "Sukses!!!",
          text: "Data berhasil ditambahkan ....",
        });
      } else {
        MySwal.fire({
          icon: "error",
          title: "Gagal!!!",
          text:
            "Data gagal ditambahkan. Silahkan cek kembali formulir Anda ....",
        });
      }
    }
    // jika button edit data
    else if (this.state.btn === "Ubah") {
      if (this.state.editNamaKategori === "") {
        isValid = false;
        this.setState({
          kategoriHelp: "Kategori tidak boleh kosong...",
        });
      } else {
        this.setState({
          kategoriHelp: "",
        });
      }

      if (isValid === true) {
        const kategoriDto = {
          id: this.state.idKategori,
          namaKategori: this.state.editNamaKategori,
          kodeKategori: this.state.editNamaKategori.substr(0, 3).toUpperCase(),
        };
        axios
          .put("http://localhost:8080/api/v1/kategori/edit", kategoriDto, {
            headers: userHeader,
          })
          .then((response) => {
            this.setState({
              modalEdit: false,
              categories: [],
              newCategories: [],
              data: {},
            });
            this.getAllKategori();
          });
        MySwal.fire({
          icon: "success",
          title: "Sukses!!!",
          text: "Data berhasil diubah ....",
        });
      } else {
        MySwal.fire({
          icon: "error",
          title: "Gagal!!!",
          text: "Data gagal diubah. Silahkan cek kembali formulir Anda ....",
        });
      }
    }
  };
  // delete kategori
  handleDelete = (id) => {
    const userHeader = this.authHeader();

    MySwal.fire({
      title: "Anda Yakin?",
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#8c8c8c",
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
      //   buttons: true,
      //   dangerMode: true,
    }).then((willDelete) => {
      if (willDelete.isConfirmed) {
        axios
          .delete("http://localhost:8080/api/v1/kategori/delete/" + id, {
            headers: userHeader,
          })
          .then((response) => {
            this.setState({
              categories: [],
              newCategories: [],
              data: {},
            });
            this.getAllKategori();
          });
        MySwal.fire(
          "Success",
          "Data berhasil dihapus ...",
          "success"
        ).then(() => {});
      }
    });
  };

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col xs="12" sm="12">
              <Card>
                <CardBody>
                  <Row>
                    <Col xs="12" sm="12" className="text-right">
                      <Button
                        onClick={this.toggle}
                        className="btn btn-sm"
                        style={{ backgroundColor: "navy" }}
                      >
                        <i className="fas fa-plus"> </i> Tambah
                      </Button>
                      <Modal
                        isOpen={this.state.modal}
                        toggle={this.toggle}
                        className="modal-sm"
                        id="modalTambah"
                      >
                        <ModalHeader
                          toggle={this.toggle}
                          style={{
                            backgroundImage:
                              "linear-gradient(to left, #44a08d, #093637)",
                            color: "#ffffff",
                          }}
                        >
                          Tambah Kategori Buku
                        </ModalHeader>
                        <form id="form">
                          <ModalBody className="mx-4">
                            <FormGroup>
                              <Input
                                type="number"
                                name="idKategori"
                                id="idKategori"
                                value={this.state.idKategori}
                                hidden={true}
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label for="namaKategori">Kategori</Label>
                              <Input
                                type="text"
                                name="namaKategori"
                                id="namaKategori"
                                placeholder="Contoh: Buku"
                                value={this.state.namaKategori}
                                onChange={this.onChangeInput}
                              />
                              <FormText color="danger">
                                {this.state.kategoriHelp}
                              </FormText>
                            </FormGroup>
                          </ModalBody>
                          <ModalFooter>
                            <Button
                              type="reset"
                              color="secondary"
                              onClick={this.toggle}
                            >
                              Tutup
                            </Button>
                            <Button color="info" onClick={this.submitNow}>
                              {this.state.btn}
                            </Button>
                          </ModalFooter>
                        </form>
                      </Modal>
                    </Col>
                  </Row>
                  <hr />
                  <MDBDataTableV5
                    striped
                    small
                    hover
                    scrollX
                    data={this.state.data}
                    entriesOptions={[10, 20, 25]}
                    entries={10}
                    pagesAmount={4}
                    searchTop
                    searchBottom={false}
                    barReverse
                    order={["no", "asc"]}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
        <Modal
          isOpen={this.state.modalEdit}
          toggle={this.toggleEdit}
          className="modal-sm"
        >
          <ModalHeader
            toggle={this.toggleEdit}
            style={{
              backgroundImage: "linear-gradient(to left, #44a08d, #093637)",
              color: "#ffffff",
            }}
          >
            Edit Kategori Buku
          </ModalHeader>
          <form id="form">
            <ModalBody className="mx-4">
              <FormGroup>
                <Input
                  type="number"
                  name="idKategori"
                  id="idKategori"
                  value={this.state.idKategori}
                  hidden={true}
                />
              </FormGroup>
              <FormGroup>
                <Label for="namaKategori">Kategori</Label>
                <Input
                  type="text"
                  name="editNamaKategori"
                  id="editNamaKategori"
                  placeholder="Contoh: Buku"
                  value={this.state.editNamaKategori}
                  onChange={this.onChangeInput}
                />
                <FormText color="danger">{this.state.kategoriHelp}</FormText>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button type="reset" color="secondary" onClick={this.toggleEdit}>
                Tutup
              </Button>
              <Button color="info" onClick={this.submitNow}>
                {this.state.btn}
              </Button>
            </ModalFooter>
          </form>
        </Modal>
      </>
    );
  }
}

export default Kategori;
