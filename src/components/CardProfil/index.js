import React, { useState } from 'react';
import { Col, Row, Button, Badge, Card, CardHeader, CardTitle, CardBody, CardFooter } from 'reactstrap';

const CardProfil = (props) => {
  const { foto, nama, role, saldo, donasi, denda } = props;

  return (
    <div>
        <Card className="card-user">
            <div className="image" style={{height: "200px"}}>
                <img
                alt=""
                src="https://images.wallpaperscraft.com/image/book_bouquet_cup_147482_3840x2160.jpg"
                style={{ backgroundPositionX: "80%", objectFit: "cover"}}
                />
            </div>
            <CardBody>
                <div className="author mb-4">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                        alt=""
                        className="avatar border-gray"
                        src={ foto }
                        />
                        <h5 className="title" style={{color: "#845f3e"}}> { nama }</h5>
                    </a>
                    <p className="description">{ role }<br></br>
                        <Button round outline color="default" className="btn-sm"><i className="fas fa-pen-alt fa-xs"></i> Edit Profil</Button>
                        <Button round outline color="default" className="btn-sm"><i className="fas fa-key fa-xs"></i> Ganti Password</Button>
                    </p>
                </div>
                <hr />
                <div className="button-container">
                    <Row>
                        <Col xs="12" sm="4" className="ml-auto" >
                        <h5>
                            Rp {saldo},- <br />
                            <small>SALDO</small>
                        </h5>
                        </Col>
                        <Col  xs="12" sm="4" className="ml-auto mr-auto" >
                        <h5>
                            Rp {denda},- <br />
                            <small>DENDA</small>
                        </h5>
                        </Col>
                        <Col  xs="12" sm="4" className="mr-auto">
                        <h5>
                            {donasi} <br />
                            <small>DONASI</small>
                        </h5>
                        </Col>
                    </Row>
                </div>
                {/* <p className="description text-center">
                "I like the way you work it <br />
                No diggity <br />I wanna bag it up"
                </p> */}
            </CardBody>
        </Card>
    </div>
  );
}

export default CardProfil;
