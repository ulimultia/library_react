/*!

=========================================================
* Paper Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// reactstrap components
import {
  Card,
  CardBody,
  Row,
  Col,
} from "reactstrap";

import Buku from "../../assets/data/Buku"

class Catalog extends React.Component {
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col xs="12" sm="8">
              <Row>
                {Buku.map((val)=> {
                  return (
                    <Col xs="6" sm="4" className="catalog-book">      
                      <Card className="card-stats">
                        <a type="button" data-toggle="modal" data-target="#">
                          <img src={val.sampul} alt=" " className="card-img-top catalog-img "/>
                        </a> 
                        <CardBody>
                          <a type="button" data-toggle="modal" data-target="#">
                            <p><b>{val.judul}</b></p>
                            <p className="description text-end">
                                <span class="font-italic font-weight-lighter">{val.kategori} | {val.genre}</span>
                                <br></br><span class="text-success"> Tersedia: {val.jumlah} </span>
                                <br></br><strong>Rp {val.harga},-/minggu</strong> 
                              </p>
                          </a>   
                        </CardBody>
                      </Card>
                    </Col>
                  )
                })}
              </Row>
            </Col>
            <Col xs="12" sm="4">
            </Col>
            
          </Row>
        </div>
      </>
    );
  }
}

export default Catalog;
