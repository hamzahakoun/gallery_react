import React, { Component } from 'react';
import { Navbar } from './components' ;
import  { request } from './utils/http' ;
import { BrowserRouter,Switch, Route } from 'react-router-dom' ;
import PrivateRoute from './components/utils/privateRoute' ;
import { CircularProgress } from '@material-ui/core' ;
import Login from './components/auth/login' ;


const Test = () => {
    return <h1>Test</h1>
}

class App extends Component {

  state = {
    verifyStatus : null,
  }


  verifyToken = (token) => {

    request('verify-token/',{token : token})
    .then(resp => this.setState({verifyStatus : resp.status}))

  }

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
              <Route path =  '/login' component  = {Login} />
              <PrivateRoute path = '/' component = {Test} status = {this.state.verifyStatus} />
            </Switch>
          </BrowserRouter>

        }
      </div>
    );
  }
}

export default App;
