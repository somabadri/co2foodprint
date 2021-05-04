import React, { useEffect } from 'react';
import { useState } from 'react';
import Navbar from '../components/Navbar'
import '../styles/styleProfilePage.scss';

document.body.style = 'background: #CAD2C5';



function Profile() {

  const [recipes,setRecipes] = useState([{}]);

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/recipes', {
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
      setRecipes(json.recipes);  
    }).catch((error) => {
      throw(error);
    })
  },[])
  
    return (
      <div>
        <Navbar />
      <div class="container-center-horizontal">
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
                <img className="ellipse-9" src={"https://anima-uploads.s3.amazonaws.com/projects/608b4ca9ee3fce15866ca79a/releases/608b51b1f68e88411d270394/img/ellipse-9@2x.png"} alt=""/>
                <div className="sobadri">{"sobadri"}</div>
              </div>
              <div className="text-1">{recipes.map( element => <div>{element.name}<br /></div>)}</div>
            </div>
            <div className="flex-col-1">
              <div className="overlap-group">
                <img className="rectangle-21" src={"https://anima-uploads.s3.amazonaws.com/projects/608b4ca9ee3fce15866ca79a/releases/608b51b1f68e88411d270394/img/rectangle-21@2x.svg"} alt=""/>
                <img className="line-1" src={"https://anima-uploads.s3.amazonaws.com/projects/608b4ca9ee3fce15866ca79a/releases/608b51b1f68e88411d270394/img/line-1@2x.svg"} alt=""/>
                <img className="line-2" src={"https://anima-uploads.s3.amazonaws.com/projects/608b4ca9ee3fce15866ca79a/releases/608b51b1f68e88411d270394/img/line-2@2x.svg"} alt=""/>
                <img className="line-3" src={"https://anima-uploads.s3.amazonaws.com/projects/608b4ca9ee3fce15866ca79a/releases/608b51b1f68e88411d270394/img/line-1@2x.svg"} alt=""/>
                <img className="line-4" src={"https://anima-uploads.s3.amazonaws.com/projects/608b4ca9ee3fce15866ca79a/releases/608b51b1f68e88411d270394/img/line-4@2x.svg"} alt=""/>
              </div>
              <div className="friends lato-bold-black-25px">{"Friends"}</div>
              <div className="flex-row-1">
                <img className="ellipse-10" src={"https://anima-uploads.s3.amazonaws.com/projects/608b4ca9ee3fce15866ca79a/releases/608b51b1f68e88411d270394/img/ellipse-10@2x.png"} alt=""/>
                <img className="ellipse-1" src={"https://anima-uploads.s3.amazonaws.com/projects/608b4ca9ee3fce15866ca79a/releases/608b51b1f68e88411d270394/img/ellipse-10@2x.png"} alt=""/>
                <img className="ellipse-1" src={"https://anima-uploads.s3.amazonaws.com/projects/608b4ca9ee3fce15866ca79a/releases/608b51b1f68e88411d270394/img/ellipse-10@2x.png"} alt=""/>
                <img className="ellipse-1" src={"https://anima-uploads.s3.amazonaws.com/projects/608b4ca9ee3fce15866ca79a/releases/608b51b1f68e88411d270394/img/ellipse-10@2x.png"} alt=""/>
              </div>
            </div>
          </div>
          <div className="overlap-group2">
          </div>
        </div>
      </div>
      </div>
    );
  }
  
  export default Profile;
