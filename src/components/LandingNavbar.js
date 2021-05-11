import React, { Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NavbarItems } from "./NavbarItems"
import '../styles/landingNavbar.css'
import GoogleBtn from './GoogleBtn';




class LandingNavbar extends React.Component{
  state = { clicked: false}

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked})
  }

  render() {
    return (  

    <nav className = "NavbarItems">
      <h1 className = "navbar-logo">CO2 Foodprint</h1>
      
      <div className= "menu-icon" >
            <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
            
      </div>
      <ul >
        {NavbarItems.map((item, index)=> {
          return(
            <li key = {index}>
              
            </li>
          )
        })}
        
      </ul>
      <GoogleBtn />
    </nav>
    );
  };
}

export default LandingNavbar;