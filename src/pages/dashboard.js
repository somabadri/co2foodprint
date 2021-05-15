import React, { Component } from "react";
import '../styles/dashboard.scss'
import Tracker from '../components/tracker'
import NavbarComponent from '../components/navbar';
import Footer from '../components/footer';
import Post from '../components/post';
import { BrowserRouter, Route, Switch, withRouter} from 'react-router-dom';
import About from './About.js'

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
