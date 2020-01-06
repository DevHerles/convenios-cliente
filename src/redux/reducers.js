import { combineReducers } from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import authUser from './auth/reducer';
import agreementApp from './agreements/reducer';

const reducers = combineReducers({
  menu,
  settings,
  authUser,
  agreementApp
});

export default reducers;