import config from '../config' ;


const getRequest = (endpoint) => {

  const baseUrl = config.base ;
  const token = localStorage.getItem('token') ;
  const headers = {'Content-Type' : 'application/json','Authorization':`JWT ${token}`} ;
  return fetch(`${baseUrl}/${endpoint}`,{headers : headers}) ;

}


const request = (endpoint,payload,type = 'POST',isFile = false) => {

  const baseUrl = config.base ;
  const token = localStorage.getItem('token') ;
  let headers = {} ;
  if (!isFile) {
    headers = {'Content-Type' : 'application/json','Authorization':`JWT ${token}`} ;
    payload = JSON.stringify(payload) ;
  } else {
    headers = {'Authorization':`JWT ${token}`} ;
  }

  return fetch(`${baseUrl}/${endpoint}`,{
    method : type ,
    body : payload ,
    headers : headers
  })
}


const deleteRequest = (endpoint) => {
  const baseUrl = config.base ;
  const token = localStorage.getItem('token')  ;
  const headers = {'Content-Type' : 'application/json','Authorization':`JWT ${token}`} ;
  return fetch(`${baseUrl}/${endpoint}`,{
    method : "DELETE",
    headers : headers ,
  })
}

export {
  getRequest ,
  request,
  deleteRequest
}
