import React from 'react';
import '../styles/landingNavbar.css'




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