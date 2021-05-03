import React, { Component } from "react";
import './styles/dashboard.scss'
import Tracker from './components/tracker'
import { Button } from "@material-ui/core";
import Navbar from './components/navbar/navbar';
import Footer from './components/footer';
import Post from './components/post'

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="dashboard">
          <div className="left-section">
              <div className="tracker">
                <Tracker />
              </div>
              <div className="buttons">
                <div className="button">
                Calculate
                </div>
                <div className="button">
                  Add Recipe
                </div>
                <div className="button">
                  Create Post
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
      </div>
    );
  }
}

export default Dashboard;
