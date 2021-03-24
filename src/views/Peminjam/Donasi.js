import React from "react";
import {
  Card,CardHeader,CardBody,CardFooter,CardTitle,
  Row,Col,
} from "reactstrap";
import ModalCaraDonasi from "components/ModalCaraDonasi/index"
import CardDonasi from "components/CardDonasi/index"

class Sewa extends React.Component {
  render() {
    return (
      <>
        <div className="content">
          <Row>
              <Col xs="12" sm="8">
                <Row>
                  <Col xs="6" sm="4">
                    <CardDonasi />
                  </Col>
                  <Col xs="6" sm="4">
                    <CardDonasi />
                  </Col>
                  <Col xs="6" sm="4">
                    <CardDonasi />
                  </Col>
                  <Col xs="6" sm="4">
                    <CardDonasi />
                  </Col>
                  <Col xs="6" sm="4">
                    <CardDonasi />
                  </Col>
                </Row>
              </Col>
              <Col xs="12" sm="4">
                <Card>
                  <CardHeader>
                    <CardTitle><h5><b>Donasi Sekarang ...</b></h5><hr></hr></CardTitle>
                  </CardHeader>
                  <CardBody>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.0545934766155!2d110.37224741428324!3d-7.78403679439029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a583276eb8ccd%3A0x6382e59adcb8e58c!2sPerpustakaan%20Kota%20Yogyakarta!5e0!3m2!1sen!2sid!4v1615955374168!5m2!1sen!2sid" width="100%" height="200" style={{border:0}} allowfullscreen="" loading="lazy"></iframe>
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

export default Sewa;
