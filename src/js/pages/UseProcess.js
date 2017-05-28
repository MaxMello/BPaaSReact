import React from 'react'
import '../../style/bootstrap/less/bootstrap.less'
import { Icon } from "react-fontawesome";
import { Row, Col, Button } from "react-bootstrap";
import { connect } from 'react-redux';
import AuthenticatedComponent from "./AuthenticatedComponent";
import OverviewHeader from "../components/elements/OverviewHeader";
import { FETCH_STATUS } from "../constants/constants";
import { useProcess, queryProcessInstance } from "./../actions/useProcessesActions";


@connect((store) => {
    return {user: store.user, processes: store.processes, useProcesses: store.useProcesses}
})
export default class UseProcess extends AuthenticatedComponent {

    constructor(props){
        super(props);
        this.processID = this.props.location.pathname.substr(this.props.location.pathname.lastIndexOf('/') + 1)
    }

    componentDidMount(){
        this.props.dispatch(useProcess(this.processID));
    }

    load(){
        this.props.dispatch(useProcess(this.processID));
    }

    componentWillReceiveProps(nextProps){
        const { useProcesses, user } = nextProps;
        // Once the instanceID is send back from the server, the state will change and this will be triggered once
        if(useProcesses.activeProcess !== null
            && useProcesses.activeProcess.status === FETCH_STATUS.FETCH_SUCCESS
            && useProcesses.activeProcess.instance !== null
            && useProcesses.activeProcess.instance.status === FETCH_STATUS.NOT_FETCHING){

            const userName = user.userData.name;
            const processID = useProcesses.activeProcess.processID;
            const instanceID = useProcesses.activeProcess.instance.instanceID;
            this.props.dispatch(queryProcessInstance(userName, processID, instanceID));
        }
    }

    render() {
        super.render();
        const { processes, useProcesses, user } = this.props;
        const process = processes[this.processID];
        let iFrame = (<div></div>);
        if(useProcesses.activeProcess !== null
            && useProcesses.activeProcess.status === FETCH_STATUS.FETCH_SUCCESS
            && useProcesses.activeProcess.instance !== null
            && useProcesses.activeProcess.instance.status === FETCH_STATUS.FETCH_SUCCESS){

            const url = useProcesses.activeProcess.instance.gui;
            iFrame = (
                <div className="embed-responsive embed-responsive-16by9">
                    <iframe className="embed-responsive-item" src={url}>
                        IFrame not Supported
                    </iframe>
                </div>
            );
        }
        // TODO Include IFrame
        return (
            <div className="container">
                <OverviewHeader title={process.name} status={useProcesses.activeProcess.status} buttonOnClick={this.load.bind(this)}/>
                <p>{process.description}</p>
                {iFrame}
            </div>
        );
    }
}