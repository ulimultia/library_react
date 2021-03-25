import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)
const ModalAddBuku = (props) => {
    const { buttonLabel, classButton, modalName,
        className
    } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    const handleAdd = () => {

        MySwal.fire({
            title: "Berhasil!!!",
            text: "Berhasil Menambahkan Buku",
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
                            <label>Kode Buku</label>
                            <span className="font-weight-lighter ml-3 ml-3" id="labelKode"></span>
                            <div className="input-group" id="formtambahBuku" method="post">

                                <input type="text" className="form-control" id="a" placeholder="Kode Buku"></input>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-keyboard"></span>
                                    </div>
                                </div>
                            </div>
                            <label>Judul</label>
                            <span className="font-weight-lighter ml-3" id="labelJudul1"></span>
                            <div className="input-group">

                                <input type="text" className="form-control" id="judulBuku" placeholder="Judul"></input>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-heading"></span>
                                    </div>
                                </div>
                            </div>
                            <label>Pengarang</label>
                            <span className="font-weight-lighter ml-3" id="labelPengarang"></span>
                            <div className="input-group">

                                <input type="text" className="form-control" id="pengarangBuku" placeholder="Pengarang"></input>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-pen"></span>
                                    </div>
                                </div>
                            </div>
                            <label>Penerbit</label>
                            <span className="font-weight-lighter ml-3" id="labelPenerbit"></span>
                            <div className="input-group">

                                <input type="text" className="form-control" id="penerbitBuku" placeholder="Penerbit"></input>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-print"></span>
                                    </div>
                                </div>
                            </div>
                            <label>Tanggal Terbit</label>
                            <span className="font-weight-lighter ml-3" id="labelTanggal"></span>
                            <div className="input-group">

                                <div className="input-group date" data-provide="datepicker">
                                    <input type="date" className="form-control pull-right" id="datepicker" placeholder="Tanggal"></input>
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <label>ISBN</label>
                            <span className="font-weight-lighter ml-3" id="labelISBN"></span>
                            <div className="input-group">

                                <input type="text" className="form-control" id="isbnBuku" placeholder="ISBN"></input>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-barcode"></span>
                                    </div>
                                </div>
                            </div>
                            <label>Kategori</label>
                            <span className="font-weight-lighter ml-3" id="labelKategori1"></span>
                            <div className="input-group">

                                <select className="custom-select" id="kategoriBuku1">
                                    <option defaultChecked>Pilih Salah Satu</option>
                                    <option value="Novel">Novel</option>
                                    <option value="Komik">Komik</option>
                                    <option value="Ensiklopedia">Ensiklopedia</option>
                                </select>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-list-alt pr-2"></span>
                                    </div>
                                </div>
                            </div>
                            <label>Genre</label>
                            <span className="font-weight-lighter ml-3" id="labelGenre1"></span>
                            <div className="input-group">

                                <select className="custom-select" id="genreBuku1">
                                    <option defaultChecked>Pilih Salah Satu</option>
                                    <option value="Horror">Horror</option>
                                    <option value="Romance">Romance</option>
                                    <option value="Action">Action</option>
                                </select>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-list-alt pr-2"></span>
                                    </div>
                                </div>
                            </div>
                            <label>Jumlah Halaman</label>
                            <span className="font-weight-lighter ml-3" id="labelHalaman"></span>
                            <div className="input-group">

                                <input type="number" className="form-control" id="halamanBuku" placeholder="Jumlah Halaman"></input>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-sort-numeric-up"></span>
                                    </div>
                                </div>
                            </div>
                            <label>Jumlah</label>
                            <span className="font-weight-lighter ml-3" id="labelJumlah1"></span>
                            <div className="input-group">

                                <input type="number" className="form-control" id="jumlahBuku1" placeholder="Jumlah Buku"></input>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-calculator"></span>
                                    </div>
                                </div>
                            </div>
                            <label>Harga</label>
                            <span className="font-weight-lighter ml-3" id="labelHarga1"></span>
                            <div className="input-group">

                                <input type="number" className="form-control" id="hargaBuku1" placeholder="Harga Buku"></input>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-dollar-sign"></span>
                                    </div>
                                </div>
                            </div>
                            <label>Lokasi</label>
                            <span className="font-weight-lighter ml-3" id="labelLokasi1"></span>
                            <div className="input-group">

                                <input type="text" className="form-control" id="lokasiBuku1" placeholder="Lokasi Buku"></input>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-map-marker-alt"></span>
                                    </div>
                                </div>
                            </div>
                            <label>Deskripsi</label>
                            <span className="font-weight-lighter ml-3" id="labelDeskripsi1"></span>
                            <div className="input-group">

                                <input type="text" className="form-control" id="deskripsiBuku1" placeholder="Deskripsi Buku"></input>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-info"></span>
                                    </div>
                                </div>
                            </div>
                            <label>User</label>
                            <span className="font-weight-lighter ml-3" id="labelUsername"></span>
                            <div className="input-group">

                                <input type="text" className="form-control" id="usernameBuku" placeholder="Kosongkan jika bukan donasi"></input>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user"></span>
                                    </div>
                                </div>
                            </div>
                            <label>Sampul Buku</label>
                            <span className="font-weight-lighter ml-3" id="labelSampul"></span>
                            <div className="input-group">

                                <div className="custom-file">
                                    <input type="file" className="custom-file-input" id="sampulBuku"></input>
                                    <label className="custom-file-label" for="sampulBuku">Choose file</label>
                                </div>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-upload pr-2"></span>
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

export default ModalAddBuku;