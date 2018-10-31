import React from 'react' ;
import { Redirect, Route } from 'react-router-dom' ;

const PrivateRoute = (props) => {

  const Component = props.component ;
  const { status } = props ;
  return (
    <Route
      render = {(props) => status === 200 ? <Component {...props} /> : <Redirect to = '/login' />}
    />
  )

}

export default PrivateRoute ;
