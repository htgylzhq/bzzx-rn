import type { Action } from './types';
import User from '../models/User';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export function login(user:User):Action {
  return {
    type: LOGIN,
    user,
  };
}

export function logout():Action {
  return {
    type: LOGOUT,
  };
}
