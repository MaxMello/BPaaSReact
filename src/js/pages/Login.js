import React from 'react'
import { Icon } from "react-fontawesome";
import {Row, Col } from "react-bootstrap";
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
            console.log("Login successful, redirect back");
            this.props.router.goBack();
        } else if(isRedirect && !userExists){
            userText = "Please login before accessing this part of the website.";
        } else if (!isRedirect && userExists){
            userText = "Welcome ".concat(user.userData.name).concat("!");
        }
        const actionButton = userExists ? ( <button onClick={this.logoutUser}>Logout</button>) :
            (<button onClick={this.loginUser}>Login</button>);
        return (
            <div>
                <h1>Login</h1>
                <Row>
                    <Col xs={12} className="text-center">
                        <p>
                            {userText}
                        </p>
                        <label>
                            Name:
                            <input type="text" value={this.state.name} onChange={this.handleNameChange} />
                        </label>
                        {actionButton}
                    </Col>
                </Row>

            </div>
        );
    }
};
