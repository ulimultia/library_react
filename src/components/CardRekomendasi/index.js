
import React, { useState } from 'react';
import { Col, Row, Button, Badge, Card, CardHeader, CardTitle, CardBody, CardFooter } from 'reactstrap';

// function getData(jenis) {
//   if(jenis == "")
// }

const CardRekomendasi = (props) => {
  const { jenisRekomendasi, data} = props;
  // console.log(data);
  return (
    <div>
      
      <Card className="catalog-book">
          <CardHeader>
            <CardTitle><h5><b>{jenisRekomendasi}</b></h5><hr></hr></CardTitle>
          </CardHeader>
          <CardBody>
            {data.slice(0,3).map(val => {
              return(
                <Row className="my-1">
                  <Col xs="4">
                      <img src={val.sampul} height="100px" width="auto" objectFit="cover"/>
                  </Col>
                  <Col xs="8">
                      <p>{val.judul}</p>
                      <p className="font-italic font-weight-light">{val.kategori} | {val.genre} </p>
                      <Badge style={{backgroundColor: "#090c4a"}}>Tersedia: {val.jumlah}</Badge>
                  </Col>
                </Row>   
              )
            })}
          </CardBody>
      </Card>
    </div>
  );
}

export default CardRekomendasi;