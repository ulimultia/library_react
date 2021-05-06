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
import logoutfunc from "../../components/SessionDelete/index.js";

class Dashboard extends React.Component {
  intervalID;
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
      chart: [],
      chartLabel: [],
      session: JSON.parse(localStorage.getItem("userdata")),
      tesarray: ["a", "b"],
    };
  }
  componentDidMount() {
    this.authHeader();
    this.chartData();
    this.getAllUser();
    this.getAllBuku();
    this.getAllPinjaman();
  }
  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.dataChart !== this.state.dataChart) {
  //     this.chartData();
  //   }
  //   // console.log(prevState.dataChart);
  //   // console.log(this.state.dataChart);
  //   if (!prevState.dataChart) {
  //     this.chartData();
  //   }
  // }
  componentWillUnmount() {
    /*
      stop getData() from continuing to run even
      after unmounting this component. Notice we are calling
      'clearTimeout()` here rather than `clearInterval()` as
      in the previous example.
    */
    clearTimeout(this.intervalID);
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
  getAllUser = () => {
    const userHeader = this.authHeader();
    axios
      .get("http://localhost:8080/user/get-all", {
        headers: userHeader,
      })
      .then((response) => {
        this.setState({
          userAll: response.data.data,
        });

        const usertotal = this.state.userAll.length;
        this.setState({
          userLength: usertotal,
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
  getAllBuku = () => {
    const userHeader = this.authHeader();

    axios
      .get("http://localhost:8080/api/v1/buku/all", {
        headers: userHeader,
      })
      .then((response) => {
        this.setState({
          bukuAll: response.data.data,
        });

        const bukutotal = this.state.bukuAll.length;
        this.setState({
          bukuLength: bukutotal,
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
  getAllPinjaman = () => {
    const userHeader = this.authHeader();

    axios
      .get("http://localhost:8080/admin/peminjaman/get-all", {
        headers: userHeader,
      })
      .then((response) => {
        this.setState({
          pinjamanAll: response.data.data,
        });

        const pinjamantotal = this.state.pinjamanAll.length;
        this.setState({
          pinjamanLength: pinjamantotal,
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
  chartData = () => {
    const userHeader = this.authHeader();

    axios
      .get("http://localhost:8080/admin/peminjaman/buku/terpopuler", {
        headers: userHeader,
      })
      .then((response) => {
        console.log(response.data.data);
        this.setState({
          chart: response.data.data,
        });
        const perulangan = this.state.chart;
        perulangan.forEach((perulangan) => {
          this.state.chartLabel.push(perulangan.judul);
          this.state.dataChart.push(perulangan.total);
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
  bukuClick = () => {
    return <Redirect to="admin/buku" />;
  };
  render() {
    const data = {
      labels: this.state.chartLabel,
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
    const options = {
      legend: {
        display: false,
      },

      tooltips: {
        enabled: false,
      },

      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: "#9f9f9f",
              beginAtZero: false,
              maxTicksLimit: 1,
              //padding: 20
            },
            gridLines: {
              drawBorder: false,
              zeroLineColor: "#ccc",
              color: "rgba(255,255,255,0.05)",
            },
          },
        ],

        xAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(255,255,255,0.1)",
              zeroLineColor: "transparent",
              display: false,
            },
            ticks: {
              padding: 20,
              fontColor: "#9f9f9f",
            },
          },
        ],
      },
    };
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
                    <a className="button" href="/admin/buku">
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
                  <p className="card-category">5 Buku Teratas</p>
                </CardHeader>
                <CardBody>
                  <Line
                    redraw={true}
                    data={data}
                    options={options}
                    width={400}
                    height={100}
                  />
                </CardBody>
                <CardFooter></CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Dashboard;
