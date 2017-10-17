import type { Action } from '../actions/types';
import Msg from '../models/Msg';
import { REFRESH_MSGS } from '../actions/msg';

const initialState = [];

export default function (state:Msg[] = initialState, action:Action): Msg[] {
  if (action.type === REFRESH_MSGS) {
    return state.concat(action.msgs);
  }

  return state;
}
