import type { Action } from './types';

export const REFRESH_PUB_CLUES = 'REFRESH_PUB_CLUES';
export const LOAD_MORE_PUB_CLUES = 'LOAD_MORE_PUB_CLUES';

export function refresh(clues: Object[], minUpdate: number, maxUpdate: number): Action {
  return {
    type: REFRESH_PUB_CLUES,
    clues,
    minUpdate,
    maxUpdate,
  };
}

export function loadMore(clues: Object[], minUpdate: number, maxUpdate: number): Action {
  return {
    type: LOAD_MORE_PUB_CLUES,
    clues,
    minUpdate,
    maxUpdate,
  };
}
