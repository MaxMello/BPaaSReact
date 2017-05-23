import React from 'react'
import '../../style/bootstrap/less/bootstrap.less'
import { Icon } from "react-fontawesome";
import { Row, Col, Button } from "react-bootstrap";
import { connect } from 'react-redux';
import AuthenticatedComponent from "./AuthenticatedComponent";
import OverviewHeader from "../components/elements/OverviewHeader";
import { loadProcess } from "./../actions/useProcessesActions";


@connect((store) => {
    return {user: store.user, processes: store.processes, useProcesses: store.useProcesses}
})
export default class UseProcess extends AuthenticatedComponent {

    constructor(props){
        super(props);
        this.processID = this.props.location.pathname.substr(this.props.location.pathname.lastIndexOf('/') + 1)
    }

    componentDidMount(){
        this.props.dispatch(loadProcess(this.processID));
    }

    load(){
        this.props.dispatch(loadProcess(this.processID));
    }
    render() {
        super.render();
        const { processes, useProcesses } = this.props;
        const process = processes[this.processID];

        // TODO Include IFrame
        return (
            <div className="container">
                <OverviewHeader title={process.name} status={useProcesses.activeProcess.status} buttonOnClick={this.load.bind(this)}/>
                <p>{process.description}</p>
                <div id="iframeDiv">
                </div>
            </div>
        );
    }
}