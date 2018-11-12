import React , { Component } from 'react' ;
import { request } from '../../../utils/http' ;
import CreatableSelect from 'react-select/lib/Creatable' ;
import { Button } from '@material-ui/core' ;

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
    if (e.target.files[0]) {
      this.setState({
        selectedFile : e.target.files[0],
        selectFileName : e.target.files[0].name ,
        imgSrc : window.URL.createObjectURL(e.target.files[0]),
        value : e.target.files[0].value ,
      })
    }
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


export default UploadImage ;
