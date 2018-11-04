import { getRequest } from '../../utils/http' ;


// get images whether all,liked,searched
// type will determine which one
const getData = (endpoint,type) => {
  return (dispatch,getState) => {
    getRequest(endpoint).then(resp => resp.json())
    .then(data => dispatch({type : type,data : data}))
  }
}

// ge all tags
const getTags = () => {
  return (dispatch,getState) => {
    getRequest('images/tags')
    .then(resp => resp.json())
    .then(data => dispatch({type : 'GET_TAGS',data : data}))
  }
}


// clear all data liked , details, searched ,all
const clearAll = () => {
  return (dispatch,getState) => {
    dispatch({type: "CLEAR"})
  }
}


// check tags
// will be used to check certain tags, check all tags , uncheck all tags
// type will determine
const checkTags = (tags,t) => {
  const send = t === 'full' ? {type : 'CHECK_TAGS',data : tags} : {type : 'UNCHECK_TAGS',data : tags} ;
  return (dispatch,getState) => {
    dispatch(send)
  }
}

// clear the value of searched images 
// will be used when user adds new tags to search for
// so all data will be empty then will get new data
const clearSearched = () => {
  return (dispatch,getState) => {
    dispatch({type : "CLEAR_SEARCHED"})
  }
}


export {
  getData ,
  getTags ,
  clearAll,
  checkTags,
  clearSearched,
}
