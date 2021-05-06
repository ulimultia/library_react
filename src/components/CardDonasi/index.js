import React from 'react';
import { Badge, Card, CardBody, CardFooter } from 'reactstrap';
import DetailBukuModal from "../../components/DetailBukuModal/index"

const CardDonasi = (props) => {
  const { dataBuku } = props;
  // console.log(dataBuku);
  // console.log(dataBuku.kodeBuku[0].createdAt);
   //fungsi yang digunakan untuk memotong judul yang terlalu panjang
  const cutTitle = (judul) => {
    if(judul.length > 19){
      return judul.slice(0,19) + " ...."
    }
    else{
      return judul
    }
  } 

  return (
    <div>
        <Card className="catalog-book">
            <img src={"http://localhost:8080/api/v1/files/downloadsampul/" + dataBuku.sampul} alt=" " className="card-img-top catalog-img "/>
            <CardBody>
                {/* <a type="button" data-toggle="modal" data-target="#"> */}
                <p><b>{cutTitle(dataBuku.judul)}</b></p>
                <p className="description text-end">
                    <Badge style={{backgroundColor: "#f5007f"}}>Didonasikan</Badge>
                    <br></br><span className="font-weight-light"><i className="fas fa-calendar-alt"></i> { new Intl.DateTimeFormat('en-GB', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(new Date(dataBuku.kodeBuku[0].createdAt))} </span>
                    <br></br><span className="font-weight-light"><i className="fas fa-barcode"></i> { dataBuku.kodeBuku[0].kodeBuku} </span>
                </p>
                {/* </a>   */}
            </CardBody>
            <CardFooter>
                <DetailBukuModal 
                  dataBuku = {dataBuku}
                  buttonLabel = "Detail"
                  className ="modal-lg"
                /> 
            </CardFooter>
        </Card>
    </div>
  );
}

export default CardDonasi;