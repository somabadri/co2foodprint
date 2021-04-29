import React, { Component } from "react";
import './styles/dashboard.scss'
import Tracker from './components/tracker'

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
          <div className="left-section">
              <div className="tracker">
                <Tracker />
              </div>
              <div className="buttons">
                
              </div>
          </div>
          <div className="right-section">
              <div className="posts">

              </div>
          </div>
      </div>
    );
  }
}

export default Dashboard;

{/* <BrowserRouter>
<Route path='/dashboard' component={Dashboard} />
</BrowserRouter>  */}