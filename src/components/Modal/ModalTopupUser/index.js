import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
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
const ModalTopupUser = (props) => {
  const {
    id,
    namatopup,
    nominaltopup,
    buttonLabel,
    className,
    classButtonModal,
    modalName,
  } = props;

  const [modal, setModal] = useState(false);
  const [nominal, setTopup] = useState(0);
  const [saldoCurrent, setCurrentSaldo] = useState(0);
  const onChangeTopup = (event) => {
    setTopup(event.target.value);
  };
  const authHeader = () => {
    const user = JSON.parse(localStorage.getItem("userdata"));
    if (user && user.data.token) {
      return {
        authorization: `Bearer ${user.data.token}`,
      };
    } else {
      return null;
    }
  };
  const toggle = () => {
    setModal(!modal);
  };
  useEffect(() => {
    const userHeader = authHeader();

    axios
      .get("http://localhost:8080/user/get-detail/" + id, {
        headers: userHeader,
      })
      .then((response) => {
        setCurrentSaldo(response.data.saldo);
      });
  }, []);

  const handleTopup = () => {
    const userHeader = authHeader();

    const topup = {
      transaksi: "topup",
      saldo: nominal,
    };
    axios
      .put("http://localhost:8080/user/tambahsaldo/" + id, topup, {
        headers: userHeader,
      })
      .then((response) => {
        console.log(response);
        setCurrentSaldo(response.data.data.saldo);
        setTopup(0);
      });
    MySwal.fire({
      title: "Berhasil!!!",
      icon: "success",
      text: "Berhasil Melakukan Topup",
    });
    toggle();
  };

  return (
    <div>
      <Button className={classButtonModal} onClick={toggle}>
        {buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader
          toggle={toggle}
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
              <label for="labelnamaTopup">Username Peminjam</label>
              <span
                className="font-weight-lighter ml-3"
                id="labelnamaTopup"
              ></span>
              <div className="input-group">
                <input
                  type="text"
                  readonly="readonly"
                  className="form-control"
                  id="namatopup"
                  value={namatopup}
                ></input>
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user"></span>
                  </div>
                </div>
              </div>
              <label for="labelSaldo">Saldo Saat Ini</label>
              <span className="font-weight-lighter ml-3" id="labelSaldo"></span>
              <div className="input-group">
                <input
                  type="text"
                  readonly="readonly"
                  className="form-control"
                  id="saldoCurrent"
                  value={saldoCurrent}
                ></input>
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-dollar-sign"></span>
                  </div>
                </div>
              </div>
              <label for="labelnominalTopup">Jumlah Deposit (Rp)</label>
              <span
                className="font-weight-lighter ml-3"
                id="labelnominalTopup"
              ></span>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  id="nominal"
                  value={nominal}
                  onChange={onChangeTopup}
                  placeholder="Jumlah Deposit"
                ></input>
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-dollar-sign"></span>
                  </div>
                </div>
              </div>
              <ModalFooter>
                <Button
                  type="button"
                  onClick={() => handleTopup()}
                  color="primary"
                >
                  Topup
                </Button>{" "}
              </ModalFooter>
            </Form>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ModalTopupUser;
