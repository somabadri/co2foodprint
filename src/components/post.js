import React, { Component } from "react";
import '../styles/post.scss';
import profile from '../assets/profile.jpg';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', content: '' };
  }

    render() {
      return (
        <div className='post'>
          <img className='profile-picture' src={profile} alt='profile' />
          <div className='post-text'>
            {this.props.name} : {this.props.content}
          </div>
        </div>
      );
    };
};

export default Post;