import React, { Component } from "react";
import '../styles/aboutSection.scss'

class AboutSection extends Component {
  constructor(props) {
    super(props);
    this.state = {description: '',
                  profile:''};
  }

    render() {
      return (
        <div className='about'>
          <img className='profile-picture' src= {this.props.profile} alt='profile' />
          <div className='about-text'>
           {this.props.description}
          </div>
        </div>
      );
    };
};

export default AboutSection;