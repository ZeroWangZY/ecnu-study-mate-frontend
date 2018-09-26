import { loginAPI } from '../../api/api'
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
    .then(res => res.json())
    .then(res => {
      dispatch(loginAction(res.access_token, id));
      dispatch(refreshSchedule());
      dispatch(setSnackText('登录成功'));
    })
    .catch(json => {
      dispatch(setSnackText('登录失败：' + json.error_description));            
    })
}

const loginAction = (accessToken, studentId) => ({
  type: 'LOGIN',
  accessToken: accessToken,
  studentId: studentId
})

