import React from 'react'
import '../../style/bootstrap/less/bootstrap.less'
import { Icon } from "react-fontawesome";
import { ListGroup } from "react-bootstrap";
import { loadProcesses } from "../actions/manageProcessesActions";
import { connect } from 'react-redux';
import AuthenticatedComponent from "./AuthenticatedComponent";
import OverviewHeader from "../components/elements/OverviewHeader";
import ProcessElement from "../components/elements/processElement";

@connect((store) => {
    return {user: store.user, processes: store.processes, manageProcesses: store.manageProcesses, services: store.services}
})
export default class ManageProcesses extends AuthenticatedComponent {

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
        const { manageProcesses, processes } = this.props;
        const processElements = manageProcesses.processes.map(id => processes[id])
                                .map(p => (<ProcessElement name={p.name} key={"element_"+p.id}
                                       description={p.description}
                                       href={"/#/processes/edit/" + p.id}/>));
        super.render();
        return (
            <div className="container">
                <OverviewHeader title="Manage Business Processes" status={manageProcesses.status} buttonOnClick={this.load.bind(this)}/>
                <ListGroup>
                    {processElements}
                </ListGroup>
            </div>
        );
    }
};