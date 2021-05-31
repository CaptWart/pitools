import React from 'react';
import { Navbar, Nav} from 'react-bootstrap';
import './style.css'
function Header(){
    return(
        <Navbar expand="lg">
        <Navbar.Brand href="/">pi tools</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#link">SSH Key manager</Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;