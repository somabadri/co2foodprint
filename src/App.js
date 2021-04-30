import React from 'react';
import './styleCalcFood.scss';
import ButtonBase from '@material-ui/core/ButtonBase';

function App() {
  return <CalculateFood {...calculateFoodData} />;
}

export default App;
document.body.style = 'background: #CAD2C5';

function foodButton() {
  window.print();
}

function transportationButton(){
  window.print();
}

function CalculateFood(props) {
  const {
    /*pngtreenordicPresentDecorationGreen, //monstera*/
    //profile, //profile text
    text16, //choose entry food text
    baseline_Fastfood_White_48Dp1, //picture of food
    baseline_Directions_Car_White_48Dp1, //picture of transportation
    food, //food text
    transportation, //transportation text
    quantity, //quantity text
    item, //item text
    text17, //plus text
    submit, //submit text
    cancel, //cancel text
    //overlapGroup4, //green bottom bar
    /*carbonCutters2021, //about name text*/
  } = props;

  return (
    <div class="container-center-horizontal">
      <div className="calculate-food screen">
        <div className="overlap-group2">
          {/*<img className="pngtreenordic-p-plant3799519-2" src={pngtreenordicPresentDecorationGreen} />*/}
          {/*<div className="profile taviraj-normal-tuna-20px">{profile}</div>*/}
        </div>
        <h1 className="text-1 lato-bold-black-30px">{text16}</h1>
        <div className="flex-row-4">
          <div className="overlap-group">
            <ButtonBase><img className="baseline" src={baseline_Fastfood_White_48Dp1} onClick={foodButton}/></ButtonBase>
          </div>
          <div className="overlap-group3">
            <ButtonBase><img className="baseline" src={baseline_Directions_Car_White_48Dp1} onClick={transportationButton}/></ButtonBase>
          </div>
        </div>
        <div className="flex-row">
          <div className="food lato-bold-black-25px">{food}</div>
          <div className="transportation">{transportation}</div>
        </div>
        <div className="flex-row-2">
          <div className="quantity lato-bold-black-30px">{quantity}</div>
          <div className="item lato-bold-black-30px">{item}</div>
        </div>
        <div className="flex-row-5">
          <div className="rectangle-1 border-1px-black"></div>
          <div className="rectangle-1-1 border-1px-tuna"></div>
        </div>
        <div className="flex-row-1">
          <div className="rectangle-1 border-1px-black"></div>
          <div className="rectangle-1-1 border-1px-tuna"></div>
        </div>
        <div className="flex-row-1">
          <div className="rectangle-1 border-1px-tuna"></div>
          <div className="rectangle-1-1 border-1px-tuna"></div>
        </div>
        <div className="flex-row-1">
          <div className="rectangle-1 border-1px-tuna"></div>
          <div className="rectangle-1-1 border-1px-tuna"></div>
        </div>
        <div className="flex-row-3">
          <div className="rectangle-1 border-1px-tuna"></div>
          <div className="rectangle-19 border-1px-tuna"></div>
        </div>
        <div className="overlap-group1">
          <div className="rectangle-3"></div>
          <div className="text-2 taviraj-normal-white-30px">{text17}</div>
        </div>
        <div className="flex-row-6">
          <div className="overlap-group5">
            <ButtonBase><div className="submit lato-bold-white-30px">{submit}</div></ButtonBase> 
          </div>
          <div className="overlap-group6">
            <ButtonBase><div className="cancel lato-bold-white-30px">{cancel}</div></ButtonBase>
          </div>
        </div>
        {/*<div className="overlap-group4" style={{ backgroundImage: `url(${overlapGroup4})` }}>
          <div className="carbon-cutters-2021 taviraj-normal-tuna-20px">{carbonCutters2021}*/}
        
      </div>
    </div>
  );
}

const calculateFoodData = {
    /*pngtreenordicPresentDecorationGreen: "https://anima-uploads.s3.amazonaws.com/projects/608b4ca9ee3fce15866ca79a/releases/608b51b1f68e88411d270394/img/-pngtree-nordic-present-decoration-green-plant-3799519-2@2x.png",

    profile: "Profile", */
    text16: "Choose Entry Type Below",
    baseline_Fastfood_White_48Dp1: "https://anima-uploads.s3.amazonaws.com/projects/608b4ca9ee3fce15866ca79a/releases/608b51b1f68e88411d270394/img/baseline-fastfood-white-48dp-1@2x.png",
    baseline_Directions_Car_White_48Dp1: "https://anima-uploads.s3.amazonaws.com/projects/608b4ca9ee3fce15866ca79a/releases/608b51b1f68e88411d270394/img/baseline-directions-car-white-48dp-1@2x.png",
    food: "Food",
    transportation: "Transportation",
    quantity: "Quantity",
    item: "Item",
    /*text17: "+",*/
    submit: "Submit",
    cancel: "Cancel",
    overlapGroup4: "https://anima-uploads.s3.amazonaws.com/projects/608b4ca9ee3fce15866ca79a/releases/608b51b1f68e88411d270394/img/rectangle-2@1x.svg",
    //carbonCutters2021: "Carbon Cutters 2021",
};

