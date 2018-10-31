import config from '../config' ;


const getRequest = (endpoint) => {

  const baseUrl = config.base ;
  const token = localStorage.getItem('token') ;
  const headers = {'Content-Type' : 'application/json','Authorization':`JWT ${token}`} ;
  return fetch(`${baseUrl}/${endpoint}`,{headers : headers}) ;

}


const request = (endpoint,payload,type = 'POST') => {

  const baseUrl = config.base ;
  const token = localStorage.getItem('token') ;
  const headers = {'Content-Type' : 'application/json','Authorization':`JWT ${token}`} ;
  payload = JSON.stringify(payload) ;

  return fetch(`${baseUrl}/${endpoint}`,{
    method : type ,
    body : payload ,
    headers : headers
  })
}


export {
  getRequest ,
  request
}
