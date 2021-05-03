import React from "react";
import CardProfilAdmin from "components/CardProfilAdmin"
import WidgetProfil from "components/WidgetProfil"
// reactstrap components
import {
  Row,Col,
} from "reactstrap";

class Profile extends React.Component {
  render() {
    return (
      <>
        <div className="content">
          {/* <Row>
            <Col md="12"> */}
              <CardProfilAdmin/>
            {/* </Col> */}
            {/* <Col xs="12" sm="6">
              <WidgetProfil
                icon="fas fa-venus-mars"
                kategori="Jenis Kelamin"
                info="Laki-Laki"
              />
            </Col>
            <Col xs="12" sm="6">
              <WidgetProfil
                icon="fas fa-calendar-alt"
                kategori="TTL"
                info="Pati, 28 Januari 1945"
              />
            </Col>
            <Col xs="12" sm="6">
              <WidgetProfil
                icon="fas fa-home"
                kategori="Alamat"
                info="Jl. Mulawarman Semarang"
              />
            </Col>
            <Col xs="12" sm="6">
              <WidgetProfil
                icon="fas fa-phone"
                kategori="Telepon"
                info="081123456789"
              />
            </Col>
          </Row> */}
        </div>
      </>
    );
  }
}

export default Profile;
