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
        <Navbar history = {this.props.history} location = {this.props.location}/>
        <div>
          <Tabs value={this.state.tabIndex} onChange={this.handleChange} >
            <Tab label="Home" />
            <Tab label="Liked" />
          </Tabs>

          { this.state.tabIndex === 0 && this.props.location.search === '' && <ImagesGrid /> }
          { this.state.tabIndex === 0 && this.props.location.search !== '' && <ImagesGrid type = 'searched' search = {this.props.location.search}/> }
          { this.state.tabIndex === 1 && <ImagesGrid type = {'liked'}/> }
        </div>


      </div>

    )
  }

}
