import React from 'react';
import { useState, useEffect } from 'react';
import '../styles/styleCalcFood.scss';
import ButtonBase from '@material-ui/core/ButtonBase';
import FilledInput from '@material-ui/core/FilledInput';
import TextField from '@material-ui/core/TextField';
//import ReactDOM from 'react-dom';

//class CalcFoodFcn extends React.Component{

//method wants to take in list of ingredients & quantity of those ingredients
// get text input into array

//function CalcFoodFcn(){
document.body.style = 'background: #CAD2C5';

//const [itemNames, setItemName] = useState([]); //array of items
//const [quantityNums, setQuantityNum] = useState([]); //array of quantities

function quantity1(){

}

function item1(){

}

function foodButton() {
    //window.print();
}
  
function transportationButton(){
    //window.print();
}

function submitButton() {
  //window.print();
}

function cancelButton() {
  //window.print();
}

function CalculateFood() {

  const [test, setTest] = useState("");
  const handleChange = event => {
    setTest(event.target.value);
    alert(event.target.value);
  }

  return (
    <div class="container-center-horizontal">
      <div className="calculate-food screen">
        <div className="overlap-group2">
        </div>
        <h1 className="text-1 lato-bold-black-30px">{"Choose Entry Type Below"}</h1>
        <div className="flex-row-4">
          <div className="overlap-group">
            <ButtonBase><img className="baseline" src={"https://anima-uploads.s3.amazonaws.com/projects/608b4ca9ee3fce15866ca79a/releases/608b51b1f68e88411d270394/img/baseline-fastfood-white-48dp-1@2x.png"} onClick={foodButton}/></ButtonBase>
          </div>
          <div className="overlap-group3">
            <ButtonBase><img className="baseline" src={"https://anima-uploads.s3.amazonaws.com/projects/608b4ca9ee3fce15866ca79a/releases/608b51b1f68e88411d270394/img/baseline-directions-car-white-48dp-1@2x.png"} onClick={transportationButton}/></ButtonBase>
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
        <div className="overlap-group1">
          <div className="rectangle-3"></div>
        </div>
        <div className="flex-row-6">
          <div className="overlap-group5">
            <ButtonBase className="submit" onClick={submitButton}>Submit</ButtonBase>
          </div>
          <div className="overlap-group6">
            <ButtonBase className="cancel" onClick={cancelButton}>Cancel</ButtonBase>
          </div>
        </div>
        
      </div>
    </div>
  );
}
export default CalculateFood;