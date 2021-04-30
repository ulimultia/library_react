import React from 'react';
import { MDBDataTableV5 } from 'mdbreact';

function TabelRiwayat(props) {
  const {data} = props
  const [datatable, setDatatable] = React.useState({
    columns: [
      {
        label: '#',
        field: 'no',
        width: 20,
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': '#',
        },
      },
      {
        label: 'Kode Buku',
        field: 'kode',
        width: 150,
      },
      {
        label: 'Judul Buku',
        field: 'judul',
        width: 200,
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'Judul Buku',
        },
      },
      {
        label: 'Tanggal Pinjam',
        field: 'tanggal_pinjam',
        width: 150,
      },
      {
        label: 'Tanggal Kembali',
        field: 'tanggal_kembali',
        // sort: 'asc',
        width: 150,
      },
      {
        label: 'Denda',
        field: 'denda',
        // sort: 'disabled',
        width: 150,
      },
      {
        label: 'Status',
        field: 'status',
        sort: 'disabled',
        width: 100,
      },
    ],
    rows: [
      {
        no: '1',
        kode: 'AAC-1',
        judul: 'Ayat Ayat Cinta',
        tanggal_pinjam: '12-01-2020',
        tanggal_kembali: '25-01-2020',
        denda: '3000',
        status: 'selesai',
      },
      {
        no: '2',
        kode: 'NVL-1',
        judul: 'Laskar Pelangi',
        tanggal_pinjam: '12-01-2020',
        tanggal_kembali: '19-01-2020',
        denda: '0',
        status: 'selesai',
      },
      {
        no: '3',
        kode: 'NVL-1',
        judul: 'Doraemon Volume 1',
        tanggal_pinjam: '20-02-2020',
        tanggal_kembali: '25-03-2020',
        denda: '10000',
        status: 'selesai',
      },
      
    ],
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

export default TabelRiwayat