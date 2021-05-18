import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import TextField from '@material-ui/core/TextField';
import {useState} from 'react';
function ProfilePopUp(props) {
    const [newName,setNewName] = useState('');
    const [newPic,setNewPic] = useState('');
    function handleSubmit() {
      const nameToSubmit = (newName.length>0) ? newName : props.name;
      const picToSubmit = (newPic.length>0) ? newPic : props.pic;
      const data = {
        "user_id":props.email,
        "name":nameToSubmit,
        "profile_pic":picToSubmit
      }
      fetch('http://localhost:5000/api/v1/users', {
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
      }).then(()=>{
        localStorage.setItem('current name', nameToSubmit);
        localStorage.setItem('current pic', picToSubmit);
        window.location.pathname = "/profile"
      }).catch((error) => {
        throw(error);
      })
    }
    
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Change name
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Current name:{props.name}</h3>
          <h3>Current image:</h3>
            <img className="ellipse-9" src={props.pic} alt=""/>
          <p>
            <form noValidate autoComplete="off">
              <TextField label="New Name" onChange={event => setNewName(event.target.value)}/>
            </form>
            <form noValidate autoComplete="off">
              <div>Please use the image address of the picture you want</div>
              <TextField label="New Image url" onChange={event => setNewPic(event.target.value)}/>
            </form>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button onClick={handleSubmit} disabled={newName.length<1 && newPic.length<1}>Submit</Button>
        </Modal.Footer>
      </Modal>
    );
  }
export default ProfilePopUp;