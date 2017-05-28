import React from 'react'
import '../../style/bootstrap/less/bootstrap.less'
import { Icon } from "react-fontawesome";
import { Row, Col, Button } from "react-bootstrap";
import { connect } from 'react-redux';
import { billing } from "../actions/useProcessesActions"
import AuthenticatedComponent from "./AuthenticatedComponent";

@connect((store) => {
    return {user: store.user, processes: store.processes, useProcesses: store.useProcesses}
})
export default class MyBilling extends AuthenticatedComponent {
    componentDidMount(){
        const userName = this.props.user.userData.name;
        this.props.dispatch(billing(userName));
    }
    render() {
        super.render();

        const { useProcesses } = this.props;
        const price = useProcesses.billing.priceToPay;

        return (
            <div>
                <Row>
                    <Col xs={12} className="text-center">
                        <h1>My Billing: { price }$</h1>
                    </Col>
                </Row>

            </div>
        );
    }
}