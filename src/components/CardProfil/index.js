import React, { useState } from 'react';
import { 
    Col, Row, Button, Card, CardBody,
    Modal, ModalBody, ModalHeader, ModalFooter,
    FormGroup, Label, Input, FormText
 } from 'reactstrap';
 import Swal from 'sweetalert2'
 import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const CardProfil = (props) => {
  const { foto, nama, role, saldo, donasi, denda } = props;
    const [editModal, setEditModal] = useState(false)
    const [gantiPass, setGantiPass] = useState(false)
    const [edNik, setEdNik] = useState("3421567012320005")
    const [edNikHelp, setEdNikHelp] = useState("")
    const [edNama, setEdNama] = useState("Uli Multia Wijayanti")
    const [edNamaHelp, setEdNamaHelp] = useState("")
    const [edTempat, setEdTempat] = useState("Yogyakarta")
    const [edTempatHelp, setEdTempatHelp] = useState("")
    const [edTanggal, setEdTanggal] = useState("1945-07-17")
    const [edTanggalHelp, setEdTanggalHelp] = useState("")
    const [edEmail, setEdEmail] = useState("ulimultia@kreasitech.com")
    const [edEmailHelp, setEdEmailHelp] = useState("")
    const [edUsername, setEdUsername] = useState("ulimultia")
    const [edUsernameHelp, setEdUsernameHelp] = useState("")
    const [edTelp, setEdTelp] = useState("089612345678")
    const [edTelpHelp, setEdTelpHelp] = useState("")
    const [edAlamat, setEdAlamat] = useState("D.I.Yogyakarta")
    const [edAlamatHelp, setEdAlamatHelp] = useState("")
    const [passNow, setPassNow] = useState("")
    const [passNowHelp, setPassNowHelp] = useState("")
    const [newPass, setNewPass] = useState("")
    const [newPassHelp, setNewPassHelp] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [confirmPassHelp, setConfirmPassHelp] = useState("")

    //fungsi buka dan tutup modal
    const toggleEdit = () => setEditModal(!editModal)
    const toggleGantiPass = () => setGantiPass(!gantiPass)
    
    // === EDIT PROFIL ===
    const onChangeEdNik = (event) =>{
        setEdNik(event.target.value);
    }
    const onChangeEdNama = (event) =>{
        setEdNama(event.target.value);
    }
    const onChangeEdTempat = (event) =>{
        setEdTempat(event.target.value);
    }
    const onChangeEdTanggal = (event) =>{
        setEdTanggal(event.target.value);
        // console.log(edTanggal)
    }
    const onChangeEdEmail = (event) =>{
        setEdEmail(event.target.value);
    }
    const onChangeEdUsername = (event) =>{
        setEdUsername(event.target.value);
    }
    const onChangeEdTelp = (event) =>{
        setEdTelp(event.target.value);
    }
    const onChangeEdAlamat = (event) =>{
        setEdAlamat(event.target.value);
    }
    // validasi dan feedback edit profil
    const editNow = () => {
        // console.log("klik edit profil");
        var isValid = true
        // validasi NIK
        if (isNaN(edNik) == true) {isValid = false; setEdNikHelp("Harus Angka")} 
        else if (edNik == "") {isValid = false; setEdNikHelp("Tidak boleh kosong")}
        else if (edNik.length < 16) { isValid = false; setEdNikHelp("Harus 16 digit")}
        else {setEdNikHelp("")}
        // validasi Nama
        if (edNama == "") {isValid = false; setEdNamaHelp("Tidak boleh kosong")}
        else {setEdNamaHelp("")}
        // validasi Tempat Lahir
        if (edTempat == "") {isValid = false; setEdTempatHelp("Tidak boleh kosong")}
        else {setEdTempatHelp("")}
        // validasi Tanggal
        if (edTanggal == null) {isValid = false; setEdTanggalHelp("Tidak boleh kosong")}
        else {setEdTanggalHelp("")}
        // validasi Email
        if (edEmail == "") {isValid = false; setEdEmailHelp("Tidak boleh kosong")}
        else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(edEmail) == false) {isValid = false; setEdEmailHelp("Tidak valid")}
        else {setEdEmailHelp("")}
        // validasi Usernamw
        if (edUsername == "") {isValid =false; setEdUsernameHelp("Tidak boleh kosong")}
        else if (edUsername.length < 5) { isValid = false; setEdUsernameHelp("Minimal 5 karkater")}
        else {setEdUsernameHelp("")}
        // validasi Telepon
        if (edTelp == "") {isValid = false; setEdTelpHelp("Tidak boleh kosong")}
        else if (isNaN(edTelp) === true) {isValid = false; setEdTelpHelp("Harus Angka")} 
        else {setEdTelpHelp("")}
        // validasi Alamat
        if (edAlamat == "") {isValid = false; setEdAlamatHelp("Tidak boleh kosong")}
        else {setEdAlamatHelp("")}

        //feedback
        if(isValid == true){
            MySwal.fire({
                icon: "success",
                title: "Sukses!!!",
                text: "Data berhasil diubah ....",
            })
        }
        else {
            MySwal.fire({
                icon: "error",
                title: "Gagal!!!",
                text: "Data gagal diubah. Silahkan cek kembali formulir Anda ....",
            })
        }
    }

    // ==== GANTI PASSWORD ==== 
    // set state / ubah isi dari variable password yang ada berdasarkan inputan user
    const onChangePassNow = (event) =>{
        setPassNow(event.target.value);
    }
    const onChangeNewPass = (event) =>{
        setNewPass(event.target.value);
    }
    const onChangeConfirmPass = (event) =>{
        setConfirmPass(event.target.value);
    }
    // === validasi dan feedback dari hasilpengecekan
    const editPassNow = () => {
        var isValid = true;
        // validasi pass saat ini 
        if(passNow == "") {isValid = false; setPassNowHelp("Tidak boleh kosong");}      
        else if(passNow.length < 5) {isValid = false; setPassNowHelp("Minimal 5 karakter")}
        else setPassNowHelp("");
        // validasi pass baru
        if(newPass == "") {isValid = false; setNewPassHelp("Tidak boleh kosong")}
        else if(newPass == passNow) {isValid = false; setNewPassHelp("Password baru harus berbeda")}
        else if (newPass.length < 5) {isValid = false; setNewPassHelp("Minimal 5 karakter")}
        else setNewPassHelp("")
        // validasi konfirmasi password
        if(confirmPass == "") {isValid = false; setConfirmPassHelp("Tidak boleh kosong")}
        else if (confirmPass != newPass) {isValid= false; setConfirmPassHelp("Tidak sesuai")}
        else setConfirmPassHelp("")

        if(isValid == true){
            MySwal.fire({
                icon: "success",
                title: "Sukses!!!",
                text: "Password berhasil diubah ....",
            })
        }
        else {
            MySwal.fire({
                icon: "error",
                title: "Gagal!!!",
                text: "Password gagal diubah. Silahkan cek kembali formulir Anda ....",
            })
        }
    }

  return (
    <div>
        <Card className="card-user">
            <div className="image" style={{height: "200px"}}>
                <img
                alt=""
                src="https://images.wallpaperscraft.com/image/book_bouquet_cup_147482_3840x2160.jpg"
                style={{ backgroundPositionX: "80%", objectFit: "cover"}}
                />
            </div>
            <CardBody>
                <div className="author mb-4">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                        alt=""
                        className="avatar border-gray"
                        src={ foto }
                        />
                        <h5 className="title" style={{color: "#845f3e"}}> { nama }</h5>
                    </a>
                    <p className="description">{ role }<br></br>
                        <Button round outline color="default" className="btn-sm" onClick={toggleEdit}><i className="fas fa-pen-alt fa-xs"></i> Edit Profil</Button>
                        <Modal isOpen={editModal} toggle={toggleEdit} className="modal-lg">
                            <ModalHeader toggle={toggleEdit} 
                            style={{backgroundImage: "linear-gradient(to bottom right, #23150d,#845f3e)",
                                    color: "#ffffff"}}>Edit Profil</ModalHeader>
                            <form>
                            <ModalBody>
                                <Row>
                                    <Col xs="12" sm="6" className="mb-3">
                                        <FormGroup>
                                            <Label for="nik">NIK</Label>
                                            <Input type="number" name="nik" id="nik" placeholder="1234567890123456"
                                            value={edNik}
                                            onChange = {onChangeEdNik}
                                            />
                                            <FormText color="danger">{edNikHelp}</FormText>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="12" sm="6" className="mb-3">
                                        <FormGroup>
                                            <Label for="nama">Nama</Label>
                                            <Input type="text" name="nama" id="nama" placeholder="Nama lengkap ..."
                                            value={edNama}
                                            onChange = {onChangeEdNama}
                                            />
                                            <FormText color="danger">{edNamaHelp}</FormText>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="12" sm="6" className="mb-3">
                                        <FormGroup>
                                            <Label for="email">Email</Label>
                                            <Input type="email" name="email" id="email" placeholder="Email ..."
                                            value={edEmail}
                                            onChange = {onChangeEdEmail}
                                            />
                                            <FormText color="danger">{edEmailHelp}</FormText>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="12" sm="6" className="mb-3">
                                        <FormGroup>
                                            <Label for="username">Username</Label>
                                            <Input type="text" name="username" id="username" placeholder="Username ..."
                                            value={edUsername}
                                            onChange = {onChangeEdUsername}
                                            />
                                            <FormText color="danger">{edUsernameHelp}</FormText>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="12" sm="6" className="mb-3">
                                        <FormGroup>
                                            <Label for="tempat_lahir">Tempat Lahir</Label>
                                            <Input type="text" name="tempat_lahir" id="tempat_lahir" placeholder="Tempat lahir  ..."
                                            value={edTempat}
                                            onChange = {onChangeEdTempat}
                                            />
                                            <FormText color="danger">{edTempatHelp}</FormText>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="12" sm="6" className="mb-3">
                                        <FormGroup >
                                            <Label for="tanggal_lahir">Tanggal Lahir</Label>
                                            <Input type="date" name="tanggal_lahir" id="tanggal_lahir" placeholder="Tanggal lahir  ..."
                                            value={edTanggal}
                                            onChange = {onChangeEdTanggal}
                                            />
                                            <FormText color="danger">{edTanggalHelp}</FormText>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="12" sm="6" className="mb-3">
                                        <FormGroup >
                                            <Label for="alamat">Alamat</Label>
                                            <Input type="text" name="alamat" id="alamat" placeholder="Alamat  ..."
                                            value={edAlamat}
                                            onChange = {onChangeEdAlamat}
                                            />
                                            <FormText color="danger">{edAlamatHelp}</FormText>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="12" sm="6" className="mb-3">
                                        <FormGroup >
                                            <Label for="alamat">Telepon</Label>
                                            <Input type="text" name="telepon" id="telepon" placeholder="Telepon  ..."
                                            value={edTelp}
                                            onChange = {onChangeEdTelp}
                                            />
                                            <FormText color="danger">{edTelpHelp}</FormText>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </ModalBody>
                            <ModalFooter 
                            // style={{backgroundColor: "#100906"}}
                            >
                            <Button size="sm" color="secondary" onClick={toggleEdit}>Tutup</Button>
                            <Button size="sm" color="info" onClick={editNow}>Simpan</Button>
                            </ModalFooter>
                            </form>
                        </Modal>
                        <Button round outline color="default" className="btn-sm" onClick={toggleGantiPass}><i className="fas fa-key fa-xs"></i> Ganti Password</Button>
                        <Modal isOpen={gantiPass} toggle={toggleGantiPass} className="modal-sm">
                            <ModalHeader toggle={toggleGantiPass}
                            style={{backgroundImage: "linear-gradient(to bottom right, #23150d,#845f3e)",
                            color: "#ffffff"}}>Ganti Password</ModalHeader>
                            <form>
                            <ModalBody>
                                <FormGroup className="mb-3">
                                    <Label for="password">Passwod Sekarang</Label>
                                    <Input type="password" name="password" id="password" placeholder="Password saat ini ..."
                                    value = {passNow}
                                    onChange = {onChangePassNow}
                                    />
                                    <FormText color="danger">{passNowHelp}</FormText>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <Label for="newpassword">Password Baru</Label>
                                    <Input type="password" name="newpassword" id="newpassword" placeholder="Password baru ..."
                                    value = {newPass}
                                    onChange = {onChangeNewPass}
                                    />
                                    <FormText color="danger">{newPassHelp}</FormText>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <Label for="cpassword">Konfirmasi Password Baru</Label>
                                    <Input type="password" name="cpassword" id="cpassword" placeholder="Konfirmasi password baru ..."
                                    value = {confirmPass}
                                    onChange = {onChangeConfirmPass}
                                    />
                                    <FormText color="danger">{confirmPassHelp}</FormText>
                                </FormGroup>
                            </ModalBody>
                            <ModalFooter>
                            <Button type="reset" size="sm" color="secondary" onClick={toggleGantiPass}>Tutup</Button>
                            <Button size="sm" color="info" onClick={editPassNow}>Simpan</Button>
                            </ModalFooter>
                            </form>
                        </Modal>
                    </p>
                </div>
                <hr />
                <div className="button-container">
                    <Row>
                        <Col xs="12" sm="4" className="ml-auto" >
                        <h5>
                            Rp {saldo},- <br />
                            <small>SALDO</small>
                        </h5>
                        </Col>
                        <Col  xs="12" sm="4" className="ml-auto mr-auto" >
                        <h5>
                            Rp {denda},- <br />
                            <small>DENDA</small>
                        </h5>
                        </Col>
                        <Col  xs="12" sm="4" className="mr-auto">
                        <h5>
                            {donasi} <br />
                            <small>DONASI</small>
                        </h5>
                        </Col>
                    </Row>
                </div>
                {/* <p className="description text-center">
                "I like the way you work it <br />
                No diggity <br />I wanna bag it up"
                </p> */}
            </CardBody>
        </Card>
    </div>
  );
}

export default CardProfil;
