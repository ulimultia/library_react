import React from 'react';
import {
  Card, CardHeader, CardBody, CardTitle, CardFooter,
  Table,
  Row, Col,
} from "reactstrap";
import TabelPengembalian from "../../components/Tabel/TabelPengembalian/index";
import User from "../../assets/data/User"
import Button from "../../components/Button"

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
                  <TabelPengembalian />
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
