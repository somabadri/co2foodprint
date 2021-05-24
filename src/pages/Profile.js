import React, { useEffect } from 'react';
import { useState } from 'react';
import LineChart from "../components/LineChart";
import FriendProfile from "./FriendProfile";
import { BrowserRouter, Link, Route, withRouter  } from 'react-router-dom';
import Navbar from '../components/Navbar'
import '../styles/styleProfilePage.scss';
import Footer from '../components/Footer';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';

document.body.style = 'background: #CAD2C5';



//https://www.w3schools.com/jsref/jsref_encodeuri.asp for security of urls
//DO NOT DELETE COMMENTED OUT CODE
function Profile() {
  const [recipes,setRecipes] = useState([{}]);
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [pic,setPic] = useState('');
  const [method,setMethod] = useState(false);
  const [transport, setTransport] = useState(0);
  const [friendsList, setFriendsList] = useState([{}]);
  const [hasFriends, setHasFriends] = useState(0);

  useEffect(() => {
    const data = {
      name: localStorage.getItem('current name'),
      email: localStorage.getItem('current email'),
      pic: localStorage.getItem('current pic')
    }
    setName(data.name);
    setEmail(data.email);
    setPic(data.pic);
    fetch('http://localhost:5000/api/v1/users/'+email, {
      "method": "GET",
      "headers": {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if(!response.ok){
        return 'error';
      }
      return response.json();
    }).then((json) => {
      if(json.users.find(id=>id=email)){
        setRecipes(json.users.find(id=>id=email).recipes);
        setTransport(json.users.find(id=>id=email).transportation_co2);
        setFriendsList(json.users.find(id=>id=email).friends);
        setHasFriends(1);
        setMethod(true);
      }
    }).catch((error) => {
      throw(error);
    })
  },[email])

  function handleRemove(id) {
    fetch('http://localhost:5000/api/v1/users/'+email+"?id="+id, {
      "method": "DELETE",
      "headers": {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if(!response.ok){
        return 'error';
      }
      return response.json();
    }).then(() =>{
      setEmail('');
    }).catch((error) => {
      throw(error);
    })
  }

  /*function getFriends() {
    fetch('http://localhost:5000/api/v1/users/'+email, {
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
      setFriendsList(json.users.find(id=>id=email).friends);
      setHasFriends(1);
    }).then((json) =>{
      console.log(friendsList);
    }).catch((error) => {
      throw(error);
    })
  }*/


  function showRecipe(recipes) {
    if(!method || recipes[0] === undefined) {
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
              <Button onClick={()=>handleRemove(element.recipe_id)}>remove</Button>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        ))}</Accordion>
    }
  }

  function moveToFriendPage(friend_id) {
    console.log(friend_id);
    /*<Link>
      to={{
        pathname: "/friendProfile",
        data: friend_id
      }}
    </Link>*/
    window.location = `/friendProfile/${friend_id}`;
    /*this.props.history.push({
      pathname: "/friendProfile",
      state: {id: friend_id}
    });
    <BrowserRouter>
      <Route path="/friendProfile/" component={withRouter(FriendProfile)}/>
    </BrowserRouter>*/
  }

  function handleFriendRemove(id) {
    fetch('http://localhost:5000/api/v1/users/'+email+"/friends?friend_id="+id, {
      "method": "DELETE",
      "headers": {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if(!response.ok){
        return 'error';
      }
      return response.json();
    }).then(() =>{
      setEmail('');
    }).catch((error) => {
      throw(error);
    })
  }

    return (
    <div>
      <Navbar />
      
      <div class="container-center-horizontal">
        <div className="profileScreen">
          <div className="flex-col-2">
            <div className="overlap-group1">
            </div>
            <div className="flex-row">
              <h1 className="title">{"Your Recipes"}</h1>
            </div>
          </div>
          <div className="flex-row-2">
            <div className="flex-row-3">
              <div className="flex-col">
                <img className="profPic" src={pic} alt=""/>
                <div className="userName">{name}</div>
                <div>Your Transportation CO2:{transport}</div>
              </div>
              <div className= "recipes">
                <div className= "recipeBox">
                  {showRecipe(recipes)}
                </div>
              </div>
            </div>
            <div className="flex-col-1">
              <LineChart email={email}/> 
              <div className="friends">{"Friends"}</div>
              <div className="flex-row-1">
                <div className="friendpics">
                    {hasFriends > 0 &&
                    <div> 
                      {friendsList.map((x,i)=>{return(
                      <div>
                        <br/>
                        <div className="friendButtons">
                          <Button variant="light" onClick={()=>moveToFriendPage(friendsList[i].friend_id)}> {friendsList[i].name} </Button>{' '}
                          <Button variant="light" size="sm" onClick={()=>handleFriendRemove(friendsList[i].friend_id)}>Delete</Button>
                        </div>
                        
                        </div>
                        );
                        })}
                    </div>
                  }
                  
                
                {/*}
                  <img className="ellipse-1" src={"https://anima-uploads.s3.amazonaws.com/projects/608b4ca9ee3fce15866ca79a/releases/608b51b1f68e88411d270394/img/ellipse-10@2x.png"} alt=""/>
                  <img className="ellipse-1" src={"https://anima-uploads.s3.amazonaws.com/projects/608b4ca9ee3fce15866ca79a/releases/608b51b1f68e88411d270394/img/ellipse-10@2x.png"} alt=""/>
                  <img className="ellipse-1" src={"https://anima-uploads.s3.amazonaws.com/projects/608b4ca9ee3fce15866ca79a/releases/608b51b1f68e88411d270394/img/ellipse-10@2x.png"} alt=""/>
                  <img className="ellipse-1" src={"https://anima-uploads.s3.amazonaws.com/projects/608b4ca9ee3fce15866ca79a/releases/608b51b1f68e88411d270394/img/ellipse-10@2x.png"} alt="" />
                
                  localhost:5000/friendProfile:friend_id
                
                */}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
    );
  }
  
  export default Profile;