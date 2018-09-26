import { getMonthScheduleAPI, loginAPI, addScheduleAPI, updateScheduleAPI, deleteScheduleAPI } from '../../api/api'

export const setDrawer = shouldShowDrawer => ({
  type: 'SET_DRAWER',
  val: shouldShowDrawer
})

export const login = (id, password) => dispatch => {
  loginAPI(id, password)
    .then(res => res.json())
    .then(res => {
      dispatch(loginAction(res.access_token, id));
      dispatch(refresh());
    })
}

export const refresh = () => {
  return dispatch => {
    getMonthScheduleAPI().then(data => {
      dispatch(setSchedule(data));
    });
  }
}

export const addSchedule = (title, desc, start, end) => {
  return dispatch => {
    addScheduleAPI(title, desc, start, end)
      .then(res => {
        dispatch(refresh());
      })
  }
}

export const updateSchedule = (id, title, desc, start, end) => {
  return dispatch => {
    updateScheduleAPI(id, title, desc, start, end)
      .then(res => {
        dispatch(refresh());
      })
  }
}

export const deleteSchedule = (id) => {
  return dispatch => {
    deleteScheduleAPI(id)
      .then(res => {
        dispatch(refresh());
      })
  }
}

const setSchedule = (data) => ({
  type: 'SET_SCHEDULE',
  data: data
})

const loginAction = (accessToken, studentId) => ({
  type: 'LOGIN',
  accessToken: accessToken,
  studentId: studentId
})

