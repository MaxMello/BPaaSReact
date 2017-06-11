import React from 'react'
import '../../style/bootstrap/less/bootstrap.less'
import { Icon } from "react-fontawesome";
import { connect } from 'react-redux';
import AuthenticatedComponent from "./AuthenticatedComponent";
import { Row, Col, FormControl, FormGroup, ControlLabel } from "react-bootstrap";
import { changeProcess, loadProcess } from "../actions/manageProcessesActions";
import { loadServices, loadService } from "../actions/manageServicesActions";
import OverviewHeader from "../components/elements/OverviewHeader";

@connect((store) => {
    return {user: store.user, processes: store.processes, manageProcesses: store.manageProcesses, services: store.services}
})
export default class EditProcess extends AuthenticatedComponent {

    constructor(props){
        super(props);
        const processID = this.props.location.pathname.substr(this.props.location.pathname.lastIndexOf('/') + 1);
        if(processID.length > 0){
            this.processID = processID;
        } else {
            this.processID = null;
        }
        this.handleIDChange = this.handleIDChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleServicesChange = this.handleServicesChange.bind(this);
        this.serviceSelect = this.serviceSelect.bind(this);
    }

    componentDidMount(){
        this.props.dispatch(loadServices());
    }

    componentWillReceiveProps(nextProps){
        const { processes, services, manageProcesses } = nextProps;
        if(this.processID !== null){
            if(!this.processID in processes){
                this.props.dispatch(loadProcess(this.processID));
            } else {
                const serviceIDs = processes[this.processID]["services"];
                for(const id of serviceIDs){
                    if(!id in services){
                        this.props.dispatch(loadService(id));
                        return;
                    }
                }
                // Because of the return, we know here that every service exists
                if(manageProcesses.activeProcess.processData.id === "") {
                    // If the ID is not set, this means we need to set the process data once
                    this.props.dispatch(changeProcess({...processes[this.processID]}));
                }
            }
        }
    }

    load(){

    }

    handleIDChange(event){
        this.props.dispatch(changeProcess({
            ...this.props.manageProcesses.activeProcess.processData,
            "id": event.target.value
        }));
    }

    handleNameChange(event){
        this.props.dispatch(changeProcess({
            ...this.props.manageProcesses.activeProcess.processData,
            "name": event.target.value
        }));
    }

    handleDescriptionChange(event){
        this.props.dispatch(changeProcess({
            ...this.props.manageProcesses.activeProcess.processData,
            "description": event.target.value
        }));
    }

    handleServicesChange(event){
        console.log("Handle service change");
        const services = Object.assign({}, this.props.manageProcesses.activeProcess.processData.services);
        const currentServiceIndex = event.target.inputRef;
        console.log(currentServiceIndex);
        services[currentServiceIndex] = event.target.value;
        this.props.dispatch(changeProcess({
            ...this.props.manageProcesses.activeProcess.processData,
            "services": services
        }));
    }

    serviceSelect(idx, activeID){
        const { services } = this.props;
        console.log(services);
        const options = Object.keys(services).map( (key, index) => {
            return (<option value={key} selected={key === activeID ? "selected" : ""} >
                {services[key].name}
            </option>)
        });
        return (
            <div>
                <Col xs={12} sm={4}>
                    <h5>{idx + 1}. Service</h5>
                </Col>
                <Col xs={12} sm={8}>
                    <FormGroup controlId={"service" + idx}>
                        <FormControl inputRef={idx}
                                     componentClass="select"
                                     placeholder="Choose a service..."
                                     onChange={this.handleServicesChange}>
                            {options}
                        </FormControl>
                    </FormGroup>
                </Col>
            </div>
        );
    }

    render() {
        super.render();
        const processData = this.props.manageProcesses.activeProcess.processData;
        const title = processData.name !== "" ? "Edit '" + processData.name + "'": "Create new Process";

        return (
            <div className="container">
                <OverviewHeader title={title} status={this.props.manageProcesses.activeProcess.status} buttonOnClick={this.load.bind(this)}/>
                <Row>
                    <Col xs={12} sm={4}>
                        <h5>ID</h5>
                    </Col>
                    <Col xs={12} sm={8}>
                        <FormGroup controlId="id">
                            <FormControl type="text"
                                         value={processData.id}
                                         onChange={this.handleIDChange}
                                         label="ID"
                                         placeholder="Unique ID"/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={4}>
                        <h5>Name</h5>
                    </Col>
                    <Col xs={12} sm={8}>
                        <FormGroup controlId="name">
                            <FormControl type="text"
                                         value={processData.name}
                                         onChange={this.handleNameChange}
                                         label="Name"
                                         placeholder="Descriptive Name"/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={4}>
                        <h5>Description</h5>
                    </Col>
                    <Col xs={12} sm={8}>
                        <FormGroup controlId="description">
                            <FormControl componentClass="textarea"
                                         value={processData.description}
                                         onChange={this.handleDescriptionChange}
                                         placeholder="Description of the functionality of the business process."/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <h4>Services</h4>
                    </Col>
                    { Object.keys(processData.services).map((s, idx) => this.serviceSelect(idx, s)) }
                    { this.serviceSelect(processData.services.length, -1) }
                </Row>
            </div>
        );
    }
};