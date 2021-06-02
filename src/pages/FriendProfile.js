import React, { useEffect } from 'react';
import { useState } from 'react';
import Navbar from '../components/Navbar'
import '../styles/styleProfilePage.scss';
import Footer from '../components/Footer';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';
import '../styles/friendProfStyle.scss';

document.body.style = 'background: #CAD2C5';

//this function updates the page for which user you are viewing
function FriendProfile(props) {
  const [friendRecipes, setFriendRecipes] = useState([{}]);
  const [friendName, setFriendName] = useState('');
  const [friendPic, setFriendPic] = useState('');
  const [friendMethod, setFriendMethod] = useState(false);
  let friendID = props.location.state.email;

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/users/' + friendID, {
      "method": "GET",
      "headers": {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (!response.ok) {
        return 'error';
      }
      return response.json();
    }).then((json) => {
      if (json.users.find(id => id = friendID)) {
        setFriendName(json.users.find(id => id = friendID).name);
        setFriendPic(json.users.find(id => id = friendID).profile_pic);
        setFriendRecipes(json.users.find(id => id = friendID).recipes);
        setFriendMethod(true);
      }
    }).catch((error) => {
      throw (error);
    })
  }, [friendID])

  //this function adds their recipe to your recipe book
  function handleAdd(element) {
    const data = {
      "name": element.name,
      "ingredients": element.ingredients,
      "co2value": element.co2value,
      "description": element.description,
    }
    const email = localStorage.getItem('current email');
    fetch('http://localhost:5000/api/v1/users/' + email, {
      "method": "POST",
      "headers": {
        "Content-Type": "application/json"
      },
      "body": JSON.stringify(data)
    }).then((response) => {
      if (!response.ok) {
        return 'error';
      }
      return response.json();
    }).then(() => {
      window.location.reload();
    }).catch((error) => {
      throw (error);
    });
  }

  //this function gives the recipes of the user you're viewing in an accordion list
  function showRecipe(recipes) {
    if (!friendMethod) {
      return <div></div>
    } else {
      return <Accordion>{(recipes.map((element, idx) =>
        <Card {... {
          style: { backgroundColor: "#84A98C" }
        }} key={idx}>
          <Accordion.Toggle {...{ style: { textAlign: "center" } }} as={Card.Header} eventKey={element.recipe_id}>
            {element.name}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={element.recipe_id}>
            <Card.Body {... {
              style: { backgroundColor: "#afc4b3" }
            }}>
              <div>
                Ingredients:{element.ingredients.map(ingredient =>
                <div key={ingredient.Quantity + ingredient.Item}>
                  <div>{ingredient.Quantity} {ingredient.Item}</div>
                </div>
              )}<br />
              </div>
              <div key={element.co2value}>Kg CO2 Emitted: {element.co2value}</div><br />
              <div key={element.description}>Instructions: {element.description}</div>
              <Button variant="light" onClick={() => handleAdd(element)}>Add to your recipes</Button>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      ))}</Accordion>
    }
  }

  //this sends you back to your page
  function backToProfPage() {
    window.location = '/Profile';
  }

  return (
    <div>
      <Navbar />
      <div className="screenContainer">
        <div className="back">
          <Button variant="light" onClick={() => backToProfPage()}>Return to your profile</Button>
        </div>
        <div className="row">
          <div className="col">
            <div className="friendProfCol">
              <div className="friendProfPic1">
                <img className="profPic" src={friendPic} alt="" />
              </div>
              <div className="friendName1">
                <div className="userName1">{friendName}</div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="friendRecipesCol">
              <div className="friendRec">
                <div> {friendName}'s Recipes </div>
              </div>
              <div className="friendRecipeBox">
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