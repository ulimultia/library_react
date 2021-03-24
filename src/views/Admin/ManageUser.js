import React from "react";
import {
  Card,CardHeader,CardBody,CardTitle,
  Table,
  Row,Col,
} from "reactstrap";
import TabelUser from "components/Tabel/TabelUser/index";

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
                  <TabelUser/>
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
