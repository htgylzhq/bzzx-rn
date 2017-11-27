import type { Action } from './types';

export const ON_FETCH_CONTACTS = 'ON_FETCH_CONTACTS';

export function onFetchContacts(contacts: Object): Action {
  return {
    type: ON_FETCH_CONTACTS,
    contacts,
  };
}
