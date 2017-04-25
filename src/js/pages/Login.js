import React from 'react'
import '../../style/bootstrap/less/bootstrap.less';
const RB = require('react-bootstrap');
let Icon = require('react-fontawesome');
let Button = RB.Button;
let Row = RB.Row;
let Col = RB.Col;
import { connect } from 'react-redux';
import { login, signIn, logout } from "./../actions/userActions";


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
        this.props.dispatch(login(this.state.name, ""));
    }

    logoutUser(){
        this.setState({name: ""});
        this.props.dispatch(logout());
    }

    render() {
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
