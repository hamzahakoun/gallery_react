const initState = {display : false,content : ''}

const messageReducer = (state = initState, action) => {
  switch(action.type) {
    case 'SEND_MESSAGE' :
      return {...state,display : true,content : action.message}
    case 'CLOSE_MESSAGE' :
      return {...state,display : false,content : ''}
    default :
      return  state ;
  }
}

export default messageReducer ;
