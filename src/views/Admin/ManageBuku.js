import React from "react";
import {
  Card,CardHeader,CardBody,CardTitle,CardFooter,
  Table,
  Row,Col,
} from "reactstrap";
import TabelBuku from "components/Tabel/TabelBuku/index";
import ModalAddBuku from "../../components/Modal/ModalAddBuku/index"
import ModalSewaBuku from "../../components/Modal/ModalSewaBuku/index"
import Button from "../../../src/components/Button"

class Tables extends React.Component {

// handleEdit = () => {
// console.log("1");
// this.setState({
//   modal: true
// })
    // }
  render() {
    return (
      <>
        <div className="content">
          <Row>
          
            <Col md="12">
              <Card>
                <CardBody>
                <ModalSewaBuku
                classButton="btn-primary btn-sm fa fa-plus float-right"
                modalName="Sewa Buku"
                buttonLabel=" Sewa Buku"
                />
                <ModalAddBuku
                classButton="btn-primary btn-sm fa fa-plus float-right"
                modalName="Tambah Buku"
                buttonLabel=" Tambah Buku"
                />
                
                </CardBody>
              </Card>
            </Col>
            <Col md="12">
              <Card>
                <CardBody>
                  <TabelBuku/>
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
