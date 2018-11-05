import { getRequest } from '../../utils/http' ;


// get images whether all,liked,searched
// type will determine which one
const getData = (endpoint,type) => {
  return (dispatch,getState) => {
    getRequest(endpoint).then(resp => resp.json())
    .then(data => dispatch({type : type,data : data}))
  }
}


// clear value of data (liked,searched,all) based on type
const clearData = (type) => {
  return (dispatch,getState) => {
    dispatch({type : type})
  }
}

const appendData = (type,obj) => {
  return (dispatch,getState) => {
    dispatch({type , data : obj})
  }
}


const popData = (type,obj) => {
    return (dispatch,getState) => {
      dispatch({type, data : obj}) ;
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




export {
  getData ,
  getTags ,
  clearAll,
  checkTags,
  clearData,
  appendData,
  popData
}
