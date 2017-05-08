import React from 'react';
import { Row, Col } from "react-bootstrap";
import { connect } from 'react-redux';
import { loadProcesses } from "./../actions/useProcessesActions";
import AuthenticatedComponent from "./AuthenticatedComponent";
import ProcessElement from "../components/elements/processElement";

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
        const processList = processes.map((process, i) => (<ProcessElement key={i} process={process}/>));
        return (
            <div>
                <Row>
                    <Col xs={12} className="text-center">
                        <h1>Use Processes</h1>
                        <button onClick={this.load.bind(this)}>Lade Prozesse</button>
                    </Col>
                </Row>
                {processList}
            </div>
        );
    }
}
