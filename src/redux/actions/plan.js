import { getPlanAPI, addPlanAPI, deletePlanAPI, updatePlanAPI, updateTimePlanAPI } from '../../api/plan'
import { setSnackText } from './app'
import moment from 'moment'
// 开学时间
const semesterStart = moment('20180910', 'YYYYMMDD')

export const refreshPlan = dispatch => {
  getPlanAPI().then(result => {
    let data = []
    if (result.hasOwnProperty('data')) {
      data = result.data.map(item => {
        return {
          week: item.week,
          timePlan: item.timePlan,
          items: item.items.map(i => {
            return {
              ...i,
              id: i.id.toString(),
              isImportant: i.isImportant === 'false',
              timeRange: i.timeRange.split(',').map(time => new Date(Number(time)))
            }
          })
        }
      })
    }
    // 自动补全从开学到今天的全部周
    let existWeek = data.map(i => i.week)
    let date = moment(new Date())
    let maxWeekIndex = date.diff(semesterStart, 'weeks') + 1
    for (let i = 1; i <= maxWeekIndex; i++) {
      if (existWeek.indexOf(i) === -1) {
        data.push({
          week: i,
          timePlan: {},
          items: []
        })
      }
    }

    // 解析 fetch 得到的 timePlan
    data.forEach(item => {
      if (item.timePlan.hasOwnProperty('studyTime')) {
        item.timePlan = {
          id: item.timePlan.id,
          studyTime: item.timePlan.studyTime.split(',').map(Number),
          sleepTime: item.timePlan.sleepTime.split(',').map(Number),
          sportTime: item.timePlan.sportTime.split(',').map(Number),
          relaxTime: item.timePlan.relaxTime.split(',').map(Number)
        }
      } else {
        item.timePlan = {
          id: -1,
          studyTime: [0, 0, 0, 0, 0, 0, 0],
          sleepTime: [0, 0, 0, 0, 0, 0, 0],
          sportTime: [0, 0, 0, 0, 0, 0, 0],
          relaxTime: [0, 0, 0, 0, 0, 0, 0]
        }
      }
    })
    dispatch(refreshPlanAction(data.sort((a, b) => a.week - b.week)))
  })
}

export const addPlan = (title, content, timeRange, isImportant, week) => dispatch => {
  addPlanAPI(title, content, timeRange, isImportant, week).then(result => {
    dispatch(setSnackText('添加计划成功'))
    refreshPlan(dispatch)
  })
}

export const deletePlan = id => dispatch => {
  deletePlanAPI(id).then(result => {
    dispatch(setSnackText('删除计划成功'))
    refreshPlan(dispatch)
  })
}

export const updatePlan = (id, title, content, timeRange, isImportant, week) => dispatch => {
  updatePlanAPI(id, title, content, timeRange, isImportant, week).then(result => {
    dispatch(setSnackText('修改计划成功：' + content))
    refreshPlan(dispatch)
  })
}

export const updateTimePlan = (id, week, studyTime, sleepTime, relaxTime, sportTime) => dispatch => {
  updateTimePlanAPI(id, week, studyTime, sleepTime, relaxTime, sportTime).then(result => {
    dispatch(setSnackText('修改时间成功'))
    refreshPlan(dispatch)
  })
}

const refreshPlanAction = data => ({ type: 'REFRESH_PLAN_DATA', data: data })
