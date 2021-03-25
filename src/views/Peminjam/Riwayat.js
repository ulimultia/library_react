import React from "react";
import {
  Card, CardBody,
  Row,Col,
} from "reactstrap";
import TabelRiwayat from "components/TabelRiwayatPeminjam/index";

class Tables extends React.Component {
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                {/* <CardHeader>
                  <CardTitle tag="h5">Riwayat Sewa</CardTitle>
                </CardHeader> */}
                <CardBody>
                  <TabelRiwayat/>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Tables;
