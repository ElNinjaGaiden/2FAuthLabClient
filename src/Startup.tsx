import React, { FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';
import { actions } from './store';
import store from 'store';
import getLanguages from './services/localization/getLanguages';
import Language from './models/language';

const fetchLanguages = async (updateLanguages: Function) => {
  try {
    const languages = await getLanguages();
    updateLanguages(languages);
  } catch (ex) {
    console.log(ex);
  }
};

const { REACT_APP_DEFAULT_LANGUAGE_ID: defaultLanguageId } = process.env;

const mapDispatchToProps = {
  updateLanguage: (languageId: string) =>
    actions.localization.updateLanguage(languageId),
  updateLanguages: (languages: Language[]) =>
    actions.localization.updateLanguages(languages)
};

type Props = typeof mapDispatchToProps & {
  children: React.ReactNode;
};

const Startup: FunctionComponent<Props> = ({ children, updateLanguage, updateLanguages }) => {

  useEffect(() => {
    updateLanguage(store.get('languageId') || defaultLanguageId || '');
    fetchLanguages(updateLanguages);
  }, []);

  return (<>{children}</>);
};

export default connect(
  null,
  mapDispatchToProps
)(Startup);
