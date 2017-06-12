import React from 'react'
import { Row, Col } from "react-bootstrap";
import { connect } from 'react-redux';
import { billing } from "../actions/useProcessesActions"
import AuthenticatedComponent from "./AuthenticatedComponent";
import OverviewHeader from "../components/elements/OverviewHeader";


@connect((store) => {
    return {user: store.user, processes: store.processes, useProcesses: store.useProcesses}
})
export default class MyBilling extends AuthenticatedComponent {
    componentDidMount(){
        this.load = this.load.bind(this);
        this.load();
    }

    load(){
        const userName = this.props.user.userData.name;
        this.props.dispatch(billing(userName));
    }

    render() {
        super.render();

        const { useProcesses } = this.props;
        const price = useProcesses.billing.priceToPay;

        return (
            <div className="container">
                <OverviewHeader title="My Billing" status={useProcesses.billing.status} buttonOnClick={this.load}/>
                <Row>
                    <Col xs={12}>
                        <h1>Total: { price }$</h1>
                    </Col>
                </Row>

            </div>
        );
    }
}