import React from 'react' ;
import { Link } from 'react-router-dom' ;
import {
  AppBar,
  Toolbar,
  Typography,
  Button
} from '@material-ui/core';


const Navbar = ({ pageName ,history}) => {

  if (!pageName) {
    return (
      <div>
        <AppBar position="static" color="primary" style = {{marginBottom : '10px'}}>
          <Toolbar >
            <Typography variant="h6" color="inherit">
              Photos
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    )
  } else if (pageName === 'details') {
    return (
      <div>
        <AppBar position="static" color="primary" style = {{marginBottom : '10px'}}>
          <Toolbar >
            <Button color = 'inherit' onClick = {() => history.push('/')}>Home</Button>
            <Button
              color = 'inherit'
              onClick = {
                () => { localStorage.removeItem('token') ; history.push('/login') }
              }

              >Logout</Button>
          </Toolbar>
        </AppBar>
      </div>
    )

  }


}

export default Navbar ;
