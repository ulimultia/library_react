import React from 'react';
import {
  Card, CardBody,
  Row, Col, Button
} from "reactstrap";
import TabelKategori from "components/DataMaster/TabelKategori"
import ModalForm from "components/DataMaster/TabelKategori/ModalKategori"
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal) 

class Kategori extends React.Component {
    constructor(props) {
        super(props);
        this.getAllKategori = this.getAllKategori.bind()
        this.state = {
            categories: [],
            newCategories: []
        }
    }

    async componentDidMount() {
        // await this.authHeader();
        console.log("didmount");
        await this.getAllKategori()
        console.log("isi get all");
        console.log(this.categories);
        // this.handleGetAll(this.categories);
    }

    getAllKategori = () =>{
        axios.get('http://localhost:8080/api/v1/kategori/all')
        .then((response) => {
            // console.log(response)
            this.setState({
                categories: response.data.data
            })
            console.log("axios get all")
        })
    }

    render() {
        console.log("rendering html");
    
        const { newCategories } = this.state
        
        return (

            <>
            <div className="content">
                <Row>
                    <Col xs="12" sm="12">
                    <Card>
                        <CardBody>
                            <Row>
                                <Col xs="12" sm="12" className = "text-right">
                                    <ModalForm
                                        idKategori = ""
                                        namaKategori = ""
                                        buttonLabel = "Tambah"
                                        className = "modal-sm"
                                        colorButton = "primary"
                                        classButton = "btn-sm"
                                        classIcon = "fas fa-plus"
                                        buttonType = "add"
                                    />
                                </Col>
                            </Row>
                            <hr/>
                            <TabelKategori mx="4"
                                dataKategori = {this.state.categories}
                            />
                        </CardBody>
                    </Card>

                    </Col>
                </Row>
            </div>
        </>
        );
    }
}

export default Kategori;
