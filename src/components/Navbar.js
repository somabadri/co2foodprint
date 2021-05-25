import React from 'react';
//import { NavbarItems } from "./NavbarItems"
import { Navbar, Nav, NavDropdown, Container, Form, FormControl, Button } from "react-bootstrap";
import '../styles/navbar.css'
import GoogleBtn from './GoogleBtn';
import 'bootstrap/dist/css/bootstrap.min.css';


class NavbarComponent extends React.Component {
  state = { clicked: false }

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked })
  }

  render() {
    let name = localStorage.getItem('current name');
    let profileImg = localStorage.getItem('current pic');
    console.log(profileImg);
    return (

      <Navbar collapseOnSelect expand="md" style={{
        backgroundColor: "#84A98C", fontFamily: "Taviraj", height: "60px",
      }}>
        <Navbar.Brand>CO2 Foodprint</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <NavDropdown title="Calculate" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/calculate">Food</NavDropdown.Item>
              <NavDropdown.Item href="/calculateTransport">Transportation</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {
            name ?
              <React.Fragment>
                <Navbar.Brand href="/profile">
                  <img src={profileImg} width="50px" height="50px" style={{marginTop: 3}} alt={"profile"}/>
                </Navbar.Brand>
                <Nav>
                  <Nav.Link href="/profile">Hi {name}!</Nav.Link>
                </Nav>
              </React.Fragment>
              : <div></div>
          }
          <GoogleBtn />
          <Nav>
            <Nav.Link href="/about">About Us</Nav.Link>

          </Nav>
        </Navbar.Collapse>

      </Navbar>
    );
  };
}

export default NavbarComponent;