import React, { useEffect } from 'react';
import { useState } from 'react';
import '../styles/calcTransport.scss';
import TextField from '@material-ui/core/TextField';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

document.body.style = 'background: #CAD2C5';

export default function CalculateTransport() {
  const [params, setParams] = useState([{
    Item: '',
    Quantity: '',
  }]);

  const [co2value, setCo2Value] = useState(0);

  //const [username,setUserName] = useState('');
  const [email, setEmail] = useState('');
  //const [pic,setPic] = useState('');

  useEffect(() => {
    const data = {
      name: localStorage.getItem('current name'),
      email: localStorage.getItem('current email'),
      pic: localStorage.getItem('current pic')
    }
    //setUserName(data.username);
    setEmail(data.email);
    //setPic(data.pic);
  }, []);

  useEffect(() => {
    const data = {
      "user_id": email,
      "transportation_co2": co2value
    }
    fetch('http://localhost:5000/api/v1/users', {
      "method": "PUT",
      "headers": {
        "Content-Type": "application/json"
      },
      "body": JSON.stringify(data)
    }).then((response) => {
      if (!response.ok) {
        return 'error';
      }
    }).catch((error) => {
      throw (error);
    });
  }, [co2value, email])

  function handleAdd() {
    const par = [...params];
    par.push({ Item: '', Quantity: '' });
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
    let sum = { total: 0 };
    fetchData(list, sum);
  }

  function fetchData(list, sum) {
    for (let idx = 0; idx < list.length; ++idx) {
      sum.total += calculateItem(list[idx]);
    }
    setCo2Value(sum.total.toFixed(3));
  }

  function calculateItem(entry) {
    let category = 0;
    let itemco2 = 0;
    if (entry.Item === 10) {
      category = 0.021;
    } else if (entry.Item === 20) {
      category = 0.103;
    } else if (entry.Item === 30) {
      category = 0.171;
    } else if (entry.Item === 40) {
      category = 0.074;
    } else if (entry.Item === 50) {
      category = 0.224;
    } else if (entry.Item === 60) {
      category = 0.254;
    } else if (entry.Item === 70) {
      category = 0.195;
    } else {
      category = 0.55;
    }
    itemco2 = category * entry.Quantity;
    return itemco2;
  }

  return (
    <div>
      <Navbar />
      <h1 className="heading">{"Calculate your transportation's carbon footprint below"}</h1>
      <div className="main-container2">
        <div className="left-container">
          <div className="overall-co2">
            {co2value} <div className="co2text">kgs of co2 emitted per year</div>
          </div>
        </div>
        <div className="right-container">
          {params.map((param, idx) => {
            return (
              <div key={`${param} - ${idx}`}>
                <div className="fields-container">
                  <form className="field" noValidate autoComplete="off">
                    <TextField id={`q${idx}`} className="quantity-box" label="Distance (km/year)" onChange={updateQuanity(idx)} /> </form>

                  <form className="field2" noValidate autoComplete="off">
                    <FormControl className="quantity-box2">
                      <InputLabel id="demo-simple-select-label" onChange={updateItem(idx)}>Type of Transportation</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        //value=""
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
          <div className="buttons-container">
            <button style={{ color: 'white' }} className="add-button" onClick={handleAdd}>+</button>
            <button style={{ color: 'white' }} className="submit-button" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}