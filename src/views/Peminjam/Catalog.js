import React from "react";
// import axios from "axios";
// reactstrap components
import {
  Card,CardBody,
  FormGroup,Label,Input,
  Row,Col,
} from "reactstrap";
import DetailBukuModal from "../../components/DetailBukuModal/index"
import CardRekomendasi from "../../components/CardRekomendasi/index"
import CatalogJs from "../../assets/data/datacatalog"
import TerbaruJs from "../../assets/data/dataterbaru"
import TerpopulerJs from "../../assets/data/dataterpopuler"
import CardFooter from "reactstrap/lib/CardFooter";
// import data from "../../assets/data/Catalog.json" untuk cek link hehehe

class Catalog extends React.Component {
  constructor(){
    super()
    this.state = {
      // data: []
    }
  }

  componentDidMount(){
    //panggil fungsi getAllCatalog diawal
    // this.getAllCatalog();
  }

  // mengambil data json dengan axios
  // getAllCatalog = () => {
  //   fetch('.././../assets/data/datacatalog.json')
  //   .then(res => {
  //     console.log(res);
  //     return res.json()
  //   })
  //   .then(datajson => {
  //     this.setState({ data: datajson })
  //   // axios.get("https://jsonplaceholder.typicode.com/users")
  //   // .then(res=> { 
  //   //   console.log("res: ", res);
  //   //   // this.setState({
  //   //   //   data: res.data
  //   //   // })
  //   // })
  //   })
  //   console.log(this.state.data);
  // }

  render() {
    // const {data} = this.state;

    return (
      <>
        <div className="content">
          <Row>
            <Col xs="12" sm="8">
              <Row>
              <Col xs="12" sm="4">
                <FormGroup>
                  <Label for="inputState">Filter Kategori</Label>
                  <Input type="select" name="select" id="inputState" >
                    <option>Semua Kategori</option>
                    <option value="1">Buku</option>
                    <option value="2">Novel</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col xs="12" sm="4">
                <FormGroup>
                  <Label for="inputState">Filter Genre</Label>
                  <Input type="select" name="select" id="inputState" >
                    <option>Semua Kategori</option>
                    <option value="1">Buku</option>
                    <option value="2">Novel</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col xs="12" sm="4" className="mb-3">
                <FormGroup>
                  <Label for="inputState">Urutkan </Label>
                  <Input type="select" name="select" id="inputState" >
                    <option>Semua Kategori</option>
                    <option value="1">Buku</option>
                    <option value="2">Novel</option>
                  </Input>
                </FormGroup>
              </Col>
                { CatalogJs.map((val)=> {
                  return (
                    <Col xs="6" sm="4" className="catalog-book">      
                      <Card className="card-stats">
                        {/* <a type="button" data-toggle="modal" data-target="#"> */}
                          <img src={val.sampul} alt=" " className="card-img-top catalog-img "/>
                        {/* </a>  */}
                        <CardBody>
                          <a type="button" data-toggle="modal" data-target="#">
                            <p><b>{val.judul}</b></p>
                            <p className="description text-end">
                                <span class="font-italic font-weight-lighter">{val.kategori} | {val.genre}</span>
                                <br></br><span class="text-success"> Tersedia: {val.jumlah} </span>
                                <br></br><strong>Rp {val.harga},-/minggu</strong> 
                              </p>
                          </a>  
                        </CardBody>
                        <CardFooter>
                          <DetailBukuModal 
                            id = {val.id}
                            kode = {val.kode}
                            judul = {val.judul}
                            kategori = {val.kategori}
                            genre = {val.genre}
                            isbn = {val.isbn}
                            harga = {val.harga}
                            pengarang = {val.pengarang}
                            penerbit = {val.penerbit}
                            tanggal_terbit = {val.tanggal_terbit }
                            halaman = {val.halaman}
                            jumlah = {val.jumlah}
                            lokasi = {val.lokasi}
                            deskripsi = {val.deskripsi}
                            sampul = {val.sampul}
                            buttonLabel = "Detail"
                            className ="modal-lg"
                          /> 
                        </CardFooter>
                      </Card>
                    </Col>
                  )
                })}
              </Row>
            </Col>
            <Col xs="12" sm="4">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-money-coins text-success" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Saldo</p>
                        <b>Rp 123.904,-</b>
                        <p/>
                      </div>
                    </Col>
                  </Row>
                  <hr></hr>
                  <Row className="mb-3">
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-bell-55 text-danger" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Denda</p>
                        <b>Rp 11.500,-</b>
                        <p/>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              <CardRekomendasi jenisRekomendasi = "Buku Terpopuler" data={TerpopulerJs}/>
              <CardRekomendasi jenisRekomendasi = "Buku Terbaru" data={TerbaruJs}/>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Catalog;
