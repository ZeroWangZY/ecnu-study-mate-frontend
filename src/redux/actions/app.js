import { loginAPI, refreshTokenAPI } from '../../api/api'
import { refreshSchedule } from './schedule';

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
      dispatch(refreshSchedule());
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
