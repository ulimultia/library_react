import React from "react";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import logoutfunc from "../../components/SessionDelete/index.js";
import ModalEditBuku from "../../components/Modal/ModalEditBuku/index";
import ModalAddBuku from "../../components/Modal/ModalAddBuku/index";
import ModalSewaBuku from "../../components/Modal/ModalSewaBuku/index";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
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
  FormGroup,
  Input,
  Label,
  FormText,
} from "reactstrap";
const MySwal = withReactContent(Swal);
class Tables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalEdit: false,
      modalTest: false,
      modalGenerate: false,
      unameDonatur: "",
      unameHelp: "",
      idBuku: 0,
      bukuNew: [],
      bukuNew2: [],
      detailBuku: [],
      idDetail: "",
      judul: "",
      pengarang: "",
      tahunTerbit: "",
      isbn: "",
      harga: "",
      deskripsi: "",
      sampul: "",
      sampulModal: "",
      kategori: "",
      penerbit: "",
      lokasi: "",
      genre: "",
      columTable: [
        {
          label: "No",
          field: "no",
          width: 30,
        },
        {
          label: "Sampul",
          field: "sampul",
          align: "center",
          width: 150,
          attributes: {
            "aria-controls": "DataTable",
            "aria-label": "Sampul",
          },
        },
        {
          label: "Judul",
          field: "judul",
          width: 200,
        },
        {
          label: "Kategori",
          field: "kategori",
          // sort: 'disabled',
          width: 100,
        },
        {
          label: "Genre",
          field: "genre",
          // sort: 'disabled',
          width: 100,
        },
        {
          label: "Harga",
          field: "harga",
          // sort: 'disabled',
          width: 100,
        },
        {
          label: "Lokasi",
          field: "lokasi",
          // sort: 'disabled',
          width: 100,
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
  onChangeBuku = async (event) => {
    await this.setState({
      [event.target.name]: event.target.value,
    });
  };
  async componentDidMount() {
    await this.getAllBuku();
    await this.getSession();
    // this.toggleEdit();
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
  toggleModal = async (id) => {
    await this.setState({
      modalTest: !this.state.modalTest,
    });
    this.getDetail(id);
    await console.log(this.state.modalTest);
  };
  getSession = () => {
    var obj = localStorage.getItem("userdata"); //memasukkan data session pada var obj
    this.setState({
      session: JSON.parse(obj),
    });
    console.log(this.state.session.data.id);
  };
  handleDelete = (id1) => {
    const user = this.authHeader();
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
          .delete("http://localhost:8080/api/v1/buku/delete/" + id1, {
            headers: user,
          })
          .then((response) => {
            this.setState({
              bukuNew: [],
              bukuNew2: [],
              data: {},
            });
            this.getAllBuku();
          });
        MySwal.fire("Success", "Berhasil Menghapus Data", "success");
      }
      console.log(this.state.bukuNew);
    });
  };
  toggleEdit = (id) => {
    if (this.state.modalEdit === true) {
      this.setState({
        modalEdit: false,
      });
      console.log("harusnya false" + this.state.modalEdit);
    } else {
      this.getDetail(id);

      this.setState({
        modalEdit: true,
      });
      console.log("harusnya true" + this.state.modalEdit);
    }
  };

  getDetail = (id) => {
    const user = this.authHeader();
    axios
      .get("http://localhost:8080/api/v1/buku/id/" + id, {
        headers: user,
      })
      .then((response) => {
        this.setState({
          judul: response.data.data.judul,
          pengarang: response.data.data.pengarang,
          tahunTerbit: response.data.data.tahunTerbit,
          isbn: response.data.data.isbn,
          harga: response.data.data.harga,
          deskripsi: response.data.data.deskripsi,
          sampul: response.data.data.sampul,
          sampulModal: response.data.data.sampul,
          kategori: response.data.data.kategori.id,
          penerbit: response.data.data.penerbit.id,
          lokasi: response.data.data.lokasi.id,
          genre: response.data.data.genre.id,
          idDetail: id,
        });
        console.log(this.state.sampulModal);

        console.log("get detail: " + id);
        console.log("get id detail: " + this.state.idDetail);
      });
  };
  getAllBuku = () => {
    const user = this.authHeader();
    this.setState({
      bukuNew: [],
      bukuNew2: [],
      data: {},
    });
    axios
      .get("http://localhost:8080/api/v1/buku/all", {
        headers: user,
      })
      .then((response) => {
        this.setState({
          bukuNew: response.data.data,
        });
        console.log(this.state.bukuNew);

        this.state.bukuNew.map((el, key) => {
          this.setState({
            bukuNew2: [
              ...this.state.bukuNew2,
              {
                no: key + 1,
                judul: el.judul,
                pengarang: el.pengarang,
                tahunTerbit: el.tahunTerbit,
                isbn: el.isbn,
                harga: "Rp " + el.harga + ",-",
                deskripsi: el.deskripsi,
                sampul: (
                  <img
                    src={
                      "http://localhost:8080/api/v1/files/downloadsampul/" +
                      el.sampul
                    }
                    alt="sampulBuku"
                    className=""
                    style={{ width: "50px", height: "70px" }}
                  ></img>
                ),
                kategori: el.kategori.namaKategori,
                penerbit: el.penerbit.namaPenerbit,
                lokasi: el.lokasi.kodeLokasi,
                genre: el.genre.namaGenre,
                action: (
                  <Row>
                    <Button
                      className="btn btn-sm"
                      style={{ backgroundColor: "purple" }}
                      onClick={() => {
                        this.toggleGenerate(el.id);
                      }}
                    >
                      <i className="fas fa-barcode"></i>
                    </Button>
                    <Button
                      onClick={() => this.toggleModal(el.id)}
                      className="btn btn-success btn-sm fa fa-edit mx-1"
                    ></Button>{" "}
                    <Button
                      onClick={() => this.handleDelete(el.id)}
                      className="btn btn-danger btn-sm fa fa-trash mx-1"
                    ></Button>{" "}
                  </Row>
                ),
              },
            ],
          });
        });
        this.setState({
          data: {
            columns: [...this.state.columTable],
            rows: [...this.state.bukuNew2],
          },
        });
      })
      .catch((error) => {
        // Error
        if (error.response) {
          if (error.response.status == 401) {
            logoutfunc();
          }
        } else if (error.request) {
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  };
  // toogle modal generate kode buku
  toggleGenerate = (id) => {
    console.log("clicked: " + id);
    if (this.state.modalGenerate === true) {
      this.setState({
        modalGenerate: false,
        idBuku: 0,
      });
    } else {
      this.setState({
        modalGenerate: true,
        idBuku: id,
      });
    }
    // console.log("id kode buku: " + this.state.idBuku);
  };
  //onchange input username donatur
  onChangeUnameDonatur = (event) => {
    this.setState({
      unameDonatur: event.target.value,
    });
  };
  // submit generate kode buku
  submitNow = () => {
    const user = this.authHeader();
    const kodeBukuDto = {
      buku: {
        id: this.state.idBuku,
      },
      donatur: {
        username: this.state.unameDonatur,
      },
    };
    axios
      .post("http://localhost:8080/api/v1/kodebuku/add", kodeBukuDto, {
        headers: user,
      })
      .then((response) => {
        if (response.data.status === 201) {
          // this.getAllKodeBuku();
          this.toggleGenerate();
          MySwal.fire({
            icon: "success",
            title: "Sukses!!!",
            text:
              "Kode buku " +
              response.data.data.kodeBuku +
              " berhasil ditambahkan ...",
          });
          this.setState({
            unameHelp: "",
            unameDonatur: "",
          });
        } else {
          MySwal.fire({
            icon: "error",
            title: "Gagal!!!",
            text: response.data.message,
          });
          this.setState({
            unameHelp: "Username tidak valid",
          });
        }
      })
      .catch((error) => {
        MySwal.fire({
          icon: "error",
          title: "Gagal!!!",
          text: error.response.data.message,
        });
      });
  };

  render() {
    return (
      <>
        <div className="content">
          <Row>
            {/* <Col md="12">
              <Card>
                <CardBody>
                  <ModalAddBuku
                    classButton="btn btn-sm float-right"
                    iconName="fas fa-plus "
                    modalName="Tambah Buku"
                    buttonLabel=" Tambah Buku"
                    onChangeModal={this.onChangeBuku}
                    getAll={this.getAllBuku}
                  />
                </CardBody>
              </Card>
            </Col> */}
            <Col md="12">
              <Card>
                <CardBody>
                  <Row>
                    <Col xs="12" sm="12" className="text-right">
                      <ModalAddBuku
                          classButton="btn btn-sm float-right"
                          iconName="fas fa-plus "
                          modalName="Tambah Buku"
                          buttonLabel=" Tambah Buku"
                          onChangeModal={this.onChangeBuku}
                          getAll={this.getAllBuku}
                        />
                    </Col>
                  </Row>
                  <hr/>
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
          </Row>
          <ModalEditBuku
            classButtonModal="btn btn-success btn-sm fa fa-edit mx-1"
            idDetail={this.state.idDetail}
            modalName="Edit Buku"
            judulBuku={this.state.judul}
            kategoriBuku={this.state.kategori}
            genreBuku={this.state.genre}
            hargaBuku={this.state.harga}
            lokasiBuku={this.state.lokasi}
            pengarangBuku={this.state.pengarang}
            tahunTerbit={this.state.tahunTerbit}
            isbnBuku={this.state.isbn}
            deskripsiBuku={this.state.deskripsi}
            penerbitBuku={this.state.penerbit}
            sampulModal={this.state.sampulModal}
            modal={this.state.modalTest}
            onClickToggle={this.toggleModal}
            onChangeModal={this.onChangeBuku}
            getAll={this.getAllBuku}
          ></ModalEditBuku>{" "}
        </div>
        {/* modal generate kode buku */}
        <Modal
          isOpen={this.state.modalGenerate}
          toggle={this.toggleGenerate}
          className="modal-sm"
        >
          <ModalHeader
            toggle={this.toggleGenerate}
            style={{
              backgroundImage: "linear-gradient(to left, #44a08d, #093637)",
              color: "#ffffff",
            }}
          >
            Generate Kode Buku
          </ModalHeader>
          <form id="form">
            <ModalBody className="mx-4">
              <FormGroup>
                <Input
                  type="number"
                  name="idBuku"
                  id="idBuku"
                  value={this.state.idBuku}
                  hidden={true}
                />
                {/* {console.log(this.state.idBuku)} */}
              </FormGroup>
              <FormGroup>
                <Label for="namaKategori">Donatur</Label>
                <Input
                  type="text"
                  name="unameDonatur"
                  id="unameDonatur"
                  placeholder="Username donatur"
                  value={this.state.unameDonatur}
                  onChange={this.onChangeUnameDonatur}
                />
                <FormText color="danger">{this.state.unameHelp}</FormText>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                type="reset"
                color="secondary"
                onClick={this.toggleGenerate}
              >
                Tutup
              </Button>
              <Button color="info" onClick={this.submitNow}>
                Generate
              </Button>
            </ModalFooter>
          </form>
        </Modal>
      </>
    );
  }
}

export default Tables;
