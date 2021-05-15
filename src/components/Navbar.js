import React from 'react';
//import { NavbarItems } from "./NavbarItems"
import { Navbar, Nav, NavDropdown, Container, Form, FormControl, Button } from "react-bootstrap";
//import '../styles/navbar.css'
import GoogleBtn from './GoogleBtn';
import 'bootstrap/dist/css/bootstrap.min.css';


class NavbarComponent extends React.Component {
  state = { clicked: false }

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked })
  }

  render() {
    let name = localStorage.getItem('firstname');
    let profileImg = localStorage.getItem('profilepic');
    console.log(profileImg);
    return (

      <Navbar collapseOnSelect expand="md" style={{
        backgroundColor: "#84A98C", fontFamily: "Taviraj", height: "60px",
      }}>
        <Navbar.Brand href="#">CO2 Foodprint</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <NavDropdown title="Calculate" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/calculate">Food</NavDropdown.Item>
              <NavDropdown.Item href="/calculateTransport">Transportation</NavDropdown.Item>
              {/* <NavDropdown.Item href="/postRecipe">Post Recipe</NavDropdown.Item> */}
              {/* <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
            </NavDropdown>
          </Nav>
          {
            name ?
              <React.Fragment>
                <Navbar.Brand href="/profile">
                  <img src={profileImg} width="50px" height="50px" style={{marginTop: 3}}/>
                </Navbar.Brand>
                <Nav>
                  <Nav.Link href="/profile">Hi {name}!</Nav.Link>
                </Nav>
              </React.Fragment>
              : {}
          }
          <GoogleBtn />
          <Nav>
            <Nav.Link href="/about">About Us</Nav.Link>

          </Nav>
        </Navbar.Collapse>

      </Navbar>
    );


    // return (  

    // <nav className = "NavbarItems">
    //   <h1 className = "navbar-logo">CO2 Foodprint</h1>

    //   <div className= "menu-icon" onClick={this.handleClick}>
    //         <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>

    //   </div>
    //   <ul className = {this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
    //     {NavbarItems.map((item, index)=> {
    //       return(
    //         <li key = {index}>
    //           <a className = {item.cName} href = {item.url}>
    //           {item.title}
    //           </a>
    //         </li>
    //       )
    //     })}

    //   </ul>
    //   <GoogleBtn />
    // </nav>
    // );
  };
}

export default NavbarComponent;