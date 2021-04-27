import React from 'react';
import { MDBDataTableV5} from 'mdbreact';
import {
  Card, CardBody,
  Row, Col, Button, 
  Modal, ModalHeader, ModalBody, ModalFooter,
  FormGroup, Label, Input, FormText
} from "reactstrap";
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal) 

class Lokasi extends React.Component {
    constructor(props) {
        super(props);
        this.getAllLocation = this.getAllLocation.bind()
        this.state = {
            locations: [],
            newLocations: [],
            modal: false,
            modalEdit: false,
            idLokasi: null,
            editLokasi: "",
            editKeterangan: "",
            lokasi: "",
            keterangan: "",
            lokasiHelp: "",
            keteranganHelp: "",
            btn: "",
            columTable : [
                {
                  label: '#',
                  field: 'no',
                  width: 40
                },
                {
                  label: 'Lokasi',
                  field: 'lokasi',
                   width: 100
                },
                {
                  label: 'Keterangan',
                  field: 'keterangan',
                   width: 500
                },
                {
                  label: 'Aksi',
                  field: 'aksi',
                  width: 100
                }
            ],
            data: {}
        }
    }

    async componentDidMount() {
        // await this.authHeader();
        await this.getAllLocation()
    }

    // modal toggle tambah
    toggle = () => {
        if(this.state.modal === true){
            this.setState({
                modal : false,
                btn: "",
                lokasiHelp: "",
                keteranganHelp: ""
            })
        }
        else{
            this.setState({
                modal : true,
                btn: "Tambah"
            })
        }
    }
    // modal toggle edit
    toggleEdit = (value) => {
        if(this.state.modalEdit === true){
            this.setState({
                modalEdit : false,
                btn: "",
                idLokasi: "",
                editKeterangan: "",
                editLokasi: "",
                lokasiHelp: "",
                keteranganHelp: ""
                
            })
        }
        else{
            this.setState({
                modalEdit : true,
                btn: "Ubah",
                idLokasi: value.id,
                editKeterangan: value.keteranganLokasi,
                editLokasi: value.kodeLokasi
            })
        }
    }
    // handler genre input
    onChangeLokasi = (event) =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    // get all data genre
    getAllLocation = () =>{
        axios.get('http://localhost:8080/api/v1/lokasi/all')
        .then((response) => {
            // console.log(response)
            this.setState({
                locations: response.data.data
            })
            this.state.locations.map((value, key) => {
                return(
                    console.log("test" + key),
                    this.state.newLocations.push({
                        no: key + 1,
                        lokasi: value.kodeLokasi,
                        keterangan: value.keteranganLokasi,
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
                        ...this.state.columTable
                    ],
                    rows: [...this.state.newLocations],
                }
            })
            console.log("axios get all")
        })
    }
    // add and edit
    submitNow = (e) => {
        e.preventDefault();
        let isValid = true;
        if(this.state.btn === "Tambah"){
            // validasi kode lokasi
            if(this.state.lokasi === ""){
                isValid = false;
                this.setState({
                    lokasiHelp: "Kode lokasi tidak boleh kosong..."
                })
            }
            else{
                this.setState({
                    lokasiHelp: ""
                })
            }
            // validasi keterangan lokasi
            if(this.state.keterangan === ""){
                isValid = false;
                this.setState({
                    keteranganHelp: "Keterangan lokasi tidak boleh kosong..."
                })
            }
            else{
                this.setState({
                    keteranganHelp: ""
                })
            }

            // tambah data
            if(isValid === true){
                const lokasiDto = {
                    kodeLokasi: this.state.lokasi,
                    keteranganLokasi: this.state.keterangan
                }
                axios.post("http://localhost:8080/api/v1/lokasi/add", lokasiDto)
                .then((response) => {
                    console.log(response);
                    this.setState({
                        modal: false,
                        lokasi: "",
                        keterangan: "",
                        locations: [],
                        newLocations: [],
                        data: {},
                        btn: ""
                    })
                    this.getAllLocation()
                })
                MySwal.fire({
                    icon: "success",
                    title: "Sukses!!!",
                    text: "Data berhasil ditambahkan ....",
                })
            }
            else{
                MySwal.fire({
                    icon: "error",
                    title: "Gagal!!!",
                    text: "Data gagal ditambahkan. Silahkan cek kembali formulir Anda ....",
                })
            }
        }
        // untuk edit data
        else if(this.state.btn === "Ubah"){
            // validasi kode lokasi
            if(this.state.editLokasi === ""){
                isValid = false;
                this.setState({
                    lokasiHelp: "Kode lokasi tidak boleh kosong..."
                })
            }
            else{
                this.setState({
                    lokasiHelp: ""
                })
            }
            // validasi keterangan lokasi
            if(this.state.editKeterangan === ""){
                isValid = false;
                this.setState({
                    keteranganHelp: "Keterangan lokasi tidak boleh kosong..."
                })
            }
            else{
                this.setState({
                    keteranganHelp: ""
                })
            }

            // edit data jika sudah tervalidasi
            if(isValid === true){
                const lokasiDto = {
                    id: this.state.idLokasi,
                    kodeLokasi: this.state.editLokasi,
                    keteranganLokasi: this.state.editKeterangan
                }
                axios.put("http://localhost:8080/api/v1/lokasi/edit", lokasiDto)
                .then((response) => {
                    console.log(response);
                    this.setState({
                        modalEdit: false,
                        locations: [],
                        newLocations: [],
                        data: {},
                        btn: ""
                    })
                    this.getAllLocation()
                })
                MySwal.fire({
                    icon: "success",
                    title: "Sukses!!!",
                    text: "Data berhasil diubah ....",
                })
            }
            else{
                MySwal.fire({
                    icon: "error",
                    title: "Gagal!!!",
                    text: "Data gagal diubah. Silahkan cek kembali formulir Anda ....",
                })
            }
        }
    }

    // delete genre
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
                axios.delete('http://localhost:8080/api/v1/lokasi/delete/' + id)
                .then((response) => {
                    console.log(response);
                    this.setState({
                        locations: [],
                        newLocations: [],
                        data: {}
                    })
                    this.getAllLocation()
                }
                )

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
                            <Row>
                                <Col xs="12" sm="12" className = "text-right">
                                    <Button onClick={this.toggle} className="btn btn-sm" style={{backgroundColor: "navy"}}><i className="fas fa-plus"> </i>  Tambah</Button>
                                    <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-md" id="modalTambah">
                                        <ModalHeader toggle={this.toggle} style={{backgroundImage: "linear-gradient(to left, #44a08d, #093637)",color: "#ffffff"}}>Tambah Lokasi Buku</ModalHeader>
                                        <form id="form">
                                        <ModalBody className="mx-4">
                                            <FormGroup>
                                                <Input type="number" name="idLokasi" id="idLokasi" value={this.state.idLokasi} hidden={true}/>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="namaKategori">Lokasi</Label>
                                                <Input type="text" name="lokasi" id="lokasi" placeholder="Contoh: A1"
                                                value={this.state.lokasi}
                                                onChange = {this.onChangeLokasi}
                                                />
                                                <FormText color="danger">{this.state.lokasiHelp}</FormText>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="namaKategori">Keterangan</Label>
                                                <Input type="text" name="keterangan" id="keterangan" placeholder="Contoh: Lantai 1 Rak X Nomor 11"
                                                value={this.state.keterangan}
                                                onChange = {this.onChangeLokasi}
                                                />
                                                <FormText color="danger">{this.state.keteranganHelp}</FormText>
                                            </FormGroup>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button type="reset" color="secondary" onClick={this.toggle}>Tutup</Button>
                                            <Button color="info" onClick={this.submitNow}>{this.state.btn}</Button>
                                        </ModalFooter>
                                        </form>
                                    </Modal>
                                </Col>
                            </Row>
                            <hr/>
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
            <Modal isOpen={this.state.modalEdit} toggle={this.toggleEdit} className="modal-md">
                <ModalHeader toggle={this.toggleEdit} style={{backgroundImage: "linear-gradient(to left, #44a08d, #093637)",color: "#ffffff"}}>Edit Lokasi Buku</ModalHeader>
                <form id="form">
                <ModalBody className="mx-4">
                    <FormGroup>
                        <Input type="number" name="idLokasi" id="idLokasi" value={this.state.idLokasi} hidden={true}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="namaKategori">Lokasi</Label>
                        <Input type="text" name="editLokasi" id="editLokasi" placeholder="Contoh: A1"
                        value={this.state.editLokasi}
                        onChange = {this.onChangeLokasi}
                        />
                        <FormText color="danger">{this.state.lokasiHelp}</FormText>
                    </FormGroup>
                    <FormGroup>
                        <Label for="namaKategori">Keterangan</Label>
                        <Input type="text" name="editKeterangan" id="editKeterangan" placeholder="Contoh: Lantai 1 Rak X Nomor 1"
                        value={this.state.editKeterangan}
                        onChange = {this.onChangeLokasi}
                        />
                        <FormText color="danger">{this.state.keteranganHelp}</FormText>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button type="reset" color="secondary" onClick={this.toggleEdit}>Tutup</Button>
                    <Button color="info" onClick={this.submitNow}>{this.state.btn}</Button>
                </ModalFooter>
                </form>
            </Modal>
        </>
        );
    }
}

export default Lokasi;
