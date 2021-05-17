import { black } from 'material-ui/styles/colors';
import { Component } from 'react';
import React, { useEffect } from 'react';
import { useState } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
import '../styles/styleLineChart.scss'
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 

function LineChart() {

const [recipes,setRecipes] = useState([{}]);
const [email,setEmail] = useState('');
const [options, setOptions] = useState({});
const [averages,setAverages] = useState([]);
const [datapts, setDatapts] = useState([{}]);


useEffect(() => {
    const data = {
      //name: localStorage.getItem('current name'),
      email: localStorage.getItem('current email'),
      //pic: localStorage.getItem('current pic')
    }
    //setName(data.name);
    setEmail(data.email);
    //setPic(data.pic);
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
      //setRecipes(json.users[0].recipes);  
      if(json.users.find(id=>id=email)){
		setRecipes(json.users.find(id=>id=email).recipes);
		//console.log(recipes);
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
    setAverages(avg);
  },[recipes])

  useEffect(() => {
	const par = [...datapts];
	for(let i = 0; i<averages.length; i++){
    	par.push({x: (i+1), y: averages[i]});
		setDatapts(par);
	}
  }, [averages])

	useEffect(() => {
		setOptions( {
			animationEnabled: true,
			theme: "light2", 
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
				//prefix: "",
				interval: 1
			},
			data: [{
				type: "line",
				lineColor: black,
				color: black,
				toolTipContent: "{x} Recipes: {y} kg",
				indexLabelFontColor: black,
				dataPoints: datapts
			}]
		})
	},[averages])
	
		
		return (
			<div className='chart'>
				<div>
			{/*<h1>React Line Chart</h1>*/}
				<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
				</div>
		</div>
		);
	}


export default LineChart;  