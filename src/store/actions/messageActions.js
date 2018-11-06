const sendMessage = (message) => {
  return (dispatch,getState) => {
    dispatch({type : "SEND_MESSAGE",message })
  }
}

const removeMessage = () => {
  return (dispatch,getState) => {
    dispatch({type : "CLOSE_MESSAGE"})
  }
}

export {
  sendMessage,
  removeMessage ,
}
