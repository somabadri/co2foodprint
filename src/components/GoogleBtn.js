import React, { Component } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';

const CLIENT_ID = '96900730353-e5m0ai716kamtj0nl3bs0j8p2iu82ubv.apps.googleusercontent.com';
class GoogleBtn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogined: false,
      accessToken: '',
    };

    this.login = this.login.bind(this);
    this.handleLoginFailure = this.handleLoginFailure.bind(this);
    this.logout = this.logout.bind(this);
    this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
  }

  componentDidMount() {
    let loggedIn = localStorage.getItem('isLogined');
    let token = localStorage.getItem('current email');
   
    if(loggedIn === "true"){
      this.setState({
        isLogined: true,
        accessToken: token,
      });
    }
    else{
      this.setState({
        isLogined: false,
        accessToken: '',
      });
    }
  }

  login(response) {
    if (response.accessToken) {
      this.setState({
        isLogined: true,
        accessToken: response.accessToken,
        isSet: false
      });
      localStorage.setItem('isLogined', true);
      localStorage.setItem('current email', response.profileObj.email);
      localStorage.setItem('current name',response.profileObj.givenName);
      localStorage.setItem('current pic', response.profileObj.imageUrl);
    }
  }

  logout(response) {
    this.setState({
      isLogined: false,
      accessToken: '',
      isSet:false
    });
    localStorage.setItem('isLogined', false);
    localStorage.removeItem('current email');
    localStorage.removeItem('current name');
    localStorage.removeItem('current pic');
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
      </div>
    )
  }
}

export default GoogleBtn;