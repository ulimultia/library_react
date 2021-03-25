import React from "react";
import CardProfil from "components/CardProfil"
import WidgetProfil from "components/WidgetProfil"
// reactstrap components
import {
  Row,Col,
} from "reactstrap";

class User extends React.Component {
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <CardProfil
                nama="Uli Multia Wijayanti"
                saldo="56700"
                denda="3400"
                role="Member"
                donasi="12"
                foto="https://image.shutterstock.com/image-vector/vector-silhouettes-girl-hairstyles-profile-600w-486277216.jpg"
              />
            </Col>
            <Col xs="12" sm="6">
              <WidgetProfil
                icon="fas fa-venus-mars"
                kategori="Jenis Kelamin"
                info="Perempuan"
              />
            </Col>
            <Col xs="12" sm="6">
              <WidgetProfil
                icon="fas fa-calendar-alt"
                kategori="TTL"
                info="Yogyakarta, 17 Agustus 1945"
              />
            </Col>
            <Col xs="12" sm="6">
              <WidgetProfil
                icon="fas fa-home"
                kategori="Alamat"
                info="Jl. Sesama 123 Yogyakarta"
              />
            </Col>
            <Col xs="12" sm="6">
              <WidgetProfil
                icon="fas fa-phone"
                kategori="Telepon"
                info="081123456789"
              />
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default User;
