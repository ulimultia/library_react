import React from 'react';
import { Card,CardTitle, CardText, CardImgOverlay, CardImg } from "reactstrap";
import Detail from "components/DetailBukuModal"

const BukuRekomendasi = (props) => {
  const { dataBuku} = props;

   //fungsi yang digunakan untuk memotong judul yang terlalu panjang
   const cutTitle = (judul) => {
    if(judul.length > 40){
          return judul.slice(0,40) + " ...."
        }
        else{
          return judul
        }
  }

  return (
    <div>
        <Card className="bg-dark text-white book-recomendation">
            <CardImg src={"http://localhost:8080/api/v1/files/downloadsampul/" + dataBuku.sampul} alt="..." style={{opacity:"0.5"}} className="img-recomendation"/>
            {/* <CardImg src="https://images.wallpaperscraft.com/image/book_bouquet_cup_147482_3840x2160.jpg" alt="..." style={{opacity:"0.2"}} className="img-recomendation"/> */}
            <CardImgOverlay>
                <CardTitle><h5><b>{cutTitle(dataBuku.judul)}</b></h5></CardTitle>
                <CardText>{dataBuku.kategori} | {dataBuku.genre}</CardText>
                <Detail 
                            dataBuku = {dataBuku}
                            buttonLabel = "Detail"
                            className ="modal-lg"
                          /> 
            </CardImgOverlay>
        </Card>
    </div>
  );
}

export default BukuRekomendasi;


