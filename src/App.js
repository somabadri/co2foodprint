import React from 'react';
import { BrowserRouter as BrowserRouter, Route, Switch, Link, Redirect, withRouter  } from 'react-router-dom';
import About from './About';
import Post from './components/post';
import Profile from './Profile'
import Dashboard from './dashboard';
import Calculate from './Calculate';
import Landing from './landing';
import PostRecipe from './pages/postRecipe';




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

export default App;
