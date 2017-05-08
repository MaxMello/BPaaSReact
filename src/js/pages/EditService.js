import React from 'react'
import '../../style/bootstrap/less/bootstrap.less'
import { Icon } from "react-fontawesome";
import { Row, Col, Button } from "react-bootstrap";
import { connect } from 'react-redux';
import AuthenticatedComponent from "./AuthenticatedComponent";

@connect((store) => {
    return {user: store.user, services: store.services, manageServices: store.manageServices};
})
export default class EditService extends AuthenticatedComponent {
    render() {
        super.render();
        return (
            <div>
                <h1>Edit Service</h1>
            </div>
        );
    }
};