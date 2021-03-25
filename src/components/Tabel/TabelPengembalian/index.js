import React from 'react';
import { MDBDataTableV5, MDBBtn } from 'mdbreact';
import Pinjaman from '../../../assets/data/Pinjaman'
import Button from "../../Button";
import ModalEditUser from "../../../components/Modal/ModalEditUser/index"
import ModalTopupUser from "../../../components/Modal/ModalTopupUser/index"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import ButtonToggle from 'reactstrap/lib/ButtonToggle';

const MySwal = withReactContent(Swal)
const pinjamanAttribute = []
const handlePengembalian = (id) => {

    if (Pinjaman[id].denda != 0) {
        MySwal.fire({
          title: "Are you sure?",
          text:
            "Denda sejumlah " +
            Pinjaman[id].denda +
            " akan dibebankan pada user " +
            Pinjaman[id].user,
          icon: "warning",
          buttons: true,
        }).then((willDelete) => {
          if (willDelete) {
            MySwal.fire(
              "Success",
              "Silahkan meletakkan buku pada rak " + Pinjaman[id].lokasi,
              "success"
            );
          }
        });
      } else {
        MySwal.fire({
          title: "Are you sure?",
          icon: "warning",
          buttons: true,
        }).then((willDelete) => {
          if (willDelete) {
            MySwal.fire(
              "Success",
              "Silahkan meletakkan buku pada rak " + Pinjaman[id].lokasi,
              "success"
            );
          }
        });
      }
};
let number=0;
Pinjaman.forEach(el => {
  pinjamanAttribute.push({
    no: number=number+1,
    kode: el.kode,
    judul: el.judul,
    user: el.user,
    kadaluarsa: el.tanggal_kadaluarsa,
    denda: el.denda,
    lokasi: el.lokasi,
    action: <Button handleClick={() => handlePengembalian(el.id - 1)} classButton="btn btn-warning btn-sm fa fa-exchange-alt"></Button>,

  })
});
function TabelPengembalian() {


  const [datatable, setDatatable] = React.useState({
    columns: [
      {
        label: 'No',
        field: 'no',
        width: 30,
      },
      {
        label: 'Kode',
        field: 'kode',
        width: 150,
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'Kode',
        },
      },
      {
        label: 'Judul',
        field: 'judul',
        width: 150,
      },
      {
        label: 'Peminjam',
        field: 'user',
        width: 100,
      },
      {
        label: 'Kadaluarsa',
        field: 'kadaluarsa',
        // sort: 'disabled',
        width: 150,
      },
      {
        label: 'Denda',
        field: 'denda',
        // sort: 'disabled',
        width: 150,
      },
      {
        label: 'Lokasi',
        field: 'lokasi',
        // sort: 'disabled',
        width: 150,
      },
      {
        label: 'Action',
        field: 'action',
        // sort: 'disabled',
        width: 150,
      },

    ],
    rows: pinjamanAttribute,
  });

  const widerData = {
    columns: [
      ...datatable.columns.map((col) => {
        col.maxWidth = 200;
        return col;
      }),
    ],
    rows: [...datatable.rows],
  };

  return (
    <MDBDataTableV5 striped small
      hover
      scrollX data={widerData}
      entriesOptions={[10, 20, 25]}
      entries={10}
      pagesAmount={4}
      data={datatable}
      //   pagingTop
      searchTop
      searchBottom={false}
      barReverse
    />
  );
}

export default TabelPengembalian