import React , { Component } from 'react' ;
import TagItem from './tagItem' ;


export default class TagsList extends Component {

  state = {
    tags :this.props.tags ,
  }

  static getDerivedStateFromProps = (nextProps,prevState) => {
    return nextProps ;
  }

  handleTagItemClick = (content) => {this.props.history.push(`/?tags=${content}`)}

  render = () => {
    const properties = {
      duration: 5000,
      transitionDuration: 100,
      infinite: true,
      indicators: true,
      arrows: true
    }
    return (
      <div style = {{display : 'flex' ,height :'70px',overflowX : 'scroll',wrapDirection : 'row' }}>
          {this.state.tags.map(item => {
            return (
              <span style = {{margin : '5px',position :'relative' }}>
                <TagItem key = {item.id} tagItem = {item} handleClick = {this.handleTagItemClick}/>
              </span>

            )
          })}

      </div>
    )
  }
}
