import { getRequest } from '../../utils/http' ;


const getData = (endpoint,type) => {
  return (dispatch,getState) => {
    getRequest(endpoint).then(resp => resp.json())
    .then(data => dispatch({type : type,data : data}))
  }
}

export {
  getData ,
  
}
