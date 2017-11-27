import type { Action } from '../actions/types';
import { ON_FETCH_CONTACTS } from '../actions/contact';

export type State = {
  contacts: Object,
};

const initialState = {
  contacts: {},
};

export default function (state: State = initialState, action: Action): State {
  if (action.type === ON_FETCH_CONTACTS) {
    return {
      ...state,
      contacts: action.contacts,
    };
  }

  return state;
}
