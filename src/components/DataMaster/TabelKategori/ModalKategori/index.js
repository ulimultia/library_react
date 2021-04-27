import axios from 'axios';
import React, { useState } from 'react'
import { 
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    FormGroup, Label, Input, FormText
 } from 'reactstrap';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const ModalKategori = (props) => {
    const { idKategori, namaKategori, buttonLabel, className, colorButton, classButton, classIcon, buttonType} = props;

    // button type

    // field kategori dan id
    const [kategori, setkategori] = useState(namaKategori)
    const onChangeNamaKategori = (event) =>{
        setkategori(event.target.value);
    }
    // field validasi isian kategori
    const [kategoriHelp, setkategoriHelp] = useState("")
    // button submit form
    const submitNow = () => {
        var isValid = true;

        if(kategori === ""){
            isValid = false;
            setkategoriHelp("Kategori buku tidak boleh kosong!")
        }
        else{
            setkategoriHelp("");
        }

        // feedback
        if(isValid === true){
            console.log(kategori);
            
            if(buttonType === "add"){
                const kategoriDto = {
                    namaKategori: kategori,
                    kodeKategori: kategori.substr(0,3).toUpperCase(),
                }
                axios.post("http://localhost:8080/api/v1/kategori/add", kategoriDto)
                .then((response) => {
                    console.log(response);
                    setModal(false);
                })
                document.getElementById("form").reset();
                MySwal.fire({
                    icon: "success",
                    title: "Sukses!!!",
                    text: "Data berhasil ditambahkan ....",
                })
                window.location.reload();
            }
            else if(buttonType === "edit"){
                const kategoriDto = {
                    id: idKategori,
                    namaKategori: kategori,
                    kodeKategori: kategori.substr(0,3).toUpperCase(),
                }
                axios.put("http://localhost:8080/api/v1/kategori/edit", kategoriDto)
                .then((response) => {
                    console.log(response);
                    setModal(false);
                })
                MySwal.fire({
                    icon: "success",
                    title: "Sukses!!!",
                    text: "Data berhasil diubah ....",
                })
                window.location.reload();
            }
        }
        else {
            if(buttonType === "add"){

                MySwal.fire({
                    icon: "error",
                    title: "Gagal!!!",
                    text: "Data gagal ditambahkan. Silahkan cek kembali formulir Anda ....",
                })
            }
            else if(buttonType === "edit"){

                MySwal.fire({
                    icon: "error",
                    title: "Gagal!!!",
                    text: "Data gagal diubah. Silahkan cek kembali formulir Anda ....",
                })
            }
        }
    }
    // toggle modal
    const [modal, setModal] = useState(false);
    var warna = "light"
    if(colorButton != null){
        warna = colorButton
    }
    var classBtn = "btn-block btn-sm"
    if(classButton!=null){
        classBtn = classButton
    }
    const toggle = () => setModal(!modal);

    return (
        <div>
        <Button color={warna} onClick={toggle} className={classBtn}><i className={classIcon}> </i>  {buttonLabel}</Button>
        <Modal isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle} style={{backgroundImage: "linear-gradient(to left, #44a08d, #093637)",color: "#ffffff"}}>Kategori Buku</ModalHeader>
            <form id="form">
            <ModalBody className="mx-4">
                <FormGroup>
                    <Input type="number" name="idKategori" id="idKategori" value={idKategori} hidden={true}/>
                </FormGroup>
                <FormGroup>
                    <Label for="namaKategori">Kategori</Label>
                    <Input type="text" name="namaKategori" id="namaKategori" placeholder="Contoh: Buku"
                    value={kategori}
                    onChange = {onChangeNamaKategori}
                    />
                    <FormText color="danger">{kategoriHelp}</FormText>
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button type="reset" color="secondary" onClick={toggle}>Tutup</Button>
                <Button  color="info" onClick={submitNow}>Simpan</Button>
            </ModalFooter>
            </form>
        </Modal>
        </div>
    );
}

export default ModalKategori;