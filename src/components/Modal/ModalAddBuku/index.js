import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from "reactstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
const ModalAddBuku = (props) => {
  const { buttonLabel, classButton, modalName, className } = props;
  const [kodeBuku, setKodeBuku] = useState("");
  const [labelKode, setLabelKode] = useState("");
  const [judulBuku, setJudul] = useState("");
  const [labelJudul, setLabelJudul] = useState("");
  const [pengarangBuku, setPengarang] = useState("");
  const [labelPengarang, setLabelPengarang] = useState("");
  const [penerbitBuku, setPenerbit] = useState("");
  const [labelPenerbit, setLabelPenerbit] = useState("");
  const [tanggalTerbit, setTanggal] = useState("");
  const [labelTanggal, setLabelTanggal] = useState("");
  const [isbnBuku, setISBN] = useState("");
  const [labelISBN, setLabelISBN] = useState("");
  const [kategoriBuku, setKategori] = useState("");
  const [labelKategori, setLabelKategori] = useState("");
  const [genreBuku, setGenre] = useState("");
  const [labelGenre, setLabelGenre] = useState("");
  const [halamanBuku, setHalaman] = useState("");
  const [labelHalaman, setLabelHalaman] = useState("");
  const [jumlahBuku, setJumlah] = useState("");
  const [labelJumlah, setLabelJumlah] = useState("");
  const [hargaBuku, setHarga] = useState("");
  const [labelHarga, setLabelHarga] = useState("");
  const [lokasiBuku, setLokasi] = useState("");
  const [labelLokasi, setLabelLokasi] = useState("");
  const [deskripsiBuku, setDeskripsi] = useState("");
  const [labelDeskripsi1, setLabelDeskripsi] = useState("");
  const [userBuku, setUser] = useState("");
  const [labelUser, setLabelUser] = useState("");
  const [sampulBuku, setSampul] = useState("");
  const [labelSampul, setLabelSampul] = useState("");
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const onChangeKodeBuku = (event) => {
    setKodeBuku(event.target.value);
  };
  const onChangeJudul = (event) => {
    setJudul(event.target.value);
  };
  const onChangePengarang = (event) => {
    setPengarang(event.target.value);
  };
  const onChangePenerbit = (event) => {
    setPenerbit(event.target.value);
  };
  const onChangeTanggal = (event) => {
    setTanggal(event.target.value);
  };
  const onChangeISBN = (event) => {
    setISBN(event.target.value);
  };
  const onChangeKategori = (event) => {
    setKategori(event.target.value);
  };
  const onChangeGenre = (event) => {
    setGenre(event.target.value);
  };
  const onChangeHalaman = (event) => {
    setHalaman(event.target.value);
  };
  const onChangeJumlah = (event) => {
    setJumlah(event.target.value);
  };
  const onChangeHarga = (event) => {
    setHarga(event.target.value);
  };
  const onChangeLokasi = (event) => {
    setLokasi(event.target.value);
  };
  const onChangeDeskripsi = (event) => {
    setDeskripsi(event.target.value);
  };
  const onChangeUser = (event) => {
    setUser(event.target.value);
  };
  const onChangeSampul = (event) => {
    setSampul(event.target.value);
  };
  const handleAdd = () => {
    var isValid = true;
    if (kodeBuku === "") {
      isValid = false;
      setLabelKode("Tidak boleh kosong");
    } else {
      setLabelKode("");
    }
    if (judulBuku === "") {
      isValid = false;
      setLabelJudul("Tidak boleh kosong");
    } else {
      setLabelJudul("");
    }
    if (pengarangBuku === "") {
      isValid = false;
      setLabelPengarang("Tidak boleh kosong");
    } else {
      setLabelPengarang("");
    }
    if (penerbitBuku === "") {
      isValid = false;
      setLabelPenerbit("Tidak boleh kosong");
    } else {
      setLabelPenerbit("");
    }
    if (tanggalTerbit === "") {
      isValid = false;
      setLabelTanggal("Tidak boleh kosong");
    } else {
      setLabelTanggal("");
    }
    if (isbnBuku === "") {
      isValid = false;
      setLabelISBN("Tidak boleh kosong");
    } else {
      setLabelISBN("");
    }
    if (kategoriBuku === "") {
      isValid = false;
      setLabelKategori("Tidak boleh kosong");
    } else {
      setLabelKategori("");
    }
    if (genreBuku === "") {
      isValid = false;
      setLabelGenre("Tidak boleh kosong");
    } else {
      setLabelGenre("");
    }
    if (halamanBuku === "") {
      isValid = false;
      setLabelHalaman("Tidak boleh kosong");
    } else {
      setLabelHalaman("");
    }
    if (jumlahBuku === "") {
      isValid = false;
      setLabelJumlah("Tidak boleh kosong");
    } else {
      setLabelJumlah("");
    }
    if (hargaBuku === "") {
      isValid = false;
      setLabelHarga("Tidak boleh kosong");
    } else {
      setLabelHarga("");
    }
    if (lokasiBuku === "") {
      isValid = false;
      setLabelLokasi("Tidak boleh kosong");
    } else {
      setLabelLokasi("");
    }
    if (deskripsiBuku === "") {
      isValid = false;
      setLabelDeskripsi("Tidak boleh kosong");
    } else {
      setLabelDeskripsi("");
    }
    if (userBuku === "") {
      isValid = false;
      setLabelUser("Tidak boleh kosong");
    } else {
      setLabelUser("");
    }
    if (sampulBuku === "") {
      isValid = false;
      setLabelSampul("Tidak boleh kosong");
    } else {
      setLabelSampul("");
    }
    if (isValid === true) {
      MySwal.fire({
        title: "Berhasil!!!",
        icon: "success",
        text: "Berhasil Menambahkan Buku",
      }).then(toggle());
    }
  };
  return (
    <div>
      <Button className={classButton} onClick={toggle}>
        {buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader
          toggle={toggle}
          style={{
            backgroundImage: "linear-gradient(to left, #44a08d, #093637)",
            color: "#ffffff",
          }}
        >
          {modalName}
        </ModalHeader>
        <ModalBody>
          <div className="px-5">
            <Form>
              <label>Kode Buku</label>
              <span className="font-weight-lighter ml-3 ml-3" id="labelKode">
                {labelKode}
              </span>
              <div className="input-group" id="formtambahBuku" method="post">
                <input
                  type="text"
                  className="form-control"
                  id="a"
                  placeholder="Kode Buku"
                  onChange={onChangeKodeBuku}
                  value={kodeBuku}
                ></input>
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-keyboard"></span>
                  </div>
                </div>
              </div>
              <label>Judul</label>
              <span className="font-weight-lighter ml-3" id="labelJudul1">
                {labelJudul}
              </span>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="judulBuku"
                  placeholder="Judul"
                  value={judulBuku}
                  onChange={onChangeJudul}
                ></input>
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-heading"></span>
                  </div>
                </div>
              </div>
              <label>Pengarang</label>
              <span className="font-weight-lighter ml-3" id="labelPengarang">
                {labelPengarang}
              </span>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="pengarangBuku"
                  placeholder="Pengarang"
                  value={pengarangBuku}
                  onChange={onChangePengarang}
                ></input>
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-pen"></span>
                  </div>
                </div>
              </div>
              <label>Penerbit</label>
              <span className="font-weight-lighter ml-3" id="labelPenerbit">
                {labelPenerbit}
              </span>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="penerbitBuku"
                  placeholder="Penerbit"
                  value={penerbitBuku}
                  onChange={onChangePenerbit}
                ></input>
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-print"></span>
                  </div>
                </div>
              </div>
              <label>Tanggal Terbit</label>
              <span className="font-weight-lighter ml-3" id="labelTanggal">
                {labelTanggal}
              </span>
              <div className="input-group">
                <div className="input-group date" data-provide="datepicker">
                  <input
                    type="date"
                    className="form-control pull-right"
                    id="datepicker"
                    placeholder="Tanggal"
                    value={tanggalTerbit}
                    onChange={onChangeTanggal}
                  ></input>
                  <div className="input-group-append">
                    <div className="input-group-text"></div>
                  </div>
                </div>
              </div>
              <label>ISBN</label>
              <span className="font-weight-lighter ml-3" id="labelISBN">
                {labelISBN}
              </span>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="isbnBuku"
                  placeholder="ISBN"
                  value={isbnBuku}
                  onChange={onChangeISBN}
                ></input>
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-barcode"></span>
                  </div>
                </div>
              </div>
              <label>Kategori</label>
              <span className="font-weight-lighter ml-3" id="labelKategori1">
                {labelKategori}
              </span>
              <div className="input-group">
                <select
                  className="custom-select"
                  id="kategoriBuku1"
                  value={kategoriBuku}
                  onChange={onChangeKategori}
                >
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
              <span className="font-weight-lighter ml-3" id="labelGenre1">
                {labelGenre}
              </span>
              <div className="input-group">
                <select
                  className="custom-select"
                  id="genreBuku1"
                  value={genreBuku}
                  onChange={onChangeGenre}
                >
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
              <span className="font-weight-lighter ml-3" id="labelHalaman">
                {labelHalaman}
              </span>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  id="halamanBuku"
                  placeholder="Jumlah Halaman"
                  value={halamanBuku}
                  onChange={onChangeHalaman}
                ></input>
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-sort-numeric-up"></span>
                  </div>
                </div>
              </div>
              <label>Jumlah</label>
              <span className="font-weight-lighter ml-3" id="labelJumlah1">
                {labelJumlah}
              </span>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  id="jumlahBuku1"
                  placeholder="Jumlah Buku"
                  value={jumlahBuku}
                  onChange={onChangeJumlah}
                ></input>
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-calculator"></span>
                  </div>
                </div>
              </div>
              <label>Harga</label>
              <span className="font-weight-lighter ml-3" id="labelHarga1">
                {labelHarga}
              </span>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  id="hargaBuku1"
                  placeholder="Harga Buku"
                  value={hargaBuku}
                  onChange={onChangeHarga}
                ></input>
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-dollar-sign"></span>
                  </div>
                </div>
              </div>
              <label>Lokasi</label>
              <span className="font-weight-lighter ml-3" id="labelLokasi1">
                {labelLokasi}
              </span>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="lokasiBuku1"
                  placeholder="Lokasi Buku"
                  value={lokasiBuku}
                  onChange={onChangeLokasi}
                ></input>
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-map-marker-alt"></span>
                  </div>
                </div>
              </div>
              <label>Deskripsi</label>
              <span className="font-weight-lighter ml-3" id="labelDeskripsi1">
                {labelDeskripsi1}
              </span>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="deskripsiBuku1"
                  placeholder="Deskripsi Buku"
                  value={deskripsiBuku}
                  onChange={onChangeDeskripsi}
                ></input>
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-info"></span>
                  </div>
                </div>
              </div>
              <label>User</label>
              <span className="font-weight-lighter ml-3" id="labelUsername">
                {labelUser}
              </span>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="usernameBuku"
                  placeholder="Kosongkan jika bukan donasi"
                  value={userBuku}
                  onChange={onChangeUser}
                ></input>
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user"></span>
                  </div>
                </div>
              </div>
              <label>Sampul Buku</label>
              <span className="font-weight-lighter ml-3" id="labelSampul">
                {labelSampul}
              </span>
              <div className="input-group">
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="sampulBuku"
                    value={sampulBuku}
                    onChange={onChangeSampul}
                  ></input>
                  <label className="custom-file-label" for="sampulBuku">
                    Choose file
                  </label>
                </div>
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-upload pr-2"></span>
                  </div>
                </div>
              </div>
              <ModalFooter>
                <Button
                  type="button"
                  onClick={() => handleAdd()}
                  color="primary"
                >
                  Add
                </Button>{" "}
              </ModalFooter>
            </Form>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ModalAddBuku;
