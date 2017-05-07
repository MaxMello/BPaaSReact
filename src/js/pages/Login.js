import React from 'react'
import '../../style/bootstrap/less/bootstrap.less';
import { Icon } from "react-fontawesome";
import {Row, Col, Button } from "react-bootstrap";
import { login, signIn, logout } from "./../actions/userActions";
import { connect } from 'react-redux';

@connect((store) => {
    return store.user;
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
        this.props.dispatch(login(this.state.name, ""));
    }

    logoutUser(){
        this.setState({name: ""});
        this.props.dispatch(logout());
    }

    render() {
        console.log(this);
        const isRedirect = this.props.location.query.redirect === "true";
        const { user } = this.props;
        const userExists = user !== null;
        let userText = "Please login to the platform";
        if(userExists){
            console.log(user);
            userText = "Hey ".concat(user.name).concat("!");
        }
        return (
            <div>
                <Row>
                    <Col xs={12} className="text-center">
                        {isRedirect ? <div>Please login first.</div> : ""}
                        <h1>Login</h1>
                        <p>
                            {userText}
                        </p>
                        <label>
                            Name:
                            <input type="text" value={this.state.name} onChange={this.handleNameChange} />
                        </label>
                        <button onClick={this.loginUser}>Login</button>
                        <button onClick={this.logoutUser}>Logout</button>
                    </Col>
                </Row>

            </div>
        );
    }
};
