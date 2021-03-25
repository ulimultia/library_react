import React from 'react';
import { MDBDataTableV5, MDBBtn } from 'mdbreact';
import Buku from '../../../assets/data/Buku'
import Button from "../../Button";
import ModalEditBuku from "../../../components/Modal/ModalEditBuku/index"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)
const bukuAttributes = []


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
          MySwal.fire("Success", "Buku "+Buku[id1].judul+" Berhasil Dihapus!", "success").then(() => {
        });
        }
      });
};
let number=0;
Buku.forEach(el => {
    
    bukuAttributes.push({
        no: number=number+1,
        sampul: <img src={el.sampul}></img>,
        kode: el.kode,
        judul: el.judul,
        kategori: el.kategori,
        genre: el.genre,
        harga: el.harga,
        jumlah: el.jumlah,
        lokasi: el.lokasi,
        action: <><ModalEditBuku classButtonModal="btn btn-success btn-sm fa fa-edit" id={el.id} modalName={el.id} judulBuku={el.judul} kategoriBuku={el.kategori} genreBuku={el.genre} hargaBuku={el.harga} jumlahBuku={el.jumlah} lokasiBuku={el.lokasi}></ModalEditBuku> <Button handleClick={() => handleDelete(el.id - 1)} classButton="btn btn-danger btn-sm fa fa-trash"></Button></>
    })
});

    
  

function TabelBuku(){


    
    
    const [datatable, setDatatable] = React.useState({
        columns: [
            {
                label: 'No',
                field: 'no',
                width: 30,        
            },
            {
                label: 'Sampul',
                field: 'sampul',
                width: 150,
                attributes: {
                    'aria-controls': 'DataTable',
                    'aria-label': 'Sampul',
                },
            },
            {
                label: 'Kode',
                field: 'kode',
                width: 150,
            },
            {
                label: 'Judul',
                field: 'judul',
                width: 200,
            },
            {
                label: 'Kategori',
                field: 'kategori',
                // sort: 'disabled',
                width: 150,
            },
            {
                label: 'Genre',
                field: 'genre',
                // sort: 'disabled',
                width: 150,
            },
            {
                label: 'Harga',
                field: 'harga',
                // sort: 'disabled',
                width: 150,
            },
            {
                label: 'Jumlah',
                field: 'jumlah',
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
        rows: bukuAttributes,
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

export default TabelBuku;