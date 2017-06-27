import React from 'react'
import { connect } from 'react-redux';
import AuthenticatedComponent from "./AuthenticatedComponent";
import { Row, Col, FormControl, FormGroup } from "react-bootstrap";
import { changeProcess, loadProcess, writeProcess } from "../actions/manageProcessesActions";
import { loadServices } from "../actions/manageServicesActions";
import OverviewHeader from "../components/elements/OverviewHeader";

@connect((store) => {
    return {user: store.user, processes: store.processes, manageProcesses: store.manageProcesses, services: store.services}
})
export default class EditProcess extends AuthenticatedComponent {

    constructor(props){
        super(props);
        this.handleIDChange = this.handleIDChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleServicesChange = this.handleServicesChange.bind(this);
        this.serviceSelect = this.serviceSelect.bind(this);
        this.save = this.save.bind(this);
        this.selectElements = [];
        this.processID = null;
        this.resetted = false;
    }

    componentDidMount(){
        console.log("EditProcess::componentDidMount *** About to load all Services from server");
        this.props.dispatch(loadServices());
    }

    componentWillReceiveProps(nextProps){
        const processID = this.props.routeParams.id !== undefined ? this.props.routeParams.id : "";
        if(processID.length > 0){
            this.processID = processID;
        } else {
            this.processID = null;
        }
        const { processes, manageProcesses } = nextProps;
        if(this.processID !== null){
            if(!this.processID in processes) {
                console.log("EditProcess::componentWillReceiveProps *** About to load process for id " + this.processID);
                this.props.dispatch(loadProcess(this.processID));
            } else if(manageProcesses.activeProcess.processData.id === "" ||
                      this.processID !== manageProcesses.activeProcess.processData.id) {
                // If the ID is not set, this means we need to set the process data once
                this.props.dispatch(changeProcess(
                    {...processes[this.processID], services: processes[this.processID].services.map(e => {return {"id": e}}) }
                    ));
            }
        } else if((!this.resetted) && manageProcesses.activeProcess.processData.id !== ""){ // Only reset if not reset already
            this.resetted = true;
            this.props.dispatch(changeProcess({
                "id": "",
                "name": "",
                "description": "",
                "services": []
            }));
        }
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
        const services = Object.assign([], this.props.manageProcesses.activeProcess.processData.services);
        const currentServiceIndex = event.target.id.substr(event.target.id.lastIndexOf('e') + 1);
        if(event.target.value === "-1"){
            services.splice(currentServiceIndex, 1);
        } else {
            services[currentServiceIndex] = {"id": event.target.value};
        }
        this.props.dispatch(changeProcess({
            ...this.props.manageProcesses.activeProcess.processData,
            "services": services
        }));
    }

    serviceSelect(idx, activeID){
        const { services } = this.props;
        const options = Object.keys(services).map( key => {
            return (<option value={key} selected={key===activeID ? "selected": ""} key={"select" + idx + "_option_" + key}>
                {services[key].name}
            </option>)
        });
        const noOption = (
            <option value={-1} selected={-1 == activeID ? "selected": ""}>Select...</option>
        );
        return (
            <div>
                <Col xs={12} sm={4} lg={2}>
                    <h5>{idx + 1}. Service</h5>
                </Col>
                <Col xs={12} sm={8} lg={10}>
                    <FormGroup controlId={"service" + idx}>
                        <FormControl inputRef={el => this.selectElements[idx] = el}
                                     componentClass="select"
                                     placeholder="Choose a service..."
                                     onChange={this.handleServicesChange}>
                            {noOption}
                            {options}
                        </FormControl>
                    </FormGroup>
                </Col>
            </div>
        );
    }

    save(){
        this.props.dispatch(writeProcess(this.props.manageProcesses.activeProcess.processData));
    }

    render() {
        super.render();
        const processData = this.props.manageProcesses.activeProcess.processData;
        const title = processData.name !== "" ? "Edit '" + processData.name + "'": "Create new Process";

        return (
            <div className="container">
                <OverviewHeader title={title} status={ this.props.manageProcesses.activeProcess.saveStatus }
                                buttonOnClick={this.save} texts={{"text1": "Save", "text2": "Saving..."}}/>
                <Row>
                    <Col xs={12} sm={4} lg={2}>
                        <h5>ID</h5>
                    </Col>
                    <Col xs={12} sm={8} lg={10}>
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
                    <Col xs={12} sm={4} lg={2}>
                        <h5>Name</h5>
                    </Col>
                    <Col xs={12} sm={8} lg={10}>
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
                    <Col xs={12} sm={4} lg={2}>
                        <h5>Description</h5>
                    </Col>
                    <Col xs={12} sm={8} lg={10}>
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
                    { processData.services.map((s, idx) => this.serviceSelect(idx, s.id)) }
                    { this.serviceSelect(processData.services.length, -1) }
                </Row>
            </div>
        );
    }
};