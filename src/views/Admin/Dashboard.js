/*!

=========================================================
* Paper Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart,
} from "variables/charts.js";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userAll: [],
      bukuAll: [],
      pinjamanAll: [],
      userLength: "",
      bukuLength: "",
      pinjamanLength: "",
      chartAll: {},
      labelChart: [],
      dataChart: [],
      data: (canvas) => {
        return {
          labels: this.state.labelChart,
          datasets: [
            {
              borderColor: "#6bd098",
              backgroundColor: "#6bd098",
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: this.state.dataChart,
            },
          ],
        };
      },
    };
  }
  componentDidMount() {
    //panggil fungsi getAllCatalog diawal
    this.getAllUser();
    this.getAllBuku();
    this.getAllPinjaman();
    this.chartData();
    console.log(this.state.labelChart);
  }
  getAllUser = () => {
    axios.get("http://localhost:8080/user/get-all").then((response) => {
      this.setState({
        userAll: response.data.data,
      });

      const usertotal = this.state.userAll.length;
      this.setState({
        userLength: usertotal,
      });
    });
  };
  getAllBuku = () => {
    axios.get("http://localhost:8080/api/v1/buku/all").then((response) => {
      this.setState({
        bukuAll: response.data.data,
      });

      const bukutotal = this.state.bukuAll.length;
      this.setState({
        bukuLength: bukutotal,
      });
    });
  };
  getAllPinjaman = () => {
    axios
      .get("http://localhost:8080/admin/peminjaman/get-all")
      .then((response) => {
        this.setState({
          pinjamanAll: response.data.data,
        });

        const pinjamantotal = this.state.pinjamanAll.length;
        this.setState({
          pinjamanLength: pinjamantotal,
        });
        console.log(this.state.pinjamanLength);
      });
  };
  chartData = () => {
    axios
      .get("http://localhost:8080/admin/peminjaman/buku/terpopuler")
      .then((response) => {
        console.log(response.data.data);

        this.setState({
          dataChart: response.data.data.total,
          labelChart: response.data.data.judul,
        });
      });
    this.setState({
      chartAll: {
        labels: this.state.labelChart,
        datasets: [
          {
            borderColor: "#6bd098",
            backgroundColor: "#6bd098",
            pointRadius: 0,
            pointHoverRadius: 0,
            borderWidth: 3,
            data: this.state.dataChart,
          },
        ],
      },
    });
  };
  bukuClick = () => {
    return <Redirect to="admin/buku" />;
  };
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col lg="4" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="fa fa-user text-warning" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Total Anggota</p>
                        <CardTitle tag="p">{this.state.userLength}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats" style={{ textAlign: "center" }}>
                    <a href="/admin/user">
                      More info <i className="fas fa-arrow-circle-right"></i>
                    </a>
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="4" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="fa fa-book text-success" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Total Buku</p>
                        <CardTitle tag="p">{this.state.bukuLength}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats" style={{ textAlign: "center" }}>
                    <a class="button" href="/admin/buku">
                      More info <i className="fas fa-arrow-circle-right"></i>
                    </a>
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="4" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="fa fa-chart-bar text-danger" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Total Peminjaman Buku</p>
                        <CardTitle tag="p">
                          {this.state.pinjamanLength}
                        </CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats" style={{ textAlign: "center" }}>
                    <a href="/admin/peminjaman">
                      More info <i className="fas fa-arrow-circle-right"></i>
                    </a>
                  </div>
                </CardFooter>
              </Card>
            </Col>
            {/* <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="fa fa-users text-primary" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Total Pengunjung</p>
                        <CardTitle tag="p">120</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats" style={{ textAlign: "center" }}>
                    <a href="#">
                      More info <i className="fas fa-arrow-circle-right"></i>
                    </a>
                  </div>
                </CardFooter>
              </Card>
            </Col> */}
          </Row>
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h5">
                    Buku Yang Paling Banyak Dipinjam
                  </CardTitle>
                  <p className="card-category">Data Selama 24 Jam</p>
                </CardHeader>
                <CardBody>
                  <Line
                    data={dashboard24HoursPerformanceChart.data}
                    options={dashboard24HoursPerformanceChart.options}
                    width={400}
                    height={100}
                  />
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fa fa-history" /> Updated 3 minutes ago
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Dashboard;
