
import React from 'react';
import { Badge, Card, CardBody, CardFooter } from 'reactstrap';
import DetailSewaModal from "../../components/DetailSewaModal/index"

const CardSedangDipinjam = () => {
//   const {
    //    id, kode, judul, kategori, genre, isbn, harga, pengarang, penerbit, tanggal_terbit, halaman, jumlah, lokasi, deskripsi, sampul 
    // } = props;

  return (
    <div>
        <Card className="catalog-book">
            <img src="https://upload.wikimedia.org/wikipedia/id/c/c8/Doraemon_volume_1_cover.jpg" alt="disewa-img" className="card-img-top catalog-img "/>
            <CardBody>
                {/* <a type="button" data-toggle="modal" data-target="#"> */}
                <p><b>judul</b></p>
                <p className="description text-end">
                    <Badge color="warning">Disewa</Badge>  <Badge style={{backgroundColor: "red"}}>Kadaluardasa</Badge>
                    <br></br><span className="font-weight-light"><i className="fas fa-calendar-plus text-success"></i> dd/mm/yyyy </span>
                    <br></br><span className="font-weight-light"><i className="fas fa-calendar-times text-danger"></i> dd/mm/yyyy </span>
                    <br></br><strong>Denda: Rp harga,-</strong> 
                    </p>
                {/* </a>   */}
            </CardBody>
            <CardFooter>
                <DetailSewaModal 
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

export default CardSedangDipinjam;