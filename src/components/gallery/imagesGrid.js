import React, { Component } from 'react' ;
import { connect } from 'react-redux' ;
import { getData,getTags,appendData } from '../../store/actions/galleryActions' ;
import ImagesGridItem from './imagesGridItem' ;
import { Grid,Button,CircularProgress } from '@material-ui/core' ;
import AddIcon from '@material-ui/icons/Add';
import DialogComponent from '../utils/dialog' ;
import Message from '../utils/message' ;
import UploadImage from '../specifics/imagesGrid/uploadImageDialog' ;
import { sendMessage, removeMessage } from '../../store/actions/messageActions' ;


const styles = {
  grid : {
    padding : '10px' ,
  }
}

class ImagesGrid extends Component {


  state = {
    data : this.props.type ? this.props[this.props.type] : this.props.all ,
    searchTags : [],
    openUploadDialog : false ,
    showUploadMessage : this.props.showMessage ,
    messageContent : this.props.messageContent ,
  }

  componentDidMount = () => {
    if (!this.state.data) {

      switch(this.props.type) {

        case 'liked' :
          this.props.getData('images?liked=1','GET_LIKED') ;
          break  ;

        case 'searched' :
          this.props.getData(`images?tags=${this.props.search.slice(6)}`,'GET_SEARCH')  ;

        default :
          this.props.getData('images','GET_ALL') ;
          break
      }

    }
  }

  static getDerivedStateFromProps = (nextProps,prevState) => {
    if (!nextProps.type) {
      return {
        data : nextProps.all,
        messageContent : nextProps.messageContent,
        showUploadMessage :nextProps.showMessage
      }
    } else {
      return {
          data : nextProps[nextProps.type] ,
          messageContent : nextProps.messageContent,
          showUploadMessage :nextProps.showMessage
        }
    }
    return nextProps ;
  }

  // control the upload modal
  handleUploadDialogClose = () => this.setState({ openUploadDialog : false })

  showMessage = () => this.props.sendMessage('Image has been uploaded successfuly !')

  hideMessage = () => this.props.removeMessage()

  // append new images only for all section
  appendData = (obj) => this.props.appendData('APPEND_ALL',obj) ;

  setMessageContent = (content) => this.setState({ messageContent : content })

  render = () => {
    let type = 'all' ;

    if (this.props.type) {
      type = this.props.type
    }

    const data  = this.props[type] ;

    return (
      <Grid container spacing = {8} style= {styles.grid} className = 'imgs-grid-container'>
        {data &&
          data.map(item => <ImagesGridItem  item = {item} key = {item.id}/>)
        }
        {!data && <CircularProgress className = 'loading' color = 'secondary' />}
        {data && data.length === 0 && <h3 className = 'loading'>No data to be displayed</h3>}
        <Button onClick = {() => this.setState({openUploadDialog : true})} variant="fab" color="secondary" aria-label="Add" style = {{position : 'fixed',right : '5%',bottom : '7%'}}>
          <AddIcon />
        </Button>

        <DialogComponent
          open = {this.state.openUploadDialog}
          title = {'Upload an image'}
          handleClose  = {this.handleUploadDialogClose}
          confirmButtonText = {'upload'}
          cancelButtonText = {'cancel'}
        >
        <div style = {{height : '350px',width : '300px'}}>
          <UploadImage
            handleDialogClose = {this.handleUploadDialogClose}
            showMessage = {this.showMessage}
            setMessageContent = {this.setMessageContent}
            appendData = {this.appendData}
            tags = {this.props.tags}
            getTags = { this.props.getTags }

            />
        </div>

        </DialogComponent>
        <Message
          message = {this.state.messageContent}
          open = {this.state.showUploadMessage}
          handleClose = {this.hideMessage}
          />
      </Grid>
    )
  }

}


const mapStateToProps = (state) => {
  return {
    all : state.gallery.all ,
    searched : state.gallery.searched ,
    liked : state.gallery.liked ,
    checkedTags : state.gallery.checkedTags,
    tags : state.gallery.tags ,
    showMessage : state.messaging.display,
    messageContent : state.messaging.content ,
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    getData : (endpoint,type) => dispatch(getData(endpoint,type)),
    getTags : () => dispatch(getTags()) ,
    appendData :(type,obj) => dispatch(appendData(type,obj)),
    sendMessage : (message) => dispatch(sendMessage(message)) ,
    removeMessage : () => dispatch(removeMessage()) 
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ImagesGrid) ;
