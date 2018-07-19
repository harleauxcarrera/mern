//this object's purpose is to combine all reducers of the application in one file
//all reducers will be hit thru index.js

import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorsReducer';

export default combineReducers({
  //auth refers to the state that is reduced in authReducer.js
  auth: authReducer,
  errors: errorReducer
})