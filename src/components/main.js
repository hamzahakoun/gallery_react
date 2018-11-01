import React, { Component } from 'react' ;
import Navbar from './layout/navbar' ;
import ImagesGrid from './gallery/imagesGrid' ;
import {
  AppBar,
  Tabs,
  Tab,
  Typography,

} from '@material-ui/core' ;

export default class Main extends Component  {

  state = {
    tabIndex : 0 ,
  }

  handleChange = (e,value) => this.setState({tabIndex : value})

  render = () => {
    return (
      <div>
        <Navbar history = {this.props.history} />

        <Tabs value={this.state.tabIndex} onChange={this.handleChange} >
          <Tab label="Home" />
          <Tab label="Liked" />
        </Tabs>

        { this.state.tabIndex === 0 && <ImagesGrid /> }
        { this.state.tabIndex === 1 && <ImagesGrid type = {'liked'}/> }

      </div>

    )
  }

}
