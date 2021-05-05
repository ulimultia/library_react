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

class Genre extends React.Component {
  constructor(props) {
    super(props);
    this.getAllGenre = this.getAllGenre.bind();
    this.state = {
      genres: [],
      newGenres: [],
      modal: false,
      modalEdit: false,
      idGenre: null,
      editNamaGenre: "",
      namaGenre: "",
      genreHelp: "",
      btn: "",
      columTable: [
        {
          label: "#",
          field: "no",
          width: 40,
        },
        {
          label: "Genre",
          field: "genre",
          width: 600,
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
    await this.getAllGenre();
    // this.handleGetAll(this.categories);
  }

  // modal toggle tambah
  toggle = () => {
    if (this.state.modal === true) {
      this.setState({
        modal: false,
        btn: "",
        genreHelp: "",
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
        genreHelp: "",
      });
    } else {
      this.setState({
        modalEdit: true,
        btn: "Ubah",
        idGenre: value.id,
        editNamaGenre: value.namaGenre,
      });
    }
  };
  // handler genre input
  onChangeGenre = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      // namaGenre: event.target.value,
      // editNamaGenre: event.target.value
    });
  };
  // get all data genre
  getAllGenre = () => {
    axios.get("http://localhost:8080/api/v1/genre/all").then((response) => {
      this.setState({
        genres: response.data.data,
      });
      this.state.genres.map((value, key) => {
        return this.state.newGenres.push({
          no: key + 1,
          genre: value.namaGenre,
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
          rows: [...this.state.newGenres],
        },
      });
      console.log(this.state.newGenres);
    });
  };
  // add and edit
  submitNow = (e) => {
    e.preventDefault();
    let isValid = true;
    // jika button tambah data
    if (this.state.btn === "Tambah") {
      if (this.state.namaGenre === "") {
        isValid = false;
        this.setState({
          genreHelp: "Genre tidak boleh kosong...",
        });
      } else {
        this.setState({
          genreHelp: "",
        });
      }

      if (isValid === true) {
        const genreDto = {
          namaGenre: this.state.namaGenre,
        };
        axios
          .post("http://localhost:8080/api/v1/genre/add", genreDto)
          .then((response) => {
            this.setState({
              modal: false,
              namaGenre: "",
              genres: [],
              newGenres: [],
              data: {},
            });
            this.getAllGenre();
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
      if (this.state.editNamaGenre === "") {
        isValid = false;
        this.setState({
          genreHelp: "Genre tidak boleh kosong...",
        });
      } else {
        this.setState({
          genreHelp: "",
        });
      }

      if (isValid === true) {
        const genreDto = {
          id: this.state.idGenre,
          namaGenre: this.state.editNamaGenre,
        };
        axios
          .put("http://localhost:8080/api/v1/genre/edit", genreDto)
          .then((response) => {
            this.setState({
              modalEdit: false,
              genres: [],
              newGenres: [],
              data: {},
            });
            this.getAllGenre();
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
  // delete genre
  handleDelete = (id) => {
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
          .delete("http://localhost:8080/api/v1/genre/delete/" + id)
          .then((response) => {
            this.setState({
              genres: [],
              newGenres: [],
              data: {},
            });
            this.getAllGenre();
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
                          Tambah Genre Buku
                        </ModalHeader>
                        <form id="form">
                          <ModalBody className="mx-4">
                            <FormGroup>
                              <Input
                                type="number"
                                name="idGenre"
                                id="idGenre"
                                value={this.state.idGenre}
                                hidden={true}
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label for="namaKategori">Genre</Label>
                              <Input
                                type="text"
                                name="namaGenre"
                                id="namaGenre"
                                placeholder="Contoh: Horor"
                                value={this.state.namaGenre}
                                onChange={this.onChangeGenre}
                              />
                              <FormText color="danger">
                                {this.state.genreHelp}
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
            Edit Genre Buku
          </ModalHeader>
          <form id="form">
            <ModalBody className="mx-4">
              <FormGroup>
                <Input
                  type="number"
                  name="idGenre"
                  id="idGenre"
                  value={this.state.idGenre}
                  hidden={true}
                />
              </FormGroup>
              <FormGroup>
                <Label for="namaKategori">Genre</Label>
                <Input
                  type="text"
                  name="editNamaGenre"
                  id="editNamaGenre"
                  placeholder="Contoh: Horor"
                  value={this.state.editNamaGenre}
                  onChange={this.onChangeGenre}
                />
                <FormText color="danger">{this.state.genreHelp}</FormText>
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

export default Genre;
