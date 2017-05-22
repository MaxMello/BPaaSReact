import React from 'react'
import { Icon } from "react-fontawesome";
import { ListGroupItem } from "react-bootstrap";

/*
 * This element displays one process element in an overview page inside a ListGroup
 * Expected props:
 *      process: Object (with name, description and href attribute)
 */
export default class ProcessElement extends React.Component {
    constructor(props){
        super(props);

    }
    render(){
        return (
            <ListGroupItem header={this.props.name} href={this.props.href}>{this.props.description}</ListGroupItem>
        );
    }
}