import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import drawer from './drawer';
import user from './user';
import list from './list';
import auth from './auth';
import msgs from './msg';

export default combineReducers({
  form: formReducer,
  auth,
  drawer,
  user,
  list,
  msgs,
});
