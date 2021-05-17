import React from 'react';
import { useState,useEffect } from 'react';
import '../styles/calcFood.scss';
import TextField from '@material-ui/core/TextField';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'


let foodImg = "https://anima-uploads.s3.amazonaws.com/projects/608b4ca9ee3fce15866ca79a/releases/608b51b1f68e88411d270394/img/baseline-fastfood-white-48dp-1@2x.png";

let transportImg = "https://anima-uploads.s3.amazonaws.com/projects/608b4ca9ee3fce15866ca79a/releases/608b51b1f68e88411d270394/img/baseline-directions-car-white-48dp-1@2x.png";

document.body.style = 'background: #CAD2C5';

export default function CalculateFood() {

  const [params,setParams] = useState([{
    Item:'',
    Quantity:''
  }]);

  const [co2value,setCo2Value] = useState(0);

  const [name,setName] = useState("");

  const [description,setDescription] = useState("");

  //const [recipes,setRecipes] = useState([{}]);
  //const [username,setUserName] = useState('');
  const [email,setEmail] = useState('');
  //const [pic,setPic] = useState('');

  useEffect(()=> {
    const data = {
      name: localStorage.getItem('current name'),
      email: localStorage.getItem('current email'),
      pic: localStorage.getItem('current pic')
    }
    //setUserName(data.username);
    setEmail(data.email);
    //setPic(data.pic);
  },[]);

  function handleChangeName(event) {
    let newName = name;
    newName = event.target.value;
    setName(newName);
  }

  function handleChangeDesc(event) {
    let newDesc = description;
    newDesc = event.target.value;
    setDescription(newDesc);
  }

  function handleAdd() {
    const par = [...params];
    par.push({Item:'',Quantity:'',co2value:0});
    setParams(par);
  }
  
  const updateQuanity = index => event => {
    let par = [...params];
    par[index].Quantity = event.target.value;
    setParams(par);
  }

  const updateItem = index => event => {
    let par = [...params];
    par[index].Item = event.target.value;
    setParams(par);
  }

  function handlePost() {
    const data = {
      "name":name,
      "ingredients":params,
      "co2value":co2value,
      "description":description,
    }
    fetch('http://localhost:5000/api/v1/users/'+email,{
      "method": "POST",
      "headers": {
        "Content-Type": "application/json"
      },
      "body": JSON.stringify(data)
    }).then((response) => {
      if(!response.ok){
        return 'error';
      }
      return response.json();
    }).then((json) => {
      console.log(json);
    }).catch((error) => {
      throw(error);
    });
  }
  function handleSubmit() {
    let list = [...params];
    let sum = {total:0};
    fetchData(list,sum);
  }

  function fetchData(list,sum) {
    for(let idx = 0; idx < list.length; ++idx){
      fetch('https://api.edamam.com/api/nutrition-data?app_id=753218d9&app_key=72c64d1e28883adcc6cb4147833a4574&ingr='+list[idx].Quantity+'%20'+list[idx].Item, {
        "method": "GET",
        "headers": {
          "Content-Type": "application/json"
        }
      }).then((response) => {
        if(!response.ok){
          return 'error';
        }
        return response.json();
      })
        .then((json) => {
          return calculateItem(json);
        })
          .then((itemco2) => {
            sum.total += itemco2;
            setCo2Value(sum.total.toFixed(3));
          })
          .catch((error) => {
            throw(error);
          })
    }
  }

  function calculateItem(json){
    let category = 0;
    //switch statement rather than if/else
      if(!json.healthLabels.includes("RED_MEAT_FREE") && json.healthLabels.includes("PORK_FREE")){
        category = 60;
      } else if (!json.healthLabels.includes("NO_SUGAR_ADDED")){
        category = 21;
      } else if (!json.healthLabels.includes("DAIRY_FREE")){
        category = 19;
      } else if (!json.healthLabels.includes("SHELLFISH_FREE") || !json.healthLabels.includes("CRUSTACEAN_FREE")){
        category = 13;
      } else if (!json.healthLabels.includes("NO_OIL_ADDED")){
        category = 7;
      } else if (!json.healthLabels.includes("VEGETARIAN")){
        category = 5.5;
      } else if (!json.healthLabels.includes("VEGAN")){
        category = 2.5;
      } else {
        category = 0.4;
      }
      let kg_weight = 0;
      if(json.totalWeight !== 0.0){
        kg_weight = 1000/json.totalWeight;
      }
      let itemco2 = 0;
      if(kg_weight !== 0){
        itemco2 = category/kg_weight;
      }
      return itemco2;
  }

  function handleTransport(){
    window.location = '/calculateTransport/'
  }

  return (
    <div>
      <Navbar />
      <div className="main-container">
      <div>
        <h1 className="heading">{"Calculate your recipe's carbon footprint below"}</h1>
          <div className="container">
          <div className="left-container">
          <div className="overall-co2">
                {co2value} <div className="co2text">kgs of co2 emitted with this recipe</div></div>
          </div>
            <div className="right-container">
              {params.map((param,idx) => {
              return (
                <div key={`${param} - ${idx}`}>
                  <div className="fields-container">
                    <form className="field" noValidate autoComplete="off">
                      <TextField className="quantity-box" id={`q${idx}`}  label="Quantity" onChange={updateQuanity(idx)}/> </form>
                    <form className="field2" noValidate autoComplete="off">
                      <TextField className="quantity-box" id={`i${idx}`}  label="Item" onChange={updateItem(idx)}/> </form>
                  </div>
                </div>
              );
            })}
            <div className="buttons-container">
                  <div style={{color: 'white'}}className="add-button" onClick={handleAdd}>+</div>
                  <div style={{color: 'white'}}className="submit-button" onClick={handleSubmit}>Submit</div>
            </div>
          </div>
            
          </div>
      </div>

      <div>
        {co2value > 0 &&
          <div className="inner-tb-container">
            <div className="nameTitle">Name</div>
            <form className="formStyle">
              <input className="nameTextbox" type="text" name="name" onChange={handleChangeName}/>
            </form>
            <div className="directionTitle">Directions</div>
            <form className="formStyle">
              <input className="directionTextbox" type="text" name="Directions" onChange={handleChangeDesc}/>
              <input className="submitButton" type="submit" value="Post Recipe" onClick={handlePost}/>
            </form>
          </div>
        }
      </div>
    </div>
    <Footer />
    </div>
  );
}