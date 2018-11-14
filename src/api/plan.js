import { post } from './api'
import { getStudentId } from '../redux/store'

// TODO: 后端接口在没有Plan的时候会崩溃
export const getPlanAPI = () => {
  return post('/todolist/getWeeksInfo', {})
}

// 得到该用户所有有计划的周（懒加载、未应用）
export const getIdAndWeek = () => {
  return post('/todolist/getIdAndWeek', {})
}

// 得到某一周的所有信息（懒加载、未应用）
export const getWeekInfo = weekIndex => {
  return post('/todolist/getWeekInfo', {
    week: weekIndex
  })
}

// TODO: 如果没有保存 timePlan 会崩溃
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

export const updateTimePlanAPI = (id, week, studyTime, sleepTime, relaxTime, sportTime) => {
  if (id === -1) {
    addPlanAPI(
      '至少要有一个计划',
      '你可以先新建一些计划，然后再把这个占位的计划删掉',
      [new Date(), new Date()],
      false,
      week
    )
    return post('/timeplan/baseSqlHandle', {
      insert: [
        {
          studentId: getStudentId(),
          week,
          studyTime,
          sleepTime,
          relaxTime,
          sportTime
        }
      ]
    })
  } else {
    let updateData = {
      update: [
        {
          id,
          studentId: getStudentId(),
          week,
          studyTime,
          sleepTime,
          relaxTime,
          sportTime
        }
      ]
    }
    return post('/timeplan/baseSqlHandle', updateData)
  }
}

export const deletePlanAPI = id => {
  return post('/todolist/baseSqlHandle', {
    delete: [id]
  })
}
