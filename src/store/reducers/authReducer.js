const initState = {authError : null,isUserAuthorized : false}

const authReducer = (state = initState, action) => {
  switch(action.type) {

    case 'LOGIN_ERROR' :
      return {...state,authError : action.message,isUserAuthorized : false }

    case 'LOGIN_SUCCESS' :
      localStorage.setItem('token',action.token) ;
      return {...state,authError : null,isUserAuthorized : true }

    case 'LOGOUT' :
      localStorage.removeItem('token') ;
      return {...state,isUserAuthorized : false}

    case 'HIDE_LOGIN_ERROR_MESSAGE' :
      return {...state,authError : null }

    default :
      return state ;

  }
}

export default authReducer ;
