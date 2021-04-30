import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Navbar from './components/navbar';
import Profile from './Profile';
{/*import LoginHooks from './components/LoginHooks';
import LogoutHooks from './components/LogoutHooks';
import GoogleBtn from './GoogleBtn';*/}


function App() {
  return (
    <Router>
      <div>
        <Navbar />
        {/*<LoginHooks />
        <LogoutHooks />
        <GoogleBtn/>*/}

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
            <Link to='/Profile'>Profile</Link>
          </li>
        </ul>
        <Switch>
          <Route exact path="/"><Home/></Route>
          <Route path="/about"><About/></Route>
          <Route path="/calculate"><Calculate/></Route>
          <Route path="/Profile"><Profile/></Route>
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



export default App;
