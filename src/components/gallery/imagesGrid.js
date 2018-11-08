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
import { getRequest } from '../../utils/http' ;

const styles = {
  grid : {
    padding : '10px' ,
  }
}

class ImagesGrid extends Component {


  state = {
    data : this.props.type ? this.props[this.props.type] : this.props.all ,
    openUploadDialog : false ,
    showMessage : this.props.showMessage ,
    messageContent : this.props.messageContent ,
    details : this.props.details ,
  }


  // request data without updateing the search field in redux store
  // in case i searched for some tags in home page
  // then i went to details page i don't want to lose the original searched tags
  requestDataLocally = (excludeId) => {
    getRequest(`images${this.props.search}&exclude=${excludeId}`)
    .then(resp => resp.json())
    .then(data => this.setState({ data }))
  }

  componentDidMount = () => {

    if (!this.state.data || this.props.details) {

      switch(this.props.type) {
        case 'liked' :
          this.props.getData('images?liked=1','GET_LIKED') ;
          break  ;

        case 'searched' :
          // in details page update the local state
          if (this.props.details) {
            this.requestDataLocally(this.props.details.id) ;
            return ;
          }
          // else update the glabal state
          this.props.getData(`images${this.props.search}`,'GET_SEARCH')  ;
          break ;

        default :
          this.props.getData('images','GET_ALL') ;
          break
      }
    }
  }

  // i need this to show messages in case user deleted image
  static getDerivedStateFromProps = (nextProps,prevState) => {
    if (nextProps.type) {
      return nextProps
    }
    return {...nextProps,data: nextProps.all}  ;
  }

  // control the upload modal
  handleUploadDialogClose = () => this.setState({ openUploadDialog : false })

  showMessage = () => this.props.sendMessage('Image has been uploaded successfuly !')

  hideMessage = () => this.props.removeMessage()

  // append new images only for all section
  appendData = (obj) => this.props.appendData('APPEND_ALL',obj) ;

  setMessageContent = (content) => this.setState({ messageContent : content })


  render = () => {
    const type = this.props.type ? this.props.type : 'all' ;
    const data = this.state.data ? this.state.data : this.props[type] ;
    //console.log(data)  ;

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
          open = {this.state.showMessage}
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

     // i need details to decide whether i should request new related images
    details : state.gallery.details ,
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    getData : (endpoint,type) => dispatch(getData(endpoint,type)),
    getTags : () => dispatch(getTags()) ,
    appendData :(type,obj) => dispatch(appendData(type,obj)),
    sendMessage : (message) => dispatch(sendMessage(message)) ,
    removeMessage : () => dispatch(removeMessage()),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ImagesGrid) ;
