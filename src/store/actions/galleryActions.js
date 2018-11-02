import { getRequest } from '../../utils/http' ;


const getData = (endpoint,type) => {
  return (dispatch,getState) => {
    getRequest(endpoint).then(resp => resp.json())
    .then(data => dispatch({type : type,data : data}))
  }
}


const getTags = () => {
  return (dispatch,getState) => {
    getRequest('images/tags')
    .then(resp => resp.json())
    .then(data => dispatch({type : 'GET_TAGS',data : data}))
  }
}

const clearAll = () => {
  return (dispatch,getState) => {
    dispatch({type: "CLEAR"})
  }
}

export {
  getData ,
  getTags ,
  clearAll,
}
