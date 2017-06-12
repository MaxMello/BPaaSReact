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
            "justifyContent": "space-between"
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
                            {this.jumbotron("Optimize your business processes today.", "Use a number of business processes on this platform and take advantage of the cloud. All your business processes on one platform, so you keep the overview. You can see in which service each process is located. You can process the individual steps of the business process conveniently on the platform. Start today and register now to take advantage of the platform's benefits.", jumbotronStyle)}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            {this.jumbotron("Offer business processes on our platform.", "Create business processes and offer them on the platform. For the creation, you have the choice of many services provided by the service providers. The advantage of the platform is that many users use your business processes for a fee. This means for you more profit by many customers.", jumbotronStyle)}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            {this.jumbotron("Create services as part of our community.", "Offer on our platform services for business processes. These use many business process providers in their business processes. For the use of your services you get money from the users. The large number of users is an advantage of the cloud solution for business processe (BPaaS). This means more profit for you through the high user numbers.", jumbotronStyle)}
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
};
