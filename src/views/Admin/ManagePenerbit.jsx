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

class Penerbit extends React.Component {
    constructor(props) {
        super(props);
        this.getAllPenerbit = this.getAllPenerbit.bind()
        this.state = {
            penerbits: [],
            newPenerbits: [],
            modal: false,
            modalEdit: false,
            idPenerbit: null,
            editNamaPenerbit: "",
            namaPenerbit: "",
            penerbitHelp: "",
            btn: "",
            columTable : [
                {
                  label: '#',
                  field: 'no',
                  width: 40
                },
                {
                  label: 'Penerbit',
                  field: 'penerbit',
                   width: 600
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
        await this.getAllPenerbit()
        // this.handleGetAll(this.categories);
    }

    // modal toggle tambah
    toggle = () => {
        if(this.state.modal === true){
            this.setState({
                modal : false,
                btn: "",
                penerbitHelp: ""
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
                penerbitHelp: ""
                
            })
        }
        else{
            this.setState({
                modalEdit : true,
                btn: "Ubah",
                idPenerbit: value.id,
                editNamaPenerbit: value.namaPenerbit
            })
        }
    }
    // handler data input
    onChangePenerbit = (event) =>{
        this.setState({
            [event.target.name]: event.target.value
            // namaPenerbit: event.target.value,
            // editNamaPenerbit: event.target.value
        })
    }
    // get all data data
    getAllPenerbit = () =>{
        axios.get('http://localhost:8080/api/v1/penerbit/all')
        .then((response) => {
            this.setState({
                penerbits: response.data.data
            })
            this.state.penerbits.map((value, key) => {
                return(
                    this.state.newPenerbits.push({
                        no: key + 1,
                        penerbit: value.namaPenerbit,
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
                    rows: [...this.state.newPenerbits],
                }
            })
        })
    }
    // add and edit
    submitNow = (e) => {
        e.preventDefault();
        let isValid = true;
        // jika button tambah data
        if(this.state.btn === "Tambah"){
            if(this.state.namaPenerbit === ""){
                isValid = false;
                this.setState({
                    penerbitHelp: "Penerbit tidak boleh kosong..."
                })
            }
            else{
                this.setState({
                    penerbitHelp: ""
                })
            }

            if(isValid === true){
                const penerbitDto = {
                    namaPenerbit: this.state.namaPenerbit,
                }
                axios.post("http://localhost:8080/api/v1/penerbit/add", penerbitDto)
                .then((response) => {
                    this.setState({
                        modal: false,
                        namaPenerbit: "",
                        penerbits: [],
                        newPenerbits: [],
                        data: {}
                    })
                    this.getAllPenerbit()
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
        // jika button edit data
        else if(this.state.btn === "Ubah"){
            if(this.state.editNamaPenerbit === ""){
                isValid = false;
                this.setState({
                    penerbitHelp: "Penerbit tidak boleh kosong..."
                })
            }
            else{
                this.setState({
                    penerbitHelp: ""
                })
            }

            if(isValid === true){
                const penerbitDto = {
                    id: this.state.idPenerbit,
                    namaPenerbit: this.state.editNamaPenerbit
                }
                axios.put("http://localhost:8080/api/v1/penerbit/edit", penerbitDto)
                .then((response) => {
                    this.setState({
                        modalEdit: false,
                        penerbits: [],
                        newPenerbits: [],
                        data: {}
                    })
                    this.getAllPenerbit()
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
    // delete data
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
                axios.delete('http://localhost:8080/api/v1/penerbit/delete/' + id)
                .then((response) => {
                    this.setState({
                        penerbits: [],
                        newPenerbits: [],
                        data: {}
                    })
                    this.getAllPenerbit()
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
                            <Row>
                                <Col xs="12" sm="12" className = "text-right">
                                    <Button onClick={this.toggle} className="btn btn-sm" style={{backgroundColor: "navy"}}><i className="fas fa-plus"> </i>  Tambah</Button>
                                    <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-sm" id="modalTambah">
                                        <ModalHeader toggle={this.toggle} style={{backgroundImage: "linear-gradient(to left, #44a08d, #093637)",color: "#ffffff"}}>Tambah Penerbit Buku</ModalHeader>
                                        <form id="form">
                                        <ModalBody className="mx-4">
                                            <FormGroup>
                                                <Input type="number" name="idPenerbit" id="idPenerbit" value={this.state.idPenerbit} hidden={true}/>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="namaKategori">Penerbit</Label>
                                                <Input type="text" name="namaPenerbit" id="namaPenerbit" placeholder="Contoh: CV. Penerbit"
                                                value={this.state.namaPenerbit}
                                                onChange = {this.onChangePenerbit}
                                                />
                                                <FormText color="danger">{this.state.penerbitHelp}</FormText>
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
            <Modal isOpen={this.state.modalEdit} toggle={this.toggleEdit} className="modal-sm">
                <ModalHeader toggle={this.toggleEdit} style={{backgroundImage: "linear-gradient(to left, #44a08d, #093637)",color: "#ffffff"}}>Edit Penerbit Buku</ModalHeader>
                <form id="form">
                <ModalBody className="mx-4">
                    <FormGroup>
                        <Input type="number" name="idPenerbit" id="idPenerbit" value={this.state.idPenerbit} hidden={true}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="namaKategori">Penerbit</Label>
                        <Input type="text" name="editNamaPenerbit" id="editNamaPenerbit" placeholder="Contoh: CV. Penerbit"
                        value={this.state.editNamaPenerbit}
                        onChange = {this.onChangePenerbit}
                        />
                        <FormText color="danger">{this.state.penerbitHelp}</FormText>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button type="reset" color="secondary" onClick={this.toggleEdit}>Tutup</Button>
                    <Button  color="info" onClick={this.submitNow}>{this.state.btn}</Button>
                </ModalFooter>
                </form>
            </Modal>
        </>
        );
    }
}

export default Penerbit;
