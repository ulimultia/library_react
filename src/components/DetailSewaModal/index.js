
import React, { useState } from 'react';
import { Col, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const DetailSewaModal = (props) => {
  const { id, kode, judul, kategori, genre, isbn, harga, pengarang, penerbit, tanggal_terbit, halaman, jumlah, lokasi, deskripsi, sampul, buttonLabel, className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="info" onClick={toggle} className="btn-block btn-sm"><i className="fas fa-info-circle"> </i>  {buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle} style={{backgroundImage: "linear-gradient(to bottom right, #23150d,#845f3e)", color: "#ffffff"}}>Detail Buku</ModalHeader>
        <ModalBody>
          <Row>
              <Col xs="12" sm ="4">
                <img src={sampul} alt="" className="catalog-img-modal"/>
              </Col>
              <Col xs="12" sm ="8" className="mt-4">
                <h3>{judul}</h3>
                <p class="text-secondary font-italic">
                    {kategori} | {genre}
                    <br></br>Didonasikan Oleh: - 
                </p>
                <hr></hr>
                <Row>
                    <Col xs="12" sm="8">
                        <p> <i class="fas fa-user fa-sm"></i> {pengarang}</p>
                        <p><i class="fas fa-calendar-alt fa-sm"></i> {tanggal_terbit}</p>
                        <p><i class="fas fa-building fa-sm"></i> {penerbit}</p>
                        <p> <i class="fas fa-barcode fa-sm"></i> {isbn} </p>
                    </Col>
                    <Col xs="12" sm="4">
                        <p> <i class="fas fa-file fa-sm"></i> Halaman: {halaman} </p>
                        <p> <i class="fas fa-map-marker-alt fa-sm"></i> Lokasi: {lokasi} </p>
                        <p> <i class="fas fa-book-open fa-sm"></i> Tersedia: {jumlah} buah</p>
                        <p> <i class="fas fa-coins fa-sm"></i>Rp {harga},-/minggu </p>
                    </Col>
                </Row>
              </Col><br></br>
              <Col xs="12"className="mt-4 mb-3">
                <h5><b>Deskripsi:</b> </h5>
                <p class="text-justify" style={{lineHeight: 'normal'}}>{deskripsi}</p>
              </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Tutup</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default DetailSewaModal;