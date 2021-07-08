import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from './store';
import store from 'store';

const { REACT_APP_DEFAULT_LANGUAGE_ID: defaultLanguageId } = process.env;

const mapDispatchToProps = {
  updateLanguage: (languageId: string) =>
    actions.localization.updateLanguage(languageId),
  getLanguages: () =>
    actions.localization.getLanguages()
};

type Props = typeof mapDispatchToProps & {
  children: React.ReactNode;
};

class Startup extends Component<Props> {

  componentDidMount () {
    console.log('Holaaaaa');
    const { getLanguages, updateLanguage } = this.props;
    updateLanguage(store.get('languageId') || defaultLanguageId || '');
    getLanguages();
  }

  render () {
    const { children } = this.props;
    return (<>{children}</>);
  }
};

export default connect(
  null,
  mapDispatchToProps
)(Startup);
