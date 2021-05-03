import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { BrowserRouter as BrowserRouter, Route, Switch, Link, Redirect, withRouter  } from 'react-router-dom';
import About from './About';
import Dashboard from './Dashboard';
import Landing from './Landing';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" component={withRouter(Landing)}/>
          <Route path="/dashboard/" component={withRouter(Dashboard)}/>
          <Route path="/about/" component={withRouter(About)}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
