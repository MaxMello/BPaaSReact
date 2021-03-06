import React from 'react'
import { Row, Col, Button } from "react-bootstrap";
import { FETCH_STATUS } from "../../constants/constants";

export default class OverviewHeader extends React.Component {
    constructor(props){
        super(props);

    }
    render(){
        let fetchButton, text1, text2;
        if(this.props.texts !== undefined){
            text1 = this.props.texts.text1;
            text2 = this.props.texts.text2;
        } else {
            text1 = "Reload";
            text2 = "Loading...";
        }
        switch(this.props.status){
            case FETCH_STATUS.NOT_FETCHING: {
                fetchButton = (<Button className="pull-right" bsStyle="default" onClick={this.props.buttonOnClick}>{text1}</Button>);
                break;
            }
            case FETCH_STATUS.FETCHING: {
                fetchButton = (<Button className="pull-right" bsStyle="default" disabled>{text2}</Button>);
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