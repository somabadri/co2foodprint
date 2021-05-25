import React, { Component } from "react";
import '../styles/dashboard.scss'
import Tracker from '../components/Tracker'
import NavbarComponent from '../components/Navbar';
import Footer from '../components/Footer';
import Post from '../components/Post';
import { BrowserRouter } from 'react-router-dom';

class Dashboard extends Component {
  render() {
    return (
      <BrowserRouter>
      <NavbarComponent />
      <div>
        
        <div className="dashboard">
          <div className="left-section">
              <div className="tracker">
                <Tracker />
              </div>
              <div className="buttons">
                <div className="button">
                  <a href="/calculate"> 
                      Calculate
                  </a>
                </div>
                <div className="button">
                  <a href="/calculate"> 
                      Add Recipe
                  </a>
                </div>
              </div>
          </div>
          <div className="right-section">
              <div className="posts">
                <Post name="Soma" content="Test Post" />
                <Post name="Soma" content="Test Post" />
                <Post name="Soma" content="Test Post" />
              </div>
          </div>
        </div>
        <Footer />
        {/* <Switch>
          <Route path="/about/" component={withRouter(About)}/>
        </Switch> */}
      </div>
    </BrowserRouter>
    );
  }
}

export default Dashboard;
