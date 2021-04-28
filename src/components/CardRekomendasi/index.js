
import React from 'react';
import { Col, Row, Badge, Card, CardHeader, CardTitle, CardBody } from 'reactstrap';

// function getData(jenis) {
//   if(jenis == "")
// }

const CardRekomendasi = (props) => {
  const { jenisRekomendasi, data} = props;
  
  // console.log("terbaru");
  // console.log(data);
  return (
    <div>
      
      <Card className="catalog-book">
          <CardHeader>
            <CardTitle><h5><b>{jenisRekomendasi}</b></h5><hr></hr></CardTitle>
          </CardHeader>
          <CardBody>
            {data.slice(0,3).map(val => {
              let jmlTersedia = 0
              if(val.kodeBuku !== null){
                val.kodeBuku.map((value, key) => {
                  // menghitung jumlah buku yang tersedia saja 
                  if(value.isAvailable === true){
                    jmlTersedia++;
                  }
                })
              }
              return(
                <Row className="my-1">
                  <Col xs="4">
                      <img src={val.sampul} height="100px" width="auto" objectFit="cover" alt="rekomendasi-img"/>
                  </Col>
                  <Col xs="8">
                      <p>{val.judul}</p>
                      <p className="font-italic font-weight-light">{val.kategori} | {val.genre} </p>
                      <Badge style={{backgroundColor: "#090c4a"}}>Tersedia: {jmlTersedia}</Badge>
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