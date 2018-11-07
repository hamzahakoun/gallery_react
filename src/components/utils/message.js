import React, {Component} from 'react' ;
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default class Message extends Component {

  constructor(props) {

    super(props) ;
    this.state = {
      open : this.props.open ,
      message : this.props.message
    }
  }

  static getDerivedStateFromProps = (nextProps,prevState) => {

    if (nextProps.open && nextProps.open.length > 0) {
      return {open : nextProps.open,message : nextProps.message}
    }

    return nextProps ;
  }

  handleClose = () => this.props.handleClose() ;

  render = () => {

    return (
      <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={this.state.open}
            autoHideDuration={3000}
            onClose={this.handleClose}
            message={this.state.message}
            action={[
             <IconButton
               key="close"
               aria-label="Close"
               color="inherit"
               onClick={this.handleClose}
             >
               <CloseIcon />
             </IconButton>,
           ]}
          />
    )
  }




}
