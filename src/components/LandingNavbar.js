import React from 'react';
import '../styles/landingNavbar.css'





class LandingNavbar extends React.Component {
  render() {
    return (
      <nav className="NavbarItems" >
        <h1 className="navbar-logo" style={{ fontFamily: "Taviraj", textAlign: "center" }}>CO2 Foodprint</h1>
      </nav>
    );
  };
}

export default LandingNavbar;