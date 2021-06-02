import React, { Component } from "react";
import '../styles/tracker.scss'
import tree from '../assets/tree.png';

// Left portion of the dashboard. 
class Tracker extends Component {
  render() {
    return (
      <div className="tracker-container">
        <div className="title">
          Average CO2 emissions
        </div>
        <div className="subtitle">
            Work with others to lower your carbon emissions! Follow new friends and
            check out their recipes! Or create your own to track your co2 emissions and make a
            difference!
        </div>
        <div>
          <img className='tree-picture' src={tree} alt='growing plant' />
        </div>
      </div>
    );
  }
}

export default Tracker;
