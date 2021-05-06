import React, { useState } from 'react';
import { Col, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const DetailBukuModal = (props) => {
  const { 
    dataBuku, buttonLabel, className, colorButton, classButton } = props;
  // console.log(dataBuku)
  let jmlTersedia = 0
  if(dataBuku.kodeBuku !== null){
    dataBuku.kodeBuku.map((value, key) => {
      // menghitung jumlah buku yang tersedia saja 
      if(value.isAvailable === true){
        jmlTersedia++;
      }
    })
  }
  // cari nama donatur dengan id donatur
  // let arrDonatur = []
  // const [namaDonatur, setnamaDonatur] = useState("")
  // if(dataBuku.kodeBuku !== null){
  //   dataBuku.kodeBuku.map((value, key) => {
  //     console.log("id donatur" + value.donatur);
  //     return(
  //       getDonaturDetail(value.donatur),
  //       arrDonatur.push(namaDonatur)
  //     )
  //   })
  // }

  // async function getDonaturDetail(id) {
  //   const response = await axios.get('http://localhost:8080/user/get-detail/' + id);
  //   setnamaDonatur(response.data.nama);
  // }

  const [modal, setModal] = useState(false);
  var warna = "warning"
  if(colorButton != null){
    warna = colorButton
  }
  var classBtn = "btn-block btn-sm"
  if(classButton!=null){
    classBtn = classButton
  }
  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color={warna} onClick={toggle} className={classBtn}><i className="fas fa-info-circle"> </i>  {buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle} style={{backgroundImage: "linear-gradient(to bottom right, #23150d,#845f3e)",color: "#ffffff"}}>Detail Buku</ModalHeader>
        <ModalBody className="mx-4">
          <Row>
              <Col xs="12" sm ="4" className="my-4">
                <img src={dataBuku.sampul} alt="" className="catalog-img-modal"/>
              </Col>
              <Col xs="12" sm ="8" className="mt-4">
                <h3>{dataBuku.judul}</h3>
                <p class="text-secondary font-italic">
                    {dataBuku.kategori} | {dataBuku.genre}
                    {/* <br></br>Didonasikan Oleh: {arrDonatur}  */}
                </p>
                <hr></hr>
                <Row>
                    <Col xs="12" sm="7">
                        <p> <i class="fas fa-user fa-sm"></i> {dataBuku.pengarang}</p>
                        <p><i class="fas fa-calendar-alt fa-sm"></i> {dataBuku.tahun}</p>
                        <p><i class="fas fa-building fa-sm"></i> {dataBuku.penerbit}</p>
                        <p> <i class="fas fa-barcode fa-sm"></i> {dataBuku.isbn} </p>
                    </Col>
                    <Col xs="12" sm="5">
                        {/* <p> <i class="fas fa-file fa-sm"></i> Halaman: {0} </p> */}
                        <p> <i class="fas fa-map-marker-alt fa-sm"></i> Lokasi: {dataBuku.lokasi} </p>
                        <p> <i class="fas fa-book-open fa-sm"></i> Tersedia: {jmlTersedia} buah</p>
                        <p> <i class="fas fa-coins fa-sm"></i>Rp {dataBuku.harga},-/minggu </p>
                    </Col>
                </Row>
              </Col><br></br>
              <Col xs="12"className="mt-4 mb-3">
                <h5><b>Deskripsi:</b> </h5>
                <p class="text-justify" style={{lineHeight: 'normal'}}>{dataBuku.deskripsi}</p>
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

export default DetailBukuModal;