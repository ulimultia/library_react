import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const ModalEditBuku = (props) => {
    const { id, judulBuku, kategoriBuku, genreBuku, hargaBuku, jumlahBuku, lokasiBuku, buttonLabel, className,
        classButtonModal, modalName
    } = props;
    // const [judulBuku, setJudulBuku] = useState("")
    const [labelJudul, setLabelJudul] = useState("")
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    // const onChangeJudul = (event) =>{
    //     setJudulBuku(event.target.value);
    // }
    const handleEdit = () => {
        var isValid = true

        if (judulBuku == "") {isValid = false; setLabelJudul("Tidak boleh kosong")}
        else {setLabelJudul("")}
        if(isValid === true){

        // console.log(judulBuku);
         MySwal.fire({
            title: "Berhasil!!!",
            icon: "success",
            text: "Berhasil Mengedit Buku "+judulBuku,
        })
        toggle();
    }
    };
    return (
        <div>
            <Button className={classButtonModal} onClick={toggle}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle} style={{backgroundImage: "linear-gradient(to left, #44a08d, #093637)",
                                    color: "#ffffff"}}>{modalName}</ModalHeader>
                <ModalBody>
                    <div className="px-5" >
                        <Form>
                            <label className="col-form-label">Judul:</label>
                            <span className="font-weight-lighter ml-3" id="labelJudul">{labelJudul}</span>
                            <div className="input-group">
                                <input type="text" className="form-control" id="judulBuku" defaultValue={judulBuku}></input>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-heading"></span>
                                    </div>
                                </div>
                            </div>
                            <label for="labelKategori">Kategori</label>
                            <span className="font-weight-lighter ml-3" id="labelKategori"></span>
                            <div className="input-group">
                                <select className="custom-select" id="kategoriBuku" defaultValue={kategoriBuku} >
                                    <option value="Novel">Novel</option>
                                    <option value="Komik">Komik</option>
                                    <option value="Ensiklopedia">Ensiklopedia</option>
                                </select>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-list"></span>
                                    </div>
                                </div>
                            </div>
                            <label for="labelGenre">Genre</label>
                            <span className="font-weight-lighter ml-3" id="labelGenre"></span>
                            <div className="input-group">
                                <select className="custom-select" id="genreBuku" defaultValue={genreBuku}>
                                    <option value="Horror">Horror</option>
                                    <option value="Romance">Romance</option>
                                    <option value="Action">Action</option>
                                </select>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-list"></span>
                                    </div>
                                </div>
                            </div>
                            <label for="tanggallahir" className="col-form-label">Harga:</label>
                            <span className="font-weight-lighter ml-3" id="labelHarga"></span>
                            <div className="input-group">
                                <input type="number" className="form-control" id="hargaBuku" defaultValue={hargaBuku}></input>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-dollar-sign"></span>
                                    </div>
                                </div>
                            </div>

                            <label for="alamat" className="col-form-label">Jumlah:</label>
                            <span className="font-weight-lighter ml-3" id="labelJumlah"></span>
                            <div className="input-group">
                                <input type="number" className="form-control" id="jumlahBuku" defaultValue={jumlahBuku}></input>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-calculator"></span>
                                    </div>
                                </div>
                            </div>
                            <label for="alamat" className="col-form-label">Lokasi:</label>
                            <span className="font-weight-lighter ml-3" id="labelLokasi"></span>
                            <div className="input-group">
                                <input type="text" className="form-control" id="lokasiBuku" defaultValue={lokasiBuku}></input>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-map-marker-alt"></span>
                                    </div>
                                </div>
                            </div>
                            <ModalFooter>
                                <Button type="button" onClick={() => handleEdit()} color="primary">Edit</Button>{' '}
                            </ModalFooter>
                        </Form>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default ModalEditBuku;