import React, { Component } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { Redirect, useHistory } from 'react-router-dom';

const CLIENT_ID = '3443573685-hqahsb3lo4jaej61su2r44eed7j2oiti.apps.googleusercontent.com';
class GoogleBtn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogined: false,
      accessToken: ''
    };

    this.login = this.login.bind(this);
    this.handleLoginFailure = this.handleLoginFailure.bind(this);
    this.logout = this.logout.bind(this);
    this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
  }

  componentDidMount() {
    let loggedIn = localStorage.getItem('isLogined');
    let token = localStorage.getItem('loginToken');
   
    if(loggedIn === "true"){
      this.setState({
        isLogined: true,
        accessToken: token
      });
    }
    else{
      this.setState({
        isLogined: false,
        accessToken: ''
      });
    }
  }

  login(response) {
    console.log(response)
   
    if (response.accessToken) {
      this.setState({
        isLogined: true,
        accessToken: response.accessToken
      });
      localStorage.setItem('isLogined', true);
      localStorage.setItem('loginToken', response.accessToken);
      localStorage.setItem('firstname', response.profileObj.givenName);
      localStorage.setItem('profilepic', response.profileObj.imageUrl);
    }
    
  }

  logout(response) {
    this.setState({
      isLogined: false,
      accessToken: ''
    });
    localStorage.setItem('isLogined', false);
    localStorage.setItem('loginToken', '');
    localStorage.removeItem('firstname');
    localStorage.removeItem('profilepic');
    window.location.pathname = "/"
  }

  handleLoginFailure(response) {
    alert('Failed to log in')
  }

  handleLogoutFailure(response) {
    alert('Failed to log out')
  }

  render() {
    if(this.state.isLogined && window.location.pathname === '/'){
      window.location.pathname = "/dashboard";
    
    }
    return (
      <div>
        { this.state.isLogined ?

          <GoogleLogout
            clientId={CLIENT_ID}
            buttonText='Logout'
            onLogoutSuccess={this.logout}
            onFailure={this.handleLogoutFailure}
          >
          </GoogleLogout>
          :

          <GoogleLogin
            clientId={CLIENT_ID}
            buttonText='Login'
            onSuccess={this.login}
            onFailure={this.handleLoginFailure}
            cookiePolicy={'single_host_origin'}
            responseType='code,token'
          />

        }

        {/* { this.state.accessToken ? <h5>Your Access Token: <br/><br/> { this.state.accessToken }</h5> : null } */}
      </div>
    )
  }
}

export default GoogleBtn;