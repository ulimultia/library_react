import React from "react";
import axios from "axios";
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
// reactstrap components
import {
  Card,CardBody,
  FormGroup,Label,Input,
  Row,Col,
} from "reactstrap";
import DetailBukuModal from "../../components/DetailBukuModal/index"
import CardRekomendasi from "../../components/CardRekomendasi/index"
import CardFooter from "reactstrap/lib/CardFooter";
import { data } from "jquery";
// import data from "../../assets/data/Catalog.json" untuk cek link hehehe

class Catalog extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      cari: "",
      kategori: "",
      genre: "",
      sort: "",
      catalogs: [],
      newBooks: [],
      hotBooks: [],
      categories: [],
      genres: [],
      selectedKategori: true,
      selectedGenre: true,
      selectedSort: true,
      offset: 0,
      perPage: 6,
      currentPage: 0,
    }
    this.handlePageClick = this
            .handlePageClick
            .bind(this);
  }

  componentDidMount(){
    //panggil fungsi getAllCatalog diawal
    this.getAllCatalog();
    this.getNewBooks();
    this.getHotBooks();
    this.getAllKategori();
    this.getAllGenre();
  }

  // mengambil semua buku yang belum dihapus
  getAllCatalog = () => {
    axios.get('http://localhost:8080/api/v1/user/buku/all')
    .then((response) => {
        const tempData = response.data.data
        const slice = tempData.slice(this.state.offset, this.state.offset + this.state.perPage)
        const postData = slice.map(val => 
        <React.Fragment>
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
                            dataBuku = {val}
                            buttonLabel = "Detail"
                            className ="modal-lg"
                          /> 
                        </CardFooter>
                      </Card>
                    </Col>
        </React.Fragment>)

        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
          
            postData
        })
        this.setState({
            catalogs: response.data.data,
        })
    })
  }
  // mengambil data buku terbaru
  getNewBooks = () => {
    axios.get('http://localhost:8080/api/v1/user/buku/terbaru')
    .then((response) => {
        this.setState({
            newBooks: response.data.data
        })
    })
  }
  // mengambil data buku terpopuler 
  getHotBooks = () => {
    axios.get('http://localhost:8080/api/v1/user/buku/terpopuler')
    .then((response) => {
        this.setState({
            hotBooks: response.data.data
        })
    })
  }
  //  ambil data kategori untuk filter
  getAllKategori = () => {
    axios.get('http://localhost:8080/api/v1/kategori/all')
    .then((response) => {
        this.setState({
            categories: response.data.data
        })
    })
  }
  //  ambil data genre untuk filter
  getAllGenre = () => {
    axios.get('http://localhost:8080/api/v1/genre/all')
    .then((response) => {
        this.setState({
            genres: response.data.data
        })
    })
  }
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
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
        currentPage: selectedPage,
        offset: offset
    }, () => {
        this.getAllCatalog();
    });

  };

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
    const { cari, kategori, genre, catalogs, newBooks, hotBooks, categories, genres }= this.state
    const cariData = catalogs.filter(value => {
      if(kategori!== "") return value.kategori.toLocaleLowerCase().includes(kategori.toLocaleLowerCase())
      else if (genre !== "") return value.genre.toLocaleLowerCase().includes(genre.toLocaleLowerCase())
      else if (cari!==""){
        if(value.judul.toLocaleLowerCase().includes(cari.toLocaleLowerCase()) || value.pengarang.toLocaleLowerCase().includes(cari.toLocaleLowerCase()))
        return catalogs
      }
      else return catalogs
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
                      {categories.map(value => {
                        return(
                          <option value={value.namaKategori}>{value.namaKategori}</option>
                        )
                      })}
                    </Input>
                  </FormGroup>
                </Col>
                <Col xs="12" sm="3">
                  <FormGroup>
                    <Label for="genre_filter">Filter Genre</Label>
                    <Input type="select" name="genre_filter" id="genre_filter" onChange={this.handleGenre}>
                      <option value="" selected={this.state.selectedGenre}>Semua Genre</option>
                      {genres.map(value => {
                        return(
                          <option value={value.namaGenre}>{value.namaGenre}</option>
                        )
                      })}
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
                            dataBuku = {val}
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
              {/* <hr></hr>
              {this.state.postData}
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/> */}
            </Col>
            <Col xs="12" sm="4">
              {/* <Card className="card-stats">
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
              </Card> */}
              <CardRekomendasi jenisRekomendasi = "Buku Terpopuler" data={hotBooks}/>
              <CardRekomendasi jenisRekomendasi = "Buku Terbaru" data={newBooks}/>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Catalog;
