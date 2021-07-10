import { createAction } from 'typesafe-actions';
import User from '../../models/user';

export const updateUser = createAction('session/UPDATE_USER', (user: User) => user)();

export const passwordVerificationSuccesful = createAction('session/PASSWORD_VERIFICATION_SUCCESFUL', () => {})();

export const tokenVerificationSuccesful = createAction('session/TOKEN_VERIFICATION_SUCCESFUL', () => {})();

