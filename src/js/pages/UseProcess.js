import React from 'react'
import { connect } from 'react-redux';
import AuthenticatedComponent from "./AuthenticatedComponent";
import { Row, Col} from "react-bootstrap";
import OverviewHeader from "../components/elements/OverviewHeader";
import { FETCH_STATUS } from "../constants/constants";
import { useProcess, queryProcessInstance, loadProcesses } from "./../actions/useProcessesActions";


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

    load(){
        const userName = this.props.user.userData.name;
        this.props.dispatch(useProcess(userName, this.processID));
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
        } else if(useProcesses.activeProcess !== null
            && useProcesses.activeProcess.status === FETCH_STATUS.FETCH_SUCCESS
            && useProcesses.activeProcess.instance !== null
            && useProcesses.activeProcess.instance.status === FETCH_STATUS.FETCH_SUCCESS){
            this.currentGUI = useProcesses.activeProcess.instance.gui;
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
            console.log("URL: " + url);
            if(this.currentGUI !== url){
                console.log("Yes!");
                if(url === ""){
                    url = "localhost:8000";
                }
                this.currentGUI = url;
                return true;
            } else {
                console.log("No");
                return false;
            }
        } else {
            console.log("No");
        }
        return false;
    }

    render() {
        super.render();
        const { processes, useProcesses } = this.props;
        const process = processes[this.processID];
        let iFrame = (<div/>);
        if(this.currentGUI !== null &&
            useProcesses.activeProcess !== null
            && useProcesses.activeProcess.status === FETCH_STATUS.FETCH_SUCCESS
            && useProcesses.activeProcess.instance !== null
            && useProcesses.activeProcess.instance.status === FETCH_STATUS.FETCH_SUCCESS){
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
                </Row>
            </div>
        );
    }
}