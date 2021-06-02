import React, { Component } from "react";
import '../styles/aboutSection.scss'

// About section component for about page.
class AboutSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      profile: '',
      name: 'default'
    };
  }

  render() {
    return (
      <div className='about'>
        <div className='left-section'>
          <img className='profile-picture' src={this.props.profile} alt='profile' />
          <div className='name'>{this.props.name}</div>
        </div>
        <div className='about-text'>
          {this.props.description}
        </div>
      </div>
    );
  };
};

export default AboutSection;
