import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import GoogleBtn from './GoogleBtn';

function App() {
  return (
    <Router>
      <div>
        <GoogleBtn/>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
          <li>
            <Link to='/calculate'>Calculate</Link>
          </li>
          <li>
            <Link to='/userProfile'>UserProfile</Link>
          </li>
        </ul>
        <Switch>
          <Route exact path="/"><Home/></Route>
          <Route path="/about"><About/></Route>
          <Route path="/calculate"><Calculate/></Route>
          <Route path="/userProfile"><UserProfile/></Route>
        </Switch>
      </div>
    </Router>
  );
}

function About() {
  return (
      <div>
          This is the about page
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

export default App;
