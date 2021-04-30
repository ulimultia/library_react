import React from "react";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import Buku from "../../../assets/data/Buku";
import ModalEditBuku from "../../../components/Modal/ModalEditBuku/index";
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
} from "reactstrap";
const MySwal = withReactContent(Swal);
const bukuAttributes = [];

let number = 0;
Buku.forEach((el) => {
  bukuAttributes.push({
    no: (number = number + 1),
    sampul: <img src={el.sampul}></img>,
    kode: el.kode,
    judul: el.judul,
    kategori: el.kategori,
    genre: el.genre,
    harga: el.harga,
    jumlah: el.jumlah,
    lokasi: el.lokasi,
    action: (
      <div className="d-flex flex-wrap">
        <ModalEditBuku
          classButtonModal="btn btn-success btn-sm fa fa-edit mx-1"
          id={el.id}
          modalName="Edit Buku"
          judulBuku={el.judul}
          kategoriBuku={el.kategori}
          genreBuku={el.genre}
          hargaBuku={el.harga}
          jumlahBuku={el.jumlah}
          lokasiBuku={el.lokasi}
        ></ModalEditBuku>{" "}
        <Button
          handleClick={() => this.handleDelete(el.id - 1)}
          classButton="btn btn-danger btn-sm fa fa-trash mx-1"
        ></Button>
      </div>
    ),
  });
});

class TabelBuku extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalEdit: false,
      bukuNew: [],
      bukuNew2: [],
      detailBuku: [],
      judul: "",
      pengarang: "",
      tahunTerbit: "",
      isbn: "",
      harga: "",
      deskripsi: "",
      sampul: "",
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
          width: 150,
          attributes: {
            "aria-controls": "DataTable",
            "aria-label": "Sampul",
          },
        },
        {
          label: "Kode",
          field: "kode",
          width: 150,
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
          width: 150,
        },
        {
          label: "Genre",
          field: "genre",
          // sort: 'disabled',
          width: 150,
        },
        {
          label: "Harga",
          field: "harga",
          // sort: 'disabled',
          width: 150,
        },
        {
          label: "Jumlah",
          field: "jumlah",
          // sort: 'disabled',
          width: 150,
        },
        {
          label: "Lokasi",
          field: "lokasi",
          // sort: 'disabled',
          width: 150,
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
  async componentDidMount() {
    await this.getAllBuku();
    await this.getSession();
  }
  getSession = () => {
    var obj = localStorage.getItem("userdata"); //memasukkan data session pada var obj
    this.setState({
      session: JSON.parse(obj),
    });
    console.log(this.state.session.data.id);
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
              bukuNew: [],
              bukuNew2: [],
              data: {},
            });
            this.getAllBuku();
          });
        MySwal.fire("Success", "Berhasil Menghapus Data", "success");
      }
      console.log(this.state.userNew);
    });
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

  getDetail = (id) => {
    axios.get("http://localhost:8080/api/v1/buku/id/" + id).then((response) => {
      this.setState({
        judul: response.data.judul,
        pengarang: response.data.pengarang,
        tahunTerbit: response.data.tahunTerbit,
        isbn: response.data.isbn,
        harga: response.data.harga,
        deskripsi: response.data.deskripsi,
        sampul: response.data.sampul,
        kategori: response.data.kategori,
        penerbit: response.data.penerbit,
        lokasi: response.data.lokasi,
        genre: response.data.genre,
      });
      console.log(this.state.judul);
    });
  };
  getAllBuku = () => {
    axios.get("http://localhost:8080/api/v1/buku/all").then((response) => {
      this.setState({
        bukuNew: response.data.data,
      });
      console.log(this.state.bukuNew);

      this.state.userNew.map((el, key) => {
        return this.state.bukuNew2.push({
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
            </Row>
          ),
        });
      });
      this.setState({
        data: {
          columns: [...this.state.columTable],
          rows: [...this.state.bukuNew2],
        },
      });
    });
  };
  render() {
    return (
      <MDBDataTableV5
        striped
        small
        hover
        scrollX
        entriesOptions={[10, 20, 25]}
        entries={10}
        pagesAmount={4}
        data={this.state.datatable}
        //   pagingTop
        searchTop
        searchBottom={false}
        barReverse
      />
    );
  }
}

export default TabelBuku;
