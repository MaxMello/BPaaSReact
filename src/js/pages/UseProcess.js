import React from 'react'
import '../../style/bootstrap/less/bootstrap.less'
const RB = require('react-bootstrap');
let Icon = require('react-fontawesome');
let Button = RB.Button;
let Row = RB.Row;
let Col = RB.Col;

export default class UseProcess extends React.Component {
    render() {
        return (
            <div>
                <Row>
                    <Col xs={12} className="text-center">
                        <h1>Use Process</h1>
                    </Col>
                </Row>

            </div>
        );
    }
}