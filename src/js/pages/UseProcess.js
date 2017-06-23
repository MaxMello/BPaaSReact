import React from 'react'
import { connect } from 'react-redux';
import AuthenticatedComponent from "./AuthenticatedComponent";
import { Row, Col} from "react-bootstrap";
import OverviewHeader from "../components/elements/OverviewHeader";
import { FETCH_STATUS } from "../constants/constants";
import { useProcess, queryProcessInstance, loadProcesses, getInstanceError, resetUseProcess } from "./../actions/useProcessesActions";


@connect((store) => {
    return {user: store.user, processes: store.processes, useProcesses: store.useProcesses}
})
export default class UseProcess extends AuthenticatedComponent {

    constructor(props){
        super(props);
        this.load = this.load.bind(this);
        this.processID = this.props.routeParams.id;
        this.currentGUI = null;
    }

    componentDidMount(){
        this.load();
    }

    componentWillUnmount() {
        this.props.dispatch(getInstanceError());
        if(this.currentGUI === ""){
            // The process is finished, so we will remove the instance from state
            this.props.dispatch(resetUseProcess());
        }
    }

    load(){
        const userName = this.props.user.userData.name;
        const { useProcesses } = this.props;
        if(useProcesses.activeProcess !== null
            && useProcesses.activeProcess.status === FETCH_STATUS.FETCH_SUCCESS
            && useProcesses.activeProcess.instance !== null
            && useProcesses.activeProcess.instance.instanceID !== null){
            const instanceID = useProcesses.activeProcess.instance.instanceID;
            this.props.dispatch(queryProcessInstance(userName, this.processID, instanceID));
        } else {
            this.props.dispatch(useProcess(userName, this.processID));
        }
    }

    componentWillReceiveProps(nextProps){
        this.processID = this.props.routeParams.id;
        const { useProcesses, user, processes } = nextProps;
        if(!this.processID in processes){
            // If the process from the url is not in state, load all processes again
            this.props.dispatch(loadProcesses());
        } else if(useProcesses.activeProcess !== null
            && useProcesses.activeProcess.status === FETCH_STATUS.FETCH_SUCCESS
            && useProcesses.activeProcess.instance !== null
            && useProcesses.activeProcess.instance.status === FETCH_STATUS.NOT_FETCHING){
            // We know the process data exists
            const userName = user.userData.name;
            const instanceID = useProcesses.activeProcess.instance.instanceID;
            this.props.dispatch(queryProcessInstance(userName, this.processID, instanceID));
        }
    }

    shouldComponentUpdate(){
        const { useProcesses } = this.props;
        console.log("Should component update?");
        if(useProcesses.activeProcess !== null
            && useProcesses.activeProcess.status === FETCH_STATUS.FETCH_SUCCESS
            && useProcesses.activeProcess.instance !== null
            && useProcesses.activeProcess.instance.status === FETCH_STATUS.FETCH_SUCCESS){
            let url = useProcesses.activeProcess.instance.gui;
            if(this.currentGUI === url){
                console.log("No");
                return false;
            } else {
                this.currentGUI = url;
                console.log("Yes");
                return true;
            }
        } else {
            console.log("Top level condition is false");
        }
        return false;
    }

    render() {
        super.render();
        const { processes, useProcesses } = this.props;
        const process = processes[this.processID];
        let iFrame = (<div className="embed-responsive embed-responsive-16by9" style={{"backgroundColor": "#f5f5f5"}}>
        </div>);
        let statusMessage = "";
        if(this.currentGUI === ""){
            statusMessage = "Business Process finished.";
        } else if(this.currentGUI === null){
            statusMessage = "Business Process not yet started";
        } else {
            statusMessage = "Fetched BP from URL: " + this.currentGUI;
            iFrame = (
                <div className="embed-responsive embed-responsive-16by9">
                    <iframe className="embed-responsive-item" src={this.currentGUI}>
                        IFrame not Supported
                    </iframe>
                </div>
            );
        }
        return (
            <div className="container">
                <OverviewHeader title={process.name} status={useProcesses.activeProcess.status} buttonOnClick={this.load}/>
                <Row>
                    <Col xs={12}>
                        <p>{process.description}</p>
                        {iFrame}
                    </Col>
                    <Col xs={12} className="text-center">
                        {statusMessage}
                    </Col>
                </Row>
            </div>
        );
    }
}