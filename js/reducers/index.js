import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import drawer from './drawer';
import user from './user';
import list from './list';
import auth from './auth';
import msgIndex from './msgIndex';
import msgDetail from './msgDetail';
import proposalIndex from './proposalIndex';
import proposalDetail from './proposalDetail';
import myOwnProposals from './myOwnProposals';
import nav from './router';

export default combineReducers({
  form: formReducer,
  auth,
  drawer,
  user,
  list,
  msgIndex,
  msgDetail,
  proposalIndex,
  proposalDetail,
  myOwnProposals,
  nav,
});
