import React, { useState } from 'react';
import { MDBDataTableV5} from 'mdbreact';
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {Row, Col, Button}from 'reactstrap';
import ModalForm from "components/DataMaster/TabelKategori/ModalKategori"

const MySwal = withReactContent(Swal)

const TabelKategori = (props) => {
  const {dataKategori} = props
  const newKategori = []
  
  console.log("data dari props");
  console.log(dataKategori);
  console.log("new Kategori");
  console.log(newKategori);

  // konfirmasi hapus
  const handleDelete = (id) => {
    MySwal.fire({
      title: "Anda Yakin?",
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        axios.delete('http://localhost:8080/api/v1/kategori/delete/' + id)
        MySwal.fire("Success", "Data berhasil dihapus ...", "success").then(() => {
        });
        window.location.reload()
      }
    });
  };

  
  dataKategori.map((value, key) => {
    return(
      console.log("test" + key),
      newKategori.push({
        no: key + 1,
        kategori: value.namaKategori,
        kode: value.kodeKategori,
        aksi:   <Row>
                  <Col sm="6">
                    <ModalForm
                      idKategori = {value.id}
                      namaKategori = {value.namaKategori}
                      buttonLabel = ""
                      className = "modal-sm"
                      colorButton = "primary"
                      classButton = "btn-sm"
                      classIcon = "fas fa-pen-square"
                      buttonType = "edit"
                    />
                  </Col>
                  <Col sm="6">
                    <Button className="btn btn-sm btn-danger" onClick={() => handleDelete(value.id)}><i className="fas fa-trash"></i></Button>
                  </Col>
                </Row>
      })
    )
  })

  const columTable = [
    {
      label: '#',
      field: 'no',
      width: 40
    },
    {
      label: 'Kategori',
      field: 'kategori',
       width: 400
    },
    {
      label: 'Kode Kategori',
      field: 'kode',
      width: 200
    },
    {
      label: 'Aksi',
      field: 'aksi',
      width: 100
    }
  ]

  const data = {
    columns: [
        ...columTable
    ],
    rows: [...newKategori],
  };

  return (
    <MDBDataTableV5 
        striped 
        small
        hover
        scrollX 
        data = {data}
        entriesOptions={[10, 20, 25]}
        entries={10}
        pagesAmount={4}
        searchTop
        searchBottom={false}
        barReverse
        order={['no', 'asc' ]}
    />
  );
}

export default TabelKategori