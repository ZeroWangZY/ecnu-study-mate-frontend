import { combineReducers } from 'redux';
import app from './app';
import schedule from './schedule';

export default combineReducers({
  app,
  schedule
});