import React, { Component } from "react";
import '../styles/tracker.scss'
import tree from '../assets/tree.png';

class Tracker extends Component {
  render() {
    return (
      <div className="tracker-container">
        <div className="title">
          Weekly Progress
        </div>
        <div className="subtitle">
            Watch the tree grow as you hit your goals
        </div>
        <div>
          <img className='tree-picture' src={tree} alt='growing plant' />
        </div>
      </div>
    );
  }
}

export default Tracker;