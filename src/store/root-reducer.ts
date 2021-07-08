import { combineReducers } from 'redux';
import localization from './localization/reducer';
import menu from './menu/reducer';
import session from './session/reducer';

const rootReducer = combineReducers({
  localization,
  menu,
  session
});

export default rootReducer;