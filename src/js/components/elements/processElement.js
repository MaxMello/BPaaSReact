import React from 'react'
import { Icon } from "react-fontawesome";
import {Row, Col } from "react-bootstrap";

/*
 * This element displays one process element in an overview page
 * Expected props:
 *      process: Object (with name, description attribute)
 */
export default class ProcessElement extends React.Component {
    constructor(props){
        super(props);

    }
    render(){
        return (
            <Row key={this.props.key}>
                <Col xs={12}>
                    <h2>{this.props.process.name}</h2>
                    <p>{this.props.process.description}</p>
                </Col>
            </Row>
        );
    }
}