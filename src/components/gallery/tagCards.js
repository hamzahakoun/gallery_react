import React , { Component } from 'react' ;
import { connect } from 'react-redux' ;
import { getTags, checkTags,clearData,} from '../../store/actions/galleryActions' ;
import Navbar from '../layout/navbar' ;
import  { Search,DeleteForever,ViewComfy } from '@material-ui/icons';
import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Checkbox,
  CircularProgress,
  Button,
  Typography,
  Card,
  CardContent
} from '@material-ui/core' ;



const setSpan = (length) => length + 1 ;


class TagCards extends Component {


  state  = {
    tags : this.props.tags ,
    readyTags : null,
    checked : this.props.checkedTags ,
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



  handleToggle = (item) => {

    const {checked} = this.state ;
    const currentIndex= checked.indexOf(item) ;
    const newChecked = [...checked] ;

    if (currentIndex === -1) {
      newChecked.push(item)
    } else {
      newChecked.splice(currentIndex,1)
    }
    this.setState({checked : newChecked}) ;

  }


  static getDerivedStateFromProps = (nextProps,prevState) => {
    if (nextProps.tags) {
      return {readyTags : TagCards.prepareTags(nextProps.tags),tags : nextProps.tags }
    }
    return nextProps ;
  }

  search  = () => {
    if (this.state.checked.length) {
      let searchTags = this.state.checked[0].content + ',';
      this.state.checked.slice(1).forEach(tag => searchTags += `${tag.content},`) ;
      this.props.history.push(`/?tags=${searchTags}`) ;
      this.props.checkTags(this.state.checked,'full') ;

       // cuz if the search is not cleared the it will not get the new data
       // cuz there is data already
      this.props.clearData('CLEAR_SEARCHED') ;

      return
    } else if (!this.state.checked.length && this.props.checkedTags.length) {
      this.props.history.push(`/`) ;
      this.props.checkTags([],'empty') ;
      this.props.clearData('CLEAR_SEARCHED') ;
    }
    return

  }

  clear = () => this.setState({checked : [] }) ;

  checkAll = () => this.setState({checked : this.state.tags}) ;



  componentDidMount = () => {
    if (!this.state.tags.length) {
      this.props.getTags() ;
    }
  }


  render = () => {

      let searchTag = '' ;
      if (this.props.checkedTags && this.props.checkedTags.length > 0) {
          searchTag += `?tags=${this.props.checkedTags[0].content},` ;
          this.props.checkedTags.slice(1).map(item => searchTag += `${item.content},`)
      }

      return (
        <div>
          <Navbar history = {this.props.history} search = {searchTag}/>
          <div className = 'grid-container'>

            {
              this.state.readyTags &&
              Object.keys(this.state.readyTags).map(letter => {
                const span = setSpan(this.state.readyTags[letter].length)
                return (
                  <Card key = {letter} style = {{ gridRowEnd : `span ${span}`}} className = 'animated bounceIn'>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom style = {{backgroundColor : '#3f51b5',color : '#ffffff',padding : '10px'}}>
                         {letter.toUpperCase()}
                       </Typography>
                      {
                        this.state.readyTags[letter].map(item => {
                          return (
                            <List key = {item.id}>
                              <ListItem  role={undefined} dense button onClick={() => this.handleToggle(item)}>
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
                    </CardContent>
                  </Card>
                )
              })
            }
            {this.state.readyTags &&
              <div>
                <Button
                  variant="fab"
                  color="secondary"
                  aria-label="Search"
                  style = {{position : 'fixed',right : '5%',bottom : '26%'}}
                  onClick = {this.checkAll}
                  disabled = { this.state.checked.length === this.props.tags.length }
                  >
                  <ViewComfy />
                </Button>
                <Button

                  onClick = {this.search}
                  variant="fab"
                  color="secondary"
                  aria-label="Search"
                  style = {{position : 'fixed',right : '5%',bottom : '6%'}}
                  >
                   <Search />
                </Button>
                <Button
                  onClick = {this.clear}
                  variant="fab"
                  color="secondary"
                  aria-label="Search"
                  style = {{position : 'fixed',right : '5%',bottom : '16%'}}
                  disabled = {this.state.checked.length === 0}
                  >
                   <DeleteForever />
                </Button>
              </div>
            }

            {!this.state.readyTags && <CircularProgress color = 'secondary' className = 'loading' />}
          </div>


          </div>

      )
    }
}



const mapStateToProps = (state) => {
  return {
    tags : state.gallery.tags ,
    checkedTags : state.gallery.checkedTags
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTags : () => dispatch(getTags()) ,
    checkTags : (tags,t) => dispatch(checkTags(tags,t)) ,
    clearData: (type) => dispatch(clearData(type)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(TagCards)
