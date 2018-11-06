import React , { Component } from 'react';
import { request } from '../../../utils/http' ;
import {
  List,
  ListItem ,
  Checkbox,
  ListItemText,
  Button
} from '@material-ui/core' ;

class RemoveTagsDialog extends Component {

    state = {
      item :this.props.item ,
      unChecked : [] ,
    }

    handleToggle = (item) => {

      const {unChecked} = this.state
      const currentIndex= unChecked.indexOf(item) ;
      const newUnChecked = [...unChecked] ;

      if (currentIndex === -1) {
        newUnChecked.push(item)
      } else {
        newUnChecked.splice(currentIndex,1)
      }
      this.setState({unChecked : newUnChecked})  ;
    }


    static getDerivedStateFromProps = (nextProps,prevState) => {
      return {item : nextProps.item}
    }

    removeTags = () => {
      let ids = ''
      this.state.unChecked.map(item => ids += `${item.id}#`) ;
      ids = ids.slice(0,ids.length -1) ;
      const payload = {tags_ids : ids,tags_list : 'spam'} ;
      const imgId = this.state.item.id  ;
      request(`images${imgId}/`,payload,'PUT')
      .then(resp => resp.json())
      .then(data => {
        this.props.updateTags(data.tags) ;
        this.props.handleDialogClose() ;
        this.props.showMessage('Tags has been removed successfuly !')
      })
    }


    render = () => {
      let checkedTags = [] ;
      if (this.state.item) {
        checkedTags = this.state.item.tags  ;
      }

      return (
      <div >
        {
          this.state.item &&
          <div >
            <List style = {{maxHeight : '400px',display : 'flex',flexWrap : 'wrap',flexDirection : 'row',maxWidth : '95%'}}>
              {checkedTags.map(item => (
                <ListItem style = {{width : '50%'}} key={item.id} role={undefined} dense button onClick={() => this.handleToggle(item)}>
                  <Checkbox
                    checked={this.state.unChecked.indexOf(item) === -1}
                    tabIndex={-1}
                    disableRipple
                  />
                <ListItemText primary={item.content} />
                </ListItem>
              ))}
            </List>
          </div>

        }
        <div style = {{marginTop : '20px',paddingLeft : "30px"}}>
        <Button
          variant="contained"
          onClick={ this.removeTags}
          color="primary"
          style = {{marginRight : '10px'}}
          >
          Confirm
        </Button>
        <Button onClick={ this.props.handleDialogClose } color="secondary" variant="contained">
          Cancel
        </Button>
        </div>


      </div>
      )
    }
}



export default RemoveTagsDialog ;
