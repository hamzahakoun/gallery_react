import React, { Component } from 'react' ;

import { connect } from 'react-redux' ;
import { getData,getTags,clearAll } from '../../store/actions/galleryActions' ;
import { Redirect } from 'react-router-dom' ;

import CreatableSelect from 'react-select/lib/Creatable' ;
import { CircularProgress, Grid,Paper,Typography,Button  } from '@material-ui/core' ;

import ImagesGrid from './imagesGrid' ;
import Navbar from '../layout/navbar' ;
import TagsList from './tagsList' ;
import OptionsMenu from '../utils/optionsMenu' ;
import Like from './like' ;
import ConfirmationMessage from '../utils/confirmationMessage' ;
import Message from '../utils/message' ;
import DialogComponent from '../utils/dialog' ;

import { request } from '../../utils/http' ;

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


class AddNewTagsDialog extends Component {

  state = {
    tags : [] , // will be ready tags
    selectedTags : [] ,
    open : this.props.open,
    dissableSubmitButton : false ,
  }


  static getDerivedStateFromProps = (nextProps,prevState) => {
    if (nextProps.tags && nextProps.tags.length) {
      return {tags :AddNewTagsDialog.prepareTags(nextProps.tags),open :nextProps.open}
    }

    return nextProps ;
  }

  static prepareTags = (tags) => {
    const result = [] ;
    tags.map(item => result.push({label: item.content,value : item.id.toString()}))
    return result ;
  }

  componentDidMount = () => {
    if (this.props.tags) {
      this.setState({tags :AddNewTagsDialog.prepareTags(this.props.tags)}) ;
    } else {
      this.props.getTags() ;
    }

  }

  handleChange = (lstOfItems,action) => this.setState({selectedTags : lstOfItems})


  addTags = () => {
    this.setState({dissableSubmitButton :true})
    const id = this.props.item.id ;
    let tagsList =  '' ;
    this.state.selectedTags.map(tag => tagsList += `${tag.label}#`) ;
    tagsList = tagsList.slice(0,tagsList.length -1) ;
    const payload = {tags_list : tagsList} ;
    request(`images${id}/`,payload,'PUT')
    .then(resp => resp.json())
    .then(data => {
      this.props.updateTags(data.tags) ;
      this.props.handleDialogClose() ;
      this.props.showMessage() ;
      this.setState({dissableSubmitButton :false,selectedTags : [] })
    }) ;
  }

  render = () => {

    return (
      <div style = {{width : '300px'}}>
        {

          this.state.tags && this.state.tags.length &&
          <div>
            <CreatableSelect
              closeMenuOnSelect = {false}
              value = { this.state.selectedTags }
              isMulti={true}
              options = {this.state.tags}
              onChange = {this.handleChange}
              />

            <div style = {{marginTop : "200px"}}>
              <Button
                variant="contained"
                disabled = { !this.state.selectedTags.length }
                onClick={ () => this.addTags() }
                color="primary"
                style = {{marginRight : '10px'}}
                disabled = {this.state.dissableSubmitButton || this.state.selectedTags.length === 0}
                >
                Confirm
              </Button>
              <Button onClick={ this.props.handleDialogClose } color="secondary" variant="contained">
                Cancel
              </Button>
            </div>
          </div>
        }


      </div>
    )
  }

}

class Details extends Component {

  state = {
      data : null,
      id : this.props.id ,
      showMessage : false ,
      showConfimration : false ,
      showAddTagsDialog : false ,
      deleted : false ,
  }


  componentDidMount = () => {
    this.getData() ;
  }

  deleteImg = () => {
      const payload  = {deleted : true,tags_list : 'spam' } ;
      request(`images${this.state.id}/`,payload,'PUT')
      .then(resp => {
        if (resp.status === 200) {

          this.props.clearAll() // clear all data to update it
          this.setState({deleted : true})
          this.props.history.push('/') ;
        }
      }) ;
  }


  static getDerivedStateFromProps = (nextProps,prevState) =>  {
      return nextProps ;
  }
  // when loading this page get all details of this instance
  getData = () => this.props.getData(`images${this.props.id}`,'GET_DETAILS') ;

  ToggleShow = (key) => this.setState({[key] : !this.state[key]})

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
      {content : 'Add new Tags',action : () => this.ToggleShow('showAddTagsDialog') },
      {content : 'Delete this image',action : () => this.ToggleShow('showConfimration')}
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

              <Grid item xs = {12} sm = {10}>

                <Paper style = {styles.paper}>
                  <Grid container spacing = {8}>
                    <Grid item xs = {12} sm = {8}>
                      <OptionsMenu optionsActionsMap = {options} />
                    </Grid>
                    <Grid item xs = {12} sm = {8}>

                      <img src = {data.url} alt = {data.id} style = {styles.img}/>

                    </Grid>
                    <Grid item xs = {12} sm = {8} style = {{height : '10px'}}></Grid>
                    <Grid item xs = {12} sm = {8} style = {{paddingLeft : '10px'}}>
                      <Like item = {this.state.data}/>
                    </Grid>
                    <Grid item xs = {12} sm = {8}>
                      <TagsList tags = {data.tags} history = {this.props.history} />
                    </Grid>
                  </Grid>
                </Paper>

              </Grid>


              <Grid item xs = {false} sm = {1}></Grid>
              <Grid item xs = {12} sm = {8} style = {{height : '30px'}}></Grid>
              <Grid item xs = {12} sm = {12} style = {{paddingLeft : '20px'}}>
                <Typography component="h2" variant="display1" gutterBottom>
                  More Like This
                </Typography>
              </Grid>
            </Grid>
            <ImagesGrid type = {'searched'} search = {searchTags} />

            <DialogComponent
              open = {this.state.showAddTagsDialog}
              handleClose = {() => this.ToggleShow('showAddTagsDialog')}
              title = {'Add new Tags'}
            >
              <AddNewTagsDialog
                tags = {this.props.tags}
                getTags = {this.props.getTags}
                handleDialogClose = {() => this.ToggleShow('showAddTagsDialog')}
                item = {this.state.data}
                updateTags = {this.updateTags}
                showMessage = {() => this.ToggleShow('showMessage')}
              />
            </DialogComponent>

            <ConfirmationMessage
              message = {"You won't be able to undo this once confirmed"}
              title = {'Are you sure you want to delete this image ?'}
              open = {this.state.showConfimration}
              handleClose = {() => this.ToggleShow('showConfimration')}
              handleSubmit = {this.deleteImg}
            />

            <Message
              open = {this.state.showMessage}
              message = {'Tags has been added successfuly !'}
              handleClose = {() => this.ToggleShow('showMessage')}
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
    clearAll : () =>dispatch(clearAll())
  }
}

const mapStoreToProps = (state,ownProps) => {

  return {
    id : ownProps.location.pathname.replace('/','') ,
    data : state.gallery.details ,
    checkedTags  : state.gallery.checkedTags ,
    tags : state.gallery.tags ,
  }
}
export default connect(mapStoreToProps,mapDispatchToProps)(Details) ;
