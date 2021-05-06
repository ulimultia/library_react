import React from 'react';
import { Badge, Card, CardBody, CardFooter } from 'reactstrap';
import DetailSewaModal from "../../components/DetailSewaModal/index"

const CardSedangDipinjam = (props) => {
    const { dataBuku } = props
    // console.log(dataBuku);
    const handleTgl = (tgl) => {
        if(tgl === null) return "-";
        else return new Intl.DateTimeFormat('en-GB', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(new Date(tgl))
    }
    const handleExp = (tglBatas) => {
        let tempBatas = new Date(tglBatas)
        let nowDate = new Date()
        if(nowDate.getDate() > tempBatas.getDate()){
            return(
                <Badge style={{backgroundColor: "red"}}>Kadaluardasa</Badge>
            )
        }
        else return (
            <Badge style={{backgroundColor: "green"}}>Masih Berlaku</Badge>
        )

    }
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
                <img src={"http://localhost:8080/api/v1/files/downloadsampul/" + dataBuku.kodeBuku.buku.sampul} alt="sampulBuku" className="card-img-top catalog-img "/>
                <CardBody>
                    {/* <a type="button" data-toggle="modal" data-target="#"> */}
                    <p><b>{cutTitle(dataBuku.kodeBuku.buku.judul)}</b></p>
                    <p className="description text-end">
                        <Badge color="warning">Disewa</Badge>  {handleExp(dataBuku.batasPinjam)}
                        <br></br><span className="font-weight-light"><i className="fas fa-calendar-plus text-success"></i> {handleTgl(dataBuku.tanggalPinjam)} </span>
                        <br></br><span className="font-weight-light"><i className="fas fa-calendar-times text-danger"></i> {handleTgl(dataBuku.batasPinjam)} </span>
                        {/* <br></br><strong>Denda: Rp harga,-</strong>  */}
                        </p>
                    {/* </a>   */}
                </CardBody>
                <CardFooter>
                    <DetailSewaModal 
                        dataBuku = {dataBuku}
                        buttonLabel = "Detail"
                        className ="modal-lg"
                    /> 
                </CardFooter>
            </Card>
        </div>
    );
}

export default CardSedangDipinjam;