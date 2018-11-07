import React , { Component } from 'react' ;
import CommentsList from './commentsList' ;
import {TextField, Button } from '@material-ui/core';
import { request } from '../../utils/http' ;

class Comment extends Component {

  state = {
    comments : this.props.comments ,
    height : this.props.height,
    id : this.props.id ,
    content : '' ,
    disableSubmitButton : false
  }

  static getDerivedStateFromProps = (nextProps,prevState) => {
    return nextProps ;
  }

  updateComments = (obj) => {
    const {comments} = this.state ;
    comments.push(obj) ;
    this.setState({ comments })
  }


  comment = () => {
    this.setState({disableSubmitButton : true})
    const payload = {is_parent : true,content_type : 'image',content : this.state.content,object_id: this.state.id} ;
    request('comments',payload).then(resp => resp.json())
    .then(data => {
      this.updateComments(data) ;
      this.setState({disableSubmitButton : false ,content : '' })
    })
  }

  handleChange = (e) => this.setState({content : e.target.value})

  render = () => {

    return (
      <div style = {{minWidth : '300px'}}>
        {this.state.comments.length > 0 && <CommentsList height = {this.state.height} comments = {this.state.comments}/>}
        { this.state.comments.length === 0 && <h3 style = {{height : this.state.height - 55 ,textAlign : 'center',marginTop : '20%'}}>No Comments yet</h3> }

        <TextField
         id="outlined-multiline-static"
         label="Comment"
         multiline
         rows="2"
         margin="normal"
         variant="outlined"
         style = {{width : '100%'}}
         value = {this.state.content}
         onChange = {this.handleChange}
       />
       <Button
        variant="contained"
        color = 'primary'
        style = {{width : '100%',marginLeft : '3px'}}
        disabled = {this.state.disableSubmitButton || this.state.content.length === 0}
        onClick = {this.comment}
        >Comment</Button>

      </div>

    )
  }
}


export default Comment ;
