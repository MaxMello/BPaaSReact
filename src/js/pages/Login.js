import React from 'react'
import { Icon } from "react-fontawesome";
import {Row, Col, FormGroup, FormControl, Button, Alert } from "react-bootstrap";
import { login, logout } from "./../actions/userActions";
import { connect } from 'react-redux';
import { USER_STATUS } from "../constants/constants";

@connect((store) => {
    return {user: store.user }
})
export default class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {name: ''};

        this.handleNameChange = this.handleNameChange.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
    }

    handleNameChange(event){
        this.setState({name: event.target.value});
    }

    loginUser(){
        console.log("Login...");
        if(this.state.name !== null && this.state.name.length > 0){
            this.props.dispatch(login(this.state.name));
        }

    }

    logoutUser(){
        this.setState({name: ""});
        this.props.dispatch(logout());
    }

    render() {
        console.log(this);
        const isRedirect = this.props.location.query.redirect === "true";
        const { user } = this.props;
        const userExists = user.status === USER_STATUS.EXISTS && user.userData !== null;
        let userText = "Please login to the platform";
        if(isRedirect && userExists){
            this.props.router.goBack();
        }

        const alertStyle = {
            "marginTop": 20
        };

        const buttonStyle = {
            "marginTop": 5
        };

        const alert = (
            <Alert bsStyle="warning" style={alertStyle}>
                Please login or create an account before accessing this part of the website.
            </Alert>
        );

        const nameInput = (
            <FormControl type="text"
                         value={this.state.name}
                         className="text-center"
                         placeholder="Username"
                         onChange={this.handleNameChange} />
        );

        const nameDisplay = (
            <FormControl type="text"
                         value={user.userData.name}
                         className="text-center"
                         disabled/>
        );

        const actionButton = userExists ? (
                <Button bsStyle="danger" style={buttonStyle} bsSize="large" block onClick={this.logoutUser}>Logout</Button>
            ) : (
                <Button bsStyle="primary" style={buttonStyle} bsSize="large" block onClick={this.loginUser}>Login</Button>
            );

        const title = userExists ? "Account" : "Create Account or Log In";

        const nameHTML = userExists ? nameDisplay : nameInput;

        return (
            <div>
                <Row>
                    <Col xs={12} className="text-center">
                        <h1>{title}</h1>
                    </Col>
                </Row>
                <Row className="loginGroup">
                    <Col xs={12} className="text-center">
                        <FormGroup bsSize="large">
                            <Row>
                                <Col xs={10} sm={8} md={6} lg={6} xsOffset={1} smOffset={2} mdOffset={3} lgOffset={3}>
                                    {isRedirect && !userExists ? alert : ""}
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={10} sm={8} md={6} lg={6} xsOffset={1} smOffset={2} mdOffset={3} lgOffset={3}>
                                    {nameHTML}
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={10} sm={8} md={6} lg={6} xsOffset={1} smOffset={2} mdOffset={3} lgOffset={3}>
                                    {actionButton}
                                </Col>
                            </Row>

                        </FormGroup>
                    </Col>
                </Row>

            </div>
        );
    }
};
