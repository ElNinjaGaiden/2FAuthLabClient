import { Middleware } from 'redux';
import { LocalizationState } from './types';
import { ActionType, getType } from 'typesafe-actions';
import * as localization from './actions';
import store from 'store';
import axios from 'axios';

export const fetchLanguageMiddleware: Middleware<{}, LocalizationState> = ({ getState }) => next => async (action: ActionType<typeof localization>) => {

  next(action);

  if (action.type !== getType(localization.updateLanguage)) {
    return;
  }

  next(localization.fetchLanguage.request());

  try {
    const url = `/locales/${action.payload}.json`;
    const { data: language } = await axios.get(url);
    next(localization.fetchLanguage.success(language));
    store.set('languageId', action.payload);
  }
  catch (e) {
    next(localization.fetchLanguage.failure(e));
  }
}
