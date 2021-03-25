import React from 'react';
import { Col, Row, Card, CardTitle, CardBody, CardFooter } from 'reactstrap';

const WidgetDashboard = (props) => {
  const { icon, kategori, info, footer} = props;

  return (
    <div>
        <Card className="card-stats">
            <CardBody>
                <Row>
                <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                    {/* <i className="nc-icon nc-money-coins"  style={{color:"#825e40"}}/> */}
                    <i className={icon}  style={{color:"#825e40"}}/>
                    </div>
                </Col>
                <Col md="8" xs="7">
                    <div className="numbers">
                    <p className="card-category">{kategori}</p>
                    <CardTitle tag="p">{info}</CardTitle>
                    <p />
                    </div>
                </Col>
                </Row>
            </CardBody>
            <CardFooter>
                <hr />
                <div className="stats">{footer}</div>
            </CardFooter>
        </Card>
    </div>
  );
}

export default WidgetDashboard;


