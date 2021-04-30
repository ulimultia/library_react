
import React, { useState } from 'react';
import { Col, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const DetailSewaModal = (props) => {
  const { dataBuku, buttonLabel, className } = props;
  console.log(dataBuku.kodeBuku.buku.sampul);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleTgl = (tgl) => {
    if(tgl === null) return "-";
    else return new Intl.DateTimeFormat('en-GB', {dateStyle: 'full'}).format(new Date(tgl))
}
  return (
    <div>
      <Button color="info" onClick={toggle} className="btn-block btn-sm"><i className="fas fa-info-circle"> </i>  {buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle} style={{backgroundImage: "linear-gradient(to bottom right, #23150d,#845f3e)", color: "#ffffff"}}>Detail Buku</ModalHeader>
        <ModalBody className="mx-4">
          <Row>
              <Col xs="12" sm ="4" className="my-4">
                <img src={dataBuku.kodeBuku.buku.sampul} alt="" className="catalog-img-modal"/>
              </Col>
              <Col xs="12" sm ="8" className="mt-4">
                <h3>{dataBuku.kodeBuku.buku.judul}</h3>
                <p class="text-secondary font-italic">
                    {dataBuku.kodeBuku.buku.kategori.namaKategori} | {dataBuku.kodeBuku.buku.genre.namaGenre}
                    {/* <br></br>Didonasikan Oleh: -  */}
                </p>
                <hr></hr>
                <Row>
                    <Col xs="12" sm="7">
                        <p> <i class="fas fa-user fa-sm"></i> {dataBuku.kodeBuku.buku.pengarang}</p>
                        <p><i class="fas fa-calendar-alt fa-sm"></i> {dataBuku.kodeBuku.buku.tahunTerbit}</p>
                        <p><i class="fas fa-building fa-sm"></i> {dataBuku.kodeBuku.buku.penerbit.namaPenerbit}</p>
                    </Col>
                    <Col xs="12" sm="5">
                        <p> <i class="fas fa-barcode fa-sm"></i> {dataBuku.kodeBuku.buku.isbn} </p>
                        {/* <p> <i class="fas fa-file fa-sm"></i> Halaman: {dataBuku.kodeBuku.buku.halaman} </p> */}
                        <p> <i class="fas fa-map-marker-alt fa-sm"></i> Lokasi: {dataBuku.kodeBuku.buku.lokasi.kodeLokasi} </p>
                        {/* <p> <i class="fas fa-book-open fa-sm"></i> Tersedia: {dataBuku.kodeBuku.buku.jumlah} buah</p> */}
                        <p> <i class="fas fa-coins fa-sm"></i>Rp {dataBuku.kodeBuku.buku.harga},-/minggu </p>
                    </Col>
                </Row><br></br>
                <hr></hr>
                <Row>
                  <Col>
                  <p> 
                    <Row>
                      <Col xs="5">
                        <i class="fas fa-calendar-plus"></i>Tanggal Pinjam
                      </Col>
                      <Col xs="1">
                        :
                      </Col>
                      <Col xs="6">
                      {handleTgl(dataBuku.tanggalPinjam)} 
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="5">
                        <i class="fas fa-calendar-times"></i>Batas Pengembalian
                      </Col>
                      <Col xs="1">
                        :
                      </Col>
                      <Col xs="6">
                      {handleTgl(dataBuku.batasPinjam)}
                      </Col>
                    </Row>
                  </p>
                  </Col>
                </Row>
              </Col><br></br>
              <Col xs="12"className="mt-4 mb-3">
                <h5><b>Deskripsi:</b> </h5>
                <p class="text-justify" style={{lineHeight: 'normal'}}>{dataBuku.kodeBuku.buku.deskripsi}</p>
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