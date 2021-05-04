import React from 'react'
import { MDBDataTableV5} from 'mdbreact';
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {
    Card, CardBody,
    Row, Col, Button, 
    Modal, ModalHeader, ModalBody, ModalFooter,
    FormGroup, Label, Input, FormText
} from "reactstrap";

const MySwal = withReactContent(Swal) 

class KodeBuku extends React.Component {
    constructor(){
        super()
        this.state = {
            dataKodeBuku : [],
            dataDonatur : {},
            donatur: "",
            edDonatur: "",
            modal: false,
            modalEdit: false,
            btn: "",
            temp: "",
            idKodeBuku: 0,
            editUsernameDonatur: "",
            unameHelp: "",
            rowTable: [],
            columnTable: [
                {
                    label: '#',
                    field: 'no',
                    width: 20
                }, 
                {
                    label: 'Sampul',
                    field: 'sampul',
                    width: 100
                }, 
                {
                    label: 'Kode Buku',
                    field: 'kode',
                    width: 100
                }, 
                {
                    label: 'Judul',
                    field: 'judul',
                    width: 300
                }, 
                {
                    label: 'Donatur',
                    field: 'donasi',
                    width: 200
                }, 
                {
                    label: 'Tanggal',
                    field: 'tanggal',
                    width: 100
                }, 
                {
                    label: 'Status',
                    field: 'status',
                    width: 50
                }, 
                {
                    label: 'Aksi',
                    field: 'aksi',
                    width: 50
                }, 
            ],
            data: {}
        }
    }

    async componentDidMount(){
        await this.getAllKodeBuku()
        
    }
    // modal toggle edit
    toggleEdit = (value) => {
        if(this.state.modalEdit === true){
            this.setState({
                modalEdit : false,
                editUsernameDonatur: null,
                idKodeBuku: 0,
                unameHelp: ""
                
            })
        }
        else{
            this.setState({
                modalEdit : true,
                idKodeBuku: value.id,
                editUsernameDonatur: this.handleInputDonatur(value.donatur)
            })
        }
    }
    // handler input
    onChangeInput = (event) =>{
        this.setState({
            [event.target.name]: event.target.value
            // namaKategori: event.target.value,
            // editNamaKategori: event.target.value
        })
    }
    //ganti format tanggal
    handleTgl = (tgl) => {
        if(tgl === null) return "-";
        else return new Intl.DateTimeFormat('en-GB', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(new Date(tgl))
    }
    // status available 
    handleAvailable = (status) => {
        if(status === false) return "Dipinjam"
        else return "Tersedia"
    }
    // handle isi donatur
    handleDonatur = (donatur) => {
        if(donatur === null) return "-"
        else return donatur.username
    }
    handleInputDonatur = (donatur) => {
        if(donatur === null) return null
        else return donatur.username
    }

    getAllKodeBuku = () => {
        axios.get("http://localhost:8080/api/v1/kodebuku/all")
        .then(response => {
            this.setState({
                dataKodeBuku: response.data.data,
            })
            this.state.dataKodeBuku.map((value, key) => {
                return (
                    this.state.rowTable.push({
                        no: key + 1,
                        sampul: <img src={value.buku.sampul} alt="sampulBuku" className="" style={{width: "50px", height: "70px"}}/>,
                        kode: value.kodeBuku,
                        judul: value.buku.judul,
                        tanggal: this.handleTgl(value.createdAt),
                        donasi: this.handleDonatur(value.donatur),
                        status: this.handleAvailable(value.isAvailable),
                        aksi:   <Row>
                                <Col sm="6">
                                    <Button color="success" onClick={()=> this.toggleEdit(value)} className="btn btn-sm"><i className="fas fa-pen-square"> </i></Button>
                                </Col>
                                <Col sm="6">
                                    <Button className="btn btn-sm btn-danger" onClick={() => this.handleDelete(value.id)}><i className="fas fa-trash"></i></Button>
                                </Col>
                                </Row>
                    })
                )
            })
            this.setState({
                data: {
                    columns: [
                        ...this.state.columnTable
                    ],
                    rows: [...this.state.rowTable],
                }
            })
            console.log(this.state.data);
            console.log(this.state.dataKodeBuku);
        })
    }

    submitNow = () => {
        // e.preventDefault();
        const kodeBukuDto = {
            id : this.state.idKodeBuku,
            donatur: {
                username: this.state.editUsernameDonatur
            }
        }
        axios.put("http://localhost:8080/api/v1/kodebuku/edit", kodeBukuDto)
        .then(response => {
            if(response.data.status === 200){
                this.setState({
                    unameHelp: ""
                })
                MySwal.fire({
                    icon: "success",
                    title: "Sukses!!!",
                    text: response.data.message,
                })
                this.toggleEdit();
                this.getAllKodeBuku();
            }
            else{
                this.setState({
                    unameHelp: "Username tidak valid"
                })
                MySwal.fire({
                    icon: "error",
                    title: "Gagal!!!",
                    text: response.data.message,
                })
            }
        })
        .catch(error => {
            MySwal.fire({
                icon: "error",
                title: "Gagal!!!",
                text: error.response.data.message,
            })
        })
    }
    // delete kategori
    handleDelete = (id) => {
        MySwal.fire({
            title: "Anda Yakin?",
            text: "Data yang dihapus tidak dapat dikembalikan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#8c8c8c',
            confirmButtonText: 'Hapus',
            cancelButtonText: 'Batal'
        //   buttons: true,
        //   dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete.isConfirmed) {
                axios.delete('http://localhost:8080/api/v1/kodebuku/delete/' + id)
                .then((response) => {
                    this.setState({
                        categories: [],
                        newCategories: [],
                        data: {}
                    })
                    this.getAllKodeBuku();
                })
                MySwal.fire("Success", "Data berhasil dihapus ...", "success").then(() => {});
            }
        });
    };
    
    render() {
        return (

            <>
            <div className="content">
                <Row>
                    <Col xs="12" sm="12">
                    <Card>
                        <CardBody>
                            {/* <Row>
                                <Col xs="12" sm="12" className = "text-right">
                                    <Button onClick={this.toggle} className="btn btn-sm" style={{backgroundColor: "navy"}}><i className="fas fa-plus"> </i>  Tambah</Button>
                                    <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-sm" id="modalTambah">
                                        <ModalHeader toggle={this.toggle} style={{backgroundImage: "linear-gradient(to left, #44a08d, #093637)",color: "#ffffff"}}>Tambah Kategori Buku</ModalHeader>
                                        <form id="form">
                                        <ModalBody className="mx-4">
                                            <FormGroup>
                                                <Input type="number" name="idKategori" id="idKategori" value={this.state.idKategori} hidden={true}/>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="namaKategori">Kategori</Label>
                                                <Input type="text" name="namaKategori" id="namaKategori" placeholder="Contoh: Buku"
                                                value={this.state.namaKategori}
                                                onChange = {this.onChangeInput}
                                                />
                                                <FormText color="danger">{this.state.kategoriHelp}</FormText>
                                            </FormGroup>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button type="reset" color="secondary" onClick={this.toggle}>Tutup</Button>
                                            <Button  color="info" onClick={this.submitNow}>{this.state.btn}</Button>
                                        </ModalFooter>
                                        </form>
                                    </Modal>
                                </Col>
                            </Row>
                            <hr/> */}
                            <MDBDataTableV5 
                                striped 
                                small
                                hover
                                scrollX 
                                data = {this.state.data}
                                entriesOptions={[10, 20, 25]}
                                entries={10}
                                pagesAmount={4}
                                searchTop
                                searchBottom={false}
                                barReverse
                                order={['no', 'asc' ]}
                            />
                        </CardBody>
                    </Card>

                    </Col>
                </Row>
            </div>
            <Modal isOpen={this.state.modalEdit} toggle={this.toggleEdit} className="modal-sm">
                <ModalHeader toggle={this.toggleEdit} style={{backgroundImage: "linear-gradient(to left, #44a08d, #093637)",color: "#ffffff"}}>Edit Edit Donatur</ModalHeader>
                <form id="form">
                <ModalBody className="mx-4">
                    <FormGroup>
                        <Input type="number" name="idKodeBuku" id="idKodeBuku" value={this.state.idKodeBuku} hidden={true} readOnly={true}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="editUsernameDonatur">Username Donatur</Label>
                        <Input type="text" name="editUsernameDonatur" id="editUsernameDonatur" placeholder="Username donatur"
                        value={this.state.editUsernameDonatur}
                        onChange = {this.onChangeInput}
                        />
                        {console.log(this.state.editUsernameDonatur)}
                        <FormText color="danger">{this.state.unameHelp}</FormText>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button type="reset" color="secondary" onClick={this.toggleEdit}>Tutup</Button>
                    <Button  color="info" onClick={this.submitNow}>Ubah</Button>
                </ModalFooter>
                </form>
            </Modal>
        </>
        );
    }
}

export default KodeBuku;