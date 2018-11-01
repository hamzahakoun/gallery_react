import React from 'react' ;
import { Button } from '@material-ui/core' ;

const styles = {
  tag : {
    margin : '5px'
  }
}

const TagItem = ({tagItem,handleClick}) => {

  return (
    <Button style = {styles.tag} variant="contained" color="primary" onClick = {(content) => this.handleClick(content)}>
      {tagItem.content}
    </Button>

  )
}

export default TagItem ;
