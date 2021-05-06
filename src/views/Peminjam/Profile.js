import React from "react";
import CardProfil from "components/CardProfil"
import WidgetProfil from "components/WidgetProfil"
// reactstrap components
import {
  Row,Col,
} from "reactstrap";
import axios from "axios";
import LogoutFunction from "../../components/SessionDelete/index.js";

class User extends React.Component {
  constructor(){
    super();
    this.state = {
      // dataSewa: [],
      // donations: [],
      detailUser: {},
      dataUser: {},
      // user: {},
      // roles: {},
      denda: 0,
      sessionData: JSON.parse(localStorage.getItem("userdata")),
    }
  }

  authHeader = () => {
    if(this.state.sessionData && this.state.sessionData.data.token){
      return {
        'authorization': `Bearer ${this.state.sessionData.data.token}`
      }
    }
    else{
      return null;
    }
  } 

  componentDidMount(){
    this.authHeader();
    this.getDetailUser();
  }
  // get detail user
  getDetailUser = () => {
    axios.get('http://localhost:8080/user/get-detail/' + this.state.sessionData.data.id, {headers: this.authHeader()})
    .then(response => {
      this.setState({
        detailUser: response.data,
        dataUser: response.data.user
        // roles: response.data.user.roles[0]
      })
    })
    .catch((error) => {
      // Error
      if (error.response) {
        if (error.response.status === 401) {
          LogoutFunction()
        }
      } else if (error.request) {
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
    });
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
    const { detailUser } = this.state
    // console.log(dataUser);

    return (
      <>
        <div className="content">
          {/* <Row> */}
            {/* <Col md="12"> */}
              <CardProfil/>
            {/* </Col> */}
            {/* <Col xs="12" sm="6">
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
            </Col> */}
          {/* </Row> */}
        </div>
      </>
    );
  }
}

export default User;
