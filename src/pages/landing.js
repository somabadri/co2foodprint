import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import LandingNavbar from '../components/LandingNavbar';
//import React from 'react';
import Navbar from '../components/Navbar';
import '../styles/landing.scss';
import monstera from '../assets/monstera.png';
import Googlebtn from '../components/GoogleBtn'
import Footer from '../components/Footer'


class Landing extends React.Component {
  render(){
  return (
    <div>
      <LandingNavbar />
      <div className="container">
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
          <Googlebtn />
        </div>
        <div className= "right-text">
          <img src={monstera} alt='monstera plant'/>
        </div>
      </div>
      <Footer />
    </div>
  );
  }
}

export default Landing;
