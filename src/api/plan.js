import { post } from './api'
import { getStudentId } from '../redux/store'

export const getPlanAPI = () => {
  return post('/todolist/getWeeksInfo', {})
}

export const addPlanAPI = (title, content, timeRange, isImportant = false, week = 1) => {
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
