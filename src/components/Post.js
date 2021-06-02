import React, { Component } from "react";
import '../styles/post.scss';

// Post component for dashboard
class Post extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', content: '', pic: '' };
  }

    render() {
      return (
        <div className='post'>
          <img className='profile-picture' src={this.props.pic} alt='profile' />
          <div className='post-text'>
            {this.props.name} : {this.props.content}
          </div>
        </div>
      );
    };
};

export default Post;
