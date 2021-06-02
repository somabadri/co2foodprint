import { black } from 'material-ui/styles/colors';
import React, { useEffect } from 'react';
import { useState } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
import '../styles/styleLineChart.scss'
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const LineChart = (({ recipes }) => {

	const [options, setOptions] = useState({});
	const [datapts, setDatapts] = useState([{}]);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		let pts = [];
		let tot = 0;
		for (let i = 1; i < recipes.length; ++i) {
			tot = (tot + (recipes[i].co2value * recipes[i].amount));
		}
		for (let j = 1; j < recipes.length; ++j) {
			let y = ((recipes[j].co2value * recipes[j].amount) / tot * 100).toFixed(3);
			pts.push({ y: y, label: recipes[j].name, amount: recipes[j].amount })
		}
		setDatapts(pts);
		setTotal(tot);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [recipes])

	useEffect(() => {
		setOptions({
			animationEnabled: true,
			theme: "light2", // "light1", "dark1", "dark2"
			backgroundColor: "#84A98C",
			title: {
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
				indexLabelFontColor: "black",
				dataPoints: datapts
			}]
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [datapts])
	return (
		<div className='chart'>
			<div>
				<CanvasJSChart options={options} />
			</div>
		</div>
	);
})


export default LineChart;