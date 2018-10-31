import { combineReducers } from 'redux';
import app from './app';
import schedule from './schedule';
import homework from './homework';
import homeworkManage from './homeworkManage'
import plan from './plan'

export default combineReducers({
  app,
  schedule,
  homework,
  homeworkManage,
  plan
});
