import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)
const ModalSewaBuku = (props) => {
    const { buttonLabel, classButton, modalName,
        className
    } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    const handleAdd = () => {

        MySwal.fire({
            title: "Berhasil!!!",
            icon: "success",
            text: "Berhasil Menyewa Buku",
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
                            <label for="labelKode1">Kode Buku</label>
                            <span class="font-weight-lighter ml-3 ml-3" id="labelKode1"></span>
                            <div class="input-group">

                                <input type="text" class="form-control" id="kodeBuku1" placeholder="Kode Buku"></input>
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-keyboard"></span>
                                    </div>
                                </div>
                            </div>
                            <label for="labelsewa">Penyewa</label>
                            <span class="font-weight-lighter ml-3" id="labelsewa"></span>
                            <div class="input-group">

                                <input type="text" class="form-control" id="penyewa" placeholder="Penyewa"></input>
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-user"></span>
                                    </div>
                                </div>
                            </div>
                            <label for="labelDurasi">Lama Pinjam</label>
                            <span class="font-weight-lighter ml-3" id="labelDurasi"></span>
                            <div class="input-group">

                                <select class="custom-select" id="durasi">
                                    <option selected>Pilih Salah Satu</option>
                                    <option value="1">3 Hari</option>
                                    <option value="2">1 Minggu</option>
                                    <option value="3">2 Minggu</option>
                                </select>
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-clock pr-2"></span>
                                    </div>
                                </div>
                            </div>
                            <label for="labeljumlahsewa">Jumlah</label>
                            <span class="font-weight-lighter ml-3" id="labeljumlahsewa"></span>
                            <div class="input-group">

                                <input type="number" class="form-control" id="jumlahsewabuku" placeholder="Jumlah Buku"></input>
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-calculator"></span>
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

export default ModalSewaBuku;