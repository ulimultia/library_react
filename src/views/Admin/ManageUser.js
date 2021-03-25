import React from 'react';
import {
  Card, CardHeader, CardBody, CardTitle, CardFooter,
  Table,
  Row, Col,
} from "reactstrap";
import TabelUser from "components/Tabel/TabelUser/index";
import ModalAddUser from "../../components/Modal/ModalAddUser/index"

class Tables extends React.Component {
  // handleAdd = (id) => {

  //   console.log(id);
  // };
  constructor() {
    super();
    this.state = {
      modal: false
    };
  }


  render() {
    return (
      <>
        <div className="content">
          <Row>
          
            <Col md="12">
              <Card>
                <CardBody>
                <ModalAddUser
                  classButton="btn-primary btn-sm fa fa-plus float-right"
                  modalName="Tambah User"
                  buttonLabel="Tambah User"
                />
                </CardBody>
              </Card>

            </Col>
            <Col md="12">
              <Card>
                <CardBody>
                  <TabelUser />
                </CardBody>
              </Card>

            </Col>
            { }
          </Row>
        </div>
      </>
    );
  }
}

export default Tables;
