import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)
const ModalTopupUser = (props) => {
    const { id, namatopup, nominaltopup, buttonLabel, className,
        classButtonModal, modalName
    } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    const handleTopup = () => {

        MySwal.fire({
            title: "Berhasil!!!",
            icon: "success",
            text: "Berhasil Melakukan Topup",
        })
        toggle();
    };
    return (
        <div>
            <Button className={classButtonModal} onClick={toggle}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle} style={{backgroundImage: "linear-gradient(to left, #44a08d, #093637)",
                                    color: "#ffffff"}}>{modalName}</ModalHeader>
                <ModalBody>
                    <div className="px-5" >
                        <Form>
                        <label for="labelnamaTopup">Username Peminjam</label>
              <span className="font-weight-lighter ml-3" id="labelnamaTopup"></span>
              <div className="input-group">
                <input type="text" readonly="readonly" className="form-control" id="namatopup" value={namatopup}></input>
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user"></span>
                  </div>
                </div>
              </div>
              <label for="labelnominalTopup">Jumlah Deposit (Rp)</label>
              <span className="font-weight-lighter ml-3" id="labelnominalTopup"></span>
              <div className="input-group">
                <input type="number" className="form-control" id="nominaltopup" value={nominaltopup} placeholder="Jumlah Deposit"></input>
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-dollar-sign"></span>
                  </div>
                </div>
              </div>
                            <ModalFooter>
                                <Button type="button" onClick={() => handleTopup()} color="primary">Edit</Button>{' '}
                            </ModalFooter>
                        </Form>
                    </div>
                </ModalBody>



            </Modal>
        </div>
    );
}

export default ModalTopupUser;