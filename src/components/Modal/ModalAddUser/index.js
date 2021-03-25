import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)
const ModalAddUser = (props) => {
    const { buttonLabel, classButton, modalName,
        className
    } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    const handleAdd = () => {

        MySwal.fire({
            title: "Berhasil!!!",
            icon: "success",
            text: "Berhasil Menambahkan User",
        })
        toggle();
    };
    
    return (
        <div>
            <Button className={classButton} onClick={toggle}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>{modalName}</ModalHeader>
                <ModalBody>
                    <div className="px-5" >
                        <Form>
                            <label for="labelNikAdd">NIK</label>
                            <span class="font-weight-lighter ml-3" id="labelNikAdd"></span>
                            <div class="input-group mb-3">
                                <input type="number" class="form-control" id="nikUserAdd" placeholder="NIK"></input>
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-id-card"></span>
                                    </div>
                                </div>
                            </div>
                            <label for="labelNamaAdd">Nama</label>
                            <span class="font-weight-lighter ml-3" id="labelNamaAdd"></span>
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" id="namaUserAdd" placeholder="Nama"></input>
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-user"></span>
                                    </div>
                                </div>
                                <span class="font-weight-lighter ml-3" id="labelNamaAdd"></span>
                            </div>

                            <label for="labelKelaminAdd">Jenis Kelamin</label>
                            <span class="font-weight-lighter ml-3 ml-3" id="labelKelaminAdd"></span>

                            <div class="input-group mb-3">
                                <select class="custom-select" id="kelaminuserAdd">
                                    <option defaultChecked>Pilih Salah Satu</option>
                                    <option value="Laki-Laki">Laki-Laki</option>
                                    <option value="Perempuan">Perempuan</option>
                                </select>
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-venus-mars pr-2"></span>
                                    </div>
                                </div>
                            </div>

                            <label for="labelTempatAdd">Tempat Lahir</label>
                            <span class="font-weight-lighter ml-3 ml-3" id="labelTempatAdd"></span>

                            <div class="input-group mb-3">
                                <input type="text" class="form-control" id="tempatUserAdd" placeholder="Tempat Lahir"></input>
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-location-arrow"></span>
                                    </div>
                                </div>
                            </div>

                            <div class="input-group mb-3">
                                <label for="labelTanggalAdd">Tanggal Lahir</label>
                                <span class="font-weight-lighter ml-3" id="labelTanggalAdd"></span>

                                <div class="input-group date" data-provide="datepicker">
                                    <input type="date" class="form-control pull-right" id="tanggal_lahiruserAdd"
                                        placeholder="Tanggal Lahir"></input>
                                    <div class="input-group-append">
                                        <div class="input-group-text">
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <label for="labelAlamatAdd">Alamat</label>
                            <span class="font-weight-lighter ml-3" id="labelAlamatAdd"></span>
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" id="alamatUserAdd" placeholder="Alamat"></input>
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-map-marked-alt"></span>
                                    </div>
                                </div>
                            </div>

                            <div class="input-group mb-3">
                                <label for="labelFileAdd">Foto</label>
                                <span class="font-weight-lighter ml-3" id="labelFileAdd"></span>

                                <div class="input-group">
                                    <div class="custom-file">
                                        <input type="file" class="custom-file-input" id="fotoUserAdd"></input>
                                        <label class="custom-file-label" for="fotoUser">Choose file</label>
                                    </div>
                                    <div class="input-group-append">
                                        <div class="input-group-text">
                                            <span class="fas fa-upload pr-2"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ModalFooter>
                                <Button type="button" onClick={() => handleAdd()} color="primary">Add</Button>{' '}
                            </ModalFooter>
                        </Form>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default ModalAddUser;