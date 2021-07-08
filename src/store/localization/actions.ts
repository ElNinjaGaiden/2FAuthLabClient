import { createAction, createAsyncAction } from 'typesafe-actions';
import Language from '../../models/language';

export const fetchLanguage = createAsyncAction(
  'language/FETCH_REQUEST',
  'language/FETCH_SUCCESS',
  'language/FETCH_FAILURE'
)<void, object, Error>();

export const fetchLanguages = createAsyncAction(
  'languages/FETCH_REQUEST',
  'languages/FETCH_SUCCESS',
  'languages/FETCH_FAILURE'
)<void, Language[], Error>();

export const updateLanguage = createAction('language/UPDATE_LANGUAGE', (languageId: string) => languageId)();

