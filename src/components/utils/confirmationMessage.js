import React , { Component } from 'react' ;
import {
  DialogContent,
  DialogTitle,
  Dialog,
  DialgActions ,
  Slide,
  Button,
  DialogContentText,
  DialogActions
} from '@material-ui/core' ;

const Transition = (props) => <Slide direction = 'up' {...props} />

class ConfirmationMessage extends Component {


  state = {
    messageContent :this.props.message ,
    title : this.props.title ,
    open : this.props.open
  }

  static getDerivedStateFromProps = (nextProps,prevState) => {
    return nextProps ;
  }

  render = () => {
    return (
      <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.props.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {this.state.title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {this.state.messageContent}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.props.handleSubmit} color="secondary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
    )
  }

}

export default ConfirmationMessage ;
