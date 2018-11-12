const initState = {
    all : [], // all images
    liked : [], // liked images
    searched : [], //searched on images
    details : null, // current details item
    tags : [], // all tags
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
      return {all : [] ,liked : [],searched : [],details :null,tags : [],checkedTags : []}

    case 'CHECK_TAGS' :// check certain tags / all tags
      return {...state , checkedTags : [...state.checkedTags ,...action.data]}

    case 'UNCHECK_TAGS' :// uncheck all tags
      return {...state , checkedTags : []}

    case 'CLEAR_SEARCHED' : // clear searched imagess
      return {...state,searched : [] }

    case 'CLEAR_DETAILS' : // clear details related to details page ;
      return {...state,details : null }

    case 'CLEAR_LIKED' : // clear details related to details page ;
      return {...state,liked : [] }

    case 'CLEAR_ALL' : // clear details related to details page ;
      return {...state,all : [] }

    case 'APPEND_LIKED' : //append one item to data

      // if liked images is not requested yet
      // then don't append this image
      // cuz if i do then images grid will not issue a new request to get
      // all the liked images cuz it already has one 
      if (state.liked.length) {
        return {...state,liked : [...state.liked,action.data] }
      }
      return state ;

    case 'APPEND_ALL' : //append one item to data
      return {...state,all : [...state.all,action.data] }

    case 'CLEAER_TAGS' :
      return {...state,tags : [] }

    case 'POP_LIKED' : // remove one item from data
      const newLiked = state.liked.filter(item => item.id !== action.data.id) ;
      return {...state,liked : newLiked  }

    case 'POP_ALL' : // remove one item from data
      const newALL = state.all.filter(item => item.id !== action.data.id) ;
      return {...state,all : newALL  }

    default :
      return state ;
  }
}

export default galleryReducer ;
