import React from 'react';
import { BrowserRouter, Route, withRouter  } from 'react-router-dom';
import Profile from './pages/Profile'
import CalculateFood from './pages/CalcFood';
import CalculateTransport from './pages/CalcTransport';
import PostRecipe from './pages/PostRecipe';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import FriendProfile from './pages/FriendProfile';

function App() {
  return (
    <BrowserRouter>
      <div>
            <Route exact path="/" component={withRouter(Landing)}/>
            <Route path="/dashboard/" component={withRouter(Dashboard)}/>
            <Route path="/about/" component={withRouter(About)}/>
            <Route path="/calculate/" component={withRouter(CalculateFood)}/>
            <Route path="/calculateTransport/" component={withRouter(CalculateTransport)}/>
            <Route path="/postrecipe/" component={withRouter(PostRecipe)}/>
            <Route path="/profile/" component={withRouter(Profile)}/>
            <Route path="/friendProfile/" component={withRouter(FriendProfile)}/>
      </div>
    </BrowserRouter>
  );
}

export default App;