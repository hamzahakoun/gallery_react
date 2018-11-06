import { combineReducers } from 'redux' ;
import galleryReducer from './galleryReducer' ;
import authReducer from './authReducer' ;
import messageReducer from './messageReducer' ;

const rootReducer = combineReducers({
  gallery : galleryReducer,
  auth : authReducer ,
  messaging : messageReducer ,
})

export default rootReducer ;
