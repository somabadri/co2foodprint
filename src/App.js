import React from 'react';
import { BrowserRouter as BrowserRouter, Route, Switch, Link, Redirect, withRouter  } from 'react-router-dom';
import Profile from './pages/Profile'
import Calculate from './pages/CalcFood';
import PostRecipe from './pages/PostRecipe';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';

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