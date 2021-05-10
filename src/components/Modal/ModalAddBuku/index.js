import React, { useState, useEffect } from "react";
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
import axios from "axios";

const MySwal = withReactContent(Swal);
const ModalAddBuku = (props) => {
  const {
    buttonLabel,
    classButton,
    modalName,
    className,
    onChangeModal,
    iconName,
    getAll,
  } = props;
  const [judulBuku, setJudul] = useState("");
  const [labelJudul, setLabelJudul] = useState("");
  const [pengarangBuku, setPengarang] = useState("");
  const [labelPengarang, setLabelPengarang] = useState("");
  const [penerbitBuku, setPenerbit] = useState("");
  const [labelPenerbit, setLabelPenerbit] = useState("");
  const [tahunTerbit, setTahunTerbit] = useState("");
  const [labelTahunTerbit, setLabelTahunTerbit] = useState("");
  const [isbnBuku, setISBN] = useState("");
  const [labelISBN, setLabelISBN] = useState("");
  const [kategoriBuku, setKategori] = useState("");
  const [labelKategori, setLabelKategori] = useState("");
  const [genreBuku, setGenre] = useState("");
  const [labelGenre, setLabelGenre] = useState("");
  const [hargaBuku, setHarga] = useState("");
  const [labelHarga, setLabelHarga] = useState("");
  const [lokasiBuku, setLokasi] = useState("");
  const [labelLokasi, setLabelLokasi] = useState("");
  const [deskripsiBuku, setDeskripsi] = useState("");
  const [labelDeskripsi1, setLabelDeskripsi] = useState("");
  const [sampulBuku, setSampul] = useState("");
  const [labelSampul, setLabelSampul] = useState("");
  const [arrayKategori, setArrayKategori] = useState([]);
  const [arrayGenre, setArrayGenre] = useState([]);
  const [arrayPenerbit, setArrayPenerbit] = useState([]);
  const [arrayLokasi, setArrayLokasi] = useState([]);
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [modal, setModal] = useState(false);
  const authHeader = () => {
    const user = JSON.parse(localStorage.getItem("userdata"));
    if (user && user.data.token) {
      return {
        authorization: `Bearer ${user.data.token}`,
      };
    } else {
      return null;
    }
  };
  useEffect(() => {
    const user = authHeader();
    axios
      .get("http://localhost:8080/api/v1/kategori/all", {
        headers: user,
      })
      .then((response) => {
        setArrayKategori(response.data.data);
      });
    axios
      .get("http://localhost:8080/api/v1/genre/all", {
        headers: user,
      })
      .then((response) => {
        setArrayGenre(response.data.data);
      });
    axios
      .get("http://localhost:8080/api/v1/penerbit/all", {
        headers: user,
      })
      .then((response) => {
        setArrayPenerbit(response.data.data);
      });
    axios
      .get("http://localhost:8080/api/v1/lokasi/all", {
        headers: user,
      })
      .then((response) => {
        setArrayLokasi(response.data.data);
      });
  }, []);
  const toggle = () => setModal(!modal);

  const onChangeJudul = (event) => {
    setJudul(event.target.value);
  };
  const onChangePengarang = (event) => {
    setPengarang(event.target.value);
  };
  const onChangePenerbit = (event) => {
    setPenerbit(event.target.value);
  };
  const onChangeTahunTerbit = (event) => {
    setTahunTerbit(event.target.value);
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
  const onChangeHarga = (event) => {
    setHarga(event.target.value);
  };
  const onChangeLokasi = (event) => {
    setLokasi(event.target.value);
  };
  const onChangeDeskripsi = (event) => {
    setDeskripsi(event.target.value);
  };
  const onChangeSampul = (event) => {
    setSampul(event.target.value);
  };

  const postFiles = (e) => {
    const user = authHeader();

    const data = new FormData();
    data.append("file", file);

    axios
      .post("http://localhost:8080/api/v1/files/uploadsampul", data, {
        headers: user,
      })
      .then((res) => {
        console.log(res.data.name);
        setFiles(res.data.name);
        setFile(null);
      });
  };
  const fileChange = async (e) => {
    console.log(e.target.files);
    await setFile(e.target.files[0]);
    // await setFiles([]);
    // await this.setState({
    //   file: e.target.files[0],
    // });
    // await console.log(file);
  };
  const handleAdd = async () => {
    const user = authHeader();

    const kategoriObj = { ["id"]: kategoriBuku };
    const penerbitObj = { ["id"]: penerbitBuku };
    const lokasiObj = { ["id"]: lokasiBuku };
    const genreObj = { ["id"]: genreBuku };
    console.log("kategori obj: " + kategoriObj);
    var isValid = true;
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
    if (kategoriBuku == "") {
      isValid = false;
      setLabelKategori("Tidak boleh kosong");
    } else {
      setLabelKategori("");
    }
    if (penerbitBuku == "") {
      isValid = false;
      setLabelPenerbit("Tidak boleh kosong");
    } else {
      setLabelPenerbit("");
    }
    if (lokasiBuku == "") {
      isValid = false;
      setLabelLokasi("Tidak boleh kosong");
    } else {
      setLabelLokasi("");
    }
    if (genreBuku == "") {
      isValid = false;
      setLabelGenre("Tidak boleh kosong");
    } else {
      setLabelGenre("");
    }
    if (tahunTerbit === "") {
      isValid = false;
      setLabelTahunTerbit("Tidak boleh kosong");
    } else {
      setLabelTahunTerbit("");
    }
    if (isbnBuku === "") {
      isValid = false;
      setLabelISBN("Tidak boleh kosong");
    } else {
      setLabelISBN("");
    }
    if (hargaBuku === "") {
      isValid = false;
      setLabelHarga("Tidak boleh kosong");
    } else {
      setLabelHarga("");
    }

    if (deskripsiBuku === "") {
      isValid = false;
      setLabelDeskripsi("Tidak boleh kosong");
    } else {
      setLabelDeskripsi("");
    }
    const data = new FormData();
    data.append("file", file);
    if (file == null) {
      isValid = false;
      setLabelSampul("Tidak boleh kosong");
    } else {
      setLabelSampul("");
    }

    // console.log(files);
    if (isValid === true) {
      axios
        .post("http://localhost:8080/api/v1/files/uploadsampul", data, {
          headers: user,
        })
        .then((res) => {
          setFile(null);
          const tambahBuku = {
            judul: judulBuku,
            pengarang: pengarangBuku,
            tahunTerbit: tahunTerbit,
            sampul: res.data.name,
            isbn: isbnBuku,
            harga: hargaBuku,
            deskripsi: deskripsiBuku,
            kategori: kategoriObj,
            penerbit: penerbitObj,
            lokasi: lokasiObj,
            genre: genreObj,
          };
          axios
            .post("http://localhost:8080/api/v1/buku/add", tambahBuku, {
              headers: user,
            })
            .then((response) => {
              toggle();
              getAll();
              console.log(response);
            });
          MySwal.fire({
            title: "Berhasil!!!",
            icon: "success",
            text: "Berhasil Menambahkan Buku",
          });
        });
    }
  };
  return (
    <div>
      <Button
        className={classButton}
        onClick={toggle}
        style={{ backgroundColor: "navy" }}
      >
        <i className={iconName}></i>
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
              <label>Judul</label>
              <span className="font-weight-lighter ml-3" id="labelJudul">
                {labelJudul}
              </span>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Judul"
                  id="judul"
                  name="judul"
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

              <label className="col-form-label">Tahun Terbit</label>
              <span className="font-weight-lighter ml-3" id="labelJudul">
                {labelTahunTerbit}
              </span>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  id="tahunTerbit"
                  placeholder="Tahun Terbit"
                  name="tahunTerbit"
                  value={tahunTerbit}
                  onChange={onChangeTahunTerbit}
                ></input>
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-calendar"></span>
                  </div>
                </div>
              </div>
              <label>ISBN</label>
              <span className="font-weight-lighter ml-3" id="labelISBN">
                {labelISBN}
              </span>
              <div className="input-group">
                <input
                  type="number"
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
              <label for="labelKategori">Kategori</label>
              <span className="font-weight-lighter ml-3" id="labelKategori">
                {labelKategori}
              </span>
              <div className="input-group">
                <select
                  className="custom-select"
                  id="kategoriBuku"
                  name="kategori"
                  value={kategoriBuku}
                  onChange={onChangeKategori}
                >
                  <option selected value="">
                    Pilih Salah Satu
                  </option>
                  {arrayKategori.map((item) => (
                    <option value={item.id}>{item.namaKategori}</option>
                  ))}
                </select>
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-list mr-2"></span>
                  </div>
                </div>
              </div>
              <label for="labelKategori">Penerbit</label>
              <span className="font-weight-lighter ml-3" id="labelKategori">
                {labelPenerbit}
              </span>
              <div className="input-group">
                <select
                  className="custom-select"
                  id="penerbit"
                  name="penerbit"
                  value={penerbitBuku}
                  onChange={onChangePenerbit}
                >
                  <option selected value="">
                    Pilih Salah Satu
                  </option>
                  {arrayPenerbit.map((item) => (
                    <option value={item.id}>{item.namaPenerbit}</option>
                  ))}
                </select>
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-list mr-2"></span>
                  </div>
                </div>
              </div>

              <label for="labelKategori">Lokasi</label>
              <span className="font-weight-lighter ml-3" id="labelKategori">
                {labelLokasi}
              </span>
              <div className="input-group">
                <select
                  className="custom-select"
                  id="lokasi"
                  name="lokasi"
                  value={lokasiBuku}
                  onChange={onChangeLokasi}
                >
                  <option selected value="">
                    Pilih Salah Satu
                  </option>
                  {arrayLokasi.map((item) => (
                    <option value={item.id}>{item.kodeLokasi}</option>
                  ))}
                </select>
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-list mr-2"></span>
                  </div>
                </div>
              </div>
              <label for="labelGenre">Genre</label>
              <span className="font-weight-lighter ml-3" id="labelGenre">
                {labelGenre}
              </span>
              <div className="input-group">
                <select
                  className="custom-select"
                  id="genreBuku"
                  name="genre"
                  value={genreBuku}
                  onChange={onChangeGenre}
                >
                  <option selected value="">
                    Pilih Salah Satu
                  </option>
                  {arrayGenre.map((item) => (
                    <option value={item.id}>{item.namaGenre}</option>
                  ))}
                </select>
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-list mr-2"></span>
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

              <label>Sampul Buku</label>
              <span className="font-weight-lighter ml-3" id="labelSampul">
                {labelSampul}
              </span>
              <div className="input-group">
                <div className="custom-file">
                  <input
                    type="file"
                    className="form-control-file"
                    id="sampulBuku"
                    onChange={fileChange}
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
