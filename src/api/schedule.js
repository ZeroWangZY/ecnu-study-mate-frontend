import { post } from './api'
import { getStudentId, getUserInfo } from '../redux/store'
export const addScheduleReviewAPI = content => {
  return post('/schedule/addReview', {
    reviewer_id: getStudentId(),
    student_id: getUserInfo().studentId,
    content: content
  })
}
export const getScheduleReviewAPI = () => {
  return post('/schedule/searchReview', {
    student_id: getUserInfo().studentId
  }).then(res => res.data)
}
export const deleteScheduleReviewAPI = id => {
  return post('/schedule/deleteReview', {
    review_id: id
  })
}

export const getScheduleAPI = () => {
  return post('/schedule/search', {
    eq_studentId: getUserInfo().studentId,
    limit: 1000
  }).then(res => res.data.rows)
}

export const addScheduleAPI = (title, desc, start, end, type, progress) => {
  return post('/schedule/baseSqlHandle', {
    insert: [
      {
        studentId: getStudentId(),
        startTime: start.replace('T', ':'),
        endTime: end.replace('T', ':'),
        scheduleType: 'calendar',
        title: title,
        content: desc,
        scheduleTag: type,
        progress: progress
      }
    ],
    update: [],
    delete: []
  })
}

export const updateScheduleAPI = (id, title, desc, start, end, type, progress) => {
  return post('/schedule/baseSqlHandle', {
    insert: [],
    update: [
      {
        id: id,
        studentId: getStudentId(),
        startTime: start.replace('T', ':'),
        endTime: end.replace('T', ':'),
        scheduleType: 'calendar',
        title: title,
        content: desc,
        scheduleTag: type,
        progress: progress
      }
    ],
    delete: []
  })
}

export const deleteScheduleAPI = id => {
  return post('/schedule/baseSqlHandle', {
    insert: [],
    update: [],
    delete: [id]
  })
}
