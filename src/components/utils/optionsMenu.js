import React, { Component } from 'react' ;
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

export default class OptionsMenu extends Component {


  state = {
      optionsActionsMap : this.props.optionsActionsMap ,
      anchorEl: null,
  }

  handleClick = (e) => this.setState({anchorEl : e.currentTarget})

  handleClose = (item) => {
    this.setState({anchorEl : null}) ;
    //item.action() ;
  }



  render = () => {
    const ITEM_HEIGHT = 48;
    const { anchorEl } = this.state;
    const open = anchorEl !== null ;


    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={open ? 'long-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200,
            },
          }}
        >
          {this.state.optionsActionsMap.map((item,index) => (
            <MenuItem key={index} onClick= {() => this.handleClose(item)} >
              {item.content}
            </MenuItem>
          ))}
        </Menu>
      </div>
    )
  }
}
