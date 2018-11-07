import React from 'react'
import { Avatar } from '@material-ui/core' ;


const styles = {
  container :{
      display : 'flex' ,
      alignItems : 'center'
  },
  avatar : {
    marginRight : '10px'
  }
}


const AvatarComponent = ({username}) => {

  const firstLetter = username[0] ;
  return (
    <div style = {styles.container}>
      <Avatar style = {styles.avatar}>{firstLetter}</Avatar>
      <p><small>{username}</small></p>
    </div>
  )

}

export default AvatarComponent ;
