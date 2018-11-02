import React from 'react' ;
import { Link } from 'react-router-dom' ;
import {
  AppBar,
  Toolbar,
  Typography,
  Button
} from '@material-ui/core';
import { connect } from 'react-redux' ;
import { clearAll } from '../../store/actions/galleryActions' ;

const Navbar = ({ pageName ,history,all,liked,searched,clear}) => {

  if (!pageName) {

    return (
      <div>
        <AppBar position="static" color="primary">
          <Toolbar >
            <Button color = 'inherit' onClick = {()=>history.push('/')}>Home</Button>
            <Button color = 'inherit' onClick = {()=>history.push('/tags')}>Tags</Button>
            <Button
              color = 'inherit'
              onClick = {
                () => { localStorage.removeItem('token') ; history.push('/login'); }
              }

              >Logout</Button>
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
                () => { localStorage.removeItem('token') ; clear() ; history.push('/login') }
              }

              >Logout</Button>
          </Toolbar>
        </AppBar>
      </div>
    )

  }


}


const mapStoreToProps = (state) => {
  return {
    all : state.gallery.all ,
    liked : state.gallery.liked ,
    searched : state.gallery.liked ,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clear : () => dispatch(clearAll) ,
  }
}

export default connect(mapStoreToProps)(Navbar) ;
