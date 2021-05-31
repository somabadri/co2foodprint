import { black } from 'material-ui/styles/colors';
import React, { useEffect } from 'react';
import { useState } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
import '../styles/styleLineChart.scss'
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 

const LineChart = (({recipes})=> {

	const [options, setOptions] = useState({});
	const [datapts, setDatapts] = useState([{}]);
	const [total,setTotal] = useState(0);

	useEffect(()=>{
	  let pts = [];
	  let tot = 0;
	  for(let i = 1; i<recipes.length; ++i){
		  tot = (tot + (recipes[i].co2value * recipes[i].amount));
	  }
	  for(let j = 1; j<recipes.length; ++j){
		let y = ((recipes[j].co2value * recipes[j].amount)/tot*100).toFixed(3);
		pts.push({y:y,label:recipes[j].name,amount:recipes[j].amount})
	  }
	  setDatapts(pts);
	  setTotal(tot);
	  // eslint-disable-next-line react-hooks/exhaustive-deps
	},[recipes])

/*useEffect(() => {
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
    	par.push({y: (i+1), label:pt});
	}
	setDatapts(par);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [averages])
  */
	useEffect(() => {
		setOptions( {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2", // "light1", "dark1", "dark2"
			backgroundColor: "#84A98C",
			title:{
				text: "Your carbon emissions today: " + total.toFixed(3) + "kgs",
				fontColor: black,
				fontWeight: "normal"
			},
			data: [{
				type: "pie",
				startAngle: 75,
				legendText: "{label}",
				toolTipContent: "amount of {label}: {amount}",
				indexLabelFontSize: 16,
				indexLabel: "{label} - {y}%",
				indexLabelFontColor:"black",
				dataPoints: datapts
			}]
		})
	},[datapts])
	
		
		return (
			<div className='chart'>
				<div>
					<CanvasJSChart options = {options} />
				</div>
			</div>
		);
	})


export default LineChart;  