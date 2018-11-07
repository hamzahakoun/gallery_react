import React from 'react' ;
import { Link } from 'react-router-dom' ;
import {
  AppBar,
  Toolbar,
  Typography,
  Button
} from '@material-ui/core';
import { connect } from 'react-redux' ;
import { clearAll,clearData } from '../../store/actions/galleryActions' ;
import { logout } from '../../store/actions/authActions' ;

// search refers to the tags the user is searching for
// so when user clicks home page
// he will be redirected to the same tags not a new page with all images
const Navbar = ({ pageName ,history,clear,clearData,search,logout}) => {
  // i should always add the ?tags=.... to the link of home page
  // so home page link will be dynmic and thus i can track what the user
  // searching for
  // tags page will provide search based on current checked tags
  // other pages will not
  if (!search) {
    search  =  history.location.search ;
  }

  if (!pageName) {

    return (
      <div>
        <AppBar position="static" color="primary">
          <Toolbar >
            <Button>
              <img src = '../angular.png' id = 'logo' style = {{width :'50px',height : '50px'}} />
            </Button>
            <Button color = 'inherit' onClick = {()=>history.push(`/${search}`)}>Home</Button>
            <Button color = 'inherit' onClick = {()=>history.push('/tags')}>Tags</Button>
            <Button
              color = 'inherit'
              onClick = {
                () => { logout() ; clear();history.push('/login'); }
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
            <Button>
              <img src = '../angular.png' id = 'logo' style = {{width :'50px',height : '50px'}} />
            </Button>
            <Button color = 'inherit' onClick = {() => {clearData('CLEAR_DETAILS') ;history.push(`/${search}`)}}>Home</Button>
            <Button
              color = 'inherit'
              onClick = {
                () => {logout();clear(); history.push('/login') }
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

  }
}

// navbar should access clear to clear all data when user logout ;
const mapDispatchToProps = (dispatch) => {
  return {
    clear : () => dispatch(clearAll()) ,
    clearData : (type) => dispatch(clearData(type)) ,
    logout :  () => dispatch(logout())
  }
}

export default connect(null,mapDispatchToProps)(Navbar) ;
