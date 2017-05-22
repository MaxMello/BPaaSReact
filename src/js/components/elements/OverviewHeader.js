import React from 'react'
import { Row, Col, Button } from "react-bootstrap";
import { FETCH_STATUS } from "../../constants/constants";

export default class OverviewHeader extends React.Component {
    constructor(props){
        super(props);

    }
    render(){
        let fetchButton;
        switch(this.props.status){
            case FETCH_STATUS.NOT_FETCHING: {
                fetchButton = (<Button className="pull-right" bsStyle="default" onClick={this.props.buttonOnClick}>Reload</Button>);
                break;
            }
            case FETCH_STATUS.FETCHING: {
                fetchButton = (<Button className="pull-right" bsStyle="default" disabled>Loading...</Button>);
                break;
            }
            case FETCH_STATUS.FETCH_SUCCESS: {
                fetchButton = (<Button className="pull-right successButton" bsStyle="success" onClick={this.props.buttonOnClick}/>);
                break;
            }
            case FETCH_STATUS.FETCH_ERROR: {
                fetchButton = (<Button className="pull-right errorButton" bsStyle="danger" onClick={this.props.buttonOnClick}/>);
                break;
            }
        }

        return (
            <Row>
                <Col xs={12} sm={8}>
                    <p className="h1">{this.props.title}</p>
                </Col>
                <Col xs={12} sm={4} style={{"marginTop": 20}}>
                    {fetchButton}
                </Col>
            </Row>
        );
    }
}