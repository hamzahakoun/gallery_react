import React, { Component } from 'react' ;
import { connect } from 'react-redux' ;
import { getData,getTags } from '../../store/actions/galleryActions' ;
import ImagesGridItem from './imagesGridItem' ;
import { Grid,Button,CircularProgress } from '@material-ui/core' ;
import AddIcon from '@material-ui/icons/Add';
import CreatableSelect from 'react-select/lib/Creatable' ;
import DialogComponent from '../utils/dialog' ;
import { request } from '../../utils/http' ;
import Message from '../utils/message' ;

// upload image modal
class UploadImage extends Component {

  state = {
    selectedFile : undefined,
    selectFileName : '',
    imgSrc : '',
    value : '' ,
    selectedTags : [] ,
    tags : [] ,
  }


  // for selecting tags
  handleChange = (lstOfItems,action) => this.setState({selectedTags : lstOfItems})

  // select-react needs data to be like [{label : '',value:''}]
  static prepareTags = (tags) => {
    const result = [] ;
    tags.map(item => result.push({label: item.content,value : item.id.toString()}))
    return result ;
  }

  // select image to upload
  handleSelectedFile = (e) => {
    this.setState({
      selectedFile : e.target.files[0],
      selectFileName : e.target.files[0].name ,
      imgSrc : window.URL.createObjectURL(e.target.files[0]),
      value : e.target.files[0].value ,
    })

  }

  // when this component first mount there will be no tags
  // after it received tags then prepare them
  static getDerivedStateFromProps = (nextProps,prevState) => {
    if ( nextProps.tags && nextProps.tags.length ) {
      return {tags : UploadImage.prepareTags(nextProps.tags)} ;
    }
    return nextProps ;
  }

  // if there was tags data when this component mounted then just prepare it
  // else request tags
  componentDidMount = () => {
    if (this.props.tags) {
      this.setState({tags : UploadImage.prepareTags(this.props.tags)})
    } else {
      this.props.getTags() ;
    }
  }


  // after successful upload reset all form's fields
  afterSuccessfulUpload = () => {
    this.setState({
      selectedFile : '' ,
      selectFileName : '',
      imgSrc : '' ,
      value : '' ,
      selectedTags : [] ,
    })
  }


  // send post request to upload the image
  onSubmit = (endpoint) => {
    let tagsString = '' ;
     this.state.selectedTags.map(item => tagsString += `${item.label}#`)
     tagsString = tagsString.substring(0,tagsString.length -1) ;
     const fd = new FormData() ;
     fd.append('url',this.state.selectedFile,this.state.selectFileName) ;
     fd.append('tags_list',tagsString) ;
     request(endpoint,fd,"POST",true)
     .then(resp => resp.json())
     .then(data => {

       this.props.setMessageContent('Image Uploded successfuly !')
       this.props.handleDialogClose() ;
       this.props.showMessage() ;
       this.props.appendData(data) ;
       this.afterSuccessfulUpload() ;
     }) ;
  }


  render = () => {

    return (
      <div>
        <input onChange = { this.handleSelectedFile } type = 'file' value = {this.state.value} /> <br /><br /><br />
        <CreatableSelect closeMenuOnSelect = {false} value = { this.state.selectedTags } isMulti={true} options = {this.state.tags} onChange = {this.handleChange}/>

        <div style = {{marginTop : "220px"}}>
          <Button
            variant="contained"
            disabled = { !this.state.selectedTags.length }
            onClick={ () => this.onSubmit('images') }
            color="primary"
            style = {{marginRight : '10px'}}
            >
            Upload
          </Button>
          <Button onClick={() => this.props.handleDialogClose()} color="secondary" variant="contained">
            Cancel
          </Button>
        </div>

      </div>

    )
  }

}

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
    showUploadMessage : false ,
    messageContent : '' ,
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

  // control the upload modal
  handleUploadDialogClose = () => this.setState({ openUploadDialog : false })


  // control the message of upload
  ToggleMessageShow = () => this.setState({ showUploadMessage : !this.state.showUploadMessage })

  appendData = (obj) => {
    // const {data} = this.state ;
    // console.log(data) ;
    // data.push(obj) ;
    // this.setState({data}) ;
  }


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
          data.map(item => <ImagesGridItem item = {item} key = {item.id}/>)
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
            showMessage = {this.ToggleMessageShow}
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
          handleClose = {this.ToggleMessageShow}
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
    checkedTags : state.gallery.checkTags,
    tags : state.gallery.tags ,
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    getData : (endpoint,type) => dispatch(getData(endpoint,type)),
    getTags : () => dispatch(getTags()) ,
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ImagesGrid) ;
