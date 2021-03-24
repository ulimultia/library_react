import React from "react";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
// reactstrap components
import {
  Card,CardHeader,CardBody,CardFooter,CardTitle, CardText, CardImgOverlay, CardImg,
  Row,Col,
} from "reactstrap";
// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart,
} from "variables/charts.js";
import WidgetDashboard from "components/WidgetDashboard/"
import BukuRekomendasi from "components/BukuRekomendasiDashboard/index"

class Dashboard extends React.Component {
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
            <Col xs="6" sm="2">
              <BukuRekomendasi 
                image = "https://images.wallpaperscraft.com/image/book_bouquet_cup_147482_3840x2160.jpg"
                kategori = "Novel"
                genre = "Remaja"
                judul = "Cinta Pertamaku"
              />
            </Col>
            <Col xs="6" sm="2">
              <BukuRekomendasi 
                image = "https://upload.wikimedia.org/wikipedia/id/c/c8/Doraemon_volume_1_cover.jpg"
                kategori = "Komik"
                genre = "Series"
                judul = "Doraemon Volume 1"
              />
            </Col>
            <Col xs="6" sm="2">
              <BukuRekomendasi 
                image = "https://upload.wikimedia.org/wikipedia/id/thumb/8/8e/Laskar_pelangi_sampul.jpg/220px-Laskar_pelangi_sampul.jpg"
                kategori = "Novel"
                genre = "Sosial Pendidikan"
                judul = "Laskar Pelangi"
              />
            </Col>
            <Col xs="6" sm="2">
              <BukuRekomendasi 
                image = "https://upload.wikimedia.org/wikipedia/id/c/c8/Ayat-Ayat_Cinta.jpg"
                kategori = "Novel"
                genre = "Romantis"
                judul = "Ayat-ayat Cinta"
              />
            </Col>
            <Col xs="6" sm="2">
              <BukuRekomendasi 
                image = "https://upload.wikimedia.org/wikipedia/id/thumb/8/8e/Laskar_pelangi_sampul.jpg/220px-Laskar_pelangi_sampul.jpg"
                kategori = "Novel"
                genre = "Sosial Pendidikan"
                judul = "Laskar Pelangi"
              />
            </Col>
            <Col xs="6" sm="2">
              <BukuRekomendasi 
                image = "https://upload.wikimedia.org/wikipedia/id/c/c8/Ayat-Ayat_Cinta.jpg"
                kategori = "Novel"
                genre = "Romantis"
                judul = "Ayat-ayat Cinta"
              />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col xs="2" sm="4"><hr/></Col>
            <Col xs="8" sm="4"><h5 className="text-center"><b>Buku Terpopuler</b></h5></Col>
            <Col xs="2" sm="4"><hr/></Col>
            <Col xs="6" sm="2">
              <BukuRekomendasi 
                image = "https://images.wallpaperscraft.com/image/book_bouquet_cup_147482_3840x2160.jpg"
                kategori = "Novel"
                genre = "Remaja"
                judul = "Cinta Pertamaku"
              />
            </Col>
            <Col xs="6" sm="2">
              <BukuRekomendasi 
                image = "https://upload.wikimedia.org/wikipedia/id/c/c8/Doraemon_volume_1_cover.jpg"
                kategori = "Komik"
                genre = "Series"
                judul = "Doraemon Volume 1"
              />
            </Col>
            <Col xs="6" sm="2">
              <BukuRekomendasi 
                image = "https://images.wallpaperscraft.com/image/book_bouquet_cup_147482_3840x2160.jpg"
                kategori = "Novel"
                genre = "Remaja"
                judul = "Cinta Pertamaku"
              />
            </Col>
            <Col xs="6" sm="2">
              <BukuRekomendasi 
                image = "https://upload.wikimedia.org/wikipedia/id/c/c8/Doraemon_volume_1_cover.jpg"
                kategori = "Komik"
                genre = "Series"
                judul = "Doraemon Volume 1"
              />
            </Col>
            <Col xs="6" sm="2">
              <BukuRekomendasi 
                image = "https://upload.wikimedia.org/wikipedia/id/thumb/8/8e/Laskar_pelangi_sampul.jpg/220px-Laskar_pelangi_sampul.jpg"
                kategori = "Novel"
                genre = "Sosial Pendidikan"
                judul = "Laskar Pelangi"
              />
            </Col>
            <Col xs="6" sm="2">
              <BukuRekomendasi 
                image = "https://upload.wikimedia.org/wikipedia/id/c/c8/Ayat-Ayat_Cinta.jpg"
                kategori = "Novel"
                genre = "Romantis"
                judul = "Ayat-ayat Cinta"
              />
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Dashboard;
