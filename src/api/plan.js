import { post } from './api'
import { getStudentId } from '../redux/store'

export const getPlanAPI = () => {
  return post('/todolist/getWeeksInfo', {})
}

export const addPlanAPI = (title, content, timeRange, isImportant, week) => {
  return post('/todolist/baseSqlHandle', {
    insert: [
      {
        studentId: getStudentId(),
        title,
        content,
        isImportant,
        week,
        timeRange: timeRange.map(i => Number(i)).join(',')
      }
    ]
  })
}

export const updatePlanAPI = (id, title, content, timeRange, isImportant, week) => {
  return post('/todolist/baseSqlHandle', {
    update: [
      {
        id: id,
        studentId: getStudentId(),
        title,
        content,
        isImportant,
        week,
        timeRange: timeRange.map(i => Number(i)).join(',')
      }
    ]
  })
}

export const deletePlanAPI = id => {
  return post('/todolist/baseSqlHandle', {
    delete: [id]
  })
}
