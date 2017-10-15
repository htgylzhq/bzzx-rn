import type { Action } from '../actions/types';
import { LOGIN } from '../actions/auth';

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
    console.log('action', action);
    return {
      ...state,
      loggedIn: true,
      user: action.user,
    };
  }
  return state;
}
