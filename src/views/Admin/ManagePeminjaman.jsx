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
import moment from "moment";
const MySwal = withReactContent(Swal);

class Pinjam extends React.Component {
  constructor(props) {
    super(props);
    this.getAllPinjaman = this.getAllPinjaman.bind();
    this.state = {
      session: JSON.parse(localStorage.getItem("userdata")),
      pinjamanBuku: [],
      newPinjamanBuku: [],
      modal: false,
      modalEdit: false,
      idSewa: null,
      statuscode: "",
      editNamaGenre: "",
      kodeHelp: "",
      penyewaHelp: "",
      judul: "",
      kode: "",
      peminjam: "",
      pencatat: "",
      batas: "",
      tanggalPinjam: "",
      tanggalKembali: "",
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
          width: 200,
        },
        {
          label: "Peminjam",
          field: "peminjam",
          width: 200,
        },
        {
          label: "Lokasi",
          field: "pencatat",
          width: 200,
        },
        {
          label: "Tanggal Pinjam",
          field: "tanggalPinjam",
          width: 200,
        },
        {
          label: "Batas Pinjam",
          field: "batas",
          width: 150,
        },
        {
          label: "Action",
          field: "action",
          // sort: 'disabled',
          width: 80,
        },
      ],
      data: {},
    };
  }

  async componentDidMount() {
    // await this.authHeader();
    await this.getAllPinjaman();
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
  handlePengembalian = (id) => {
    const userHeader = this.authHeader();

    axios
      .get("http://localhost:8080/admin/peminjaman/get-by-id/" + id, {
        headers: userHeader,
      })
      .then((response) => {
        const pengembalianDTO = {
          id: id,
          idUser: this.state.session.data.id,
        };
        this.setState({
          batas: moment(response.data.batasPinjam).format(),
          tanggalKembali: moment().format(),
        });
        console.log(this.state.batas);
        console.log(this.state.tanggalKembali);
        var durasi = moment().diff(this.state.batas, this.state.tanggalKembali);
        var days = moment.duration(durasi).asDays();
        console.log(days);
        if (days < 0) {
          console.log(response.data.kodeBuku.buku.lokasi.keteranganLokasi);
          axios
            .post(
              "http://localhost:8080/admin/peminjaman/pengembalian",
              pengembalianDTO,
              {
                headers: userHeader,
              }
            )
            .then((respon) => {
              MySwal.fire(
                "Success",
                "Silahkan meletakkan buku pada " +
                  response.data.kodeBuku.buku.lokasi.keteranganLokasi,
                "success"
              );
            });
        }
        if (days > 0) {
          console.log("denda");
          axios
            .post(
              "http://localhost:8080/admin/peminjaman/pengembalian",
              pengembalianDTO,
              {
                headers: userHeader,
              }
            )
            .then((respon) => {
              console.log(respon.data.message);
              MySwal.fire(
                "Success",
                respon.data.message +
                  ". Silahkan meletakkan buku pada " +
                  response.data.kodeBuku.buku.lokasi.keteranganLokasi,
                "success"
              );
            })
            .catch((error) => {
              // Error
              if (error.response) {
                console.log(error.response.headers);
                if (error.response.headers) {
                  MySwal.fire({
                    icon: "error",
                    title: "Gagal!!!",
                    text: "Saldo anda tidak mencukupi!",
                  });
                }
              } else if (error.request) {
                console.log(error.request);
                MySwal.fire({
                  icon: "error",
                  title: "Gagal!!!",
                  text: "Saldo anda tidak mencukupi!",
                });
              } else {
                // Something happened in setting up the request that triggered an Error
                MySwal.fire({
                  icon: "error",
                  title: "Gagal!!!",
                  text: "Saldo anda tidak mencukupi!",
                });
                console.log("Error", error.message);
              }
            });
        }
      });
  };
  // handler genre input
  onChangeSewa = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  // get all data genre
  getAllPinjaman = () => {
    const userHeader = this.authHeader();

    axios
      .get("http://localhost:8080/admin/peminjaman/get-all", {
        headers: userHeader,
      })
      .then((response) => {
        console.log(response);
        this.setState({
          pinjamanBuku: response.data.data,
        });
        this.state.pinjamanBuku.map((value, key) => {
          return this.state.newPinjamanBuku.push({
            no: key + 1,
            kode: value.kodeBuku.kodeBuku,
            peminjam: value.user.username,
            pencatat: value.kodeBuku.buku.lokasi.kodeLokasi,
            batas: moment(value.batasPinjam).format("MMMM Do YYYY"),
            tanggalPinjam: moment(value.tanggalPinjam).format(
              "MMMM Do YYYY, h:mm:ss a"
            ),
            action: (
              <Row>
                <Button
                  onClick={() => this.handlePengembalian(value.id)}
                  className="btn btn-warning btn-sm fa fa-exchange-alt"
                ></Button>{" "}
              </Row>
            ),
          });
        });
        console.log(this.state.newPinjamanBuku);
        this.setState({
          data: {
            columns: [...this.state.columTable],
            rows: [...this.state.newPinjamanBuku],
          },
        });
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
                    <Col xs="12" sm="12" className="text-right"></Col>
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

export default Pinjam;
