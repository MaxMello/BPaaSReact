import React from 'react';
import { IndexLink, Link } from "react-router";
import '../../style/bootstrap/less/bootstrap.less';
const RB = require('react-bootstrap');
let Icon = require('react-fontawesome');
let Navbar = RB.Navbar;
let NavDropdown = RB.NavDropdown;
let MenuItem = RB.MenuItem;
let NavItem = RB.NavItem;
let Nav = RB.Nav;
let Button = RB.Button;

class Navigation extends React.Component {
    render() {
        const { location } = this.props;
        const homeClass = location.pathname === "/" ? "active": "";
        const myProcessesClass = location.pathname.match(/^\/my-processes/) ? "active" : "";
        const manageProcessesClass = location.pathname.match(/^\/processes/) ? "active" : "";
        const servicesClass = location.pathname.match(/^\/services/) ? "active" : "";
        const loginClass = location.pathname === "/login" ? "active" : "";
        const linkStyle = {
            "color": "white"
        };

        return (
            <Navbar collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand className={homeClass}>
                        <Link activeStyle={linkStyle} to="/">
                            <b>BPaaS</b>
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem className={myProcessesClass}>
                            <Link to="my-processes" style={linkStyle}>My Processes</Link>
                        </NavItem>
                        <NavDropdown className={manageProcessesClass} title="Processes" id="basic-nav-dropdown">
                            <MenuItem><Link to="processes">Processes Overview</Link></MenuItem>
                            <MenuItem><Link to="processes/edit/">Create Process</Link></MenuItem>
                        </NavDropdown>
                        <NavDropdown title="Services" id="basic-nav-dropdown" className={servicesClass}>
                            <MenuItem><Link to="services">Services Overview</Link></MenuItem>
                            <MenuItem><Link to="services/edit/">Create Service</Link></MenuItem>
                        </NavDropdown>
                    </Nav>
                    <Nav pullRight>
                        <NavItem className={loginClass}><Link style={linkStyle} to="login">Login</Link></NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Navigation;
