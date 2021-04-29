import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Navbar from './components/navbar';
import GoogleBtn from './components/GoogleBtn';
import Footer from './components/footer';
// import Button from './components/button';
import Landing from './landing';


function App() {
  return (
      <div>
        <Landing />
      </div>
  );
}
export default App;
