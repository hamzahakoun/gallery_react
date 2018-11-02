const initState = { all : null,liked : null,searched : null,details : null,tags : null }

const galleryReducer = (state = initState, action) => {

  switch(action.type) {
    case 'GET_ALL' :
      return {...state,all : action.data}

    case 'GET_SEARCH' :
      return {...state,searched : action.data}

    case 'GET_LIKED' :
      return {...state,liked : action.data}

    case 'GET_DETAILS' :
      return {...state,details : action.data}

    case 'GET_TAGS' :
      return {...state,tags : action.data}

    case 'CLEAR' :
      return {all : null ,liked : null,searched : null,details :null,tags : null}

    default :
      return state ;
  }
}

export default galleryReducer ;
