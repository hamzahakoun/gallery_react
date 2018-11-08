import React from 'react' ;
import { Link } from 'react-router-dom' ;
import { Grid } from '@material-ui/core' ;
import { connect } from 'react-redux' ;
import { clearData } from '../../store/actions/galleryActions' ;

const styles = {
  img : {
    width : '100%',
    height : '100%' ,
    objectFit : 'cover' ,
  },
  grid : {
    height : '300px'
  }
}

const ImagesGridItem = ({item,clearData}) => {
  return (
    <Grid className = 'grid-item animated zoomIn' item xs = {6} sm = {3} style = {styles.grid}>
      <Link to = {`/${item.id}`} onClick = {() => {clearData('CLEAR_DETAILS')}}>
        <img src = {item.thumbnail} alt = {item.id} style = {styles.img}/>
      </Link>
    </Grid>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearData : (type) => dispatch(clearData(type)) ,
  }
}
export default connect(null,mapDispatchToProps)(ImagesGridItem) ;
