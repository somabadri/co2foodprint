import { black } from 'material-ui/styles/colors';
import React, { useEffect } from 'react';
import { useState } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
import '../styles/styleLineChart.scss'
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 

const LineChart = (({email})=> {

const [recipes,setRecipes] = useState([{}]);
const [options, setOptions] = useState({});
const [averages,setAverages] = useState([]);
const [datapts, setDatapts] = useState([{}]);


useEffect(() => {
	console.log(email)
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
          total[i] = (Number(total[i-1])+Number(recipes[i].co2value));
          avg[i] = total[i]/(i+1);
        }
      }
    }
    setAverages(avg);
  },[recipes])

  useEffect(() => {
	const par = [];
	for(let i = 0; i<averages.length; i++){
		let pt = Number(averages[i].toFixed(3));
    	par.push({x: (i+1), y:pt});
	}
	setDatapts(par);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [averages])

	useEffect(() => {
		setOptions( {
			animationEnabled: true,
			//exportEnabled: true,
			theme: "light2", // "light1", "dark1", "dark2"
			backgroundColor: "#84A98C",
			title:{
				text: "Your CO2 Metrics",
				fontColor: black,
				fontWeight: "normal"
			},
			axisY: {
				title: "Average CO2 Output (kg)",
				titleFontColor: black,
				labelFontColor: black,
				includeZero: false,
				suffix: "kg"
			},
			axisX: {
				title: "Number of Recipes",
				titleFontColor: black,
				labelFontColor: black,
				interval: 1
			},
			data: [{
				type: "line",
				lineColor: black,
				color: black,
				toolTipContent: "average of first {x} Recipes: {y} kg",
				indexLabelFontColor: black,
				dataPoints: datapts
				
			}]
		})
	},[averages, datapts])
	
		
		return (
			<div className='chart'>
				<div>
					<CanvasJSChart options = {options} />
				</div>
			</div>
		);
	})


export default LineChart;  