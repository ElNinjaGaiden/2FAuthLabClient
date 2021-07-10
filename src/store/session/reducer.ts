import * as session from './actions';
import { ActionType, getType } from 'typesafe-actions';
import { SessionState } from './types';

export type SessionAction = ActionType<typeof session>;

const defaultState: SessionState = {
  user: undefined,
  passwordVerified: false,
  tokenVerified: false
}

const reducer = (state = defaultState, action: SessionAction): SessionState => {
  switch (action.type) {
    // case getType(session.registerUser.success):
    //   return {
    //     ...state,
    //     authenticationFactor1: true,
    //     user: action.payload
    //   }
    // case getType(session.verifySecret.success):
    //   return {
    //     ...state,
    //     authenticationFactor2: true
    //   }
    case getType(session.updateUser):
      return {
        ...state,
        user: action.payload
      }
    case getType(session.passwordVerificationSuccesful):
      return {
        ...state,
        passwordVerified: true
      }
    case getType(session.tokenVerificationSuccesful):
      return {
        ...state,
        tokenVerified: true
      }
    default:
      return state;
  }
}

export default reducer;