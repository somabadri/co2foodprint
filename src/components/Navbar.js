import React from 'react';
import '../styles/navbar.css';
import {useState,useEffect} from 'react';
import { Navbar, Nav, NavDropdown} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import GoogleBtn from './GoogleBtn';

function NavbarComponent() {
  const [name,setName] = useState('');
  const [pic,setPic] = useState('');

  useEffect(()=> {
    const data = {
      name: localStorage.getItem('current name'),
      email: localStorage.getItem('current email'),
      pic: localStorage.getItem('current pic')
    }
    setName(data.name);
    setPic(data.pic);
  },[name]);

  return (  
    <Navbar collapseOnSelect expand="md" style={{
      backgroundColor: "#84A98C", fontFamily: "Taviraj", height: "60px",
    }}>
      <Navbar.Brand href="#">CO2 Foodprint</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          <Nav.Link href="/about">About us</Nav.Link>
          <NavDropdown title="Calculate" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/calculate">Food</NavDropdown.Item>
            <NavDropdown.Item href="/calculateTransport">Transportation</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        {
          name ?
            <React.Fragment>
              <Nav>
                <Nav.Link href="/profile">Hi {name}!</Nav.Link>
              </Nav>
              <Navbar.Brand href="/profile">
                <img src={pic} width="50px" height="50px" style={{marginTop: 3}} alt=''/>
              </Navbar.Brand>
              
            </React.Fragment>
            : <div></div>
        }
        <GoogleBtn />
      </Navbar.Collapse>
    </Navbar>
    );
}

export default NavbarComponent;