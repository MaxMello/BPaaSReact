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

    componentDidMount(){
        this.props.dispatch(loadProcesses());
    }

    load(){
        this.props.dispatch(loadProcesses());
    }

    render() {
        super.render();
        const { useProcesses } = this.props.useProcesses;
        let info = (<p></p>);
        switch(useProcesses.status){
            case "FETCHING": {
                info = (<p>Fetching...</p>);
                break;
            }
            case "SUCCESS": {
                info = (<p></p>);
                break;
            }
            case "ERROR": {
                info = (<p>Error!</p>);
                break;
            }
        }
        return (
            <div>
                <Row>
                    <Col xs={12} className="text-center">
                        <h1>Use Processes</h1>
                        <button onClick={this.load.bind(this)}>Lade Prozesse</button>
                    </Col>
                </Row>
                {info}
            </div>
        );
    }
}
