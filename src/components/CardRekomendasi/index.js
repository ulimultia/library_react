
import React, { useState } from 'react';
import { Col, Row, Button, Badge, Card, CardHeader, CardTitle, CardBody, CardFooter } from 'reactstrap';

const CardRekomendasi = (props) => {
  const { jenisRekomendasi} = props;

  return (
    <div>
      <Card className="catalog-book">
          <CardHeader>
            <CardTitle><h5><b>{jenisRekomendasi}</b></h5><hr></hr></CardTitle>
          </CardHeader>
          <CardBody>
            <Row>
                <Col xs="4">
                    <img src="https://upload.wikimedia.org/wikipedia/id/c/c8/Doraemon_volume_1_cover.jpg" height="100px" width="auto" objectFit="cover"/>
                </Col>
                <Col xs="8">
                    <p>Judul</p>
                    <p className="font-italic font-weight-light">kategori | Genre </p>
                    <Badge style={{backgroundColor: "#090c4a"}}>Tersedia</Badge>
                </Col>
            </Row>
            <Row>
                <Col xs="4">
                    <img src="https://upload.wikimedia.org/wikipedia/id/c/c8/Doraemon_volume_1_cover.jpg" height="100px" width="auto" objectFit="cover"/>
                </Col>
                <Col xs="8">
                    <p>Judul</p>
                    <p className="font-italic font-weight-light">kategori | Genre </p>
                    <Badge style={{backgroundColor: "#090c4a"}}>Tersedia</Badge>
                </Col>
            </Row>
            <Row>
                <Col xs="4">
                    <img src="https://upload.wikimedia.org/wikipedia/id/c/c8/Doraemon_volume_1_cover.jpg" height="100px" width="auto" objectFit="cover"/>
                </Col>
                <Col xs="8">
                    <p>Judul</p>
                    <p className="font-italic font-weight-light">kategori | Genre </p>
                    <Badge style={{backgroundColor: "#090c4a"}}>Tersedia</Badge>
                </Col>
            </Row>
          </CardBody>
      </Card>
    </div>
  );
}

export default CardRekomendasi;