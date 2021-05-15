import React, { useEffect } from 'react';
import { useState } from 'react';
import Navbar from '../components/Navbar'
import '../styles/styleProfilePage.scss';
import Footer from '../components/Footer';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import "bootstrap/dist/css/bootstrap.min.css";

document.body.style = 'background: #CAD2C5';


//https://www.w3schools.com/jsref/jsref_encodeuri.asp for security of urls
//DO NOT DELETE COMMENTED OUT CODE
function Profile() {

  const [recipes,setRecipes] = useState([{}]);
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [pic,setPic] = useState('');
  const [method,setMethod] = useState(false);
  //const [averages,setAverages] = useState([{}]);

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
        setMethod(true);
      }
    }).catch((error) => {
      throw(error);
    })
  },[email])

  useEffect(() => {
    let avg = [];
    let total = [];
    if(recipes.length !== 0){
      for(let i = 0;i<recipes.length;i++){
        if(i === 0){
          total[i] =  Number(recipes[i].co2value);
          avg[i] = total[i];
        } else {
          total[i] = ((avg[i-1])+Number(recipes[i].co2value)).toFixed(3);
          avg[i] = total[i]/(i+1);
        }
      }
    }
    //setAverages(avg);
  },[recipes])

  function showRecipe(recipes) {
    if(!method || recipes[0] === undefined) {
      return <div></div>
    } else {
      return <Accordion>{(recipes.map((element,idx) => 
        <Card key={idx}>
          <Accordion.Toggle as={Card.Header} eventKey={element.recipe_id}>
            {element.name}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={element.recipe_id}>
            <Card.Body>
              <div>
                ingredients:{element.ingredients.map(ingredient => 
                  <div>
                  <div key ={ingredient.Item}>{ingredient.Item}</div>
                  <div key ={ingredient.Quantity}>{ingredient.Quantity}</div>
                  </div>
                )}
              </div>
              <div key={element.co2value}>co2value:{element.co2value}</div>
              <div key={element.description}>description:{element.description}</div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        ))}</Accordion>
    }
  }

    return (
    <div>
      <Navbar />
      <div className="container-center-horizontal">
        <div className="profile screen">
          <div className="flex-col-2">
            <div className="overlap-group1">
            </div>
            <div className="flex-row">
              <h1 className="title">{"Your Recipes"}</h1>
              <div className="your-metrics">{"Your Metrics"}</div>
            </div>
          </div>
          <div className="flex-row-2">
            <div className="flex-row-3">
              <div className="flex-col">
                <img className="ellipse-9" src={pic} alt=""/>
                <div className="sobadri">{name}</div>
              </div>
              <div className= "recipes">
                {showRecipe(recipes)}
              </div>
            </div>
            <div className="flex-col-1">
              <div className="overlap-group">
                <img className="rectangle-21" src={"https://anima-uploads.s3.amazonaws.com/projects/608b4ca9ee3fce15866ca79a/releases/608b51b1f68e88411d270394/img/rectangle-21@2x.svg"} alt=""/>
                <img className="line-1" src={"https://anima-uploads.s3.amazonaws.com/projects/608b4ca9ee3fce15866ca79a/releases/608b51b1f68e88411d270394/img/line-1@2x.svg"} alt=""/>
                <img className="line-2" src={"https://anima-uploads.s3.amazonaws.com/projects/608b4ca9ee3fce15866ca79a/releases/608b51b1f68e88411d270394/img/line-2@2x.svg"} alt=""/>
                <img className="line-3" src={"https://anima-uploads.s3.amazonaws.com/projects/608b4ca9ee3fce15866ca79a/releases/608b51b1f68e88411d270394/img/line-1@2x.svg"} alt=""/>
                <img className="line-4" src={"https://anima-uploads.s3.amazonaws.com/projects/608b4ca9ee3fce15866ca79a/releases/608b51b1f68e88411d270394/img/line-4@2x.svg"} alt=""/>
              </div>
              <div className="friends">{"Friends"}</div>
              <div className="flex-row-1">
                <div className="friendpics">
                  <img className="ellipse-1" src={"https://anima-uploads.s3.amazonaws.com/projects/608b4ca9ee3fce15866ca79a/releases/608b51b1f68e88411d270394/img/ellipse-10@2x.png"} alt=""/>
                  <img className="ellipse-1" src={"https://anima-uploads.s3.amazonaws.com/projects/608b4ca9ee3fce15866ca79a/releases/608b51b1f68e88411d270394/img/ellipse-10@2x.png"} alt=""/>
                  <img className="ellipse-1" src={"https://anima-uploads.s3.amazonaws.com/projects/608b4ca9ee3fce15866ca79a/releases/608b51b1f68e88411d270394/img/ellipse-10@2x.png"} alt=""/>
                  <img className="ellipse-1" src={"https://anima-uploads.s3.amazonaws.com/projects/608b4ca9ee3fce15866ca79a/releases/608b51b1f68e88411d270394/img/ellipse-10@2x.png"} alt="" />
                </div>
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
