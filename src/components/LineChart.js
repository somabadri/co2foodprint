import { black } from 'material-ui/styles/colors';
import React, { Component } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
import '../styles/styleLineChart.scss'
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class LineChart extends Component {
	render() {
		const options = {
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
				//prefix: "",
				interval: 1
			},
			data: [{
				type: "line",
				lineColor: black,
				color: black,
				toolTipContent: "{x} Recipes: {y} kg",
				indexLabelFontColor: black,
				dataPoints: [
					{ x: 1, y: 64 },
					{ x: 2, y: 61 },
					{ x: 3, y: 64 },
					{ x: 4, y: 62 },
					{ x: 5, y: 64 },
					{ x: 6, y: 60 },
					{ x: 7, y: 58 },
					{ x: 8, y: 59 },
					{ x: 9, y: 53 },
					{ x: 10, y: 54 },
				]
			}]
		}
		
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
}

export default LineChart;  