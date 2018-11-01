import React , { Component } from 'react' ;
import TagItem from './tagItem' ;


export default class TagsList extends Component {

  state = {
    tags :this.props.tags ,
  }

  handleTagItemClick = (content) => this.props.history.push(`/?tags=${content}`)

  render = () => {
    return (
      <div>
        {this.state.tags.map(item => <TagItem key = {item.id}tagItem = {item} handleClick = {this.handleTagItemClick}/>)}
      </div>
    )
  }
}
