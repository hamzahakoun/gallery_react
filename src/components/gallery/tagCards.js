import React , { Component } from 'react' ;
import { connect } from 'react-redux' ;
import { getTags } from '../../store/actions/galleryActions' ;
import {
  CommentIcon,
} from '@material-ui/icons' ;
import Navbar from '../layout/navbar' ;

import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Checkbox,
  Paper,
  CircularProgress,
  IconButton,
  Button
} from '@material-ui/core' ;
import  { Search,DeleteForever,ViewComfy } from '@material-ui/icons';

const setSpan = (length) => length + 1 ;


class TagCards extends Component {


  state  = {
    tags : this.props.tags ,
    readyTags : null,
    checked : [] ,
  }

  // i had make this method static so i can refer to it
  // inside the getDerivedStateFromProps (which is also staic)
  static prepareTags = (tags) => {
    const readyTags = {}
    tags.map(tagItem => {
      const firstLetter = tagItem.content[0].toLowerCase()  ;
      if (readyTags[firstLetter]) {
        readyTags[firstLetter].push(tagItem)
      } else {
        readyTags[firstLetter] = [tagItem]
      }
    })
    return readyTags ;
  }

  handleChange = () => {

  }


  static getDerivedStateFromProps = (nextProps,prevState) => {
    if (nextProps.tags) {
      return {readyTags : TagCards.prepareTags(nextProps.tags) }
    }
    return nextProps ;
  }


  componentDidMount = () => {
    if (!this.state.tags) {
      this.props.getTags() ;
    }
  }


  render = () => {

      return (
        <div>
          <Navbar history = {this.props.history}/>
          <div className = 'grid-container'>
            {
              this.state.readyTags &&
              Object.keys(this.state.readyTags).map(letter => {
                const span = setSpan(this.state.readyTags[letter].length)
                return (
                  <Paper key = {letter} style = {{ gridRowEnd : `span ${span}`}}>
                    {
                      this.state.readyTags[letter].map(item => {
                        return (
                          <List key = {item.id}>
                            <ListItem  role={undefined} dense button onClick={this.handleToggle}>
                               <Checkbox
                                 checked={this.state.checked.indexOf(item) !== -1}
                                 tabIndex={-1}
                                 disableRipple
                               />
                             <ListItemText primary={`${item.content}`} />
                             <ListItemSecondaryAction style = {{marginRight : '10px'}}>{`(${item.img_num})`}</ListItemSecondaryAction>
                             </ListItem>
                          </List>
                        )
                      })
                    }
                  </Paper>
                )
              })
            }
            {!this.state.readyTags && <CircularProgress color = 'secondary' className = 'loading' />}
          </div>

          <Button  variant="fab" color="secondary" aria-label="Search" style = {{position : 'fixed',right : '5%',bottom : '26%'}}>
            <ViewComfy />
          </Button>
          <Button variant="fab" color="secondary" aria-label="Search" style = {{position : 'fixed',right : '5%',bottom : '6%'}}>
             <Search />
          </Button>
          <Button  variant="fab" color="secondary" aria-label="Search" style = {{position : 'fixed',right : '5%',bottom : '16%'}}>
             <DeleteForever />
          </Button>
          </div>

      )
    }
}



const mapStateToProps = (state) => {
  return {
    tags : state.gallery.tags ,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTags : () => dispatch(getTags()) ,
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(TagCards)
