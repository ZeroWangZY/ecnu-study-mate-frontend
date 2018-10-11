import { loginAPI, refreshTokenAPI, getUserInfoAPI } from '../../api/api'
import { refreshSchedule } from './schedule';
import { getStudentId } from '../store';

export const setDrawer = shouldShowDrawer => ({
  type: 'SET_DRAWER',
  val: shouldShowDrawer
})

export const setSnackText = text => ({
  type: 'SET_SNACK_TEXT',
  text: text
})

export const login = (id, password) => dispatch => {
  loginAPI(id, password)
    .then(json => {
      dispatch(loginAction(json.access_token, json.refresh_token, id));
      dispatch(getUserInfoAndSchedule);
      dispatch(setSnackText('登录成功')); 
    })
    .catch(json => {
      dispatch(setSnackText('登录失败：' + json.error_description));
    })
}

export const updateTokenAction = () => (dispatch, getState) => {
  if (getState().app.refreshToken !== null) {
    refreshTokenAPI().then(json => {
      dispatch({
        type: 'SET_TOKEN',
        accessToken: json.access_token,
        refreshToken: json.refresh_token
      });
    })
      .catch(json => {
        dispatch(setSnackText('登录过期，请重新登录'));
        dispatch(logoutAction);
      })
  }
}

export const setApp = data => dispatch => {
  dispatch({
    type: 'SET_APP',
    data: data
  });
  refreshTokenAPI().then(json => {
    dispatch({
      type: 'SET_TOKEN',
      accessToken: json.access_token,
      refreshToken: json.refresh_token
    });
    return json;
  }).then(json => {
    dispatch(refreshSchedule())
  })
    .catch(json => {
      dispatch(setSnackText('登录过期，请重新登录'));
      dispatch(logoutAction);
    })
}

const loginAction = (accessToken, refreshToken, studentId) => ({
  type: 'LOGIN',
  accessToken: accessToken,
  refreshToken: refreshToken,
  studentId: studentId
})

export const logoutAction = {
  type: 'LOGOUT'
}

const getUserInfoAndSchedule = dispatch => {
  getUserInfoAPI(getStudentId()).then(res => {
    if (res.flag === 'ROLE_ADVISOR') {
      getUserInfoAPI(res.data.studentId).then(res => {
        dispatch({
          type: 'SET_APP',
          data: { studentInfo: res.data }
        })
      })
    }
    dispatch({
      type: 'SET_APP',
      data: { role: res.flag, userInfo: res.data }
    })
    dispatch(refreshSchedule());
  })
}
