import React, { useState, useEffect, useRef } from "react";
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

const ModalEditBuku = (props) => {
  const {
    idDetail,
    judulBuku,
    kategoriBuku,
    genreBuku,
    hargaBuku,
    pengarangBuku,
    tahunTerbit,
    isbnBuku,
    deskripsiBuku,
    lokasiBuku,
    penerbitBuku,
    buttonLabel,
    className,
    classButtonModal,
    modalName,
    modal,
    onClickToggle,
    onChangeModal,
    getAll,
    sampulModal,
  } = props;
  const sampulDefault = useRef();
  const [labelJudul, setLabelJudul] = useState("");
  const [labelKategori, setLabelKategori] = useState("");
  const [labelGenre, setLabelGenre] = useState("");
  const [labelHarga, setLabelHarga] = useState("");
  const [labelLokasi, setLabelLokasi] = useState("");
  const [labelPengarang, setLabelPengarang] = useState("");
  const [labelTahunTerbit, setLabelTahunTerbit] = useState("");
  const [labelIsbn, setLabelIsbn] = useState("");
  const [labelPenerbit, setLabelPenerbit] = useState("");
  const [arrayKategori, setArrayKategori] = useState([]);
  const [arrayGenre, setArrayGenre] = useState([]);
  const [arrayPenerbit, setArrayPenerbit] = useState([]);
  const [arrayLokasi, setArrayLokasi] = useState([]);
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [file64, setBaseFile] = useState(null);

  //   console.log("id buku : " + idDetail);

  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/kategori/all").then((response) => {
      setArrayKategori(response.data.data);
    });
    axios.get("http://localhost:8080/api/v1/genre/all").then((response) => {
      setArrayGenre(response.data.data);
    });
    axios.get("http://localhost:8080/api/v1/penerbit/all").then((response) => {
      setArrayPenerbit(response.data.data);
    });
    axios.get("http://localhost:8080/api/v1/lokasi/all").then((response) => {
      setArrayLokasi(response.data.data);
    });
  }, []);
  const getFiles = () => {
    axios.get("http://localhost:8080/api/v1/files").then((res) => {
      console.log(res);
      setFiles(null);
      setFiles(res.data);
    });
  };
  const postFiles = async (e) => {
    // e.preventDefault();
    console.log(file);
    const data = new FormData();
    data.append("file", file);

    await axios
      .post("http://localhost:8080/api/v1/files/uploadsampul", data)
      .then((res) => {
        console.log(res.data.name);
        setFiles(res.data.name);
        // getFiles();
        setFile(null);
      });
  };
  const postfile = () => {
    postFiles();
  };
  const fileChange = async (e) => {
    console.log(e.target.files);
    console.log(e);
    console.log(file);

    await setFile(e.target.files[0]);
    // await setFiles([]);
    // await this.setState({
    //   file: e.target.files[0],
    // });
    console.log(file);
  };
  const handleEdit = () => {
    console.log("id buku : " + idDetail);
    const kategoriObj = { ["id"]: kategoriBuku };
    const penerbitObj = { ["id"]: penerbitBuku };
    const lokasiObj = { ["id"]: lokasiBuku };
    const genreObj = { ["id"]: genreBuku };
    var isValid = true;

    if (judulBuku == "") {
      isValid = false;
      setLabelJudul("Tidak boleh kosong");
    } else {
      setLabelJudul("");
    }

    if (kategoriBuku == "") {
      isValid = false;
      setLabelKategori("Tidak boleh kosong");
    } else {
      setLabelKategori("");
    }

    if (genreBuku == "") {
      isValid = false;
      setLabelGenre("Tidak boleh kosong");
    } else {
      setLabelGenre("");
    }

    if (hargaBuku == "") {
      isValid = false;
      setLabelHarga("Tidak boleh kosong");
    } else {
      setLabelHarga("");
    }

    if (lokasiBuku == "") {
      isValid = false;
      setLabelLokasi("Tidak boleh kosong");
    } else {
      setLabelLokasi("");
    }

    if (file == null) {
      const fileNull = {
        id: idDetail,
        judul: judulBuku,
        pengarang: pengarangBuku,
        tahunTerbit: tahunTerbit,
        sampul: sampulModal,
        isbn: isbnBuku,
        harga: hargaBuku,
        deskripsi: deskripsiBuku,
        kategori: kategoriObj,
        penerbit: penerbitObj,
        lokasi: lokasiObj,
        genre: genreObj,
      };
      console.log(fileNull);
      axios
        .put("http://localhost:8080/api/v1/buku/edit/", fileNull)
        .then((response) => {
          console.log(response);
          MySwal.fire({
            title: "Berhasil!!!",
            icon: "success",
            text: "Berhasil Mengedit Buku",
          });
          onClickToggle();
          getAll();
        });
    }
    const data = new FormData();
    data.append("file", file);
    console.log(file);

    if (isValid === true) {
      axios
        .post("http://localhost:8080/api/v1/files/uploadsampul", data)
        .then((res) => {
          setFile(null);
          const editBuku = {
            id: idDetail,
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
          if (res.status == 200) {
            console.log(editBuku);
            axios
              .put("http://localhost:8080/api/v1/buku/edit/", editBuku)
              .then((response) => {
                MySwal.fire({
                  title: "Berhasil!!!",
                  icon: "success",
                  text: "Berhasil Mengedit Buku",
                });
                onClickToggle();
                getAll();
              });
          }
        });
    }
  };
  return (
    <div>
      {/* <Button className={classButtonModal} onClick={onClickToggle}>
        {buttonLabel}
      </Button> */}
      <Modal isOpen={modal} toggle={onClickToggle} className={className}>
        <ModalHeader
          toggle={onClickToggle}
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
              <label className="col-form-label">Judul</label>
              <span className="font-weight-lighter ml-3" id="labelJudul">
                {labelJudul}
              </span>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="judulBuku"
                  name="judul"
                  value={judulBuku}
                  onChange={onChangeModal}
                ></input>
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-heading"></span>
                  </div>
                </div>
              </div>

              <label className="col-form-label">Pengarang</label>
              <span className="font-weight-lighter ml-3" id="labelJudul">
                {labelPengarang}
              </span>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="pengarang"
                  name="pengarang"
                  value={pengarangBuku}
                  onChange={onChangeModal}
                ></input>
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user"></span>
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
                  name="tahunTerbit"
                  value={tahunTerbit}
                  onChange={onChangeModal}
                ></input>
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-calendar"></span>
                  </div>
                </div>
              </div>

              <label className="col-form-label">ISBN</label>
              <span className="font-weight-lighter ml-3" id="labelJudul">
                {labelIsbn}
              </span>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="isbn"
                  name="isbn"
                  value={isbnBuku}
                  onChange={onChangeModal}
                ></input>
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-calendar"></span>
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
                  onChange={onChangeModal}
                >
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
                  onChange={onChangeModal}
                >
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
                  onChange={onChangeModal}
                >
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
                  onChange={onChangeModal}
                >
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
              <label for="tanggallahir" className="col-form-label">
                Harga:
              </label>
              <span className="font-weight-lighter ml-3" id="labelHarga">
                {labelHarga}
              </span>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  id="hargaBuku"
                  name="harga"
                  value={hargaBuku}
                  onChange={onChangeModal}
                ></input>
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-dollar-sign"></span>
                  </div>
                </div>
              </div>
              <label>Sampul Buku</label>
              <span
                className="font-weight-lighter ml-3"
                id="labelSampul"
              ></span>
              <div className="input-group">
                <div className="custom-file">
                  <input
                    type="file"
                    className="form-control-file"
                    id="sampulBuku"
                    // ref={sampulModal}
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
              {/* <FileUpload
              
              ></FileUpload> */}
              <ModalFooter>
                <Button
                  type="button"
                  onClick={() => handleEdit()}
                  color="primary"
                >
                  Edit
                </Button>{" "}
              </ModalFooter>
            </Form>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ModalEditBuku;
