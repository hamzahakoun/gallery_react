import React, { Component } from 'react' ;
import { connect } from 'react-redux' ;
import { getData } from '../../store/actions/galleryActions' ;
import ImagesGridItem from './imagesGridItem' ;
import { CircularProgress } from '@material-ui/core' ;
import { Grid } from '@material-ui/core' ;


const styles = {
  grid : {
    padding : '10px' ,
  }
}

class ImagesGrid extends Component {


  state = {
    data : this.props.type ? this.props[this.props.type] : this.props.all ,
  }

  componentDidMount = () => {
    if (!this.state.data) {

      switch(this.props.type) {

        case 'liked' :
          this.props.getData('images?liked=1','GET_LIKED') ;
          break  ;


        default :
          this.props.getData('images','GET_ALL') ;
          break
      }

    }
  }


  render = () => {
    let type = 'all' ;

    if (this.props.type) {
      type = this.props.type
    }

    const data  = this.props[type] ;
  
    return (
      <Grid container spacing = {8} style= {styles.grid}>
        {data &&
          data.map(item => <ImagesGridItem item = {item} key = {item.id}/>)
        }
        {!data && <CircularProgress className = 'loading' color = 'secondary' />}
        {data && data.length === 0 && <h3 className = 'loading'>No data to be displayed</h3>}
      </Grid>
    )
  }

}


const mapStateToProps = (state) => {
  return {
    all : state.gallery.all ,
    searched : state.gallery.searched ,
    liked : state.gallery.liked ,
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    getData : (endpoint,type) => dispatch(getData(endpoint,type))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ImagesGrid) ;
