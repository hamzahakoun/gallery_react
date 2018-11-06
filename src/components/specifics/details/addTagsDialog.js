import React , { Component } from 'react' ;
import { request } from '../../../utils/http' ;
import CreatableSelect from 'react-select/lib/Creatable' ;
import { Button } from '@material-ui/core'

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
      this.props.showMessage('Tags has been added successfuly !') ;
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


export default AddNewTagsDialog ;
