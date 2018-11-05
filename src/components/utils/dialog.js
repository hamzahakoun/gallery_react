import React , { Component } from 'react' ;

import {
  DialogContent,
  DialogTitle,
  Dialog,
  Slide,
  Button
} from '@material-ui/core' ;

const Transition = (props) => <Slide direction = 'up' {...props} />


export default class DialogComponent extends Component {

  state = {
    open : this.props.open ,
  }

  static getDerivedStateFromProps = (nextProps,prevState) => {
      return nextProps ;
  }

  render = () => {
    return (
      <Dialog
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          open={this.state.open}
          onClose = { this.props.handleClose }

        >
          <DialogTitle id="alert-dialog-slide-title">
           {this.props.title}
          </DialogTitle>
          <DialogContent>
            {this.props.children}
          </DialogContent>
      </Dialog>
    )

  }
}
