
import React, { useState } from 'react';
import { Col, Row, Button, Badge, Card, CardHeader, CardTitle, CardBody, CardFooter } from 'reactstrap';
import DetailBukuModal from "../../components/DetailBukuModal/index"

const CardDonasi = (props) => {
  const { id, kode, judul, kategori, genre, isbn, harga, pengarang, penerbit, tanggal_terbit, halaman, jumlah, lokasi, deskripsi, sampul } = props;

  return (
    <div>
        <Card className="catalog-book">
            <img src="https://upload.wikimedia.org/wikipedia/id/c/c8/Doraemon_volume_1_cover.jpg" alt=" " className="card-img-top catalog-img "/>
            <CardBody>
                <a type="button" data-toggle="modal" data-target="#">
                <p><b>judul</b></p>
                <p className="description text-end">
                    <Badge style={{backgroundColor: "#f5007f"}}>Didonasikan</Badge>
                    <br></br><span className="font-weight-light"><i className="fas fa-calendar-alt"></i> dd/mm/yyyy </span>
                    </p>
                </a>  
            </CardBody>
            <CardFooter>
                <DetailBukuModal 
                // id = {val.id}
                // kode = {val.kode}
                // judul = {val.judul}
                // kategori = {val.kategori}
                // genre = {val.genre}
                // isbn = {val.isbn}
                // harga = {val.harga}
                // pengarang = {val.pengarang}
                // penerbit = {val.penerbit}
                // tanggal_terbit = {val.tanggal_terbit }
                // halaman = {val.halaman}
                // jumlah = {val.jumlah}
                // lokasi = {val.lokasi}
                // deskripsi = {val.deskripsi}
                // sampul = {val.sampul}
                buttonLabel = "Detail"
                className ="modal-lg"
                /> 
            </CardFooter>
        </Card>
    </div>
  );
}

export default CardDonasi;