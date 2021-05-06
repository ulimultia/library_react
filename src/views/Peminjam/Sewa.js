import React from "react";
import {
  Row,Col,
} from "reactstrap";
import CardSedangDipinjam from "components/CardSedangDisewa/index"
import axios from "axios";
import LogoutFunction from "../../components/SessionDelete/index.js";

class Sewa extends React.Component {
  constructor(){
    super();
    this.state = {
      dataSewa: [],
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
    this.authHeader()
    this.getAllDataSedangDisewa(this.state.sessionData.data.id)
  }

  getAllDataSedangDisewa = (id) => {
    axios.get('http://localhost:8080/api/v1/user/riwayat/sedangdisewa/' + id, {headers: this.authHeader()})
    .then((response) => {
        this.setState({
           dataSewa: response.data.data
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

  render() {
    const {dataSewa} = this.state
    return (
      <>
        <div className="content">
          <Row>
            {
              dataSewa.map(value => {
                return(
                  <Col xs="6" sm="3">
                    <CardSedangDipinjam 
                      dataBuku = {value}
                    />
                  </Col>
                )
              })
            }
          </Row>
        </div>
      </>
    );
  }
}

export default Sewa;
