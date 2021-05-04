import React from 'react';
import { BrowserRouter as BrowserRouter, Route, Switch, Link, Redirect, withRouter  } from 'react-router-dom';
import Profile from './Profile'
import Calculate from './Calculate';
import PostRecipe from './pages/postRecipe';
import About from './pages/about';
import Dashboard from './pages/dashboard';
import Landing from './pages/landing';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" component={withRouter(Landing)}/>
          <Route path="/dashboard/" component={withRouter(Dashboard)}/>
          <Route path="/about/" component={withRouter(About)}/>
    
          <Route path="/calculate/" component={withRouter(Calculate)}/>
          <Route path="/postrecipe/" component={withRouter(PostRecipe)}/>
          <Route path="/profile/" component={withRouter(Profile)}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}


  
  
  