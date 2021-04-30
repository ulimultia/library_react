import React from "react";
import {
  Card, CardBody,
  Row,Col,
} from "reactstrap";
import axios from "axios";
import { MDBDataTableV5 } from "mdbreact";

class Riwayat extends React.Component {
  constructor(props){
    super(props);
    this.getAllData = this.getAllData.bind()
    this.state = {
      riwayats : [],
      newRiwayats: [],
      id: JSON.parse(localStorage.getItem("userdata")).data.id,
      columnTable: [
        {
          label: '#',
          field: 'no',
          width: 10
        },
        {
          label: 'Kode Buku',
          field: 'kode',
           width: 30
        },
        {
          label: 'Judul',
          field: 'judul',
          width: 200,
        },
        {
          label: 'Tgl Pinjam',
          field: 'pinjam',
          width: 30
        },
        {
          label: 'Tgl Kembali',
          field: 'kembali',
          width: 30
        },
        {
          label: 'Harga Sewa',
          field: 'harga',
          width: 10
        },
        {
          label: 'Denda',
          field: 'denda',
          width: 10
        },
        {
          label: 'Status',
          field: 'status',
          width: 10
        },
      ],
      data: {}
    }
  }

  async componentDidMount(){
    await this.getAllData()
  }

  getAllData = () => {
    // hanya riwayat sewa yang sudah selesai
    axios.get('http://localhost:8080/api/v1/user/riwayat/selesai/' + this.state.id)
    // semua riwayat sewa yang selesai atau masih dipinjam
    // axios.get('http://localhost:8080/api/v1/user/riwayat/sewa/' + this.state.id)
    .then(response => {
      this.setState({
        riwayats: response.data.data
      })
      this.state.riwayats.map((value, key) => {
        return(
          this.state.newRiwayats.push({
            no: key + 1,
            kode: value.kodeBuku.kodeBuku,
            judul: value.kodeBuku.buku.judul,
            pinjam: new Intl.DateTimeFormat('en-GB', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(new Date(value.tanggalPinjam)),
            kembali: this.handleTglKembali( value.tanggalPengembalian),
            harga: "Rp " + value.harga + ",-",
            denda: "Rp " + this.handleDenda(value.denda) + ",-",
            status: this.handleStatus( value.finished)
          })
        )
      })
      this.setState({
        data: {
            columns: [
                ...this.state.columnTable
            ],
            rows: [...this.state.newRiwayats],
        }
      })
    })
  }

  handleTglKembali = (tgl) => {
    if(tgl === null) return "dd/mm/yyyy";
    else return new Intl.DateTimeFormat('en-GB', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(new Date(tgl))
  }
  handleDenda = (denda) => {
    if(denda === null) return 0;
    else return denda;
  }
  handleStatus = (status) => {
    if(status === false) return "Sedang dipinjam"
    else return "Selesai"
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col xs="12" sm="12">
              <Card>
                {/* <CardHeader>
                  <CardTitle tag="h5">Riwayat Sewa</CardTitle>
                </CardHeader> */}
                <CardBody>
                  <MDBDataTableV5 
                      striped 
                      small
                      hover
                      scrollX 
                      // columns = {this.state.columnTable}
                      // rows = {this.state.newRiwayats}
                      data = {this.state.data}
                      entriesOptions={[10, 20, 25]}
                      entries={10}
                      pagesAmount={4}
                      searchTop
                      searchBottom={false}
                      barReverse
                      order={['no', 'asc' ]}
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

export default Riwayat;
