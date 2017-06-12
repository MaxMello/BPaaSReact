import React from 'react';
import { loadService, writeService, changeService } from "../actions/manageServicesActions";
import { Row, Col, FormControl, FormGroup } from "react-bootstrap";
import OverviewHeader from "../components/elements/OverviewHeader";
import { connect } from 'react-redux';
import AuthenticatedComponent from "./AuthenticatedComponent";

@connect((store) => {
    return {user: store.user, services: store.services, manageServices: store.manageServices};
})
export default class EditService extends AuthenticatedComponent {

    constructor(props){
        super(props);
        this.handleIDChange = this.handleIDChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleBaseURLChange = this.handleBaseURLChange.bind(this);
        this.save = this.save.bind(this);
        this.resetted = false;
        this.serviceID = this.props.routeParams.id !== undefined ? this.props.routeParams.id : null;
        console.log(this.props);
    }

    componentDidMount(){
        this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(nextProps){
        console.log("Will receive props");
        this.serviceID = this.props.routeParams.id !== undefined ? this.props.routeParams.id : null;
        const { services, manageServices } = nextProps;
        if(this.serviceID !== null){
            if(!this.serviceID in services) {
                this.props.dispatch(loadService(this.serviceID));
            } else if(manageServices.activeService.serviceData.id === "" ||
                this.serviceID !== manageServices.activeService.serviceData.id) {
                // If the ID is not set, this means we need to set the service data once
                this.props.dispatch(changeService(
                    {...services[this.serviceID]}
                ));
            } else {
                console.log("Nothing");
            }
        } else if((!this.resetted) && manageServices.activeService.serviceData.id !== ""){ // Only reset if not reset already
            this.resetted = true;
            this.props.dispatch(changeService({
                "id": "",
                "name": "",
                "description": "",
                "baseURL": ""
            }));
        } else {
            console.log("Noting happens");
        }
    }

    handleIDChange(event){
        this.props.dispatch(changeService({
            ...this.props.manageServices.activeService.serviceData,
            "id": event.target.value
        }));
    }

    handleNameChange(event){
        this.props.dispatch(changeService({
            ...this.props.manageServices.activeService.serviceData,
            "name": event.target.value
        }));
    }

    handleDescriptionChange(event){
        this.props.dispatch(changeService({
            ...this.props.manageServices.activeService.serviceData,
            "description": event.target.value
        }));
    }

    handleBaseURLChange(event){
        this.props.dispatch(changeService({
            ...this.props.manageServices.activeService.serviceData,
            "baseURL": event.target.value
        }));
    }

    save(){
        this.props.dispatch(writeService(this.props.manageServices.activeService.serviceData));
    }

    render() {
        super.render();
        const serviceData = this.props.manageServices.activeService.serviceData;
        const title = serviceData.name !== "" ? "Edit '" + serviceData.name + "'": "Create new Service";
        return (
            <div className="container">
                <OverviewHeader title={title} status={ this.props.manageServices.activeService.saveStatus }
                                buttonOnClick={this.save} texts={{"text1": "Save", "text2": "Saving..."}}/>
                <Row>
                    <Col xs={12} sm={4} lg={2}>
                        <h5>ID</h5>
                    </Col>
                    <Col xs={12} sm={8} lg={10}>
                        <FormGroup controlId="id">
                            <FormControl type="text"
                                         value={serviceData.id}
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
                                         value={serviceData.name}
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
                                         value={serviceData.description}
                                         onChange={this.handleDescriptionChange}
                                         placeholder="Description of the functionality of the service."/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={4} lg={2}>
                        <h5>Base URL</h5>
                    </Col>
                    <Col xs={12} sm={8} lg={10}>
                        <FormGroup controlId="baseURL">
                            <FormControl type="text"
                                         value={serviceData.baseURL}
                                         onChange={this.handleBaseURLChange}
                                         label="BaseURL"
                                         placeholder="URL to get Instance"/>
                        </FormGroup>
                    </Col>
                </Row>
            </div>
        );
    }
};