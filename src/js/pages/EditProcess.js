import React from 'react'
import '../../style/bootstrap/less/bootstrap.less'
import { Icon } from "react-fontawesome";
import { Row, Col, Button } from "react-bootstrap";
import { connect } from 'react-redux';
import AuthenticatedComponent from "./AuthenticatedComponent";

@connect((store) => {
    return {user: store.user, processes: store.processes, manageProcesses: store.manageProcesses}
})
export default class EditProcess extends AuthenticatedComponent {
    render() {
        super.render();
        return (
            <div>
                <h1>Edit Process</h1>
            </div>
        );
    }
};