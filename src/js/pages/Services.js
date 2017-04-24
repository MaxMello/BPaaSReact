import React from 'react'
import '../../style/bootstrap/less/bootstrap.less'
const RB = require('react-bootstrap');
let Icon = require('react-fontawesome');
let Button = RB.Button;
let Row = RB.Row;
let Col = RB.Col;

export default class Services extends React.Component {
    render() {
        return (
            <div>
                <Row>
                    <Col xs={12} className="text-center">
                        <h1>Services</h1>
                    </Col>
                </Row>

            </div>
        );
    }
};