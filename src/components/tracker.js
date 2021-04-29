import React, { Component } from "react";
import '../styles/tracker.scss'

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
        <img src='' alt='growing plant' />
      </div>
    );
  }
}

export default Tracker;