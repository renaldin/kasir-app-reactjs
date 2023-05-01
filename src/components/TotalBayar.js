import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { numberWithCommas } from '../utils/utils';
import { API_URL } from '../utils/constants';
// import { withRouter } from 'react-router-dom';

class TotalBayar extends Component {
    submitTotalBayar = (totalBayar) => {
        const pesanan = {
            total_bayar: totalBayar,
            menus: this.props.keranjangs
        }

        axios.post(API_URL + "pesanans", pesanan).then((res) => {
            this.props.history.push('/sukses')
        })
    };

    render() {
        const totalBayar = this.props.keranjangs.reduce(function (result, item) {
            return result + item.total_harga;
        }, 0);

        return (
            <>
                {/* website */}
                <div className='fixed-bottom d-none d-md-block'>
                    <Row>s
                        <Col md={{ span: 3, offset: 9 }} className="px-4">
                            <h4>Total Harga : {" "}<strong className="float-end mr-2">Rp. {numberWithCommas(totalBayar)}</strong></h4>
                            <div className='d-grid gap-1 mb-2 mt-4 mr-2'>
                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={() => this.submitTotalBayar(totalBayar)}>
                                    <FontAwesomeIcon icon={faShoppingCart} /> <strong>BAYAR</strong>
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </div >

                {/* mobile */}
                <div className='d-sm-block d-md-none'>
                    <Row>s
                        <Col md={{ span: 3, offset: 9 }} className="px-4">
                            <h4>Total Harga : {" "}<strong className="float-end mr-2">Rp. {numberWithCommas(totalBayar)}</strong></h4>
                            <div className='d-grid gap-1 mb-2 mt-4 mr-2'>
                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={() => this.submitTotalBayar(totalBayar)}>
                                    <FontAwesomeIcon icon={faShoppingCart} /> <strong>BAYAR</strong>
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </div >
            </>
        );
    }
}

export default TotalBayar;
