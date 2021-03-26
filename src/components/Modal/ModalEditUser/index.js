import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)
const ModalEditUser = (props) => {
    const { id, nama, kelamin, tempat, tanggal_lahir, alamat, buttonLabel, className,
        classButtonModal, modalName
    } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    const handleEdit = () => {

        MySwal.fire({
            title: "Berhasil!!!",
            icon: "success",
            text: "Berhasil Mengedit User "+nama,
        })
        toggle();
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
                            <label for="nama" class="col-form-label">Nama</label>
                            <span class="font-weight-lighter ml-3" id="labelNamaEdit"></span>
                            <div class="input-group">
                                <input type="text" class="form-control" id="nama" defaultValue={nama}></input>
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-user"></span>
                                    </div>
                                </div>
                            </div>
                            <label for="labelKelamin">Jenis Kelamin</label>
                            <span class="font-weight-lighter ml-3" id="labelKelaminEdit"></span>
                            <div class="input-group">
                                <select class="custom-select" id="kelamin" defaultValue={kelamin}>
                                    <option defaultChecked>Pilih Salah Satu</option>
                                    <option value="Laki-Laki">Laki-Laki</option>
                                    <option value="Perempuan">Perempuan</option>
                                </select>
                                <div class="input-group-append">
                                    <div class="input-group-text pr-2">
                                        <span class="fas fa-venus-mars"></span>
                                    </div>
                                </div>
                            </div>
                            <label for="tempatlahir" class="col-form-label">Tempat Lahir:</label>
                            <span class="font-weight-lighter ml-3" id="labelTempatLahirEdit"></span>
                            <div class="input-group">
                                <input type="text" class="form-control" id="tempat" defaultValue={tempat}></input>
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-location-arrow"></span>
                                    </div>
                                </div>
                            </div>
                            <label for="tanggallahir" class="col-form-label">Tanggal Lahir:</label>
                            <span class="font-weight-lighter ml-3" id="labelTanggalLahirEdit"></span>
                            <div class="input-group">
                                <input type="date" class="form-control" id="tanggal_lahir" defaultValue={tanggal_lahir}></input>
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                    </div>
                                </div>
                            </div>
                            <label for="alamat" class="col-form-label">Alamat:</label>
                            <span class="font-weight-lighter ml-3" id="labelAlamatEdit"></span>
                            <div class="input-group">
                                <input type="text" class="form-control" id="alamat" defaultValue={alamat}></input>
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-map-marked-alt"></span>
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

export default ModalEditUser;