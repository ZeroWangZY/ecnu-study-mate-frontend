import {getScheduleAPI, addScheduleAPI, updateScheduleAPI, deleteScheduleAPI} from '../../api/api'
import {setSnackText} from './app';
import {getScheduleReviewAPI, addScheduleReviewAPI, deleteScheduleReviewAPI} from '../../api/schedule';

<<<<<<< HEAD
export const refreshSchedule = () => {
  return dispatch => {
    getMonthScheduleAPI().then(data => {
    //    writeObj(data);
      dispatch(setSchedule(data));
    });
  }
=======
export const refreshScheduleAndReview = dispatch => {
  dispatch(refreshScheduleReview);
  dispatch(refreshSchedule);
>>>>>>> f76e3fd8d72e6eb98166ae50bcf32c5e698f4ec2
}

const refreshSchedule = dispatch => {
  getScheduleAPI().then(data => {
    dispatch(setSchedule(data));
  });
}

const refreshScheduleReview = dispatch => {
  getScheduleReviewAPI().then(data => {
    dispatch(setScheduleReview(data));
  })
}

export const addSchedule = (title, desc, start, end) => dispatch => {
  addScheduleAPI(title, desc, start, end).then(res => {
    dispatch(refreshSchedule());
    dispatch(setSnackText('添加成功'));
  })
}

export const updateSchedule = (id, title, desc, start, end) => dispatch => {
  updateScheduleAPI(id, title, desc, start, end).then(res => {
    dispatch(refreshSchedule());
    dispatch(setSnackText('更新成功'));
  })
}

export const deleteSchedule = (id) => dispatch => {
  deleteScheduleAPI(id).then(res => {
    dispatch(refreshSchedule());
    dispatch(setSnackText('删除成功'));
  })
}

<<<<<<< HEAD
=======
export const addScheduleReview = content => dispatch => {
  addScheduleReviewAPI(content).then(res => {
    dispatch(refreshScheduleReview)
    dispatch(setSnackText('评论成功'));
  })
}

export const deleteScheduleReview = id => dispatch => {
  deleteScheduleReviewAPI(id).then(res => {
    dispatch(setSnackText('删除评论成功'));
    dispatch(refreshScheduleReview)
  })
}
>>>>>>> f76e3fd8d72e6eb98166ae50bcf32c5e698f4ec2

const setSchedule = (data) => ({type: 'SET_SCHEDULE', data: data})

const setScheduleReview = (data) => ({type: 'SET_SCHEDULE_REVIEW', data: data})
