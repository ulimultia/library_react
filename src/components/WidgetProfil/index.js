import React, { useState } from 'react';
import { Col, Row, Button, Badge, Card, CardHeader, CardTitle, CardBody, CardFooter } from 'reactstrap';

const WidgetProfil = (props) => {
  const { icon, kategori, info } = props;

  return (
    <div>
        <Card className="card-stats">
            <CardBody>
                <Row>
                <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning" >
                        <i className={icon} style={{color:"#825e40"}}/>
                    </div>
                </Col>
                <Col md="8" xs="7">
                    <div>
                        <p className="card-category">{kategori}</p>
                        <CardTitle tag="h5">{info}</CardTitle>
                        <p />
                    </div>
                </Col>
                </Row>
            </CardBody>
        </Card>
    </div>
  );
}

export default WidgetProfil;


