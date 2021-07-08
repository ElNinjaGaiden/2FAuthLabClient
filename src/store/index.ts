import { StateType } from 'typesafe-actions';
import { Middleware } from 'redux';
import rootReducer from './root-reducer';

// Middlewares
import { fetchLanguageMiddleware } from './localization/middleware';
import {
  registerUserMiddleware,
  verifySecretMiddleware,
  attemptAuthenticateFactor1Middleware,
  attemptAuthenticateFactor2Middleware
} from './session/middleware';

// Selectors
import * as localizationSelectors from './localization/selectors';
import * as sessionSelectors from './session/selectors';

// Actions
import * as localizationActions from './localization/actions';
import * as menuActions from './menu/actions';
import * as sessionActions from './session/actions';

export { default } from './store';
export { default as rootReducer } from './root-reducer';

export const selectors = {
  localization: localizationSelectors,
  session: sessionSelectors
};

export const actions = {
  localization: localizationActions,
  menu: menuActions,
  session: sessionActions
}

export const middlewares: Middleware[] = [
  fetchLanguageMiddleware,
  registerUserMiddleware,
  verifySecretMiddleware,
  attemptAuthenticateFactor1Middleware,
  attemptAuthenticateFactor2Middleware
]

export type RootState = StateType<typeof rootReducer>;