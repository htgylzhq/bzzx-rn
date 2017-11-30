import type { Action } from './types';

export const ON_FETCH_UNDERTAKERS = 'ON_FETCH_UNDERTAKERS';

export function onFetchUndertakers(undertakers:[]):Action {
  return {
    type: ON_FETCH_UNDERTAKERS,
    undertakers,
  };
}
