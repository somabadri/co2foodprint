import React from 'react';
import LandingNavbar from '../components/LandingNavbar';
import '../styles/landing.scss';
import monstera from '../assets/monstera.png';
import Footer from '../components/Footer'
import GoogleBtn from '../components/GoogleBtn';

function Landing() {
  return (
    <div>
      <LandingNavbar />
      <div className="container-landing">
        <div className= "left-text">
          <div className= "title">
            Carbon Foodprint
          </div>
          <div className="subtitle"> 
            A tool that helps you lead the sustainable life of your choice. 
          </div> 
          <div className="description">
            Keep track of your carbon emissions, set weekly goals, share your enviroment friendly recipes, 
            and watch yourself and your friends hit their goals.
          </div>
          <GoogleBtn/>
        </div>
        <div className= "right-text">
          <img src={monstera} alt='monstera plant'/>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Landing;
