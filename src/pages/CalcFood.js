import React from 'react';
import { useState } from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import TextField from '@material-ui/core/TextField';
import Navbar from '../components/navbar/navbar.js'
import Footer from '../components/footer.js'

document.body.style = 'background: #CAD2C5';

export default function CalcFood(){
  const [params,setParams] = useState([{
    Item:'',
    Quantity:'',
    co2value:0
  }]);
//class CalcFoodFcn extends React.Component{

//method wants to take in list of ingredients & quantity of those ingredients
// get text input into array

//function CalcFoodFcn(){
document.body.style = 'background: #CAD2C5';

//const [itemNames, setItemName] = useState([]); //array of items
//const [quantityNums, setQuantityNum] = useState([]); //array of quantities

  const [co2value,setCo2Value] = useState(0);

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

  function handleSubmit() {
    let list = [...params];
    let total = 0;
    fetchData(list);
    console.log(list);
    setParams(list);
      total = params.reduce((total, item) => {
      return total + item.co2value;
    },0);
    setCo2Value(total);
  }

  function fetchData(list) {
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
            list[idx].co2value = itemco2;
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
function cancelButton() {
  //window.print();
}


  const [test, setTest] = useState("");
  const handleChange = event => {
    setTest(event.target.value);
    alert(event.target.value);
  }

  return (
    /*<div>
      </div><ButtonBase type="button" onClick={handleAdd}>add new item</ButtonBase>
      {params.map((param,idx) => {
        return (
          <div key={`${param} - ${idx}`}>
            <form>
              <TextField 
                id={`q${idx}`} 
                value = {param.Quantity} 
                label="Quantity" 
                name="quantity"
                onChange={updateQuanity(idx)}
              >
                  quanity
              </TextField>
              <TextField 
                id={`i${idx}`} 
                value = {param.Item} 
                label="Item" 
                name="item"
                onChange={updateItem(idx)}
              >
                  item
              </TextField>
            </form>
          </div>
        );*/
      //})}
      <div>
      <Navbar />
    <div class="container-center-horizontal">
      <div className="calculate-food screen">
        <div className="overlap-group2">
        </div>
        <h1 className="text-1 lato-bold-black-30px">{"Choose Entry Type Below"}</h1>
        <div className="flex-row-4">
          <div className="overlap-group">
            <ButtonBase><img className="baseline" src={"https://anima-uploads.s3.amazonaws.com/projects/608b4ca9ee3fce15866ca79a/releases/608b51b1f68e88411d270394/img/baseline-fastfood-white-48dp-1@2x.png"}/></ButtonBase>
          </div>
          <div className="overlap-group3">
            <ButtonBase><img className="baseline" src={"https://anima-uploads.s3.amazonaws.com/projects/608b4ca9ee3fce15866ca79a/releases/608b51b1f68e88411d270394/img/baseline-directions-car-white-48dp-1@2x.png"}/></ButtonBase>
          </div>
        </div>
        <div className="flex-row">
          <div className="food lato-bold-black-25px">{"Food"}</div>
          <div className="transportation">{"Transportation"}</div>
        </div>
        <div className="flex-row-2">
          <div className="quantity lato-bold-black-30px">{"Quantity"}</div>
          <div className="item lato-bold-black-30px">{"Item"}</div>
        </div>
        <div className="flex-row-5">
        <form className="rectangle-1" noValidate autoComplete="off">
          <TextField id="standard-basic" label="Quantity" onChange={handleChange}/> </form>

          <form className="rectangle-1-1" noValidate autoComplete="off">
          <TextField id="standard-basic" label="Item" onChange = {handleChange}/> </form>
        </div>
        <div className="flex-row-1">
        <form className="rectangle-1" noValidate autoComplete="off">
          <TextField id="standard-basic" label="Quantity" /> </form>
          <form className="rectangle-1-1" noValidate autoComplete="off">
          <TextField id="standard-basic" label="Item" /> </form>
        </div>
        <div className="flex-row-1">
        <form className="rectangle-1" noValidate autoComplete="off">
          <TextField id="standard-basic" label="Quantity" /> </form>
          <form className="rectangle-1-1" noValidate autoComplete="off">
          <TextField id="standard-basic" label="Item" /> </form>
        </div>
        <div className="flex-row-1">
        <form className="rectangle-1" noValidate autoComplete="off">
          <TextField id="standard-basic" label="Quantity" /> </form>
          <form className="rectangle-1-1" noValidate autoComplete="off">
          <TextField id="standard-basic" label="Item" /> </form>
        </div>
        <div className="flex-row-1">
        <form className="rectangle-1" noValidate autoComplete="off">
          <TextField id="standard-basic" label="Quantity" /> </form>
          <form className="rectangle-1-1" noValidate autoComplete="off">
          <TextField id="standard-basic" label="Item" /> </form>
        </div>
        
        <div className="flex-row-6">
          <div className="overlap-group5">
            <ButtonBase style={{color: 'white'}}className="submit">Submit</ButtonBase>
          </div>
          <div className="overlap-group6">
            <ButtonBase style={{color: 'white'}}className="cancel" onClick={cancelButton}>Cancel</ButtonBase>
          </div>
        </div>
        
      </div>
    </div>
    <Footer />
    </div>
  );
}