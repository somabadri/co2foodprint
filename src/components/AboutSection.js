import React, { Component } from "react";
import '../styles/aboutSection.scss'
import profile from '../assets/profile.jpg';

class AboutSection extends Component {
  constructor(props) {
    super(props);
    this.state = {description: '' };
  }

    render() {
      return (
        <div className='about'>
          <img className='profile-picture' src={profile} alt='profile' />
          <div className='about-text'>
           {this.props.description}
          </div>
        </div>
      );
    };
};

export default AboutSection;
