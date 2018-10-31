import React from 'react' ;
import { Link } from 'react-router-dom' ;
import {
  AppBar,
  Toolbar,
  Typography
} from '@material-ui/core';

const Navbar = () => {

  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Photos
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar ; 
