import { getPlanAPI, addPlanAPI } from '../../api/plan'
import { setSnackText } from './app'

export const refreshPlan = dispatch => {
  getPlanAPI().then(result => {
    let data = result.data.map(item => {
      return {
        week: item.week,
        timePlan: {
          studyTime: item.timePlan.studyTime.split(',').map(i => Number(i)),
          sleepTime: item.timePlan.sleepTime.split(',').map(i => Number(i)),
          sportTime: item.timePlan.sportTime.split(',').map(i => Number(i)),
          relaxTime: item.timePlan.relaxTime.split(',').map(i => Number(i))
        },
        items: item.items.map(i => {
          return {
            ...i,
            isImportant: i.isImportant === 'false',
            timeRange: i.timeRange.split(',').map(time => new Date(Number(time)))
          }
        })
      }
    })
    console.log(data)
    dispatch(refreshPlanAction(data))
  })
}

export const addPlan = (title, content, timeRange, isImportant, week) => dispatch => {
  addPlanAPI(title, content, timeRange, isImportant, week).then(result => {
    dispatch(setSnackText('添加计划成功'))
    dispatch(addPlanAction({ title, content, timeRange, isImportant, week }))
  })
}

const refreshPlanAction = data => ({ type: 'REFRESH_PLAN_DATA', data: data })
const addPlanAction = plan => ({ type: 'ADD_SINGLE_PLAN', plan })
