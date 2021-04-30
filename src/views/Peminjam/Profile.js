import React from "react";
import CardProfil from "components/CardProfil"
import WidgetProfil from "components/WidgetProfil"
// reactstrap components
import {
  Row,Col,
} from "reactstrap";
import axios from "axios";

class User extends React.Component {
  constructor(){
    super();
    this.state = {
      dataSewa: [],
      donations: [],
      detailUser: {},
      // user: {},
      // roles: {},
      denda: 0,
      sessionData: JSON.parse(localStorage.getItem("userdata")),
    }
  }

  componentDidMount(){
    this.getAllDataSedangDisewa(this.state.sessionData.data.id)
    this.getDetailUser();
    this.getAllDonation(this.state.sessionData.data.id);
  }

  // mengambil buku yang sedang disewa
  getAllDataSedangDisewa = (id) => {
    axios.get('http://localhost:8080/api/v1/user/riwayat/sedangdisewa/' + id)
    .then((response) => {
        this.setState({
           dataSewa: response.data.data
        })
    })
  }
  // get detail user
  getDetailUser = () => {
    axios.get('http://localhost:8080/user/get-detail/' + this.state.sessionData.data.id)
    .then(response => {
      this.setState({
        detailUser: response.data,
        // roles: response.data.user.roles[0]
      })
    })
  }
  // get buku yang pernah didonasikan
  getAllDonation = (id) => {
    axios.get('http://localhost:8080/api/v1/user/buku/donasi/' + id)
    .then((response) => {
        this.setState({
            donations: response.data.data
        })
    })
  }
  // fungsi hitung denda di UI
  hitungDenda = (data) => {
    let denda = 0;
    let nowDate = new Date()
    data.map(value => {
      let tempBatas = new Date(value.batasPinjam)
      if(nowDate > tempBatas){
        denda = denda + 100
      }
    })
    return denda;
  }
  // handleTypeUser = (data) => {
  //   if(data.toLowerCase() === "peminjam"){
  //     return "Member"
  //   }
  //   else return "-"
  // }
  //atur format tanggal lahir
  handleTgl = (tgl) => {
    if(tgl === null) return "-";
    else return new Intl.DateTimeFormat('en-GB', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(new Date(tgl))
}
  render() {
    const { detailUser, dataSewa, donations} = this.state

    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <CardProfil
                nama={ detailUser.nama }
                saldo={ detailUser.saldo + ",-" }
                denda={ this.hitungDenda(dataSewa) + ",-"}
                role= "Member"
                donasi= { donations.length }
                foto= { detailUser.foto}
              />
            </Col>
            <Col xs="12" sm="6">
              <WidgetProfil
                icon="fas fa-venus-mars"
                kategori="Jenis Kelamin"
                info={detailUser.kelamin}
              />
            </Col>
            <Col xs="12" sm="6">
              <WidgetProfil
                icon="fas fa-calendar-alt"
                kategori="TTL"
                info={detailUser.tempatLahir + ", " + (detailUser.tanggalLahir)}
              />
            </Col>
            <Col xs="12" sm="6">
              <WidgetProfil
                icon="fas fa-home"
                kategori="Alamat"
                info={detailUser.alamat}
              />
            </Col>
            <Col xs="12" sm="6">
              <WidgetProfil
                icon="fas fa-phone"
                kategori="Telepon"
                info={detailUser.telp}
              />
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default User;
