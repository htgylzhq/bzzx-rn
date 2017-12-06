import type { Action } from './types';

export const ON_FETCH_CLUE_INFO = 'ON_FETCH_CLUE_INFO';


export function onFetchClueInfo(clue: Object): Action {
  return {
    type: ON_FETCH_CLUE_INFO,
    clue,
  };
}
