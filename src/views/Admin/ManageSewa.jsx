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
      modalSewakan: false,
      judulSewa: "",
      hargaSewa:"",
      inputUsername:"",
      inputUsernameHelp: "",
      idKodeBuku: "", //kode buku yg digenerate
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
          label: "Kode Buku",
          field: "kode",
          width: 100,
        },
        {
          label: "Judul",
          field: "judul",
          width: 300,
        },
        {
          label: "Harga Sewa",
          field: "harga",
          width: 100,
        },
        // {
        //   label: "Donatur",
        //   field: "donatur",
        //   width: 100,
        // },
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
    await this.getAllSewa();
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
    const userHeader = this.authHeader();

    axios
      .get("http://localhost:8080/api/v1/kodebuku/all-available", {
        headers: userHeader,
      })
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
            harga: "Rp " + value.buku.harga + ",-",
            aksi: <Button className="btn btn-sm btn-primary"
                    onClick={ ()=> this.toggleSewakan(value)}>
                    <i className="fas fa-money-check-alt"></i> sewakan
                  </Button>
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
  // modal toggle sewakan
  toggleSewakan = (value) => {
    if (this.state.modalSewakan === true) {
      this.setState({
        modalSewakan: false,
        inputUsername: "",
        inputUsernameHelp: "",
        idKodeBuku: "",
        judulSewa: "",
        hargaSewa: ""
      });
    } else {
      this.setState({
        modalSewakan: true,
        idKodeBuku: value.kodeBuku,
        judulSewa: value.buku.judul,
        hargaSewa: value.buku.harga
      });
    }
  };
  onChangeInputUsername= (event) => {
    this.setState({
      inputUsername: event.target.value,
      // namaGenre: event.target.value,
      // editNamaGenre: event.target.value
    });
  };
  // add and edit
  submitNow = (e) => {
    const userHeader = this.authHeader();

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
          .get(
            "http://localhost:8080/api/v1/kodebuku/kode/" + this.state.kode,
            {
              headers: userHeader,
            }
          )
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
              .post("http://localhost:8080/admin/peminjaman/sewa", sewaDTO, {
                headers: userHeader,
              })
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

  submitSewa = (e) => {
    const userHeader = this.authHeader();

    e.preventDefault();
    let isValid = true;
    if (this.state.inputUsername === "") {
      isValid = false;
      this.setState({
        inputUsernameHelp: "Tidak boleh kosong",
      });
    } else {
      this.setState({
        inputUsernameHelp: "",
      });
    }

    if (isValid === true) {
      const sewaDto = {
        kodeBuku: {kodeBuku : this.state.idKodeBuku},
        peminjam: {username: this.state.inputUsername},
        pencatat: {id: this.state.session.data.id},
        harga: this.state.hargaSewa,
      };
      console.log(sewaDto)
      axios.post("http://localhost:8080/admin/peminjaman/sewa", sewaDto, {
        headers: userHeader,
      })
      .then((respon) => {
        if (respon.status === 200) {
          // console.log(respon.message);
          MySwal.fire({
            icon: "success",
            title: "Sukses!!!",
            text: "Buku berhasil disewa ....",
          });
          this.toggleSewakan();
        }
        this.getAllSewa();
      })
      .catch((error) => {
        // Error
        if (error.response) {
          if (error.response.status === 400) {
            MySwal.fire({
              icon: "error",
              title: "Gagal!!!",
              text: "Saldo anda tidak mencukupi!",
            });
          }
          if (error.response.status === 410) {
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
    }
  }

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
        <Modal
          isOpen={this.state.modalSewakan}
          toggle={this.toggleSewakan}
          className="modal-sm"
        >
          <ModalHeader
            toggle={this.toggleSewakan}
            style={{
              backgroundImage: "linear-gradient(to left, #44a08d, #093637)",
              color: "#ffffff",
            }}
          >
            Sewa Buku
          </ModalHeader>
          <form id="form">
            <ModalBody className="mx-4">
              <FormGroup>
                <Label for="kodeBuku">Kode Buku</Label>
                <Input
                  type="text"
                  name="kodeBuku"
                  id="kodeBuku"
                  value={this.state.idKodeBuku}
                  hidden={false}
                  readOnly={true}
                />
                {console.log(this.state.idKodeBuku)}
              </FormGroup>
              <FormGroup>
                <Label for="jdlBukuSewa">Judul Buku</Label>
                <Input
                  type="text"
                  name="jdlBukuSewa"
                  id="jdlBukuSewa"
                  value={this.state.judulSewa}
                  hidden={false}
                  readOnly={true}
                />
                {/* {console.log(this.state.judulSewa)} */}
              </FormGroup>
              <FormGroup>
                <Label for="namaKategori">Penyewa</Label>
                <Input
                  type="text"
                  name="inputUsername"
                  id="inputUsername"
                  placeholder="username"
                  value={this.state.inputUsername}
                  onChange={this.onChangeInputUsername}
                />
                <FormText color="danger">{this.state.inputUsernameHelp}</FormText>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button type="reset" color="secondary" onClick={this.toggleSewakan}>
                Tutup
              </Button>
              <Button color="info" onClick={this.submitSewa}>
                Sewakan
              </Button>
            </ModalFooter>
          </form>
        </Modal>
      </>
    );
  }
}

export default Sewa;
