import { createAction, createAsyncAction } from 'typesafe-actions';
import User from '../../models/user';

export const registerUser = createAsyncAction(
    'session/REGISTER_USER_REQUEST',
    'session/REGISTER_USER_SUCCESS',
    'session/REGISTER_USER_FAILURE'
)<{ userName: string, password: string }, User, Error>();

export const verifySecret = createAsyncAction(
    'session/VERIFY_SECRET_REQUEST',
    'session/VERIFY_SECRET_SUCCESS',
    'session/VERIFY_SECRET_FAILURE'
)<{ userId: string, token: string }, boolean, Error>();

export const attemptAuthenticateFactor1 = createAsyncAction(
    'session/AUTH_FACTOR_1_REQUEST',
    'session/AUTH_FACTOR_1_SUCCESS',
    'session/AUTH_FACTOR_1_FAILURE'
)<{ userName: string, password: string }, User, Error>();

export const attemptAuthenticateFactor2 = createAsyncAction(
    'session/AUTH_FACTOR_2_REQUEST',
    'session/AUTH_FACTOR_2_SUCCESS',
    'session/AUTH_FACTOR_2_FAILURE'
)<{ userId: string, token: string }, boolean, Error>();

export const updateUser = createAction('session/UPDATE_USER', (user: User) => user)();

