import { combineReducers } from 'redux';
import app from './app';
import schedule from './schedule';
import homework from './homework';

export default combineReducers({
  app,
  schedule,
  homework
});