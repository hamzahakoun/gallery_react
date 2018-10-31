import { request } from '../../utils/http' ;


const login = (credentials) => {

  return (dispatch,getState) => {
    request('api-token-auth/',credentials)
    .then(resp => {
      if (resp.status === 400) {
        dispatch({type : 'LOGIN_ERROR',message : "Invalid username/password combination"})
      } else {
        resp.json().then(data => dispatch({type : "LOGIN_SUCCESS",token : data.token}) )
      }

    }).catch(e => dispatch({type : 'LOGIN_ERROR',message : e.message}))
  }
}



const hideLoginErrorMessage = () => {

  return (dispatch,getState) => {
    dispatch({type :'HIDE_LOGIN_ERROR_MESSAGE'})
  }
}
export {
  login ,
  hideLoginErrorMessage
}
