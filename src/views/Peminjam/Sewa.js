import React from "react";
import {
  Row,Col,
} from "reactstrap";
import CardSedangDipinjam from "components/CardSedangDisewa/index"
import axios from "axios";

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
