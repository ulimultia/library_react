import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)
const ModalSewaBuku = (props) => {
    const { buttonLabel, classButton, modalName,
        className
    } = props;
    const [kodeBuku1, setKodeBuku1] = useState("")
    const [labelKode1, setLabelKode1] = useState("")
    const [penyewaBuku, setPenyewa] = useState("")
    const [labelPenyewa, setLabelPenyewa] = useState("")
    const [durasiBuku, setDurasi] = useState("")
    const [labelDurasi, setLabelDurasi] = useState("")

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const onChangeKodeBuku1 = (event) =>{
        setKodeBuku1(event.target.value);
    }
    const onChangePenyewa = (event) =>{
        setPenyewa(event.target.value);
    }
    const onChangeDurasi = (event) =>{
        setDurasi(event.target.value);
    }
    const handleAdd = () => {
        var isValid = true

        if (kodeBuku1 === "") {isValid = false; setLabelKode1("Tidak boleh kosong")}
        else {setLabelKode1("")}
        if (penyewaBuku === "") {isValid = false; setLabelPenyewa("Tidak boleh kosong")}
        else {setLabelPenyewa("")}
        if (durasiBuku === "") {isValid = false; setLabelDurasi("Tidak boleh kosong")}
        else {setLabelDurasi("")}
        if(isValid === true){

        MySwal.fire({
            title: "Berhasil!!!",
            icon: "success",
            text: "Berhasil Menyewa Buku",
        })
        toggle();
    }
    };

    return (
        <div>
            <Button className={classButton} onClick={toggle}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle} style={{backgroundImage: "linear-gradient(to left, #44a08d, #093637)",
                                    color: "#ffffff"}}>{modalName}</ModalHeader>
                <ModalBody>
                    <div className="px-5" >
                        <Form>
                            <label for="labelKode1">Kode Buku</label>
                            <span class="font-weight-lighter ml-3 ml-3" id="labelKode1">{labelKode1}</span>
                            <div class="input-group">

                                <input type="text" class="form-control" id="kodeBuku1" placeholder="Kode Buku" value={kodeBuku1} onChange={onChangeKodeBuku1}></input>
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-keyboard"></span>
                                    </div>
                                </div>
                            </div>
                            <label for="labelsewa">Penyewa</label>
                            <span class="font-weight-lighter ml-3" id="labelsewa">{labelPenyewa}</span>
                            <div class="input-group">

                                <input type="text" class="form-control" id="penyewa" placeholder="Penyewa" value={penyewaBuku} onChange={onChangePenyewa}></input>
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-user"></span>
                                    </div>
                                </div>
                            </div>
                            <label for="labelDurasi">Lama Pinjam</label>
                            <span class="font-weight-lighter ml-3" id="labelDurasi">{labelDurasi}</span>
                            <div class="input-group">

                                <select class="custom-select" id="durasi" value={durasiBuku} onChange={onChangeDurasi}> 
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