import React from "react";
import {
  Card,CardHeader,CardBody,CardFooter,CardTitle,
  Row,Col,
} from "reactstrap";
import ModalCaraDonasi from "components/ModalCaraDonasi/index"
import CardDonasi from "components/CardDonasi/index"
import axios from "axios";
import ReactPaginate from 'react-paginate'

class Donasi extends React.Component {
  constructor(){
    super();
    this.getAllDonation = this.getAllDonation.bind(this);
    this.state = {
      donations: [],
      sessionData: JSON.parse(localStorage.getItem("userdata")),
      currentPage: 0,
      offset: 0,
      dataPerPage : 6,
    }
  }

  componentDidMount(){
    this.getAllDonation(this.state.sessionData.data.id);
  }
  
  getAllDonation = (id) => {
    axios.get('http://localhost:8080/api/v1/user/buku/donasi/' + id)
    .then((response) => {
      this.setState({
        donations: response.data.data,
        pagesCount: Math.ceil(response.data.data.length / this.state.dataPerPage),
      })
    })
      
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offsetTemp = selectedPage * this.state.dataPerPage;
    this.setState({
      currentPage: selectedPage,
      offset: offsetTemp
    })
  }

  render() {
    const { donations, pagesArray } = this.state
    const currentData = donations.slice(this.state.offset, this.state.offset + this.state.dataPerPage)
    return (
      <>
        <div className="content">
          <Row>
              <Col xs="12" sm="8">
                <Row>
                  {
                    currentData.map(value => {
                      return (
                        <Col xs="6" sm="4">
                          <CardDonasi 
                            dataBuku = { value }
                          />
                        </Col>
                      )
                    })
                  }
                </Row>
                <Row className="text-right">
                  <Col>
                    <ReactPaginate
                        previousLabel={"Sebelum"}
                        nextLabel={"Setelah"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={this.state.pagesCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={25}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}/>
                  </Col>
                </Row>
              </Col>
              <Col xs="12" sm="4">
                <Card>
                  <CardHeader>
                    <CardTitle><h5><b>Donasi Sekarang ...</b></h5><hr></hr></CardTitle>
                  </CardHeader>
                  <CardBody>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.0545934766155!2d110.37224741428324!3d-7.78403679439029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a583276eb8ccd%3A0x6382e59adcb8e58c!2sPerpustakaan%20Kota%20Yogyakarta!5e0!3m2!1sen!2sid!4v1615955374168!5m2!1sen!2sid" width="100%" height="200" style={{border:0}} allowfullscreen="" loading="lazy" id="map-lib" title="MapKreasiTech"></iframe>
                    <p className="text-left font-weight-lighter">Jl. Dunia Maya 123 Yogyakarta <br />Telp. (0274) 575757 <br /> libjog@library.go.id</p>
                  </CardBody>
                  <CardFooter>
                    <ModalCaraDonasi />
                  </CardFooter>
              </Card>
              </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Donasi;
