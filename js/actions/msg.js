import type { Action } from './types';
import Msg from '../models/Msg';

export const REFRESH_MSGS = 'REFRESH_MSGS';
export const LOAD_MORE_MSGS = 'RELOAD_MORE_MSGS';

export function refresh(msgs: Msg[], minUpdate: number, maxUpdate: number): Action {
  return {
    type: REFRESH_MSGS,
    msgs,
    minUpdate,
    maxUpdate,
  };
}

export function loadMore(msgs: Msg[], minUpdate: number, maxUpdate: number): Action {
  return {
    type: LOAD_MORE_MSGS,
    msgs,
    minUpdate,
    maxUpdate,
  };
}
