import React from "react";
import { Card, CardBody, Row, Col, Container } from "reactstrap";

class Profile extends React.Component {
  render() {
    return (
      <>
        <div className="content">
          <Container>
            <Row>
              <Col xs="12" md="6">
                <div className="info-box mb-3">
                  <span
                    className="info-box-icon elevation-1"
                    style={{
                      background: "linear-gradient(to left, #44a08d, #093637)",
                    }}
                  >
                    <div></div>
                    <i className="fas fa-venus-mars text-light"></i>
                  </span>
                  <div className="info-box-content">
                    <span className="info-box-text">Jenis Kelamin</span>
                    <span className="info-box-number">Laki-laki</span>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default Profile;
