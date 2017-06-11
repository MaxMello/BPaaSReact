import React from 'react';
import { Link } from "react-router";
import { Icon } from "react-fontawesome";
import { Navbar, NavDropdown, MenuItem, NavItem, Nav } from "react-bootstrap";
import { USER_STATUS } from "../constants/constants";

class Navigation extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        const { location, user } = this.props;
        const loginText = user.status === USER_STATUS.EXISTS ? user.userData.name : "Login";
        const homeClass = location.pathname === "/" ? "active": "";
        const myProcessesClass = location.pathname.match(/^\/my-*/) ? "active" : "";
        const manageProcessesClass = location.pathname.match(/^\/processes/) ? "active" : "";
        const servicesClass = location.pathname.match(/^\/services/) ? "active" : "";
        const loginClass = location.pathname === "/login" ? "active" : "";
        const linkStyle = {
            "color": "white"
        };

        const navbarStyle = {
            "marginBottom": "0"
        };

        return (
            <Navbar collapseOnSelect style={navbarStyle}>
                <Navbar.Header>
                    <Navbar.Brand className={homeClass}>
                        <Link activeStyle={linkStyle} to="/">
                            <b>Home</b>
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavDropdown className={myProcessesClass} title="Use Business Processes" id="basic-nav-dropdown">
                            <MenuItem className="hoverWhiteText"><Link to="my-processes">Business Processes</Link></MenuItem>
                            <MenuItem className="hoverWhiteText"><Link to="my-billing">Billing</Link></MenuItem>
                        </NavDropdown>
                        <NavDropdown className={manageProcessesClass} title="Provide Processes" id="basic-nav-dropdown">
                            <MenuItem className="hoverWhiteText"><Link to="processes">Business Processes</Link></MenuItem>
                            <MenuItem className="hoverWhiteText"><Link to="processes/edit/">Create Process</Link></MenuItem>
                        </NavDropdown>
                        <NavDropdown title="Provide Services" id="basic-nav-dropdown" className={servicesClass}>
                            <MenuItem className="hoverWhiteText"><Link to="services">Service Overview</Link></MenuItem>
                            <MenuItem className="hoverWhiteText"><Link to="services/edit/">Create Service</Link></MenuItem>
                        </NavDropdown>
                    </Nav>
                    <Nav pullRight>
                        <NavItem className={loginClass}><Link style={linkStyle} to="login">{loginText}</Link></NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Navigation;
