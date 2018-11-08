import React , { Component } from 'react' ;
import { request } from '../../utils/http' ;
import { connect } from 'react-redux' ;
import { login,hideLoginErrorMessage } from '../../store/actions/authActions' ;
import { Redirect } from 'react-router-dom' ;
import Message from '../utils/message' ;

import {
  Grid,
  TextField,
  Button,
  Paper,
  InputAdornment,
  Typography
} from '@material-ui/core'

import {
  Lock,
  AccountCircle,
} from '@material-ui/icons' ;


const styles = {
  paper : {
    marginTop : '10%',
    padding : '30px 10px' ,
  }
}

class Login extends Component {

  constructor(props){
    super(props)  ;
    this.state = {
      username : '',
      password : '' ,
    }
  }

  // when th user login successfuly isUserAuthorized will become true
  // so i should update the verifyStatus in App.js so the privateRoute
  //will not redirect me to the login page
  static getDerivedStateFromProps = (nextProps,prevState) => {
    if (nextProps.isUserAuthorized === !prevState.isUserAuthorized) {
      nextProps.updateVerificationStatus(200) ;
    }
    return nextProps ;
  }

  handleChange = (e) => {
    const type = e.target.name ;
    this.setState({ [type] : e.target.value })
  }

  login = () => {
    this.props.login(this.state) ;
  }

  hideLoginErrorMessage = () => this.props.hideLoginErrorMessage()  ;


  render = () => {
    
    const { isUserAuthorized,authError } = this.props ;
    const token = localStorage.getItem('token') ; // if user filled the url manually

    // this will cause the app to redirect to home page after successful login
    // and it also works as a protector against redirecting to login page manullay
    if (isUserAuthorized || token) {
      return <Redirect to = '/' />
    }


    return (
      <div className = 'login-container'>
        <div className = ' login-form'>
          <Grid container spacing = {32}>
          <Grid item xs = {false} sm = {4}></Grid>
          <Grid item xs ={10} sm = {3}>
            <Paper style = {styles.paper}>
              <Grid container spacing = {8}>

                <Grid item xs = {12} sm = {12}>
                  <h3>Welcome</h3>
                  <img id = 'logo' src = './angular.png' />
                </Grid>
                <Grid item xs = {12} sm = {12}>
                <TextField
                  placeholder = "Username"
                  name = 'username'
                  onChange = {this.handleChange}
                />
                </Grid>

                <Grid item xs = {12} sm = {12}>
                  <TextField
                    type = 'password'
                    name = 'password'
                    onChange = {this.handleChange}
                    placeholder = "Password"
                  />
                </Grid>
                <Grid item xs = {12} sm = {12}>
                <Button className = 'login-submit' disabled = {!this.state.username || !this.state.password } variant="contained" color="secondary" onClick = {this.login}>
                  Login
                </Button>
                </Grid>

                <Grid item xs = {12} sm = {12}>
                  <div style = {{height :"50px",width : '100%'}}></div>
                  <Typography gutterBottom noWrap>
                    {`
                    Don't have an Account ? sign up
                  `}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          <Grid item xs = {false} sm = {4}></Grid>

          </Grid>

        </Grid></div>

      <Message
        open = {this.props.authError}
        handleClose  = {this.hideLoginErrorMessage}
        message = {this.props.authError}
      />
      </div>

    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login : (credentials) => dispatch(login(credentials)) ,
    hideLoginErrorMessage : () => dispatch(hideLoginErrorMessage())
  }
}

const mapStateToProps = (state) => {
  return {
    isUserAuthorized : state.auth.isUserAuthorized ,
    authError : state.auth.authError,
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login) ;
