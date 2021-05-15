import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NavbarItems } from "./NavbarItems"
import '../styles/landingNavbar.css'
import GoogleBtn from './GoogleBtn';




class LandingNavbar extends React.Component {
  state = { clicked: false }

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked })
  }

  render() {
    return (

      <nav className="NavbarItems">
        <h1 className="navbar-logo" style={{ fontFamily: "Taviraj" }}>CO2 Foodprint</h1>


      </nav>
    );
  };
}

export default LandingNavbar;