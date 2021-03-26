import React from "react";
import axios from "axios";
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
      cari: "",
      kategori: "",
      genre: "",
      sort: "",
      selectedKategori: true,
      selectedGenre: true,
      selectedSort: true,
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
  handleSearch = (event) => {
    this.setState({
      cari: event.target.value,
      kategori: "",
      genre: "",
      sort: "",
      selectedKategori: true,
      selectedGenre: true,
      selectedSort: true
    })
  }
  handleKategori = (event) => {
    this.setState({
      kategori: event.target.value,
      cari: "",
      genre: "",
      sort: "",
      selectedKategori: false,
      selectedGenre: true,
      selectedSort: true
    })
  }
  handleGenre = (event) => {
    this.setState({
      genre: event.target.value,
      kategori: "",
      cari: "",
      sort: "",
      selectedKategori: true,
      selectedGenre: false,
      selectedSort: true
    })
  }
  // onChangeSort = (event) => {
  //   this.setState({
  //     sort: event.targt.value,
  //     genre: "",
  //     cari: "",
  //     kategori: "",
  //     selectedSort: false,
  //     selectedKategori: true,
  //     selectedGenre: true
  //   })
  // }

  render() {
    // const {data} = this.state;
    const { cari, kategori, genre }= this.state
    const cariData = CatalogJs.filter(value => {
      if(kategori!== "") return value.kategori.toLocaleLowerCase().includes(kategori.toLocaleLowerCase())
      else if (genre !== "") return value.genre.toLocaleLowerCase().includes(genre.toLocaleLowerCase())
      else if (cari!==""){
        if(value.judul.toLocaleLowerCase().includes(cari.toLocaleLowerCase()) || value.pengarang.toLocaleLowerCase().includes(cari.toLocaleLowerCase()))
        return CatalogJs
      }
      else return CatalogJs
    })
    
    // const kategoriData = CatalogJs.filter(value => {
    //  return value.kategori.toLocaleLowerCase().includes(kategori.toLocaleLowerCase())
    // })
    // const genreData = CatalogJs.filter(value => {
    //  return value.genre.toLocaleLowerCase().includes(genre.toLocaleLowerCase())
    // })

    return (
      <>
        <div className="content">
          <Row>
            <Col xs="12" sm="8">
              <Row>
                <Col xs="12" sm="3">
                  <FormGroup>
                    <Label for="kategori_filter">Filter Kategori</Label>
                    <Input type="select" name="kategori_filter" id="kategori_filter" onChange={this.handleKategori}>
                      <option value="" selected={this.state.selectedKategori}>Semua Kategori</option>
                      <option value="Buku">Buku</option>
                      <option value="Novel">Novel</option>
                      <option value="Komik">Komik</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col xs="12" sm="3">
                  <FormGroup>
                    <Label for="genre_filter">Filter Genre</Label>
                    <Input type="select" name="genre_filter" id="genre_filter" onChange={this.handleGenre}>
                      <option value="" selected={this.state.selectedGenre}>Semua Genre</option>
                      <option value="Aksi">Aksi</option>
                      <option value="Romantis">Romantis</option>
                      <option value="Kuliner">Kuliner</option>
                      <option value="Sains">Sains</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col xs="12" sm="3" className="mb-3">
                  <FormGroup>
                    <Label for="sorting">Urutkan </Label>
                    <Input type="select" name="sorting" id="sorting" 
                    >
                      <option value="0">Default</option>
                      <option value="1">A-Z</option>
                      <option value="2">Z-A</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col xs="12" sm="3">
                  <FormGroup>
                      <Label for="search-input">Cari</Label>
                    <Input type="text" name="search-input" id="search-input" placeholder="Judul ..."
                    onChange={this.handleSearch}/>
                  </FormGroup>
                </Col>
                { cariData.map((val)=> {
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
                })
              }
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
