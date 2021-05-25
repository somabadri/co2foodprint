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
    const [urlElements,setUrlElements] = useState(window.location.href.split('/'));
    const [friendID,setFriendID] = useState(urlElements[4]);

    //console.log(window.location.pathname);
    //console.log(urlElements);
    //let friendID = (urlElements[4]);
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
            if(json.users.find(id=>id=friendID)){
                setFriendRecipes(json.users.find(id=>id=friendID).recipes);
                setFriendTransport(json.users.find(id=>id=friendID).transportation_co2);
                setFriendMethod(true);
              }
        }).catch((error) => {
          throw(error);
        })
      }
    function showRecipe(recipes) {
        if(!friendMethod) {
          return <div></div>
        } else {
          return <Accordion>{(recipes.map((element,idx) => 
            <Card {... {
              style: { backgroundColor: "#84A98C" }
            }} key={idx}>
              <Accordion.Toggle {...{style: { textAlign: "center" }}} as={Card.Header} eventKey={element.recipe_id}>
                {element.name}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={element.recipe_id}>
                <Card.Body {... {
                    style: { backgroundColor: "#afc4b3" }
                }}>
                  <div>
                    Ingredients:{element.ingredients.map(ingredient => 
                      <div>
                      <div>{ingredient.Quantity} {ingredient.Item}</div>
                      </div> 
                    )}<br/>
                  </div>
                  <div key={element.co2value}>Kg CO2 Emitted: {element.co2value}</div><br/>
                  <div key={element.description}>Instructions: {element.description}</div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            ))}</Accordion>
        }
      }


      function backToProfPage(){
          window.location = '/Profile';
      }

        return (
            <div>
              <Navbar />
                {getFriendInfo()}
                <div className = "screenContainer">
                    <div className = "back">
                        <Button variant="light" onClick={()=>backToProfPage()}>Return to your profile</Button>
                    </div>
                    <div className = "friendProf">
                        <div className = "col1">
                            <div className = "friendProfPic">
                                    <img className="profPic" src={friendPic} alt=""/>
                            </div>
                            <div className = "friendName">
                                    <div className="userName">{friendName}</div>
                            </div>
                        </div>
                        <div className = "col2">
                            <div className = "friendRecipes">
                                <div className = "friendRec">
                                    <div> {friendName}'s Recipes </div>
                                </div>
                                <div className = "friendRecipeBox">
                                    {showRecipe(friendRecipes)}
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