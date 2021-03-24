import React from "react";
import {
  Card,CardHeader,CardBody,CardFooter,CardTitle,
  Row,Col,
} from "reactstrap";
import CardSedangDipinjam from "components/CardSedangDisewa/index"

class Sewa extends React.Component {
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col xs="6" sm="3">
              <CardSedangDipinjam />
            </Col>
            <Col xs="6" sm="3">
              <CardSedangDipinjam />
            </Col>
            <Col xs="6" sm="3">
              <CardSedangDipinjam />
            </Col>
            <Col xs="6" sm="3">
              <CardSedangDipinjam />
            </Col>
            <Col xs="6" sm="3">
              <CardSedangDipinjam />
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Sewa;
