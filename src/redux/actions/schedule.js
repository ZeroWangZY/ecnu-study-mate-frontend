import { getMonthScheduleAPI, addScheduleAPI, updateScheduleAPI, deleteScheduleAPI } from '../../api/api'
import { setSnackText } from './app';

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
        dispatch(setSnackText('添加成功'));
      })
  }
}

export const updateSchedule = (id, title, desc, start, end) => {
  return dispatch => {
    updateScheduleAPI(id, title, desc, start, end)
      .then(res => {
        dispatch(refreshSchedule());
        dispatch(setSnackText('更新成功'));
      })
  }
}

export const deleteSchedule = (id) => {
  return dispatch => {
    deleteScheduleAPI(id)
      .then(res => {
        dispatch(refreshSchedule());
        dispatch(setSnackText('删除成功'));
      })
  }
}

const setSchedule = (data) => ({
  type: 'SET_SCHEDULE',
  data: data
})

