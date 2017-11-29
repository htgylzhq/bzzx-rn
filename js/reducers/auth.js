import type { Action } from '../actions/types';
import { LOGIN, LOGOUT } from '../actions/auth';

export type State = {
  loggedIn: boolean,
  username: string,
  password: string
}

const initialState = {
  loggedIn: false,
  username: '',
  password: '',
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === LOGIN) {
    return {
      ...state,
      loggedIn: true,
      user: action.user,
      sid: action.sid,
    };
  }

  if (action.type === LOGOUT) {
    return {
      ...state,
      loggedIn: false,
      user: null,
      sid: null,
    };
  }

  return state;
}
