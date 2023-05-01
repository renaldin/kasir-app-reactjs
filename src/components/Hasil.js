import React, { Component } from 'react';
import { Row, Col, ListGroup, Badge, Card } from 'react-bootstrap';
import { numberWithCommas } from '../utils/utils';
import ModalKeranjang from './ModalKeranjang';
import TotalBayar from './TotalBayar';
import axios from 'axios';
import { API_URL } from '../utils/constants';
import swal from 'sweetalert';

class Hasil extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            keranjangDetail: false,
            jumlah: 0,
            keterangan: "",
            totalHarga: 0,
        };
    };

    handleShow = (menuKeranjang) => {
        this.setState({
            showModal: true,
            keranjangDetail: menuKeranjang,
            jumlah: menuKeranjang.jumlah,
            keterangan: menuKeranjang.keterangan,
            totalHarga: menuKeranjang.total_harga
        });
    };

    handleClose = () => {
        this.setState({
            showModal: false,
        });
    };

    tambah = () => {
        this.setState({
            jumlah: this.state.jumlah + 1,
            totalHarga: this.state.keranjangDetail.product.harga * (this.state.jumlah + 1),
        });
        console.log(this.state.totalHarga);
    };

    kurang = () => {
        if (this.state.jumlah !== 1) {
            this.setState({
                jumlah: this.state.jumlah - 1,
                totalHarga: this.state.keranjangDetail.product.harga * (this.state.jumlah - 1),
            });
            console.log(this.state.totalHarga);
        }
    };

    changeHandler = (event) => {
        this.setState({
            keterangan: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.handleClose();

        const data = {
            jumlah: this.state.jumlah,
            total_harga: this.state.totalHarga,
            product: this.state.keranjangDetail.product,
            keterangan: this.state.keterangan
        }

        axios.put(API_URL + "keranjangs/" + this.state.keranjangDetail.id, data)
            .then(res => {
                this.props.getListKeranjang();
                swal({
                    title: "Sukses",
                    text: "Update Pesanan " + data.product.nama,
                    icon: "success",
                    button: false,
                    timer: 2000
                });
            })
            .catch(error => {
                console.log(error);
            })

    }

    hapusPesanan = (id) => {

        this.handleClose();

        axios.delete(API_URL + "keranjangs/" + id)
            .then(res => {
                this.props.getListKeranjang();
                swal({
                    title: "Sukses",
                    text: "Hapus Pesanan " + this.state.keranjangDetail.product.nama,
                    icon: "error",
                    button: false,
                    timer: 2000
                });
            })
            .catch(error => {
                console.log(error);
            })

    }

    render() {
        const { keranjangs } = this.props;
        return (
            <Col md="3" className="mt-3" >
                <h4><strong>Hasil</strong></h4>
                <hr />
                {keranjangs.length !== 0 && (
                    <Card className="overflow-auto hasil">
                        <ListGroup variant="flush">
                            {keranjangs.map((menuKeranjang) => (
                                <ListGroup.Item key={menuKeranjang.id} onClick={() => this.handleShow(menuKeranjang)}>
                                    <Row>
                                        <Col xs='2'>
                                            <h4>
                                                <Badge pill variant="success">
                                                    {menuKeranjang.jumlah}
                                                </Badge>
                                            </h4>
                                        </Col>
                                        <Col>
                                            <h5>{menuKeranjang.product.nama}</h5>
                                            <p>Rp. {numberWithCommas(menuKeranjang.product.harga)}</p>
                                        </Col>
                                        <Col>
                                            <strong className="float-end">Rp. {numberWithCommas(menuKeranjang.total_harga)}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}

                            <ModalKeranjang handleClose={this.handleClose} {...this.state} tambah={this.tambah} kurang={this.kurang} changeHandler={this.changeHandler} handleSubmit={this.handleSubmit} hapusPesanan={this.hapusPesanan} />

                        </ListGroup>
                    </Card>
                )}
                <TotalBayar keranjangs={keranjangs} {...this.props} />
            </Col>
        );
    }
}

export default Hasil;