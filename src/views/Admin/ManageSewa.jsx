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

class Sewa extends React.Component {
  constructor(props) {
    super(props);
    this.getAllSewa = this.getAllSewa.bind();
    this.state = {
      session: JSON.parse(localStorage.getItem("userdata")),
      kodeBuku: [],
      newKodeBuku: [],
      modal: false,
      modalEdit: false,
      idSewa: null,
      statuscode: "",
      editNamaGenre: "",
      kodeHelp: "",
      penyewaHelp: "",
      judul: "",
      kode: "",
      penyewa: "",
      created: "",
      donatur: "-",
      harga: "",
      hargaDetail: "",
      btn: "",
      columTable: [
        {
          label: "#",
          field: "no",
          width: 40,
        },
        {
          label: "Judul",
          field: "judul",
          width: 400,
        },
        {
          label: "Kode Buku",
          field: "kode",
          width: 200,
        },
        {
          label: "Harga Sewa",
          field: "harga",
          width: 200,
        },
        {
          label: "Donatur",
          field: "donatur",
          width: 400,
        },
      ],
      data: {},
    };
  }

  async componentDidMount() {
    // await this.authHeader();
    await this.getAllSewa();
    // this.handleGetAll(this.categories);
  }

  // modal toggle tambah
  toggle = () => {
    if (this.state.modal === true) {
      this.setState({
        modal: false,
        btn: "",
        penyewaHelp: "",
        kodeHelp: "",
        durasiHelp: "",
      });
    } else {
      this.setState({
        modal: true,
        btn: "Tambah",
      });
    }
  };
  handleDonatur = (donatur) => {
    if (donatur === null) return "-";
    else return donatur.username;
  };
  // handler genre input
  onChangeSewa = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  // get all data genre
  getAllSewa = () => {
    axios
      .get("http://localhost:8080/api/v1/kodebuku/all-available")
      .then((response) => {
        this.setState({
          kodeBuku: response.data.data,
        });
        this.state.kodeBuku.map((value, key) => {
          return this.state.newKodeBuku.push({
            no: key + 1,
            judul: value.buku.judul,
            kode: value.kodeBuku,
            donatur: this.handleDonatur(value.donatur),
            harga: value.buku.harga,
          });
        });
        console.log(this.state.newKodeBuku);
        this.setState({
          data: {
            columns: [...this.state.columTable],
            rows: [...this.state.newKodeBuku],
          },
        });
      });
  };
  // add and edit
  submitNow = (e) => {
    console.log(this.state.kode);

    e.preventDefault();
    let isValid = true;
    // jika button tambah data
    if (this.state.btn === "Tambah") {
      if (this.state.kode === "") {
        isValid = false;
        this.setState({
          kodeHelp: "Kode Buku tidak boleh kosong...",
        });
      } else {
        this.setState({
          kodeHelp: "",
        });
      }
      if (this.state.penyewa === "") {
        isValid = false;
        this.setState({
          penyewaHelp: "Username penyewa tidak boleh kosong...",
        });
      } else {
        this.setState({
          penyewaHelp: "",
        });
      }

      if (isValid === true) {
        axios
          .get("http://localhost:8080/api/v1/kodebuku/kode/" + this.state.kode)
          .then((response) => {
            const kodeObj = { ["kodeBuku"]: this.state.kode };
            const penyewaObj = { ["username"]: this.state.penyewa };
            const pencatatObj = { ["id"]: this.state.session.data.id };
            const sewaDTO = {
              kodeBuku: kodeObj,
              peminjam: penyewaObj,
              pencatat: pencatatObj,
              harga: response.data.data.buku.harga,
            };
            console.log(sewaDTO);
            axios
              .post("http://localhost:8080/admin/peminjaman/sewa", sewaDTO)
              .then((respon) => {
                if (respon.status == 200) {
                  console.log(respon.message);

                  MySwal.fire({
                    icon: "success",
                    title: "Sukses!!!",
                    text: "Buku berhasil disewa ....",
                  });
                  this.setState({
                    modal: false,
                    kode: "",
                    kodeBuku: [],
                    newKodeBuku: [],
                    data: {},
                  });
                  this.getAllSewa();
                }
              })
              .catch((error) => {
                // Error
                if (error.response) {
                  if (error.response.status == 400) {
                    MySwal.fire({
                      icon: "error",
                      title: "Gagal!!!",
                      text: "Saldo anda tidak mencukupi!",
                    });
                  }
                  if (error.response.status == 410) {
                    MySwal.fire({
                      icon: "error",
                      title: "Gagal!!!",
                      text: "Buku tidak tersedia atau sudah dipinjam",
                    });
                  }
                } else if (error.request) {
                  console.log(error.request);

                  MySwal.fire({
                    icon: "error",
                    title: "Gagal!!!",
                    text: "Kode buku salah!",
                  });
                } else {
                  // Something happened in setting up the request that triggered an Error
                  MySwal.fire({
                    icon: "error",
                    title: "Gagal!!!",
                    text: "Kode buku salah!",
                  });
                  console.log("Error", error.message);
                }
              });
          });
      }
    }
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
                        <i className="fas fa-plus"> </i> Sewa Buku
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
                          Sewa Buku
                        </ModalHeader>
                        <form id="form">
                          <ModalBody className="mx-4">
                            <FormGroup>
                              <Input
                                type="number"
                                name="idSewa"
                                id="idSewa"
                                value={this.state.idSewa}
                                hidden={true}
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label for="labelKode">Kode Buku</Label>
                              <Input
                                type="text"
                                name="kode"
                                id="kode"
                                placeholder="Kode Buku"
                                value={this.state.kode}
                                onChange={this.onChangeSewa}
                              />
                              <FormText color="danger">
                                {this.state.kodeHelp}
                              </FormText>
                            </FormGroup>
                            <FormGroup>
                              <Label for="labelPenyewa">Penyewa</Label>
                              <Input
                                type="text"
                                name="penyewa"
                                id="penyewa"
                                placeholder="Username Penyewa"
                                value={this.state.penyewa}
                                onChange={this.onChangeSewa}
                              />
                              <FormText color="danger">
                                {this.state.penyewaHelp}
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
      </>
    );
  }
}

export default Sewa;
