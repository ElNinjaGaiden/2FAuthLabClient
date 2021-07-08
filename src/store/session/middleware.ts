import { Middleware } from 'redux';
import { SessionState } from './types';
import { ActionType, getType } from 'typesafe-actions';
import * as session from './actions';
import axios from 'axios';

const { REACT_APP_API_BASE_URL: API_BASE_URL } = process.env;

export const registerUserMiddleware: Middleware<{}, SessionState> = ({ getState }) => next => async (action: ActionType<typeof session>) => {

    next(action);
  
    if (action.type !== getType(session.registerUser.request)) {
      return;
    }
  
    try {
      const url = `/api/users/register`;
      const data = {
          userName: '',
          password: ''
      };
      const { data: user } = await axios({
          baseURL: API_BASE_URL,
          url,
          method: 'POST',
          data
      });
      next(session.registerUser.success(user));
    }
    catch (e) {
      next(session.registerUser.failure(e));
    }
}

export const verifySecretMiddleware: Middleware<{}, SessionState> = ({ getState }) => next => async (action: ActionType<typeof session>) => {

    next(action);
  
    if (action.type !== getType(session.verifySecret.request)) {
      return;
    }
  
    try {
      const url = `/api/users/verify`;
      const data = {
          userId: '',
          token: ''
      };
      const { data: user } = await axios({
          baseURL: API_BASE_URL,
          url,
          method: 'POST',
          data
      });
      next(session.verifySecret.success(user));
    }
    catch (e) {
      next(session.verifySecret.failure(e));
    }
}

export const attemptAuthenticateFactor1Middleware: Middleware<{}, SessionState> = ({ getState }) => next => async (action: ActionType<typeof session>) => {

  next(action);

  if (action.type !== getType(session.attemptAuthenticateFactor1.request)) {
    return;
  }

  try {
    const url = `/api/users/authenticate`;
    const data = {
        userName: '',
        password: ''
    };
    const { data: user } = await axios({
        baseURL: API_BASE_URL,
        url,
        method: 'POST',
        data
    });
    next(session.attemptAuthenticateFactor1.success(user));
  }
  catch (e) {
    next(session.attemptAuthenticateFactor1.failure(e));
  }
}

export const attemptAuthenticateFactor2Middleware: Middleware<{}, SessionState> = ({ getState }) => next => async (action: ActionType<typeof session>) => {

    next(action);
  
    if (action.type !== getType(session.attemptAuthenticateFactor2.request)) {
      return;
    }
  
    try {
      const url = `/api/users/validateToken`;
      const data = {
          userId: '',
          token: ''
      };
      const { data: user } = await axios({
        baseURL: API_BASE_URL,
        url,
        method: 'POST',
        data
    });
      next(session.attemptAuthenticateFactor2.success(user));
    }
    catch (e) {
      next(session.attemptAuthenticateFactor2.failure(e));
    }
}