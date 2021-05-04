import React from 'react';
import { NavbarItems } from "./NavbarItems"
import '../styles/navbar.css'
import GoogleBtn from './GoogleBtn';




class Navbar extends React.Component{
  state = { clicked: false}

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked})
  }

  render() {
    return (  

    <nav className = "NavbarItems">
      <h1 className = "navbar-logo">CO2 Foodprint</h1>
      
      <div className= "menu-icon" onClick={this.handleClick}>
            <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
            
      </div>
      <ul className = {this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
        {NavbarItems.map((item, index)=> {
          return(
            <li key = {index}>
              <a className = {item.cName} href = {item.url}>
              {item.title}
              </a>
            </li>
          )
        })}
        
      </ul>
      <GoogleBtn />
    </nav>
    );
  };
}

export default Navbar;