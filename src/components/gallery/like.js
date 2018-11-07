import React, { Component } from 'react' ;
import { Favorite } from '@material-ui/icons' ;
import { request, deleteRequest } from '../../utils/http' ;
import { connect } from 'react-redux';
import { appendData,popData } from '../../store/actions/galleryActions' ;

class Like extends Component {

  state = {
    isLiked : this.props.item.is_liked_by_user ,
    likesNum : this.props.item.likes_num ,
    color : this.props.item.is_liked_by_user ? '#f72a2a' : '#444' ,
  }

  like = () => {
      const payload = {event_type : 'like',content_type : 'image',object_id: this.props.item.id} ;
      request('events',payload)
      .then(resp => resp.json())
      .then(data => {
        this.setState({isLiked : true ,color : "#f72a2a",likesNum : this.state.likesNum + 1 })
        this.props.appendData('APPEND_LIKED',this.props.item) ;
      }) ;
  }

  dislike = () => {
    const endpoint = `images${this.props.item.id}/` ;
    deleteRequest(endpoint).then(resp => {
      if (resp.status === 204) {
        this.setState({color : '#444',likesNum : this.state.likesNum - 1 ,isLiked : false }) ;
        this.props.popData('POP_LIKED',this.props.item) ;
      }
    })

  }

  render = () => {

    const action = this.state.isLiked ? this.dislike : this.like ;
    return (
      <div style = {{display : 'flex',alignItems : 'center'}}>
        <span><Favorite onClick = { action } style = {{color : this.state.color}}/></span>
        <span style = {{color : this.state.color}}>
            {this.state.likesNum > 0 && this.state.likesNum }
        </span>
      </div>
    )
  }
}



const mapDispatchToProps = (dispatch) => {
  return {
    appendData : (type,obj) => dispatch(appendData(type,obj)) ,
    popData : (type,obj) => dispatch(popData(type,obj)) ,
  }
}
export default connect(null,mapDispatchToProps)(Like) ;
