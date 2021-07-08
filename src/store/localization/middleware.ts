import { Middleware } from 'redux';
import { LocalizationState } from './types';
import { ActionType, getType } from 'typesafe-actions';
import * as localization from './actions';
import store from 'store';
import Language from '../../models/language';
import axios from 'axios';

const { REACT_APP_API_BASE_URL: API_BASE_URL } = process.env;

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

export const fetchLanguagesMiddleware: Middleware<{}, LocalizationState> = ({ getState }) => next => async (action: ActionType<typeof localization>) => {

  next(action);

  if (action.type !== getType(localization.fetchLanguages.request)) {
    return;
  }

  try {
    const { data: { data } } = await axios({
      baseURL: API_BASE_URL,
      url: '/api/languages',
      method: 'GET'
    });
    const languages: Language[] = data;
    next(localization.fetchLanguages.success(languages));
  }
  catch (e) {
    next(localization.fetchLanguages.failure(e));
  }
}
