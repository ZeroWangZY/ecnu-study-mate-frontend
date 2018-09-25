import { getMonthScheduleAPI, loginAPI } from '../../api/api'

export const setDrawer = shouldShowDrawer => ({
  type: 'SET_DRAWER',
  val: shouldShowDrawer
})

const setLogin = () => ({
  type: 'LOGIN'
})

export const login = (id, password) => dispatch => {
  loginAPI(id, password).then(res => {
    dispatch(refresh());
    dispatch(setLogin());
  })
}

export const refresh = (dispatch) => {
  return dispatch => {
    getMonthScheduleAPI().then(data => {
      dispatch(setSchedule(data));
    });
  }
}

const setSchedule = (data) => ({
  type: 'SET_SCHEDULE',
  data: data
})