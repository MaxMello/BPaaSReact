import React from 'react';
import '../../style/bootstrap/less/bootstrap.less';
import { Row, Col } from "react-bootstrap";
import { connect } from 'react-redux';
import { loadProcesses } from "./../actions/useProcessesActions";
import AuthenticatedComponent from "./AuthenticatedComponent";

@connect((store) => {
    return {user: store.user, processes: store.processes, useProcesses: store.useProcesses}
})
export default class UseProcesses extends AuthenticatedComponent{

    constructor(props){
        super(props);
    }

    load(){
        this.props.dispatch(loadProcesses(this.props.loading));
    }

    render() {
        super.render();
        const {processes, loading} = this.props.useProcesses;
        const isLoading =  loading ? "True" : "False";
        const processCols = processes.map((process, i) => (<Col key={i} xs={12}>{process.name}</Col>));
        return (
            <div>
                <Row>
                    <Col xs={12} className="text-center">
                        <h1>Use Processes</h1>
                        <p>Loading: {isLoading} </p>
                        <button onClick={this.load.bind(this)}>Lade Prozesse</button>
                    </Col>
                </Row>
                <Row>
                    {processCols}
                </Row>
            </div>
        );
    }
}
