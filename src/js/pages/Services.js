import React from 'react'
import '../../style/bootstrap/less/bootstrap.less'
import { Icon } from "react-fontawesome";
import { connect } from 'react-redux';
import { ListGroup } from "react-bootstrap";
import AuthenticatedComponent from "./AuthenticatedComponent";
import { loadServices } from "./../actions/manageServicesActions";
import ProcessElement from "../components/elements/processElement";
import OverviewHeader from "../components/elements/OverviewHeader";

@connect((store) => {
    return {user: store.user, services: store.services, manageServices: store.manageServices}
})
export default class Services extends AuthenticatedComponent {

    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.dispatch(loadServices());
    }

    load(){
        this.props.dispatch(loadServices());
    }

    render() {
        super.render();
        const { manageServices, services } = this.props;
        const serviceElements = manageServices.services.map(id => services[id])
                                .map(p => (<ProcessElement name={p.name}
                                       description={p.description}
                                       href={"/#/services/edit/" + p.id}/>));

        return (
            <div className="container">
                <OverviewHeader title="Manage Services" status={manageServices.status} buttonOnClick={this.load.bind(this)}/>
                <ListGroup>
                    {serviceElements}
                </ListGroup>
            </div>
        );
    }
};