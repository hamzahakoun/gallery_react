import React, { Component } from 'react' ;
import { connect } from 'react-redux' ;
import ImagesGrid from './imagesGrid' ;
import { getData } from '../../store/actions/galleryActions' ;
import { CircularProgress } from '@material-ui/core' ;
import { Grid,Paper,Typography } from '@material-ui/core' ;
import Navbar from '../layout/navbar' ;
import TagsList from './tagsList' ;
import OptionsMenu from '../utils/optionsMenu' ;

const styles = {
  img : {
    maxWidth : '100%' ,
    boxShadow : '5px 3px 5px #ccc' ,
    borderRadius : '7px'
  },
  paper :{
    padding : '10px'
  }
}

class Details extends Component {

  state = {
      data : null,
  }


  componentDidMount = () => {
    this.getData() ;
  }


  // when loading this page get all details of this instance
  getData = () => this.props.getData(`images${this.props.id}`,'GET_DETAILS') ;


  render = () => {

    const { data } = this.props ;
    const  {checkedTags} = this.props ;

    let searchTags = '?tags=' ; // for related images

    // send this data to navbar to append it to home page link
    // so the used will be able to track his requested images when clicking home page link
    let checked  = ``;


    if (data) {
      searchTags += data.tags[0].content + ',' ;
      data.tags.slice(1).map(tag => searchTags += `${tag.content},`) ;
    }

    if (checkedTags.length) {
      checked  = `?tags=` ;
      checkedTags.map(item => checked += `${item.content},`) ;
    }


    return (
      <div>
        <Navbar pageName = {'details'} history = {this.props.history} search = {checked}/>
        { !data && <CircularProgress className = 'loading' color = 'secondary' /> }
        { data &&
          <div>
            <Grid container spacing = {8}>
              <Grid item xs = {false} sm = {1}></Grid>

              <Grid item xs = {12} sm = {10}>

                <Paper style = {styles.paper}>
                  <Grid container spacing = {8}>
                    <Grid item xs = {12} sm = {8}>
                      <OptionsMenu
                        optionsActionsMap = {
                          [
                            {content : 'Add tags',action : null},
                            {content : 'Delete Image',action : null}
                          ]
                        } />
                    </Grid>
                    <Grid item xs = {12} sm = {8}>

                      <img src = {data.url} alt = {data.id} style = {styles.img}/>

                    </Grid>
                    <Grid item xs = {12} sm = {8}>
                      <TagsList tags = {data.tags} history = {this.props.history} />
                    </Grid>
                  </Grid>
                </Paper>

              </Grid>


              <Grid item xs = {false} sm = {1}></Grid>
              <Grid item xs = {12} sm = {12}></Grid>
              <Grid item xs = {12} sm = {12}></Grid>
              <Grid item xs = {12} sm = {12}></Grid>
              <Grid item xs = {12} sm = {12} style = {{paddingLeft : '20px'}}>
                <Typography component="h2" variant="display1" gutterBottom>
                  More Like This
                </Typography>
              </Grid>
            </Grid>
            <ImagesGrid type = {'searched'} search = {searchTags} />
          </div>
        }
      </div>

    )

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getData : (endpoint,type) => dispatch(getData(endpoint,type))
  }
}

const mapStoreToProps = (state,ownProps) => {

  return {
    id : ownProps.location.pathname.replace('/','') ,
    data : state.gallery.details ,
    checkedTags  : state.gallery.checkedTags ,
  }
}
export default connect(mapStoreToProps,mapDispatchToProps)(Details) ;
