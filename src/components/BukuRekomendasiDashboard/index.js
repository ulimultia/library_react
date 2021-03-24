import React, { useState } from 'react';
import {
    Card,CardHeader,CardBody,CardFooter,CardTitle, CardText, CardImgOverlay, CardImg,
    Row,Col,
  } from "reactstrap";

const BukuRekomendasi = (props) => {
  const { image, judul, kategori, genre} = props;

  return (
    <div>
        <Card className="bg-dark text-white book-recomendation">
            <CardImg src={image} alt="..." style={{opacity:"0.5"}} className="img-recomendation"/>
            {/* <CardImg src="https://images.wallpaperscraft.com/image/book_bouquet_cup_147482_3840x2160.jpg" alt="..." style={{opacity:"0.2"}} className="img-recomendation"/> */}
            <CardImgOverlay>
                <CardTitle><h5><b>{judul}</b></h5></CardTitle>
                <CardText>{kategori} | {genre}</CardText>
            </CardImgOverlay>
        </Card>
    </div>
  );
}

export default BukuRekomendasi;


