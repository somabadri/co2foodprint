import React from "react";
import {/*useState,*/useEffect} from 'react'
import '../styles/dashboard.scss'
import Tracker from '../components/Tracker'
import NavbarComponent from '../components/Navbar';
import Footer from '../components/Footer';
import Post from '../components/Post';
import { BrowserRouter, Route, Switch, withRouter} from 'react-router-dom';
import About from './About.js'


function Dashboard() {
  useEffect(()=> {
    const data = {
      name: localStorage.getItem('current name'),
      email: localStorage.getItem('current email'),
      pic: localStorage.getItem('current pic')
    }
    fetch('http://localhost:5000/api/v1/users/'+data.email, {
        "method": "GET",
        "headers": {
          "Content-Type": "application/json"
        }
    }).then((response) => {
      if(!response.ok){
        return 'error';
      }
      return response.json();
    }).then((json) => {
      if(json.users.length === 0){
        authenticateUser(data);
      }
    }).catch((error) => {
      throw(error);
    });
  },[]);

  function authenticateUser(data) {
    const newUser = {
      "name": data.name,
      "user_id":data.email,
      "profile_pic":data.pic
    }
    fetch('http://localhost:5000/api/v1/users',{
      "method": "POST",
      "headers": {
        "Content-Type": "application/json"
      },
      "body": JSON.stringify(newUser)
    }).then((response) => {
      if(!response.ok){
        return 'error';
      }
      return response.json();
    }).then((json) => {
      console.log(json);
    }).catch((error) => {
      throw(error);
    });
  }

  return (
    <BrowserRouter>
    <div>
      <NavbarComponent />
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

export default Dashboard;
