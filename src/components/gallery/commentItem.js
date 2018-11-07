import React from 'react' ;
import AvatarComponent from '../utils/avatar' ;

const CommentItem = ({comment}) => {

  return (
    <div>
      <AvatarComponent username = {comment.commentor.username} />
      <p style = {{paddingLeft : '50px',fontWeight :'bold',marginTop :"-10px"}}>{comment.content}</p>
    </div>
  )

}

export default CommentItem ;
