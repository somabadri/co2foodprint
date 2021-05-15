import React from 'react';
import { NavbarItems } from "./NavbarItems";
import '../styles/navbar.css';
import {useState,useEffect} from 'react';
import {useHistory} from 'react-router';
import { GoogleLogout } from 'react-google-login';


const CLIENT_ID = '96900730353-e5m0ai716kamtj0nl3bs0j8p2iu82ubv.apps.googleusercontent.com';
function Navbar() {
  const history = useHistory();
  const [name,setName] = useState('');

  useEffect(()=> {
    const data = {
      name: localStorage.getItem('current name'),
      email: localStorage.getItem('current email'),
      pic: localStorage.getItem('current pic')
    }
    setName(data.name);
  },[]);

  const[clicked,setClicked] = useState(true);

  const handleClick = () => {
    setClicked(false);
  }

  const responseFailure = (response) => {
    console.log('error');
  }

  const responseLogout = () =>{
    localStorage.removeItem('current name');
    localStorage.removeItem('current email');
    localStorage.removeItem('current pic');
    history.replace('/');
    history.go();
  }

  return (  

    <nav className = "NavbarItems">
      <h1 className= "navbar-logo">Hi {name}</h1>
      <h2 className = "navbar-logo">CO2 Foodprint</h2>
      
      <div className= "menu-icon" onClick={handleClick}>
            <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
            
      </div>
      <ul className = {clicked ? 'nav-menu active' : 'nav-menu'}>
        {NavbarItems.map((item, index)=> {
          return(
            <li key = {index}>
              <a className = {item.cName} href = {item.url}>
              {item.title}
              </a>
            </li>
          )
        })}
        <GoogleLogout
            clientId={CLIENT_ID}
            buttonText='logout'
            onLogoutSuccess={responseLogout}
            onFailure={responseFailure}
            cookiePolicy={'single_host_origin'}
        />
      </ul>
    </nav>
    );
}

export default Navbar;