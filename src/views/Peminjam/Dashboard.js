import React from "react";
import axios from "axios";
import { Row,Col } from "reactstrap";
import WidgetDashboard from "components/WidgetDashboard/"
import BukuRekomendasi from "components/BukuRekomendasiDashboard/index"
// react plugin used to create charts
// import { Line, Pie } from "react-chartjs-2";
// // reactstrap components
// core components
// import {
//   dashboard24HoursPerformanceChart,
//   dashboardEmailStatisticsChart,
//   dashboardNASDAQChart,
// } from "variables/charts.js";

class Dashboard extends React.Component {
  constructor(){
    super();
    this.state = {
      newBooks: [],
      hotBooks: [],
      dataSewa: [],
      riwayats: [],
      detailUser: {},
      denda: 0,
      sessionData: JSON.parse(localStorage.getItem("userdata")),
    }
  }

  componentDidMount(){
    //panggil fungsi getAllCatalog diawal
    this.getNewBooks();
    this.getHotBooks();
    this.getAllDataSedangDisewa(this.state.sessionData.data.id)
    this.getAllRiwayatSewa();
    this.getDetailUser();
    console.log(this.state.detailUser);
  }

  // mengambil data buku terbaru
  getNewBooks = () => {
    axios.get('http://localhost:8080/api/v1/user/buku/terbaru')
    .then((response) => {
        this.setState({
            newBooks: response.data.data
        })
    })
  }
  // mengambil data buku terpopuler 
  getHotBooks = () => {
    axios.get('http://localhost:8080/api/v1/user/buku/terpopuler')
    .then((response) => {
        this.setState({
            hotBooks: response.data.data
        })
    })
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
  //  mengambil semua riwayat buku yang sedang disewa
  getAllRiwayatSewa = () => {
    // hanya riwayat sewa yang sudah selesai
    // axios.get('http://localhost:8080/api/v1/user/riwayat/selesai/' + this.state.sessionData.data.id)
    // semua riwayat sewa yang selesai atau masih dipinjam
    axios.get('http://localhost:8080/api/v1/user/riwayat/sewa/' + this.state.sessionData.data.id)
    .then(response => {
      this.setState({
        riwayats: response.data.data
      })
    })
  }
  // get detail user
  getDetailUser = () => {
    axios.get('http://localhost:8080/user/get-detail/' + this.state.sessionData.data.id)
    .then(response => {
      this.setState({
        detailUser: response.data
      })
    })
  }
  //fungsi yang digunakan untuk memotong judul yang terlalu panjang
  cutTitle = (judul) => {
    if(judul.length > 40){
          return judul.slice(0,40) + " ...."
        }
        else{
          return judul
        }
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
  render() {
    const {newBooks, hotBooks} = this.state
    return (
      <>
        <div className="content">
          <Row>
            <Col lg="3" md="6" sm="6">
              <WidgetDashboard
                icon = "fas fa-money-bill"
                kategori = "Rp"
                info = {this.state.detailUser.saldo + ",-"} 
                footer ="SALDO"
              />
            </Col>
            <Col lg="3" md="6" sm="6">
              <WidgetDashboard
                icon = "fas fa-coins"
                kategori = "Rp"
                // info = {this.state.denda + ",-"}
                info = {this.hitungDenda(this.state.dataSewa) + ",-"}
                footer ="DENDA"
              />
            </Col>
            <Col lg="3" md="6" sm="6">
              <WidgetDashboard
                icon = "fas fa-hourglass-half"
                kategori = "Buku"
                info = {this.state.dataSewa.length}
                footer ="SEDANG DISEWA"
              />
            </Col>
            <Col lg="3" md="6" sm="6">
              <WidgetDashboard
                icon = "fas fa-book"
                kategori = "Buku"
                info = {this.state.riwayats.length}
                footer ="TOTAL BUKU DISEWA"
              />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col xs="2" sm="4"><hr/></Col>
            <Col xs="8" sm="4"><h5 className="text-center"><b>Buku Terbaru</b></h5></Col>
            <Col xs="2" sm="4"><hr/></Col>
            { newBooks.map(val=>{
              // console.log("cek", val);
              return(
                <Col xs="6" sm="2">
                  <BukuRekomendasi 
                    dataBuku = {val}
                  />
                </Col>
              ) 
            })}
          </Row>
          <Row className="mt-4">
            <Col xs="2" sm="4"><hr/></Col>
            <Col xs="8" sm="4"><h5 className="text-center"><b>Buku Terpopuler</b></h5></Col>
            <Col xs="2" sm="4"><hr/></Col>
            { hotBooks.map(val=>{
              return(
                <Col xs="6" sm="2">
                  <BukuRekomendasi 
                    dataBuku = {val}
                  />
                </Col>
              )
            })}
          </Row>
        </div>
      </>
    );
  }
}

export default Dashboard;
