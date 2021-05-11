import React from 'react';
import { useState } from 'react';
import '../styles/styleCalcFood.scss';
import ButtonBase from '@material-ui/core/ButtonBase';
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
      "tag":"none"
    }
    fetch('http://localhost:5000/api/v1/users/test',{
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
      fetch('https://api.edamam.com/api/nutrition-data?app_id=6ac27589&app_key=36e9480a93670970ec32aa67ce9ee33c&ingr='+list[idx].Quantity+'%20'+list[idx].Item, {
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

  return (
    <div>
      <Navbar />
    <div className="container-center-horizontal">
      <div className="calculate-food screen">
        <div className="overlap-group2">
        </div>
        <h1 className="text-1">{"Input Recipe or Choose Entry Type Below"}</h1>
        <div className="flex-row-4">
          <div className="overlap-group">
            <ButtonBase><img className="baseline" src={foodImg} alt=""/></ButtonBase>
          </div>
          <div className="overlap-group3">
            <ButtonBase><img className="baseline" src={transportImg} alt=""/></ButtonBase>
          </div>
        </div>
        
        <div className="flex-row">
          <div className="food">{"Food"}</div>
          <div className="transportation">{"Transportation"}</div>
        </div>
        <div className="overall-co2">
            {co2value} kgs of co2 emitted with this recipe</div>
        <div className="flex-row-6">
          <div className="overlap-group5">
            <ButtonBase style={{color: 'white'}}className="submit" onClick={handleSubmit}>Submit</ButtonBase>
          </div>
          <div className="overlap-group6">
            <ButtonBase style={{color: 'white'}}className="cancel" onClick={handleAdd}>Add new entry</ButtonBase>
          </div>
          
        </div>
        <div className="flex-row-2">
          <div className="quantity lato-bold-black-30px">{"Quantity"}</div>
          <div className="item lato-bold-black-30px">{"Item"}</div>
        </div>
        {params.map((param,idx) => {
        return (
          <div key={`${param} - ${idx}`}>
            <div className="flex-row-1">
              <form className="rectangle-1" noValidate autoComplete="off">
                <TextField id={`q${idx}`}  label="Quantity" onChange={updateQuanity(idx)}/> </form>

              <form className="rectangle-1-1" noValidate autoComplete="off">
                <TextField id={`i${idx}`}  label="Item" onChange={updateItem(idx)}/> </form>
            </div>
          </div>
        );
      })}
        
        
      </div>
    </div>
    <div className="container-center-horizontal">
    {co2value > 0 &&
      <div className="formBlock">
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
    <Footer />
    </div>
  );
}