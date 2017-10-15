import type { Action } from './types';
import User from '../models/User';

export const LOGIN = 'LOGIN';

export function login(user:User):Action {
  console.log('dispatch login action');
  return {
    type: LOGIN,
    user,
  };
}
