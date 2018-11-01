import React from 'react' ;
import { Link } from 'react-router-dom' ;
import { Grid } from '@material-ui/core' ;


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

const ImagesGridItem = ({item}) => {
  return (
    <Grid item xs = {6} sm = {3} style = {styles.grid}>
      <Link to = {`/${item.id}`}>
        <img src = {item.thumbnail} alt = {item.id} style = {styles.img}/>
      </Link>
    </Grid>
  )
}


export default ImagesGridItem ;
