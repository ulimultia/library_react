import React from 'react';
import { Card,CardTitle, CardText, CardImgOverlay, CardImg } from "reactstrap";
import Detail from "components/DetailBukuModal"

const BukuRekomendasi = (props) => {
  const { id, kode,judul_cut, judul, kategori, genre, isbn, harga, pengarang, penerbit, tanggal_terbit, halaman, jumlah, lokasi, deskripsi, sampul} = props;
  return (
    <div>
        <Card className="bg-dark text-white book-recomendation">
            <CardImg src={sampul} alt="..." style={{opacity:"0.5"}} className="img-recomendation"/>
            {/* <CardImg src="https://images.wallpaperscraft.com/image/book_bouquet_cup_147482_3840x2160.jpg" alt="..." style={{opacity:"0.2"}} className="img-recomendation"/> */}
            <CardImgOverlay>
                <CardTitle><h5><b>{judul_cut}</b></h5></CardTitle>
                <CardText>{kategori} | {genre}</CardText>
                <Detail 
                            id = {id}
                            kode = {kode}
                            judul = {judul}
                            kategori = {kategori}
                            genre = {genre}
                            isbn = {isbn}
                            harga = {harga}
                            pengarang = {pengarang}
                            penerbit = {penerbit}
                            tanggal_terbit = {tanggal_terbit }
                            halaman = {halaman}
                            jumlah = {jumlah}
                            lokasi = {lokasi}
                            deskripsi = {deskripsi}
                            sampul = {sampul}
                            buttonLabel = "Detail"
                            className ="modal-lg"
                          /> 
            </CardImgOverlay>
        </Card>
    </div>
  );
}

export default BukuRekomendasi;


