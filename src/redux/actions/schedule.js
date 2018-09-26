import { getMonthScheduleAPI, addScheduleAPI, updateScheduleAPI, deleteScheduleAPI } from '../../api/api'

export const refreshSchedule = () => {
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
        dispatch(refreshSchedule());
      })
  }
}

export const updateSchedule = (id, title, desc, start, end) => {
  return dispatch => {
    updateScheduleAPI(id, title, desc, start, end)
      .then(res => {
        dispatch(refreshSchedule());
      })
  }
}

export const deleteSchedule = (id) => {
  return dispatch => {
    deleteScheduleAPI(id)
      .then(res => {
        dispatch(refreshSchedule());
      })
  }
}

const setSchedule = (data) => ({
  type: 'SET_SCHEDULE',
  data: data
})


