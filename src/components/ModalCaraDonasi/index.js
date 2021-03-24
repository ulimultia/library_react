
import React, { useState } from 'react';
import { Col, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalCaraDonasi = (props) => {
  const { id, kode, judul, kategori, genre, isbn, harga, pengarang, penerbit, tanggal_terbit, halaman, jumlah, lokasi, deskripsi, sampul, className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="default" round outline onClick={toggle} className="btn-block btn-sm"><i className="fas fa-info-circle"> </i>  Lihat Cara Berdonasi</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Detail Buku</ModalHeader>
        <ModalBody>
        <ol>
            <li className="text-justify font-weight-lighter">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem, laborum, sed ex, eveniet ratione iste fugit quos est provident praesentium magnam voluptatem fuga autem! Sequi, possimus.
                Architecto ipsa doloremque quos!</li>
            <li className="text-justify font-weight-lighter">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae, odit dolorem. Quidem natus, sit deserunt quas suscipit recusandae, excepturi tempore tenetur voluptatum animi, voluptas repudiandae
                iste assumenda ipsam? Veritatis, cupiditate.</li>
            <li className="text-justify font-weight-lighter">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil velit tempora, ullam reiciendis recusandae, saepe exercitationem cupiditate, accusamus placeat libero assumenda itaque vitae vel debitis
                possimus illo ea dolores maiores!</li>
            <li className="text-justify font-weight-lighter">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae inventore accusantium ab id dignissimos esse, soluta sed possimus. Nam nulla magnam similique est. Voluptatibus aliquam harum doloribus,
                similique repellendus atque?</li>
        </ol>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Tutup</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalCaraDonasi;