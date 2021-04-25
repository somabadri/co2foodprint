import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  header: {
    backgroundColor: "#84A98C",
    color: "black",
    boxShadow: "0px 0px 0px 0px"
  }
});

class Navbar extends React.Component{
  render() {
    return (  
    <div className={useStyles.root}>
      <AppBar position="static" className={useStyles.root}>
        <Toolbar>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
    );
  };
}

export default Navbar;