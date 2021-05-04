import axios from "axios";
import { MDBDataTableV5 } from "mdbreact";
import React from "react";

// reactstrap components
import {
  Card,CardHeader,CardBody,CardTitle,
  Table,Row,Col,
} from "reactstrap";

class SaldoLog extends React.Component {
    constructor(props){
        super(props);
        // this.getAllSaldoLog = this.getAllSaldoLog.bind()
        this.state = {
            saldoLogs: [],
            data: {},
            rowTable: [],
            columnTable: [{ label: 'Aktivitas Saldo', field: 'rincian'}]
        }
    }

    componentDidMount(){
        this.getAllSaldoLog()
    }

    // get all data 
    getAllSaldoLog = () => {
        let sessionData = JSON.parse(localStorage.getItem("userdata"))
        let idUser = sessionData.data.id

        axios.get('http://localhost:8080/api/v1/user/riwayat/saldo/' + idUser)
        .then(response => {
            this.setState({
                saldoLogs: response.data.data
            })
            this.state.saldoLogs.map((value, key) => {
                return(
                    this.state.rowTable.push({
                        rincian:    <div>
                                        <Row>
                                            <Col xs="5" sm="6">
                                                <b style={{fontSize: "24px"}}>{value.statusTransaksi.name}</b>  <br/>
                                            </Col>
                                            <Col xs="7" sm="6" className="text-right">
                                                <h5>{this.handleDebitKredit(value)}</h5>
                                            </Col>
                                            <Col xs="12" className="mt-0">
                                                {this.handleTgl(value.tanggal)}<br/>
                                                <i className="fas fa-money-bill-alt"></i> Total Saldo: Rp {value.saldo},-
                                            </Col>

                                        </Row>
                                    </div>,
                    })
                )
            })
            this.setState({
                data: {
                    columns: [
                        ...this.state.columnTable
                    ],
                    rows: [...this.state.rowTable]
                }
            })
        })
    }
    // handle return debit and kredit
    handleDebitKredit = (value) => {
        if(value.kredit !== null || value.kredit > 0){
            return "+ Rp " + value.kredit + ",-"
        }
        else if(value.debit !== null || value.debit > 0){
            return "- Rp " + value.debit + ",-"
        }
    }
    handleTgl = (tgl) => {
        if(tgl === null) return "-";
        else return new Intl.DateTimeFormat('en-GB', {dateStyle: 'full', timeStyle: 'medium'}).format(new Date(tgl))
    }
    render() {
        return (
        <>
            <div className="content">
            <Row>
                <Col md="12">
                <Card>
                    {/* <CardHeader>
                    <CardTitle tag="h4">Simple Table</CardTitle>
                    </CardHeader> */}
                    <CardBody>
                        <MDBDataTableV5 
                            striped 
                            small
                            hover
                            // scrollX 
                            data = {this.state.data}
                            entriesOptions={[10, 25, 50]}
                            entries={10}
                            pagesAmount={4}
                            // searchTop
                            searchBottom={false}
                            // barReverse
                            // order={['no', 'asc' ]}
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

export default SaldoLog;
