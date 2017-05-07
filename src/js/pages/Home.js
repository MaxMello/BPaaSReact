import React from 'react'
import '../../style/bootstrap/less/bootstrap.less'
import { Icon } from "react-fontawesome";
import { Row, Col, Button } from "react-bootstrap";

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <Row>
                    <Col xs={12} className="text-center">
                        <h1>Business Processes customized for your needs.</h1>
                    </Col>
                </Row>
            </div>
        );
    }
};