import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import TextField from '@material-ui/core/TextField';
import {useState,useEffect} from 'react';
function RecipePopUp(props) {
    const [newName,setNewName] = useState('');
    const [newDesc,setNewDesc] = useState('');
    const [email,setEmail] = useState('');

    useEffect(()=>{
      setEmail(localStorage.getItem("current email"));
    },[])

    function handleSubmit() {
      const data = {
          name: newName.length>0 ? newName : props.recipe.name,
          recipe_id: props.recipe.recipe_id,
          description: newDesc.length>0 ? newDesc : props.recipe.desc
      }
      fetch('http://localhost:5000/api/v1/users/'+email, {
        "method": "PUT",
        "headers": {
          "Content-Type": "application/json"
        },
        "body": JSON.stringify(data)
      }).then((response) => {
        if(!response.ok){
          return 'error';
        }
        return response.json();
      }).catch((error) => {
        throw(error);
      })
    }
    
    function showIngredientList() {
        return props.recipe.ingredients.map(ingredient => 
            <div>
            <div key ={ingredient.Item}>{ingredient.Item}</div>
            <div key ={ingredient.Quantity}>{ingredient.Quantity}</div>
            </div>
          )
    }

    function showChangeableIngredientList() {
        return props.recipe.ingredients.map((param,idx) => {
            return (
              <div key={`${param} - ${idx}`}>
                <div className="flex-row-1">
                  <form className="rectangle-1" noValidate autoComplete="off">
                    <TextField id={`q${idx}`}  label="Quantity" defaultValue={props.recipe.ingredients[idx].Quantity}/> </form>
    
                  <form className="rectangle-1-1" noValidate autoComplete="off">
                    <TextField id={`i${idx}`}  label="Item" defaultValue={props.recipe.ingredients[idx].Item}/> </form>
                </div>
              </div>
            );
          })
    }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable={true}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Change name
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Current name:{props.recipe.name}</h3>
          <h3>Current co2value:{props.recipe.co2value}</h3>
          <h3>Current description:{props.recipe.description}</h3>
          <h3>Current ingredients: {showIngredientList()}</h3>
          <p>
            <form noValidate autoComplete="off">
              <TextField label="New Name" onChange={event => setNewName(event.target.value)} defaultValue={props.recipe.name}/>
            </form>
          </p>
          <p>
            <form noValidate autoComplete="off">
              <TextField label="New Description" onChange={event => setNewDesc(event.target.value)}defaultValue={props.recipe.description}/>
            </form>
          </p>
          <p>{showChangeableIngredientList()}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>
    );
  }
export default RecipePopUp;