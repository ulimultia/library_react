import React from 'react';
import { MDBDataTableV5, MDBBtn } from 'mdbreact';
import User from '../../../assets/data/User'
import Button from "../../Button";

const userAttributes = []

const handleEdit = (id) => {

    console.log(id);
  };
User.forEach(el => {
  userAttributes.push({
    nama: el.nama,
    kelamin: el.kelamin,
    ttl: el.tempat + ", " + el.tanggal_lahir,
    alamat: el.alamat,
    action: <Button handleClick={()=>handleEdit(el.id - 1)} classButton="btn-primary btn-success fa fa-edit"></Button>
  })
});
function TabelUser() {
  
  
  const [datatable, setDatatable] = React.useState({
    columns: [
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
        width: 270,
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