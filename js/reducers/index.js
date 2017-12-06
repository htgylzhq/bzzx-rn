import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import drawer from './drawer';
import user from './user';
import list from './list';
import home from './home';
import auth from './auth';
import msgIndex from './msgIndex';
import msgDetail from './msgDetail';
import proposalIndex from './proposalIndex';
import proposalDetail from './proposalDetail';
import myOwnProposals from './myOwnProposals';
import myTodoProposals from './myTodoProposals';
import myDoneProposals from './myDoneProposals';
import contacts from './contact';
import nav from './router';
import undertaker from './undertaker';
import reedit from './reedit';

export default combineReducers({
  form: formReducer,
  auth,
  drawer,
  user,
  list,
  home,
  msgIndex,
  msgDetail,
  proposalIndex,
  proposalDetail,
  myOwnProposals,
  myTodoProposals,
  myDoneProposals,
  nav,
  contacts,
  undertaker,
  reedit,
});
