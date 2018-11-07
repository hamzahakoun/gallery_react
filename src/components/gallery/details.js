import React, { Component } from 'react' ;

import { connect } from 'react-redux' ;
import { getData,getTags,clearAll } from '../../store/actions/galleryActions' ;
import { sendMessage, removeMessage } from '../../store/actions/messageActions' ;
import { Redirect } from 'react-router-dom' ;

import ImagesGrid from './imagesGrid' ;
import Navbar from '../layout/navbar' ;
import TagsList from './tagsList' ;
import OptionsMenu from '../utils/optionsMenu' ;
import Like from './like' ;
import ConfirmationMessage from '../utils/confirmationMessage' ;
import Message from '../utils/message' ;
import DialogComponent from '../utils/dialog' ;
import AddNewTagsDialog from '../specifics/details/addTagsDialog' ;
import RemoveTagsDialog from '../specifics/details/removeTagsDialog' ;
import Comment from './comment' ;

import { request } from '../../utils/http' ;

import {
  CircularProgress,
  Grid,
  Paper,
  Typography,
  Button  ,
  List,
  ListItem ,
  ListItemSecondaryAction,
  ListItemText,
  Checkbox,
} from '@material-ui/core' ;

const styles = {
  img : {
    maxWidth : '100%' ,
    boxShadow : '5px 3px 5px #ccc' ,
    borderRadius : '7px'
  },
  paper :{
    padding : '10px'
  }
}

class Details extends Component {

  state = {
      data : null,
      id : this.props.id ,
      showMessage : this.props.showMessage,
      showConfimration : false ,
      showAddTagsDialog : false ,
      showRemoveTagsDialog :false,
      deleted : false ,
      messageContent : this.props.messageContent,
      commentsHeight : 0 ,
  }

  getHeight = (element) => {
    if (element) {
      setTimeout(() => {
        this.setState({commentsHeight : element.clientHeight});
      } , 1000)
    }
  }

  componentDidMount = () => {
    this.getData(this.state.id) ;
  }

  deleteImg = () => {
      const payload  = {deleted : true} ;
      request(`images${this.state.id}/`,payload,'PUT')
      .then(resp => {
        if (resp.status === 200) {

          this.props.clearAll() // clear all data to update it
          this.setState({deleted : true})
          this.props.history.push('/') ;
          this.props.sendMessage('Image has been deleted !')
        }
      }) ;
  }


  static getDerivedStateFromProps = (nextProps,prevState) =>  {
    
    if (nextProps.id !== prevState.id) {
      nextProps.getData(`images${nextProps.id}`,'GET_DETAILS') ;
      return { ...nextProps,commentsHeight : 0}
    }

    return nextProps ;
  }
  // when loading this page get all details of this instance
  getData = (id) => this.props.getData(`images${id}/`,'GET_DETAILS') ;


  hide = (key) => this.setState({[key] : false })

  show = (key) => this.setState({[key] : true })

  updateTags = (tags) => {
    const { data } = this.state ;
    data.tags = tags ;
    this.setState({data}) ;
  }


  render = () => {

    if (this.state.deleted) {
      return <Redirect to = '/' />
    }

    const options = [
      {content : 'Add new Tags',action : () => this.show('showAddTagsDialog') },
      {content : 'Remove Tags',action : ()=> this.show('showRemoveTagsDialog')},
      {content : 'Delete this image',action : () => this.show('showConfimration')},
    ]
    const { data } = this.state ;
    const  {checkedTags} = this.props ;

    let searchTags = '?tags=' ; // for related images

    // send this data to navbar to append it to home page link
    // so the used will be able to track his requested images when clicking home page link
    let checked  = ``;

    if (data) {
      searchTags += data.tags[0].content + ',' ;
      data.tags.slice(1).map(tag => searchTags += `${tag.content},`) ;
    }

    if (checkedTags && checkedTags.length) {
      checked  = `?tags=` ;
      checkedTags.map(item => checked += `${item.content},`) ;
    }

    return (

      <div className = 'details'>
        <Navbar pageName = {'details'} history = {this.props.history} search = {checked}/>
        { !data && <CircularProgress className = 'loading' color = 'secondary' /> }
        { data &&
          <div>
            <Grid container spacing = {8}>

              <Grid item xs = {false} sm = {1}></Grid>

              <Grid item xs ={12} sm = {10}>

                <Paper style = {styles.paper}>

                  <Grid container spacing = {32}>

                    <Grid item xs = {12} sm = {8}>
                      { this.state.data.is_owner && <OptionsMenu optionsActionsMap = {options} /> }
                      <img ref = {this.getHeight} style = {styles.img} src = {this.state.data.url} alt = {this.state.data.id} />
                      <div style = {{height : '30px'}}></div>
                      <Like item = {this.state.data} />
                      <div style = {{height : '20px'}}></div>
                      <TagsList tags = {this.state.data.tags} />
                    </Grid>

                    <Grid item xs = {12} sm = {4}>
                      <Grid item xs ={12} sm = {4}>
                        <h3>Comments</h3>
                        {
                          this.state.commentsHeight > 0 &&
                          <Comment
                             height = {this.state.commentsHeight}
                             comments= {this.state.data.comments}
                             id = {this.state.data.id}
                             />
                         }

                         {this.state.commentsHeight === 0 && <CircularProgress color = 'secondary'/>}
                      </Grid>
                    </Grid>

                  </Grid>

                </Paper>



              </Grid>


              <Grid item xs = {false} sm = {1}></Grid>
            </Grid>
            <h2 style = {{marginLeft : "20px"}}>More like this</h2>
            <ImagesGrid type = {'searched'} search = {searchTags}  />

            <DialogComponent
              open = {this.state.showAddTagsDialog}
              handleClose = {() => this.hide('showAddTagsDialog')}
              title = {'Add new Tags'}
            >
              <AddNewTagsDialog
                tags = {this.props.tags}
                getTags = {this.props.getTags}
                handleDialogClose = {() => this.hide('showAddTagsDialog')}
                item = {this.state.data}
                updateTags = {this.updateTags}
                showMessage = {() => this.props.sendMessage('New tags has been added successfuly !')}
              />


            </DialogComponent>


            <DialogComponent
              open = {this.state.showRemoveTagsDialog}
              handleClose = {() => this.hide('showRemoveTagsDialog')}
              title = {'Uncheck to remove tags'}
            >
              <RemoveTagsDialog
                item = {this.state.data}
                updateTags = {this.updateTags}
                handleDialogClose = {() => this.hide('showRemoveTagsDialog')}
                showMessage = {() => this.props.sendMessage('Tags has been removed successfuly !')}
              />

            </DialogComponent>

            <ConfirmationMessage
              message = {"You won't be able to undo this once confirmed"}
              title = {'Are you sure you want to delete this image ?'}
              open = {this.state.showConfimration}
              handleClose = {() => this.hide('showConfimration')}
              handleSubmit = {this.deleteImg}
            />

            <Message
              open = {this.state.showMessage}
              message = {this.state.messageContent}
              handleClose = {this.props.removeMessage}
            />


          </div>

        }
      </div>

    )

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getData : (endpoint,type) => dispatch(getData(endpoint,type)),
    getTags : () => dispatch(getTags()) ,
    clearAll : () =>dispatch(clearAll()),
    sendMessage : (message) => dispatch(sendMessage(message)),
    removeMessage : () => dispatch(removeMessage())
  }
}

const mapStoreToProps = (state,ownProps) => {

  return {
    id : ownProps.location.pathname.replace('/','') ,
    data : state.gallery.details ,
    checkedTags  : state.gallery.checkedTags ,
    tags : state.gallery.tags ,
    showMessage : state.messaging.display ,
    messageContent : state.messaging.content ,
  }
}
export default connect(mapStoreToProps,mapDispatchToProps)(Details) ;
