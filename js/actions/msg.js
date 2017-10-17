import type { Action } from './types';
import Msg from '../models/Msg';

export const REFRESH_MSGS = 'REFRESH_MSGS';

export function refresh(msgs:Msg[]):Action {
  return {
    type: REFRESH_MSGS,
    msgs,
  };
}

