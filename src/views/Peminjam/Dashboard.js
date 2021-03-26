import React from "react";
import { Row,Col } from "reactstrap";
import WidgetDashboard from "components/WidgetDashboard/"
import BukuRekomendasi from "components/BukuRekomendasiDashboard/index"
import Terpopuler from "assets/data/dataterpopuler"
import Terbaru from "assets/data/dataterbaru"
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
  // constructor(){
  //   super();
  // }

  //fungsi yang digunakan untuk memotong judul yang terlalu panjang
  cutTitle = (judul) => {
    if(judul.length > 40){
          return judul.slice(0,40) + " ...."
        }
        else{
          return judul
        }
  }
  
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col lg="3" md="6" sm="6">
              <WidgetDashboard
                icon = "fas fa-money-bill"
                kategori = "Rp"
                info = "56700,-"
                footer ="SALDO"
              />
            </Col>
            <Col lg="3" md="6" sm="6">
              <WidgetDashboard
                icon = "fas fa-coins"
                kategori = "Rp"
                info = "3300,-"
                footer ="DENDA"
              />
            </Col>
            <Col lg="3" md="6" sm="6">
              <WidgetDashboard
                icon = "fas fa-hourglass-half"
                kategori = "Buku"
                info = "4"
                footer ="SEDANG DISEWA"
              />
            </Col>
            <Col lg="3" md="6" sm="6">
              <WidgetDashboard
                icon = "fas fa-book"
                kategori = "Buku"
                info = "123"
                footer ="TOTAL BUKU DISEWA"
              />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col xs="2" sm="4"><hr/></Col>
            <Col xs="8" sm="4"><h5 className="text-center"><b>Buku Terbaru</b></h5></Col>
            <Col xs="2" sm="4"><hr/></Col>
            { Terbaru.map(val=>{
              // console.log("cek", val);
              return(
                <Col xs="6" sm="2">
                  <BukuRekomendasi 
                    id = {val.id}
                    kode = {val.kode}
                    judul = {val.judul}
                    judul_cut = {this.cutTitle(val.judul)}
                    kategori = {val.kategori}
                    genre = {val.genre}
                    isbn = {val.isbn}
                    harga = {val.harga}
                    pengarang = {val.pengarang}
                    penerbit = {val.penerbit}
                    tanggal_terbit = {val.tanggal_terbit }
                    halaman = {val.halaman}
                    jumlah = {val.jumlah}
                    lokasi = {val.lokasi}
                    deskripsi = {val.deskripsi}
                    sampul = {val.sampul}
                  />
                </Col>
              ) 
            })}
          </Row>
          <Row className="mt-4">
            <Col xs="2" sm="4"><hr/></Col>
            <Col xs="8" sm="4"><h5 className="text-center"><b>Buku Terpopuler</b></h5></Col>
            <Col xs="2" sm="4"><hr/></Col>
            { Terpopuler.map(val=>{
              return(
                <Col xs="6" sm="2">
                  <BukuRekomendasi 
                    id = {val.id}
                    kode = {val.kode}
                    judul = {val.judul}
                    judul_cut = {this.cutTitle(val.judul)}
                    kategori = {val.kategori}
                    genre = {val.genre}
                    isbn = {val.isbn}
                    harga = {val.harga}
                    pengarang = {val.pengarang}
                    penerbit = {val.penerbit}
                    tanggal_terbit = {val.tanggal_terbit }
                    halaman = {val.halaman}
                    jumlah = {val.jumlah}
                    lokasi = {val.lokasi}
                    deskripsi = {val.deskripsi}
                    sampul = {val.sampul}
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
