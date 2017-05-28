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
            "backgroundPosition": "center center",
            "backgroundRepeat": "no-repeat",
            "backgroundImage": "url('https://static.pexels.com/photos/40120/pexels-photo-40120.jpeg')",
            "backgroundSize": "cover",
            // Flexbox approach for having the last child element pulled to the bottom
            "display": "flex",
            "flexDirection": "column",
            "justify-content": "space-between"
        };
        const overlayTextPartStyle = {
            "color": "white",
            "fontSize": "3vw",
            "background": "rgba(0, 0, 0, 0.7)"
        };

        const jumbotronStyle = {
            "padding": 15,
            "marginTop": 20,
            "marginBottom": 0,
            "marginLeft": -15,
            "marginRight": -15
        };
        const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
        // The first dif after "banner" is needed for the container to be pulled down
        return (
            <div>
                <div style={imgStyle} className="banner">
                    <div/>
                    <div className="container" style={{"marginBottom": 15}}>
                        <span style={overlayTextPartStyle}>Business Process Portal.</span><br/>
                        <span style={overlayTextPartStyle}>The simple platform to connect users and providers.</span>
                    </div>
                </div>
                <div className="container">
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