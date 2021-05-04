import React from 'react';
import { useState } from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import TextField from '@material-ui/core/TextField';

document.body.style = 'background: #CAD2C5';

export default function CalcFood(){
  const [params,setParams] = useState([{
    Item:'',
    Quantity:'',
    co2value:0
  }]);

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


  return (
    <div>
      <ButtonBase type="button" onClick={handleAdd}>add new item</ButtonBase>
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
        );
      })}
      <ButtonBase type='submit' onClick={handleSubmit}>submit</ButtonBase>
      <div>{co2value} kgs of co2 emissions</div>
    </div>
  );
}

      