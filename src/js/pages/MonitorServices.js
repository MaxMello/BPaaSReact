import React from 'react'
import '../../style/bootstrap/less/bootstrap.less'
import { Icon } from "react-fontawesome";
import { Row, Col, Button } from "react-bootstrap";
import { connect } from 'react-redux';
import AuthenticatedComponent from "./AuthenticatedComponent";

@connect((store) => {
    return {user: store.user, services: store.services, manageServices: store.manageServices}
})
export default class MonitorServices extends AuthenticatedComponent {
    render() {
        super.render();
        return (
            <div>
                <Row>
                    <Col xs={12} className="text-center">
                        <h1>Monitor Services</h1>
                    </Col>
                </Row>

            </div>
        );
    }
};