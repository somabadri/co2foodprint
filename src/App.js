import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import './App.css'
import About from './pages/About'
import FoodCalc from './pages/FoodCalc'
import TransportationCalc from './pages/TransportationCalc'
import Profile from './pages/Profile'




function App() {
  return (
    
      <div>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/"><Home/></Route>
            <Route path="/about"><About/></Route>
            <Route path="/foodcalc"><FoodCalc/></Route>
            <Route path="/transportationcalc"><TransportationCalc/></Route>
            <Route path="/profile"><Profile/></Route>
          </Switch>
        
        
        </Router>
      </div>
   
  );
}

function Home() {
  return (
      <div>
          this is the home page
      </div>
  );
}
{/*
function About() {
  return (
      <div>
          This is the about page
      </div>
  );
}



function Calculate() {
  return (
      <div>
          This is the Calculate page
      </div>
  );
}

function UserProfile() {
  return (
      <div>
          This is the user profile page
      </div>
  );
}
*/}

export default App;
