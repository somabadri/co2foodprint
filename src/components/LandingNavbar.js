import React from 'react';
import '../styles/landingNavbar.css'
//LandingNavbar is exclusive to the landing page so users need to login before accessing features
class LandingNavbar extends React.Component {
   render() {
    return (
      <nav className="NavbarItems">
        <h1 className="navbar-logo" style={{ fontFamily: "Taviraj" }}>CO2 Foodprint</h1>
      </nav>
    );
  };
}

export default LandingNavbar;