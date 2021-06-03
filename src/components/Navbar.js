import React from 'react';
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import GoogleBtn from './GoogleBtn';
import 'bootstrap/dist/css/bootstrap.min.css';


//Navbar shows up on every page except for the landing page
class NavbarComponent extends React.Component {
  state = { clicked: false }

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked })
  }

  render() {
    return (
      <Navbar collapseOnSelect expand="lg" style={{
        backgroundColor: "#84A98C", fontFamily: "Taviraj", fontSize: 16
      }}>
        <Navbar.Brand style={{ fontSize: 24 }}>CO2 Foodprint</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/about">About Us</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <NavDropdown title="Calculate" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/calculate">Food</NavDropdown.Item>
              <NavDropdown.Item href="/calculateTransport">Transportation</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <GoogleBtn />
        </Navbar.Collapse>
      </Navbar>
    );
  };
}
export default NavbarComponent;