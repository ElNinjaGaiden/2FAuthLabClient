import * as session from './actions';
import { ActionType, getType } from 'typesafe-actions';
import { SessionState } from './types';

export type SessionAction = ActionType<typeof session>;

const defaultState: SessionState = {
  user: undefined,
  authenticationFactor1: false,
  authenticationFactor2: false
}

const reducer = (state = defaultState, action: SessionAction): SessionState => {
  switch (action.type) {
    case getType(session.registerUser.success):
      return {
        ...state,
        authenticationFactor1: true,
        user: action.payload
      }
    case getType(session.verifySecret.success):
      return {
        ...state,
        authenticationFactor2: true
      }
    case getType(session.attemptAuthenticateFactor1.success):
      return {
        ...state,
        user: action.payload,
        authenticationFactor1: true
      }
    case getType(session.attemptAuthenticateFactor2.success):
      return {
        ...state,
        authenticationFactor2: true
      }
    default:
      return state;
  }
}

export default reducer;