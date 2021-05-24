import React, { useEffect } from 'react';
import { useState } from 'react';
import LineChart from "../components/LineChart";
import Navbar from '../components/Navbar'
import Profile from "./Profile";
import '../styles/styleProfilePage.scss';
import Footer from '../components/Footer';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';
import '../styles/friendProfStyle.scss';
//import { render } from 'node-sass';

document.body.style = 'background: #CAD2C5';

function FriendProfile(){
    const [friendRecipes,setFriendRecipes] = useState([{}]);
    const [friendName,setFriendName] = useState('');
    const [friendEmail,setFriendEmail] = useState('');
    const [friendPic,setFriendPic] = useState('');
    const [friendMethod,setFriendMethod] = useState(false);
    const [friendTransport, setFriendTransport] = useState(0);


    //console.log(window.location.pathname);
    let urlElements = window.location.href.split('/');
    //console.log(urlElements);
    let friendID = (urlElements[4]);
    console.log(friendID);

    function getFriendInfo() {
        fetch('http://localhost:5000/api/v1/users/'+friendID, {
          "method": "GET",
          "headers": {
            "Content-Type": "application/json"
          }
        }).then((response) => {
          if(!response.ok){
            return 'error';
          }
          return response.json();
        }).then((json) =>{
            setFriendName(json.users.find(id=>id=friendID).name);
            console.log(friendName);
            setFriendPic(json.users.find(id=>id=friendID).pic);
            console.log(friendPic);
            setFriendEmail(json.users.find(id=>id=friendID).email);
            console.log(friendEmail);
        }).then((json) =>{
          //console.log(friendsList);
        }).catch((error) => {
          throw(error);
        })
      }
    //this.props.location.state.id;

    //const {data} = this.props.location
        return (
            <div>
              <Navbar />
                <div> This is your friend's profile page </div>
                    {getFriendInfo()}
                <div className = "screenContainer">
                    <div className = "friendProf">
                        <div className = "col1">
                            <div className = "friendProfPic">
                                    <div> Friend Pic </div>
                                    {/*<img className="profPic" src={pic} alt=""/>*/}
                            </div>
                            <div className = "friendName">
                                    <div> Friend Name </div>
                                    {/*<div className="userName">{name}</div>*/}
                            </div>
                        </div>
                        <div className = "col2">
                            <div className = "friendRecipes">
                                <div className = "friendRec">
                                    <div> Recipes </div>
                                </div>
                                <div className = "friendRecipeBox">
                                    <div> Friend's Recipe Box </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              <Footer />
            </div>
        );
    }

  
export default FriendProfile;