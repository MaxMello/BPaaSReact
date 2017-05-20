import React from 'react'
import '../../style/bootstrap/less/bootstrap.less'
import { Icon } from "react-fontawesome";
import { Row, Col, Button, Image, Jumbotron } from "react-bootstrap";

export default class Home extends React.Component {

    toLogin(){
        return this.props.router.push({
            "pathname": "/login",
            "search": "?redirect=true"
        });
    }

    jumbotron(title, text, style){
        return (
            <Jumbotron style={style}>
                <div>
                    <h2>{title}</h2>
                    <p>{text}</p>
                    <Button bsStyle="primary" bsSize="large" onClick={this.toLogin.bind(this)}>Start now</Button>
                </div>
            </Jumbotron>
        );
    };

    render() {
        const imgStyle = {
            "width": "100%",
            "height": "400px",
            "background-position": "center center",
            "background-repeat": "no-repeat",
            "background-image": "url('https://static.pexels.com/photos/40120/pexels-photo-40120.jpeg')",
            "background-size": "cover",
        };
        const overlayTextPartStyle = {
            "background": "rgba(0, 0, 0, 0.7)"
        };

        const overlayTextStyle = {
            "top": 0,
            "left": 0,
            "position": "absolute",
            "color": "white",
            "font-size": "4vw",
            "margin-left": "1vw"
        };

        const jumbotronStyle = {
        };
        const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

        return (
            <div>
                <div style={imgStyle} className="banner">
                </div>
                <div style={overlayTextStyle} className="bannerText">
                    <span style={overlayTextPartStyle}>Business Process Portal.</span><br/>
                    <span style={overlayTextPartStyle}>The simple platform to connect users and providers.</span>
                </div>
                <div class="">
                    <Row>
                        <Col xs={12}>
                            {this.jumbotron("Optimize your business processes today.", lorem, jumbotronStyle)}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            {this.jumbotron("Offer business processes on our platform.", lorem, jumbotronStyle)}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            {this.jumbotron("Create services as part of our community.", lorem, jumbotronStyle)}
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
};