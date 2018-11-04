const initState = {
    all : null, // all images
    liked : null, // liked images
    searched : null, //searched on images
    details : null, // current details item
    tags : null, // all tags
    checkedTags : [], // checked tags
  }

const galleryReducer = (state = initState, action) => {

  switch(action.type) {
    case 'GET_ALL' : // get all images
      return {...state,all : action.data}

    case 'GET_SEARCH' : // get searched on images
      return {...state,searched : action.data}

    case 'GET_LIKED' : // get liked images
      return {...state,liked : action.data}

    case 'GET_DETAILS' : // get current item in details page
      return {...state,details : action.data}

    case 'GET_TAGS' : // get all tags
      return {...state,tags : action.data}

    case 'CLEAR' : // clear all data (all,likedl,searched,details)
      return {all : null ,liked : null,searched : null,details :null,tags : null}

    case 'CHECK_TAGS' :// check certain tags / all tags
      return {...state , checkedTags : [...state.checkedTags ,...action.data]}

    case 'UNCHECK_TAGS' :// uncheck all tags
      return {...state , checkedTags : []}

    case 'CLEAR_SEARCHED' : // clear searched imagess
      return {...state,searched : null }

    default :
      return state ;
  }
}

export default galleryReducer ;
