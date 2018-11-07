import React from 'react' ;
import CommentItem from './commentItem' ;

const CommentsList = ({comments,height}) => {

  return (
    <div style = {{height : `${height}px`,overflowY : 'scroll'}}>
      {
        comments.map(comment => <CommentItem key = {comment.id} comment = {comment} />)
      }
    </div>
  )
}


export default CommentsList ;
