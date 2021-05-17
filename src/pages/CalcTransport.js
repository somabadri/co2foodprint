import React, { useEffect } from 'react';
import { useState } from 'react';
import '../styles/styleCalcTransport.scss';
import ButtonBase from '@material-ui/core/ButtonBase';
import TextField from '@material-ui/core/TextField';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

let foodImg = "https://anima-uploads.s3.amazonaws.com/projects/608b4ca9ee3fce15866ca79a/releases/608b51b1f68e88411d270394/img/baseline-fastfood-white-48dp-1@2x.png";

let transportImg = "https://anima-uploads.s3.amazonaws.com/projects/608b4ca9ee3fce15866ca79a/releases/608b51b1f68e88411d270394/img/baseline-directions-car-white-48dp-1@2x.png";

document.body.style = 'background: #CAD2C5';

export default function CalculateTransport() {
    const [params,setParams] = useState([{
        Item:'',
        Quantity:'',
      }]);
    
      const [co2value,setCo2Value] = useState(0);
    
      //const [username,setUserName] = useState('');
      const [email,setEmail] = useState('');
      //const [pic,setPic] = useState('');

    useEffect(()=> {
      const data = {
        name: localStorage.getItem('current name'),
        email: localStorage.getItem('current email'),
        pic: localStorage.getItem('current pic')
      }
      //setUserName(data.username);
      setEmail(data.email);
      //setPic(data.pic);
    },[]);

      useEffect(()=> {
        const data = {
          "user_id":email,
          "transportation_co2":co2value
        }
        fetch('http://localhost:5000/api/v1/users',{
          "method": "PUT",
          "headers": {
            "Content-Type": "application/json"
          },
          "body": JSON.stringify(data)
        }).then((response) => {
          if(!response.ok){
            return 'error';
          }
        }).catch((error) => {
          throw(error);
        });
      },[co2value,email])

      function handleAdd() {
        const par = [...params];
        par.push({Item:'',Quantity:''});
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
        let sum = {total:0};
        fetchData(list,sum);
      }
    
      function fetchData(list,sum) {
        for(let idx = 0; idx < list.length; ++idx){
          sum.total += calculateItem(list[idx]);
        }
        setCo2Value(sum.total.toFixed(3));
      }
    
      function calculateItem(entry){
        let category = 0;
        let itemco2 = 0;
          if(entry.Item === 10){
            category = 0.021;
          } else if(entry.Item === 20) {
            category = 0.103;
          } else if(entry.Item === 30) {
            category = 0.171;
          } else if(entry.Item === 40) {
            category = 0.074;
          } else if(entry.Item === 50){
            category = 0.224;
          } else if(entry.Item === 60){
            category = 0.254;
          } else if(entry.Item === 70){
            category = 0.195;
          } else {
            category=0.55;
          }
          itemco2 = category*entry.Quantity;
          return itemco2;
      }

      function handleFood(){
        window.location = '/calculate/'
      }
    
    return (
        <div>
          <Navbar />
        <div class="container-center-horizontal">
          <div className="calculate-food screen">
            <div className="overlap-group2">
            </div>
            <h1 className="text-1">{"Input Transportation or Choose Entry Type Below"}</h1>
            <div className="flex-row-4">
              <div className="overlap-group">
                <ButtonBase><img className="baseline" onClick={handleFood} src={foodImg} alt=""/></ButtonBase>
              </div>
              <div className="overlap-group3">
                <ButtonBase><img className="baseline" src={transportImg} alt=""/></ButtonBase>
              </div>
            </div>
            
            <div className="flex-row">
              <div className="food">{"Food"}</div>
              <div className="transportation">{"Transportation"}</div>
            </div>
            {<div className="overall-co2">
                {co2value} kgs of co2 emitted per year of travel</div>}
            <div className="flex-row-6">
              <div className="overlap-group5">
                <ButtonBase style={{color: 'white'}}className="submit" onClick={handleSubmit}>Submit</ButtonBase>
              </div>
              <div className="overlap-group6">
                <ButtonBase style={{color: 'white'}}className="cancel" onClick={handleAdd}>Add new entry</ButtonBase>
              </div>
              
            </div>
            <div className="flex-row-2">
              <div className="quantity">{"km/yr"}</div>
              <div className="item">{"Type of Transportation"}</div>
            </div>
            {params.map((param,idx) => {
            return (
              <div key={`${param} - ${idx}`}>
                <div className="flex-row-1">
                  <form className="rectangle-1" noValidate autoComplete="off">
                    <TextField id={`q${idx}`}  label="Distance" onChange={updateQuanity(idx)}/> </form>
    
                  <form className="rectangle-1-1" noValidate autoComplete="off">
                        <FormControl className={"rectangle-1-1"}>
                        <InputLabel id="demo-simple-select-label">Type of Transportation</InputLabel>
                        <Select onChange={updateItem(idx)}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"

                        >
                        <MenuItem value={10}>Bike</MenuItem>
                        <MenuItem value={20}>Bus</MenuItem>
                        <MenuItem value={30}>Car (Average)</MenuItem>
                        <MenuItem value={40}>Car (electric)</MenuItem>
                        <MenuItem value={50}>Car (High gas consumption)</MenuItem>
                        <MenuItem value={60}>Plane (domestic)</MenuItem>
                        <MenuItem value={70}>Plane (long haul)</MenuItem>
                        <MenuItem value={80}>Train</MenuItem>
                        

                        </Select>
                        </FormControl>
                    </form>
                </div>
              </div>
            );
          })}
            
            
          </div>
        </div>
        <Footer />
        </div>
      );
}