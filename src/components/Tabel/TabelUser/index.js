import React from 'react';
import { MDBDataTableV5, MDBBtn } from 'mdbreact';
import User from '../../../assets/data/User'
import Button from "../../Button";
import ModalEditUser from "../../../components/Modal/ModalEditUser/index"
import ModalTopupUser from "../../../components/Modal/ModalTopupUser/index"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import ButtonToggle from 'reactstrap/lib/ButtonToggle';

const MySwal = withReactContent(Swal)
const userAttributes = []


const handleDelete = (id1) => {

  MySwal.fire({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover the data!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      MySwal.fire("Success", "Berhasil Menghapus Data "+User[id1].nama, "success").then(() => {
    });
    }
  });
};

const handleReset = (id) => {

  MySwal.fire({
    title: "Are you sure?",
    text: "Password akan direset ke pengaturan default!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      MySwal.fire("Success", "Berhasil Mereset Password "+User[id].nama, "success").then(() => {
        
    });
    }
  });
};
let number=0;
User.forEach(el => {
  userAttributes.push({
    no: number=number+1,
    nama: el.nama,
    kelamin: el.kelamin,
    ttl: el.tempat + ", " + el.tanggal_lahir,
    alamat: el.alamat,
    action: <><ModalEditUser classButtonModal="btn btn-success btn-sm fa fa-edit" id={el.id} modalName={el.id} nama={el.nama} kelamin={el.kelamin} tempat={el.tempat} tanggal_lahir={el.tanggal_lahir} alamat={el.alamat}></ModalEditUser> <Button handleClick={() => handleDelete(el.id - 1)} classButton="btn btn-danger btn-sm fa fa-trash"></Button> <ModalTopupUser classButtonModal="btn btn-info btn-sm fa fa-money-bill-wave" modalName={el.id} namatopup={el.nama}></ModalTopupUser> <Button handleClick={() => handleReset(el.id - 1)} classButton="btn btn-warning btn-sm fa fa-key"></Button></>,

  })
});
function TabelUser() {


  const [datatable, setDatatable] = React.useState({
    columns: [
      {
        label: 'No',
        field: 'no',
        width: 30,
      },
      {
        label: 'Name',
        field: 'nama',
        width: 150,
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'Name',
        },
      },
      {
        label: 'Jenis Kelamin',
        field: 'kelamin',
        width: 120,
      },
      {
        label: 'ttl',
        field: 'ttl',
        width: 200,
      },
      {
        label: 'Alamat',
        field: 'alamat',
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
    rows: userAttributes,
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

export default TabelUser