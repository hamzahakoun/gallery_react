import React, { Component } from 'react';
import { Navbar } from './components' ;
import  { request } from './utils/http' ;
import { BrowserRouter,Switch, Route } from 'react-router-dom' ;
import PrivateRoute from './components/utils/privateRoute' ;
import { CircularProgress } from '@material-ui/core' ;
import Login from './components/auth/login' ;

import { Main,Details,TagCards } from './components' ;


class App extends Component {

  state = {
    verifyStatus : null,
  }


  verifyToken = (token) => {

    request('verify-token/',{token : token})
    .then(resp => {
        if (resp.status === 400) {
          localStorage.removeItem('token') ;
        }
       this.setState({verifyStatus : resp.status})
     })

  }

  // after successful log in i should update the varifyStatus here so
  // the privateRoute will not redirect me to login page
  // give this method to Login component
  updateVerificationStatus = (status) => this.setState({ verifyStatus : status })

  componentDidMount = () => {
    const token = localStorage.getItem('token');
    token ? this.verifyToken(token) : this.setState({verifyStatus : 400}) ;
  }


  render() {

    return (
      <div className="App">

        { !this.state.verifyStatus && <CircularProgress color="secondary" className = 'loading'/> }
        { this.state.verifyStatus &&
          <BrowserRouter>
            <Switch>
              <Route path =  '/login' render = {(props) => <Login {...props} updateVerificationStatus = {this.updateVerificationStatus}/>}  />
              <PrivateRoute path = '/' component = {Main} status = {this.state.verifyStatus} exact = {true} />
              <PrivateRoute path = '/tags' component = {TagCards} status = {this.state.verifyStatus} exact = {true} />
              <PrivateRoute path = '/:id' component = {Details} status = {this.state.verifyStatus} />
            </Switch>
          </BrowserRouter>

        }
      </div>
    );
  }
}

export default App;
