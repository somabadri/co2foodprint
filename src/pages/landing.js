import React from 'react';
import { GoogleLogin } from 'react-google-login';
import LandingNavbar from '../components/LandingNavbar';
import '../styles/landing.scss';
import monstera from '../assets/monstera.png';
import Footer from '../components/Footer'
import {useState, useEffect} from 'react'
import { Redirect } from 'react-router-dom';


const CLIENT_ID = '96900730353-e5m0ai716kamtj0nl3bs0j8p2iu82ubv.apps.googleusercontent.com';
function Landing() {
  const [login,setLogin] = useState(false);
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [pic,setPic] = useState('');

  useEffect(() => {
    return () => {
      localStorage.setItem('current name', name);
    }
  },[name]);

  useEffect(() => {
    return () => {
      localStorage.setItem('current email', email);
    }
  },[email])

  useEffect(() => {
    return () => {
      localStorage.setItem('current pic', pic);
    }
  },[pic])

  const responseLogin = (response) => {
    setName(response.profileObj.givenName);
    setEmail(response.profileObj.email);
    setPic(response.profileObj.imageUrl);
    setLogin(true);
  }

  const responseFailure = (response) => {
    console.log('error');
  }

  if(login){
    return <Redirect push to="/dashboard" />
  }
  return (
    <div>
      <LandingNavbar />
      <div className="container">
        <div className= "left-text">
          <div className= "title">
            Carbon Foodprint
          </div>
          <div className="subtitle"> 
            A tool that helps you lead the sustainable life of your choice. 
          </div> 
          <div className="description">
            Keep track of your carbon emissions, set weekly goals, share your enviroment friendly recipes, 
            and watch yourself and your friends hit their goals.
          </div>
          <GoogleLogin
            clientId={CLIENT_ID}
            buttonText='login'
            onSuccess={responseLogin}
            onFailure={responseFailure}
            cookiePolicy={'single_host_origin'}
          />
        </div>
        <div className= "right-text">
          <img className= "monstera-plant"src={monstera} alt='monstera plant'/>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Landing;
