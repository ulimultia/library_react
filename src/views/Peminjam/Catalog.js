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
      sort: "0",
      catalogs: [],
      newBooks: [],
      hotBooks: [],
      categories: [],
      genres: [],
      selectedKategori: true,
      selectedGenre: true,
      selectedSort: true,
      currentPage: 0,
      offset: 0,
      dataPerPage : 9,
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
        this.setState({
            catalogs: response.data.data,
            pagesCount: Math.ceil(response.data.data.length / this.state.dataPerPage),
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
  handleSort = (event) => {
    this.setState({
      sort: event.target.value,
      selectedSort: false
    })
  }
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offsetTemp = selectedPage * this.state.dataPerPage;
    this.setState({
      currentPage: selectedPage,
      offset: offsetTemp
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
    const { cari, kategori, genre, catalogs, newBooks, hotBooks, categories, genres }= this.state
    const cariData = 
      catalogs.filter(value => {
        if(kategori!== "") return value.kategori.toLocaleLowerCase().includes(kategori.toLocaleLowerCase())
        else if (genre !== "") return value.genre.toLocaleLowerCase().includes(genre.toLocaleLowerCase())
        else if (cari!==""){
          if(value.judul.toLocaleLowerCase().includes(cari.toLocaleLowerCase()) || value.pengarang.toLocaleLowerCase().includes(cari.toLocaleLowerCase()))
          return catalogs
        }
        else return catalogs
      })
      .sort((a,b) => {
        const aTemp = a.judul.toUpperCase()
        const bTemp = b.judul.toUpperCase()
        const idA = a.id
        const idB = b.id

        if (this.state.sort === "") {
          let comp = 0
          if(idA > idB) comp = 1
          else if(idA < idB) comp = -1
          return comp
        } else if(this.state.sort === "1") {
          let comp = 0
          if(aTemp > bTemp) comp = 1
          else if(aTemp < bTemp) comp = -1
          return comp
        }
        else if(this.state.sort === "2"){
          let comp = 0
          if(aTemp < bTemp) comp = 1
          else if(aTemp > bTemp) comp = -1
          return comp
        }
      })
      .slice(this.state.offset, this.state.offset + this.state.dataPerPage)

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
                    <Input type="select" name="sorting" id="sorting" onChange={this.handleSort} >
                      <option value="" selected={this.state.selectedSort}>Default</option>
                      <option value="1" >A-Z</option>
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
              <Row className="text-right">
                <Col>
                  <ReactPaginate
                      previousLabel={"Sebelum"}
                      nextLabel={"Setelah"}
                      breakLabel={"..."}
                      breakClassName={"break-me"}
                      pageCount={this.state.pagesCount}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={25}
                      onPageChange={this.handlePageClick}
                      containerClassName={"pagination"}
                      subContainerClassName={"pages pagination"}
                      activeClassName={"active"}/>
                </Col>
              </Row>
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
