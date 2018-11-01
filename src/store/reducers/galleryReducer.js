const initState = { all : null,liked : null,searched : null,details : null }

const galleryReducer = (state = initState, action) => {

  switch(action.type) {
    case 'GET_ALL' :
      return {...state,all : action.data}

    case 'GET_SEARCH' :
      return {...state,searched : action.data}

    case 'GET_DETAILS' :
      return {...state,details : action.data}

    default :
      return state ;
  }
}

export default galleryReducer ;
