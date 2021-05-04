import React, { Component } from "react";
import '../styles/dashboard.scss'
import Tracker from '../components/Tracker'
import { Button } from "@material-ui/core";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Post from '../components/Post';
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter, Redirect, useHistory, withRouter} from 'react-router-dom';
import About from './About'

class Dashboard extends Component {
  render() {
    return (
      <BrowserRouter>
      <div>
        <Navbar />
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
        <Switch>
          <Route path="/about/" component={withRouter(About)}/>
        </Switch>
      </div>
    </BrowserRouter>
    );
  }
}

export default Dashboard;
