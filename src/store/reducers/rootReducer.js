import { combineReducers } from 'redux' ;
import galleryReducer from './galleryReducer' ;
import authReducer from './authReducer' ;

const rootReducer = combineReducers({
  gallery : galleryReducer,
  auth : authReducer ,
})

export default rootReducer ;
