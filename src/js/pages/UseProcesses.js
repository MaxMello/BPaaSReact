import React from 'react';
import { Row, Col, ListGroup, Button } from "react-bootstrap";
import { Icon } from "react-fontawesome";
import { connect } from 'react-redux';
import { loadProcesses } from "./../actions/useProcessesActions";
import AuthenticatedComponent from "./AuthenticatedComponent";
import ProcessElement from "../components/elements/processElement";
import OverviewHeader from "../components/elements/OverviewHeader";

@connect((store) => {
    return {user: store.user, processes: store.processes, useProcesses: store.useProcesses}
})
export default class UseProcesses extends AuthenticatedComponent{

    constructor(props){
        super(props);
    }

    componentDidMount(){
        //this.props.dispatch(loadProcesses());
    }

    load(){
        this.props.dispatch(loadProcesses());
    }

    render() {
        super.render();
        const { useProcesses, processes } = this.props;
        const processElements = useProcesses.processes.map(id => processes[id])
                                    .map(p => (<ProcessElement name={p.name}
                                                       description={p.description}
                                                       href={"/#/my-processes/use/" + p.id}/>));

        return (
            <div className="container">
                <OverviewHeader title="My Business Processes" status={useProcesses.status} buttonOnClick={this.load.bind(this)}/>
                <ListGroup>
                    {processElements}
                </ListGroup>
            </div>
        );
    }
}
