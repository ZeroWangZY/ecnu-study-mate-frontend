import {loginAPI, refreshTokenAPI, getUserInfoAPI} from '../../api/user'
import {refreshScheduleAndReview} from './schedule';
import {refreshHomework} from './homework';
import {refreshPlan} from './plan';
import {refreshHomeworkManage} from './homeworkManage';
import {getStudentId} from '../store';
import { refreshInformation } from './information';

export const setDrawer = shouldShowDrawer => ({type: 'SET_DRAWER', val: shouldShowDrawer})

// 消息弹出
export const setSnackText = text => ({type: 'SET_SNACK_TEXT', text: text})

export const login = (id, password) => dispatch => {
  loginAPI(id, password).then(json => {
    dispatch({
      type: 'SET_APP',
      data: {
        isLoginned: true,
        accessToken: json.access_token,
        refreshToken: json.refresh_token,
        studentId: id
      }
    })
    dispatch(getUserInfoAndScheduleAfterLogin); //登录成功后获取各种数据
    dispatch(setSnackText('登录成功'));
  }).catch(json => {
    dispatch(setSnackText('登录失败：' + json.error_description));
  })
}

export const updateTokenAction = () => (dispatch, getState) => {
  if (getState().app.refreshToken !== null) {
    refreshTokenAPI().then(json => {
      dispatch({type: 'SET_TOKEN', accessToken: json.access_token, refreshToken: json.refresh_token});
    }).catch(json => {
      dispatch(setSnackText('登录过期，请重新登录'));
      dispatch(logoutAction);
    })
  }
}

export const refreshDataAfterAutoLogin = data => dispatch => {
  dispatch({type: 'SET_APP', data: data});
  refreshTokenAPI().then(json => {
    dispatch({type: 'SET_TOKEN', accessToken: json.access_token, refreshToken: json.refresh_token});
    return json;
  }).then(json => {
    refreshData(dispatch)
  }).catch(json => {
    dispatch(setSnackText('登录过期，请重新登录'));
    dispatch(logoutAction);
  })
}

export const logoutAction = {
  type: 'LOGOUT'
}

const getUserInfoAndScheduleAfterLogin = dispatch => {
  getUserInfoAPI(getStudentId()).then(res => {
    if (res.flag === 'ROLE_ADVISOR') {
      getUserInfoAPI(res.data.studentId).then(res => {
        dispatch({
          type: 'SET_APP',
          data: {
            studentInfo: res.data
          }
        })
      })
    }
    dispatch({
      type: 'SET_APP',
      data: {
        role: res.flag,
        userInfo: res.data
      }
    })
    refreshData(dispatch)
  })
}

const refreshData = dispatch => {
  dispatch(refreshScheduleAndReview);
    dispatch(refreshHomework());
    dispatch(refreshHomeworkManage());
    dispatch(refreshPlan);
    dispatch(refreshInformation);
}