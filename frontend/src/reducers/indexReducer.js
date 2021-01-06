import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';
import profileReducer from './profileReducer';
import postReducer from './postReducer';

export default combineReducers({
  alertReducer,
  authReducer,
  userReducer,
  profileReducer,
  postReducer,
});
